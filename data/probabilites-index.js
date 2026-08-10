/* ============================================================
   PROBABILITES_INDEX — index léger (id + titre uniquement) pour
   l'accueil (index.html). Voir data/algebre-index.js pour
   l'explication complète. Doit rester synchronisé avec
   PROBABILITES_TYPES (data/probabilites.js) : vérifié en CI par
   scripts/check-index.js.
   ============================================================ */

const PROBABILITES_INDEX = [
  { id: 'denombrement-proba-finie', title: 'Probabilité sur un univers fini (dénombrement)' },
  { id: 'proba-conditionnelle-bayes', title: 'Probabilité conditionnelle, indépendance, Bayes' },
  { id: 'variable-aleatoire-discrete', title: 'Variable aléatoire discrète : loi, espérance, variance' },
  { id: 'lois-usuelles', title: 'Lois usuelles : Bernoulli et binomiale' },
];
