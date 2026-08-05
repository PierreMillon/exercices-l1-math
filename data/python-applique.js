/* ============================================================
   L1 MATHS — PYTHON APPLIQUÉ — data/python-applique.js
   Une entrée = une semaine. Objectif volontairement limité à
   1-2h max : lier UNE notion du cours à UN script court, sans
   faire déborder ce créneau sur le temps de révision (priorité 1).
   Pour ajouter une semaine : insérer un nouvel objet EN TÊTE du
   tableau WEEKLY_PYTHON (le plus récent en premier).
   ============================================================ */

const WEEKLY_PYTHON = [
  {
    semaine: 'Semaine du 3 août 2026',
    notion: 'Matrices — Algèbre linéaire',
    titre: 'Résoudre un système électrique avec une matrice',
    duree: '~1h',
    description: `Lien direct avec le type « Résoudre un système linéaire »
      (pillier Algèbre linéaire) : on retrouve le même système
      \\(AX=B\\), mais résolu par ordinateur plutôt qu'à la main, avec une
      application concrète (loi des mailles en électricité). L'objectif
      n'est pas d'apprendre <code>numpy</code> en profondeur, juste de voir
      la matrice « prendre vie » dans un cas réel.`,
    code: `import numpy as np

# Circuit à 3 mailles : le système d'équations (loi des mailles,
# loi de Kirchhoff) se met sous forme matricielle A @ I = B, où I
# est le vecteur des 3 courants inconnus (en ampères).
A = np.array([
    [10, -2, 0],
    [-2, 15, -3],
    [0, -3, 8],
])
B = np.array([5, 0, 2])

# Résolution directe (équivalent numérique du pivot de Gauss fait
# à la main dans la fiche "Résoudre un système linéaire").
I = np.linalg.solve(A, B)
print("Courants (A) :", I)

# Vérification : A @ I doit redonner B.
print("Vérification A @ I :", A @ I)

# Pour comparer à la main : det(A) donne aussi l'information
# "le système a une solution unique" vue dans la fiche méthode.
print("det(A) =", np.linalg.det(A))`,
  },
];
