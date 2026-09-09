/* ============================================================
   ANALYSE_INDEX — index léger (id + titre uniquement) pour l'accueil
   (index.html). Voir data/algebre-index.js pour l'explication complète.
   Doit rester synchronisé avec ANALYSE_TYPES (data/analyse.js) :
   vérifié en CI par scripts/check-index.js.
   ============================================================ */

const ANALYSE_INDEX = [
  { id: 'etude-suites', title: 'Étudier une suite (monotonie, bornes, convergence)' },
  { id: 'suites-recurrentes', title: 'Suites récurrentes (u_{n+1}=f(u_n))' },
  { id: 'series-numeriques', title: 'Nature d\'une série numérique' },
  { id: 'derivation-etude-fonction', title: 'Dérivation et étude de fonction' },
  { id: 'developpements-limites', title: 'Développements limités' },
  { id: 'inegalites-monotones', title: 'Modifier une inégalité / composer avec une fonction monotone' },
  { id: 'densite-partie-entiere', title: 'Densité de Q (et des irrationnels) dans R via la partie entière' },
];
