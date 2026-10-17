# Feature 007 — Systems Atlas V2 en production

Statut : mise à jour selon la décision définitive du propriétaire du 17 octobre 2026 ; implémentation autorisée.

## Objectif

Porter fidèlement les prototypes Systems Atlas V2 vers Home, AI & Data, Software Engineering et Digital Transformation. Publier les neuf projets avec une page détaillée chacun, sans redesign ni faits inventés.

## Décision de publication et données

La décision explicite du propriétaire annule la règle « six publiés et trois brouillons ». Réactis, Marble Madness et Angular Assignment Management sont désormais publiés. Seuls leurs trois booléens `published` changent dans `src/data/projects.ts` ; identifiants, titres, descriptions, technologies, liens, ordre et appartenances restent identiques.

| Parcours | Projets publiés |
| --- | --- |
| AI & Data | PicoxIA, Réactis, Energy Consumption Forecasting, Thaïs Hotel MCP : 4 |
| Software Engineering | PicoxIA, Faraway, Mini-SGBD, Marble Madness, Angular Assignment Management : 5 |
| Digital Transformation | Réactis, SSE @ ICOSNET, Faraway : 3 |

Neuf projets distincts et douze appartenances. PicoxIA relie AI/Software, Faraway Software/Digital, Réactis AI/Digital. La publication autorise la visibilité publique ; elle ne confirme aucun résultat nouveau.

## Audit et approche

L'existant comportait quatre pages App Router statiques, des composants serveur et des données locales typées. Geist, palette sombre fixe, Hero organique et cartes uniformes différaient de la référence approuvée. Les douze vues V2 utilisent Barlow/Barlow Semi Condensed, les tokens Titanium/Turquoise/Indigo/Emerald, un atlas desktop à neuf nœuds et douze connexions, une arborescence mobile et des études éditoriales. Les sections expérience, formation, compétences, contact et footer sont partagées.

Les changements locaux préexistants de `next.config.ts` sont conservés. Le Hero et ses styles évoluent dans le périmètre demandé. Les fichiers visuels des prototypes restent des références historiques inchangées ; leurs mentions de brouillons sont désormais dépassées pour la production.

Les anciennes plaques « Draft » sont remplacées par des plaques typographiques basées sur le sujet documenté. Les connexions deviennent pleines. Ces adaptations et les liens vers les détails découlent de la nouvelle publication.

## Plan d'implémentation

1. Actualiser la spécification, les trois statuts de publication et les assertions MCP concernées.
2. Porter polices locales et licences, tokens, styles et composants V2 ; garder le contenu serveur et isoler thème, menu et interactions d'atlas côté client.
3. Composer les quatre pages avec les sélecteurs existants ; créer `/projects/[id]`, ses métadonnées et ses paramètres statiques depuis les projets publiés.
4. Présenter dans chaque détail le contexte, le travail documenté, les technologies, les ressources et les limites connues. Ne pas inventer de contribution personnelle, date, métrique, stack Réactis ou URL Render.
5. Vérifier routes, publication, liens, thèmes, responsive et accessibilité. Exécuter lint, TypeScript, build, tests MCP et contrôles HTTP/HTML.

## Critères d'acceptation

- CA1 : les quatre pages reproduisent sections, composition, typographie, palette et comportements V2, avec les adaptations de publication autorisées.
- CA2 : neuf projets publiés, aucun brouillon ; seul le statut des trois projets autorisés change dans les faits du catalogue. Comptages par parcours 4/5/3.
- CA3 : neuf nœuds projet uniques desktop, douze connexions pleines ; aucun nœud AY, moyeu ou connecteur personnel. Mobile : douze appartenances, projets croisés explicitement nommés.
- CA4 : neuf routes `/projects/<id>` fonctionnelles avec H1 canonique, métadonnées et contenu pré-rendu. Liens depuis atlas et études. Identifiants inconnus, exclus ou non publiés : HTTP 404, sans exposer leur contenu.
- CA5 : détails fondés sur les faits confirmés. Résultats et stack Réactis non confirmés ; ICOSNET reste une étude avec simulation. Aucune métrique, contribution ou réalisation supplémentaire n'est déduite de la publication.
- CA6 : seuls les cinq dépôts GitHub fournis sont liés ; aucun faux lien de démo ou de CV. Absence de technologies, ressources ou résultats traitée explicitement.
- CA7 : tokens exacts de `tokens.json`, Barlow local, sans orange/corail/terracotta. Clair/sombre/système, persistance, priorité du paramètre `appearance`, changement OS en mode système et repli URL si stockage indisponible. Initialisation avant affichage, sans erreur d'hydratation.
- CA8 : comparer Home/AI à 1440 et 390 px dans les deux thèmes, puis Software/Digital et détails. Vérifier 360, 375, 390, 768, 1024 et 1440 px sans débordement ni collision. Hero en colonne entre 801 et 1100 ; atlas mobile à 800 et moins.
- CA9 : navigation sémantique, lien d'évitement, titres hiérarchisés, focus visible, contrôles nommés, cibles principales de 44 px ; clavier et toucher. Échap ferme le menu et restitue le focus. La sélection de parcours dans l'atlas est explicite et persistante ; ni le survol ni le déplacement du focus ne changent le filtre.
- CA10 : contraste texte courant ≥4,5:1, grands textes ≥3:1 ; appartenances compréhensibles sans couleur. Mouvement réduit et couleurs forcées respectés ; contenu disponible sans animation.
- CA11 : expérience, formation, compétences et contact cohérents avec les sources. Artworks conceptuels légendés et placeholders institutionnels identifiés.
- CA12 : lint, TypeScript, build, tests pertinents et contrôles HTTP réussis. Rapporter séparément les vérifications exécutées et les limites de validation visuelle.

