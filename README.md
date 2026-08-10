# Exercices type examen — L1 Maths

Site statique (HTML/CSS/JS vanilla, sans framework ni build), volontairement
séparé du site principal de fiches de cours + QCM
([licence-math](https://github.com/PierreMillon/licence-math),
déployé sur https://pierremillon.github.io/licence-math/). Ici : pas de
cours, pas de mascotte, pas de note calculée — uniquement les types
d'exercice qui reviennent au partiel, dans un format sobre et dense pensé
pour s'entraîner vite et pour être imprimé.

Déployé sur https://pierremillon.github.io/exercices-l1-math/.

## Portée

Priorité à l'**algèbre linéaire**, l'**analyse** (suites, séries, calcul
différentiel) et les **probabilités de base** — les trois piliers utiles
en IA, finance et calcul quantique. Une section **Python appliqué** relie
occasionnellement une notion du cours à un script court (1 à 2h max par
semaine, volontairement limité pour ne pas empiéter sur la révision).

## Format d'un type d'exercice

Chaque pilier (`algebre.html`, `analyse.html`, `probabilites.html`) charge
un fichier de données (`data/algebre.js`, etc.) contenant un tableau de
« types d'exercice ». Un type = une catégorie classique d'exercice
d'examen (« résoudre un système linéaire », « étudier une suite »…), pas
un exercice isolé :

```js
{
  id: 'identifiant-court',       // utilisé comme ancre #id et clé de progression
  title: 'Titre affiché',
  signal: 'Comment reconnaître ce type dans un énoncé.',
  methode: ['étape 1', 'étape 2', '...'],
  exemple: { enonce: '...', solution: '...' },   // toujours visible, à étudier
  exercices: [
    { enonce: '...', solution: '...' },          // solution masquée par défaut
    // ...
  ],
}
```

Le texte accepte du HTML simple (`<b>`, `<br>`, `<sup>`…) et des formules
KaTeX délimitées par `\( ... \)` (en ligne) ou `\[ ... \]` (bloc, pour un
système ou une grande formule).

## Ajouter un type d'exercice

1. Ouvrir le fichier `data/<pilier>.js` correspondant.
2. Ajouter un nouvel objet au tableau, en suivant le format ci-dessus.
3. Répercuter le `id`/`title` dans `data/<pilier>-index.js` (voir section
   suivante) — sinon `scripts/check-index.js` échoue en CI.
4. Rien d'autre à faire : `engine.js` génère automatiquement la carte, le
   sommaire (ancre), le bouton de révélation de solution et les boutons
   Réussi/Raté sous chaque exercice d'entraînement.

## Index léger par pilier (`data/<pilier>-index.js`)

L'accueil (`index.html`) n'affiche que des listes de `id`/`title` (à
réviser, moins/plus réussis) — il n'a pas besoin des énoncés et
solutions complets. Plutôt que de lui faire télécharger les trois
fichiers `data/<pilier>.js` en entier (~48 Ko à eux trois, contre ~3 Ko
pour les index), chaque pilier a un second fichier, `data/<pilier>-index.js`,
qui ne contient que `[{ id, title }, ...]` — c'est ce que charge
l'accueil, les pages piliers continuant de charger le fichier complet.

Ces deux fichiers doivent rester synchronisés à la main : après avoir
ajouté/modifié/supprimé un type dans `data/<pilier>.js`, reporter le même
changement (juste `id` et `title`) dans `data/<pilier>-index.js`.
`scripts/check-index.js` (exécuté en CI sur chaque pull request) compare
les deux et échoue en cas de désynchronisation, avec le contenu attendu
dans le message d'erreur.

## Ajouter une semaine de Python appliqué

Éditer `data/python-applique.js` et insérer un nouvel objet **en tête**
du tableau `WEEKLY_PYTHON` (le plus récent en premier) — voir le
commentaire en haut du fichier pour le format attendu.

## Suivi de régularité (sans gamification)

Chaque fois qu'un exercice est révélé (ou que toutes les solutions d'une
page sont affichées), la date est enregistrée dans `localStorage`
(clé `l1ex_seen_<pilier>_<id>`). L'accueil (`index.html`) lit ces dates
pour afficher une liste discrète « à réviser en priorité » (types jamais
faits ou non revus depuis 7 jours ou plus) — pas de pénalité, juste un
rappel basé sur la date, pas sur la performance.

## Réussite déclarée (Réussi / Raté)

Sous chaque exercice d'entraînement, une fois la solution révélée, deux
boutons **✓ Réussi** / **✗ Raté** permettent de s'auto-évaluer (le site ne
corrige rien automatiquement — c'est déclaratif). Chaque clic ajuste de
±1 un score cumulé par type d'exercice, stocké dans `localStorage`
(clé `l1ex_score_<pilier>_<id>`), affiché sous le titre du type
(« Réussite déclarée : +N »).

Les boutons eux-mêmes n'ont pas de mémoire : ils repartent à zéro
visuellement à chaque rechargement de page (on peut refaire un exercice
à une séance suivante et redéclarer un résultat) — seul le score cumulé
persiste. L'accueil (`index.html`) lit ces scores pour afficher deux
classements (« Exercices les moins réussis » / « Exercices les plus
réussis », 5 types maximum chacun), limités aux types déjà auto-évalués
au moins une fois.

## Dépendances

Aucune dépendance JS externe : KaTeX est chargé depuis `vendor/katex/`,
auto-hébergé directement dans ce dépôt (voir `vendor/katex/LICENSE`, MIT)
plutôt que chargé depuis un CDN, pour ne dépendre d'aucun service externe
au runtime. Pas de police Google Fonts ici — polices système uniquement,
pour une section volontairement plus légère.

## Fichiers

- `engine.js` — moteur commun aux 3 pages piliers (rendu des types
  d'exercice par template HTML + délégation d'événements, suivi de
  consultation et de réussite déclarée).
- `katex-typeset.js` — un seul helper `typesetMath()`, partagé entre
  `engine.js` et `python-applique.html` (évite de dupliquer la config
  KaTeX entre les deux).
- `data/<pilier>.js` — données complètes d'un pilier (chargées par sa
  page). `data/<pilier>-index.js` — même pilier, `id`/`title`
  seulement (chargé par `index.html`, voir plus haut).
- `scripts/check-index.js` — vérifie en CI que chaque
  `data/<pilier>-index.js` est synchronisé avec son `data/<pilier>.js`.
