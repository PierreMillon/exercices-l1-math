/* ============================================================
   ALGEBRE_INDEX — index léger (id + titre uniquement) pour l'accueil
   (index.html). Évite de télécharger tout data/algebre.js (énoncés,
   méthodes, solutions — inutiles pour les listes de suivi de
   l'accueil) juste pour lire id/title de chaque type.

   Doit rester synchronisé avec ALGEBRE_TYPES (data/algebre.js) :
   vérifié en CI par scripts/check-index.js, qui échoue si ce fichier
   diverge (id/title différents, type manquant ou en trop).
   ============================================================ */

const ALGEBRE_INDEX = [
  { id: 'systemes-lineaires', title: 'Résoudre un système linéaire' },
  { id: 'sous-espace-vectoriel', title: 'Montrer qu\'un ensemble est un sous-espace vectoriel' },
  { id: 'famille-base-dimension', title: 'Famille libre/liée, base et dimension' },
  { id: 'calcul-matriciel', title: 'Calcul matriciel : produit, déterminant, inverse' },
  { id: 'application-lineaire-rang', title: 'Application linéaire : noyau, image, théorème du rang' },
];
