"""Check production HTTP/HTML and confirmed data; this does not render a browser.

Usage: python scripts/verify-systems-atlas.py http://localhost:3100
Requires the existing Node/TypeScript installation, no additional packages.
"""
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import urljoin, urlsplit, unquote
from urllib.request import urlopen
import json
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parent.parent
BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3100"
checks = 0


def check(condition, message):
    global checks
    assert condition, message
    checks += 1


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.links = []
        self.assets = []
        self.nodes = []
        self.edges = []
        self.mobile = []
        self.studies = []
        self.atlas_projects = []
        self.atlas_controls = []
        self.headings = []
        self.h1 = []
        self.text = []
        self.meta = {}
        self.ignored = 0
        self.in_h1 = False
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ("script", "style"):
            self.ignored += 1
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag == "a":
            self.links.append(attrs.get("href", ""))
        if tag == "link" and attrs.get("rel") in ("stylesheet", "preload"):
            self.assets.append(attrs["href"])
        if tag == "meta":
            self.meta[attrs.get("name")] = attrs.get("content")
        if re.fullmatch("h[1-6]", tag):
            self.headings.append(int(tag[1]))
        if tag == "h1":
            self.in_h1 = True
        if "data-atlas-project" in attrs:
            self.nodes.append(attrs["data-atlas-project"])
        if "data-project-id" in attrs:
            self.atlas_projects.append((tag, attrs))
        if "data-filter" in attrs:
            self.atlas_controls.append((tag, attrs))
        if tag == "path" and "data-project" in attrs:
            self.edges.append((attrs["data-path"], attrs["data-project"]))
        if "data-mobile-project" in attrs:
            self.mobile.append((attrs["data-mobile-path"], attrs["data-mobile-project"]))
        if tag == "article" and "study" in attrs.get("class", "").split():
            self.studies.append(attrs["id"])

    def handle_endtag(self, tag):
        if tag in ("script", "style"):
            self.ignored -= 1
        if tag == "h1":
            self.in_h1 = False

    def handle_data(self, text):
        if not self.ignored:
            self.text.append(text)
            if self.in_h1:
                self.h1.append(text)


def source_data():
    # Execute the actual typed source using the compiler already in the repository.
    code = r"""
const ts = require('typescript');
const {readFileSync} = require('node:fs');
const vm = require('node:vm');
function read(path) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(readFileSync(path, 'utf8'), {
    compilerOptions: {module: ts.ModuleKind.CommonJS}
  }).outputText, {exports});
  return exports.projects;
}
process.stdout.write(JSON.stringify({current:read('src/data/projects.ts'), baseline:JSON.parse(readFileSync('scripts/fixtures/projects-before-publication.json', 'utf8'))}));
"""
    return json.loads(subprocess.run(["node", "-e", code], cwd=ROOT, check=True, capture_output=True, text=True, encoding="utf-8").stdout)


def fetch(path):
    try:
        with urlopen(urljoin(BASE, path), timeout=20) as response:
            return response.status, response.read().decode("utf-8")
    except HTTPError as error:
        return error.code, error.read().decode("utf-8")


data = source_data()
projects = data["current"]
check(len(projects) == 9 and all(project["published"] is True for project in projects), "Nine public projects")
stable_facts = lambda records: [{key: value for key, value in project.items() if key not in ("published", "links", "description")} for project in records]
check(stable_facts(projects) == stable_facts(data["baseline"]), "Project identities, technologies and memberships preserved")
for current, original in zip(projects, data["baseline"]):
    expected_description = original["description"].replace("; outcomes remain to be confirmed.", ".") if current["id"] == "reactis" else original["description"]
    check(current["description"] == expected_description, "Only the approved provisional description was removed: " + current["id"])
check(sum(a["published"] != b["published"] for a, b in zip(projects, data["baseline"])) == 3, "Only three approved statuses changed")
expected_edges = Counter((slug, project["id"]) for project in projects for slug in project["careerPaths"])
check(sum(expected_edges.values()) == 12, "Twelve memberships")

paths = {"/": None, "/paths/ai-data": "ai-data", "/paths/software": "software", "/paths/digital": "digital"}
routes = list(paths) + ["/projects/" + project["id"] for project in projects]
with ThreadPoolExecutor(max_workers=4) as pool:
    responses = dict(zip(routes, pool.map(fetch, routes)))