## Ajustements UX autorisés par le propriétaire

Ces critères reprennent la demande explicite qui poursuit l'implémentation V2 ;
ils remplacent son ancien comportement de survol, sans nouveau redesign.

- CA13 : les trois pages de parcours partagent le même composant Hero et les mêmes
  zones de mise en page pour nom, titre, description, actions et espacements.
  Réserver au minimum deux lignes au titre et une hauteur de texte commune,
  adaptée au breakpoint. Le texte peut grandir naturellement ; aucun retour à la
  ligne forcé, hauteur maximale ou réglage spécifique à AI & Data.
- CA14 : les trois parcours de l'atlas sont des boutons natifs avec `aria-pressed`,
  un état sélectionné visible, et activation par Entrée/Espace ou toucher.
  Un seul état React partagé pilote desktop et mobile. Les appartenances restent
  dérivées de `projects.ts`. Initialisation au parcours de la page ; Home en vue
  globale. « All projects » restaure explicitement cette vue sur chaque page.
- CA15 : toutes les sélections gardent neuf projets et douze connexions visibles.
  Les projets du parcours et ses connexions sont mis en évidence ; les autres sont
  gris. Hors parcours, une carte est rendue sans `href`, sans arrêt de tabulation,
  avec `aria-disabled`, et sans chevron. Aucune suppression des pages publiques.
  Les projets croisés sont actifs dans chacune de leurs appartenances réelles.
- CA16 : sur mobile, chaque carte active est un lien sur toute sa surface, avec
  flèche discrète, bordure, cible confortable et retour au toucher/focus. Une
  instruction courte explique le filtre. Le fonctionnement ne dépend pas du survol.
- CA17 : ne modifier ni les prototypes, ni les données, ni les autres sections.
  Exécuter les vérifications pertinentes, examiner le diff et créer un commit
  automatiquement si elles passent. Aucun push. Rapporter les limites de rendu
  navigateur et les fichiers du portage précédent inclus dans ce premier commit.

## Cas limites et choix techniques

Conserver le filtre `published` pour de futures entrées non publiées. Le détail vérifie aussi ce statut avant rendu. Avec Cache Components, Next.js peut commencer le streaming avant le `notFound()` d'un paramètre inconnu : un `src/proxy.ts` limité à `/projects/:path*` doit rejeter les identifiants absents du catalogue public avant rendu, pour garantir HTTP 404 sans modifier la configuration existante.

La navigation conserve les liens natifs du portfolio et des prototypes. Le contrôle d'apparence reporte le choix dans les liens internes, pour fonctionner même si le stockage navigateur est bloqué. Les ancres de la page gardent leur comportement natif.

Vérifier titres longs, email, technologies, atlas tablette, zoom 200 %, retour arrière, stockage refusé et paramètres d'apparence invalides. Aucun import des HTML complets ni des générateurs Python dans le runtime Next.js.

## Hors périmètre

CMS, backend, analytics, traduction complète, nouvelles dépendances, nouveaux faits ou réalisations, push et déploiement. Le commit local est désormais explicitement autorisé par la demande d'ajustements UX. L'autorisation de publication porte sur le code et les routes de production ; aucun hébergement externe n'est modifié.

## Vérification

État initial : lint, TypeScript et build réussis ; 20 tests de prototypes réussis avant changement de politique. Le test de catalogue dans `.design-preview/projects.test.mjs` est actualisé pour contrôler la nouvelle publication sans modifier les références visuelles. Les tests runtime continuent à vérifier les scripts historiques des prototypes, séparément du code React de production.

Vérifier l'implémentation avec `pnpm.cmd lint`, `pnpm.cmd exec tsc --noEmit`, `pnpm.cmd build`, `pnpm.cmd mcp:test` et le script HTTP/HTML `scripts/verify-systems-atlas.py` contre un serveur de production local. Les résultats finaux sont consignés dans `docs/verification/systems-atlas-v2.md`.

## Questions ouvertes

Le dernier message s'arrête après « Implémenter le design Systems Atlas V2 validé en production, ». Les quatre demandes reçues sont exécutables et autorisées. Une éventuelle suite sera intégrée à réception.
