# Systems Atlas V2 — ajustements UX des parcours et de l'atlas

Date : 17 octobre 2026. Périmètre explicitement autorisé par le propriétaire :
harmonisation des trois Heroes, sélection des parcours et affordance mobile.

## Changements ciblés de cette étape

- `src/app/globals.css` : zones communes du Hero, alignement en haut, hauteur
  minimale de titre/description, taille responsive commune permettant aux mots
  longs de tenir sur mobile ; aucune règle propre à AI & Data. États sélectionnés,
  gris des éléments hors parcours, cartes mobiles et focus/toucher. Thèmes,
  mouvement réduit et couleurs forcées restent pris en charge.
- `src/components/systems-atlas.tsx` : contrôles de sélection à la place des liens
  de parcours, retour « All projects », instruction et données d'appartenance
  transmises aux cartes. Les neuf projets et douze connexions restent présents.
- `src/components/atlas-interaction.tsx` : état React partagé entre desktop/mobile,
  boutons natifs avec `aria-pressed`, liens actifs sur toute la carte ; éléments
  désactivés sans `href` ni arrêt de tabulation, avec `aria-disabled`. Les flèches
  ne sont rendues que pour les cartes actives.
- `scripts/atlas.test.mjs` : rendu des vrais composants React pour les quatre
  sélections et les projets croisés ; vérification des attributs et liens des deux
  layouts, de la visibilité du réseau et des contrôles natifs.
- `scripts/verify-systems-atlas.py` : contrôles HTTP/HTML des états initiaux, des
  cartes désactivées et des pages publiques toujours disponibles.
- `scripts/fixtures/atlas-tokens.json` et
  `scripts/fixtures/projects-before-publication.json` : références de vérification
  commitées pour que le script ne dépende plus des prototypes ignorés par Git.
  Elles ne sont pas utilisées par le runtime ; les appartenances de l'interface
  continuent à provenir uniquement de `src/data/projects.ts`.
- `docs/specs/007-systems-atlas-v2.md` et `docs/architecture.md` : critères UX et
  fonctionnement actualisés selon la demande explicite.

Le composant `Hero` commun est réutilisé ; les titres et leurs retours naturels
ne sont pas remplacés par des coupures manuelles. Les minimums de hauteur ne
tronquent pas le texte et peuvent grandir avec son contenu.

## Vérifications exécutées

| Commande | Résultat |
| --- | --- |
| `pnpm.cmd lint` | Succès, aucun avertissement ni erreur. |
| `pnpm.cmd exec tsc --noEmit` | Succès. |
| `pnpm.cmd build` | Succès, y compris avec le contenu de `next.config.ts` actuellement versionné. La modification locale de ce fichier a été restaurée à l'identique. |
| `node --test scripts/appearance.test.mjs scripts/atlas.test.mjs` | 14 tests réussis : 9 de thème, 5 de rendu React de l'atlas. |
| `pnpm.cmd mcp:test` | 9 tests réussis, dont contrats publics, publication et transport stdio. |
| `python scripts/verify-systems-atlas.py http://127.0.0.1:3102` | 1032 contrôles réussis sur le build final. |
| `git diff --check` | Succès avant préparation du commit. |

Les rendus React vérifient les états global, AI, Software et Digital : neuf
nœuds desktop, douze associations mobiles, douze connexions, éligibilité réelle
de chaque carte et présence de flèches uniquement sur les cartes actives.
PicoxIA, Faraway et Réactis sont actifs dans chacun de leurs parcours réels.

Les contrôles HTTP confirment les quatre sélections initiales, l'absence d'URL
sur les cartes inactives et HTTP 200 pour les neuf pages projet. Les quatre
identifiants inconnus/exclus testés restent HTTP 404. Les tokens et contrastes
texte clair/sombre sont inchangés et vérifiés.

## Limites de vérification

L'inventaire UI ne contient aucun navigateur et l'ouverture du navigateur intégré
a retourné `Browser is not available: iab`. Aucune capture ni inspection visuelle
n'est revendiquée.

Les tests rendent réellement les composants React côté serveur, avec leurs
différents états initiaux. Ils ne simulent pas de clic ou de pression de touche
dans un navigateur et ne prétendent pas valider le cycle de mise à jour client.
Entrée/Espace utilisent le comportement natif des boutons ; le rendu vérifie
leurs attributs et ceux des liens désactivés. La revue CSS confirme focus, toucher
et suppression des transitions sous reduced motion, sans mesure visuelle réelle.

Restent à confirmer en navigateur : sélection successive et retour global,
transition du focus, lecteurs d'écran, alignement des trois pages aux largeurs
cibles, toucher mobile, rendu clair/sombre, zoom 200 % et mouvement réduit.

## Périmètre du commit

Le portage Systems Atlas V2 de l'étape précédente était encore entièrement non
commité. Le commit inclut donc son socle nécessaire : composants partagés,
polices et licences, neuf pages projet, publication approuvée, scripts/tests et
documentation, en plus des ajustements UX ci-dessus. Ces autres sections n'ont
pas été modifiées à nouveau pendant cette étape.

La modification locale préexistante de `next.config.ts` est conservée hors
commit. Aucun fichier de `.design-preview/` n'est modifié ou ajouté à ce commit.
Aucune dépendance, aucun push et aucun déploiement.