pages = {}
for route, (status, html) in responses.items():
    check(status == 200, route + " HTTP 200")
    page = pages[route] = Page(html)
    check(len(page.ids) == len(set(page.ids)), route + " unique IDs")
    check(page.headings.count(1) == 1, route + " one H1")
    check(all(b <= a + 1 for a, b in zip(page.headings, page.headings[1:])), route + " heading hierarchy")
    check("#main" in page.links, route + " skip link")
    visible = " ".join(page.text)
    check("Draft" not in visible and "not public" not in visible, route + " no obsolete draft labels")
    if route in paths:
        slug = paths[route]
        expected_projects = [project["id"] for project in projects if not slug or slug in project["careerPaths"]]
        check(page.studies == expected_projects, route + " exact studies and source order")
        check(Counter(page.nodes) == Counter(project["id"] for project in projects), route + " nine unique atlas nodes")
        check(Counter(page.edges) == expected_edges, route + " exact desktop connections")
        check(Counter(page.mobile) == expected_edges, route + " exact mobile associations")
        check(len(page.atlas_projects) == 21, route + " all desktop/mobile cards stay visible")
        for tag, attrs in page.atlas_projects:
            project = next(project for project in projects if project["id"] == attrs["data-project-id"])
            active = not slug or slug in project["careerPaths"]
            check(attrs["data-project-active"] == str(active).lower(), route + " correct initial card state: " + project["id"])
            check((tag == "a" and "href" in attrs) if active else (tag == "span" and "href" not in attrs and attrs.get("aria-disabled") == "true" and "tabindex" not in attrs), route + " correct navigation eligibility: " + project["id"])
            if active:
                check(attrs["href"] == ("/" if slug else "") + "#" + project["id"], route + " atlas targets the Home presentation: " + project["id"])
        check(len(page.atlas_controls) == 7, route + " accessible desktop/mobile/global controls")
        for tag, attrs in page.atlas_controls:
            check(tag == "button" and attrs.get("type") == "button" and attrs.get("aria-pressed") == str(attrs["data-filter"] == (slug or "all")).lower(), route + " native control and selected state")
        check(all(section in page.ids for section in ["projects", "experiences", "education", "skills", "contact"]), route + " complete sections")
        check(not re.search(r"\bAY\b|atlas-origin|origin-monogram|mobile-root-connector", visible), route + " no personal hub")
    else:
        project = next(project for project in projects if route == "/projects/" + project["id"])
        check("".join(page.h1) == project["title"], route + " canonical title")
        check(project["description"] in visible, route + " confirmed description")
        check(page.meta.get("description") == project["description"], route + " project metadata")
        check(all(technology in visible for technology in project["technologies"]), route + " confirmed technologies")
        check(all(section in page.ids for section in ["context-heading", "scope-heading", "limits-heading"]), route + " substantive project sections")
        check(("technology-heading" in page.ids) == bool(project["technologies"]), route + " no empty technologies section")
        check(("resources-heading" in page.ids) == bool(project["links"]), route + " no empty resources section")
        check("Results." in visible and "Results & limitations." not in visible, route + " achievement-focused editorial heading")
        check(not re.search(r"has not been supplied|have not been supplied|owner-provided|remain to be confirmed|No model scores|No measured", visible), route + " no provisional editorial copy")
        for link in project["links"]:
            check(link["href"] in page.links, route + " approved project resource: " + link["href"])

for project in projects:
    check(project["id"] in pages["/"].ids, "Stable Home presentation ID: " + project["id"])
    check("/projects/" + project["id"] in pages["/"].links, "Home presentation still links to public details: " + project["id"])

allowed = {link["href"] for project in projects for link in project["links"]}
allowed.update({"mailto:yousfi.abderrahmane02@gmail.com", "https://github.com/AbderahmaneYOUSFI", "https://linkedin.com/in/abderrahmane02-yousfi", "https://drive.google.com/file/d/1SlqpGjUtvP79uAcxwJXQQo4XrqjjrYMl/view?usp=sharing"})
for route, page in pages.items():
    for href in page.links:
        url = urlsplit(urljoin(BASE + route, href))
        if url.netloc != urlsplit(BASE).netloc:
            check(href in allowed, route + " only confirmed external links: " + href)
            continue
        check(url.path in pages, route + " valid public target: " + href)
        if url.fragment:
            check(unquote(url.fragment) in pages[url.path].ids, route + " valid fragment: " + href)

for invalid in ["does-not-exist", "quiz-game", "big-data", "spring-boot-web-application"]:
    status, html = fetch("/projects/" + invalid)
    check(status == 404, invalid + " true HTTP 404 before streaming")
    check("Page not found." in html, invalid + " accessible 404 page")

assets = set(asset for page in pages.values() for asset in page.assets)
for asset in assets:
    with urlopen(urljoin(BASE, asset), timeout=20) as response:
        check(response.status == 200, "Local asset " + asset)

tokens = json.loads((ROOT / "scripts/fixtures/atlas-tokens.json").read_text(encoding="utf-8"))
css = (ROOT / "src/app/globals.css").read_text(encoding="utf-8")
for mode, values in tokens.items():
    selector = ":root" if mode == "light" else ':root[data-theme="dark"]'
    block = css.split(selector + " {", 1)[1].split("}", 1)[0]
    for key, value in values.items():
        check(f"--{key}: {value};" in block, mode + " exact token: " + key)


def luminance(hex_color):
    channels = [int(hex_color[i:i+2], 16) / 255 for i in (1, 3, 5)]
    linear = [channel / 12.92 if channel <= 0.04045 else ((channel + 0.055) / 1.055) ** 2.4 for channel in channels]
    return sum(channel * weight for channel, weight in zip(linear, [0.2126, 0.7152, 0.0722]))


for mode, values in tokens.items():
    for foreground in ["text", "secondary", "home-ink", "ai-ink", "software-ink", "digital-ink"]:
        for background in ["canvas", "surface", "active"]:
            a, b = sorted([luminance(values[foreground]), luminance(values[background])])
            check((b + 0.05) / (a + 0.05) >= 4.5, f"{mode} {foreground}/{background} normal text contrast")

print(f"{checks} checks passed: 13 public pages, 9 project details, exact catalogue facts, 12 desktop/mobile memberships, links/fragments/assets, 4 HTTP 404s, theme tokens and text contrast.")
print("No browser layout, hydration or interactive accessibility validation is implied.")
