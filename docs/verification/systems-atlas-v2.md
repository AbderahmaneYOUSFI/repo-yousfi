# Systems Atlas V2 — vérification de production

Date : 17 octobre 2026.

## Livraison et périmètre

- Home et les trois parcours utilisent la composition Systems Atlas V2 : polices
  Barlow locales, tokens exacts clair/sombre, atlas, études éditoriales, expérience,
  formation, compétences, contact et pied de page partagés.
- Neuf projets publiés. Dans `src/data/projects.ts`, seuls les trois booléens
  autorisés ont changé ; descriptions, titres, technologies, liens et appartenances
  sont conservés. Comptages publics AI 4 / Software 5 / Digital 3.
- Neuf routes projet possèdent contexte, périmètre documenté, technologies,
  ressources et limites. Les résultats non confirmés ne deviennent pas des acquis.
- Douze connexions et neuf nœuds desktop ; douze appartenances mobiles. Aucun
  nœud personnel AY. Les projets croisés restent PicoxIA, Faraway et Réactis.
- Le proxy limité aux routes projet garantit un vrai HTTP 404 avant streaming,
  sans modifier la configuration Cache Components existante.
- Aucun ajout de dépendance, commit, push ou déploiement. Les modifications locales
  préexistantes de `next.config.ts` sont conservées.

## Commandes réellement exécutées

| Commande | Résultat final |
| --- | --- |
| `pnpm.cmd lint` | Succès, aucune erreur ni avertissement lors de la vérification finale du code de production. |
| `pnpm.cmd exec tsc --noEmit` | Succès. |
| `pnpm.cmd build` | Succès ; quatre pages d'entrée et neuf pages projet générées, avec le fallback dynamique Cache Components. |
| `pnpm.cmd mcp:test` | 9 tests réussis, 0 échec ; catalogue, filtres de publication, contrats publics et transport stdio réel. |
| `node --test scripts/appearance.test.mjs` | 9 tests réussis, 0 échec ; exécution du boot et de la logique d'apparence de production dans des environnements DOM simulés. |
| `node --test .design-preview/projects.test.mjs .design-preview/runtime.test.mjs` | 20 tests réussis, 0 échec ; assertions de catalogue actualisées, scripts d'interaction historiques du prototype. |
| `python scripts/verify-systems-atlas.py http://127.0.0.1:3100` | 885 contrôles réussis contre le build final servi par Next.js. |
| `git diff --check` | Succès. |

Le contrôle HTTP/HTML couvre les treize pages publiques, les titres/descriptions
canoniques des neuf détails, leurs sections et métadonnées, l'ordre des études,
les connexions desktop, les associations mobiles, les identifiants uniques,
les ancres, les destinations internes/externes et les polices/styles servis.
Il compare aussi tous les faits du catalogue à la référence avant publication,
les tokens exacts et les contrastes des textes sur les surfaces des deux thèmes.

Les URLs `/projects/does-not-exist`, `/projects/quiz-game`, `/projects/big-data`
et `/projects/spring-boot-web-application` renvoient réellement HTTP 404.
Les neuf projets publiés renvoient HTTP 200.

Les tests du thème vérifient priorité URL/stockage/système, valeurs invalides,
stockage refusé, cohérence avant/après hydratation simulée, application des couleurs,
propagation du choix dans les liens et changement de préférence système.
Ils ne font pas tourner React dans un navigateur.

## Limites et contrôles visuels restants

L'inventaire de l'outil UI ne contient aucun navigateur. La tentative d'ouverture
du navigateur intégré a retourné `Browser is not available: iab`.
Aucune capture ni comparaison visuelle navigateur n'est donc revendiquée.

Les breakpoints et comportements ont été portés depuis les prototypes approuvés.
Il reste à inspecter les rendus réels à 360, 375, 390, 768, 1024 et 1440 px,
dans les deux thèmes, ainsi que le zoom à 200 %, le chargement des polices,
les éventuelles collisions, le menu au clavier/toucher et les annonces de lecteur
d'écran. L'absence d'erreur d'hydratation réelle et de débordement doit être
confirmée dans ce navigateur ; les contrôles statiques ne suffisent pas.

Comparer aux fichiers HTML/CSS approuvés de `.design-preview/`, qui restent
inchangés. Seul son test de catalogue source a été adapté à la décision de
publication ; le générateur et son audit de snapshot restent historiques.
