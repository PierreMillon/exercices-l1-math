# Exercices type examen — L1 Maths

Site statique (HTML/CSS/JS vanilla, sans framework ni build), volontairement
séparé du site principal de fiches de cours + QCM
([licence-math](https://github.com/PierreMillon/licence-math),
déployé sur https://pierremillon.github.io/licence-math/). Ici : pas de
cours, pas de score, pas de mascotte — uniquement les types d'exercice qui
reviennent au partiel, dans un format sobre et dense pensé pour s'entraîner
vite et pour être imprimé.

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
3. Rien d'autre à faire : `engine.js` génère automatiquement la carte, le
   sommaire (ancre) et le bouton de révélation de solution.

## Ajouter une semaine de Python appliqué

Éditer `data/python-applique.js` et insérer un nouvel objet **en tête**
du tableau `WEEKLY_PYTHON` (le plus récent en premier) — voir le
commentaire en haut du fichier pour le format attendu.

## Suivi de régularité (sans gamification)

Chaque fois qu'un exercice est révélé (ou que toutes les solutions d'une
page sont affichées), la date est enregistrée dans `localStorage`
(clé `l1ex_seen_<pilier>_<id>`). L'accueil (`index.html`) lit ces dates
pour afficher une liste discrète « à réviser en priorité » (types jamais
faits ou non revus depuis 7 jours ou plus) — aucun score, aucune
pénalité, juste un rappel.

## Dépendances

Aucune dépendance JS externe : KaTeX est chargé depuis `vendor/katex/`,
auto-hébergé directement dans ce dépôt (voir `vendor/katex/LICENSE`, MIT)
plutôt que chargé depuis un CDN, pour ne dépendre d'aucun service externe
au runtime. Pas de police Google Fonts ici — polices système uniquement,
pour une section volontairement plus légère.
