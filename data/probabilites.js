/* ============================================================
   L1 MATHS — EXERCICES TYPE EXAMEN — data/probabilites.js
   4 types d'exercice : probabilité sur univers fini, probabilité
   conditionnelle/indépendance/Bayes, variable aléatoire discrète,
   lois usuelles. Voir engine.js pour le format attendu.
   Exemples adaptés des TD 5, 6 et 7 de Probabilités et statistiques
   L1 S2 (UC Jean-François Champollion, source Drive).
   ============================================================ */

const PROBABILITES_TYPES = [
  {
    id: 'denombrement-proba-finie',
    title: 'Probabilité sur un univers fini (dénombrement)',
    signal: `Univers fini avec équiprobabilité (dés, boules, cartes...) :
      \\(P(A)=\\dfrac{\\mathrm{card}(A)}{\\mathrm{card}(\\Omega)}\\), le nombre
      de cas favorables sur le nombre de cas possibles.`,
    methode: [
      `Bien définir l'univers \\(\\Omega\\) et vérifier l'hypothèse
       d'équiprobabilité (chaque issue a la même chance).`,
      `Compter \\(\\mathrm{card}(\\Omega)\\) : produit cartésien pour des choix
       successifs indépendants, arrangements si l'ordre compte sans
       répétition, combinaisons \\(\\binom{n}{k}\\) si l'ordre ne compte pas.`,
      `Décrire précisément l'événement \\(A\\), puis compter
       \\(\\mathrm{card}(A)\\) avec les mêmes outils.`,
      `\\(P(A)=\\dfrac{\\mathrm{card}(A)}{\\mathrm{card}(\\Omega)}\\).`,
      `Pour des événements combinés : \\(P(A\\cup B)=P(A)+P(B)-P(A\\cap B)\\),
       et \\(P(\\overline A)=1-P(A)\\) — souvent plus rapide de passer par le
       complémentaire.`,
    ],
    exemple: {
      enonce: `Parmi 80 femmes : 36 sont salariées, 39 sont mères de famille,
        15 sont salariées ET mères de famille. On choisit une femme au
        hasard. Quelle est la probabilité qu'elle ne soit <i>ni</i>
        salariée <i>ni</i> mère de famille ?`,
      solution: `Notons \\(A\\) « salariée », \\(B\\) « mère de famille ».
        \\(P(A)=\\dfrac{36}{80}\\), \\(P(B)=\\dfrac{39}{80}\\),
        \\(P(A\\cap B)=\\dfrac{15}{80}\\).<br>
        \\(P(A\\cup B)=P(A)+P(B)-P(A\\cap B)=\\dfrac{36+39-15}{80}=\\dfrac{60}{80}=\\dfrac34\\).<br>
        L'événement « ni \\(A\\) ni \\(B\\) » est le complémentaire de
        \\(A\\cup B\\), donc \\(P(\\text{ni }A\\text{ ni }B)=1-\\dfrac34=\\dfrac14\\).`,
    },
    exercices: [
      {
        enonce: `Un sac contient 5 billes rouges et 7 billes noires (12 au
          total). On tire simultanément 2 billes. Calculer la probabilité
          d'obtenir deux billes rouges.`,
        solution: `\\(\\Omega\\) = tirages de 2 billes parmi 12, sans ordre :
          \\(\\mathrm{card}(\\Omega)=\\binom{12}{2}=66\\).<br>
          \\(A\\) = « 2 billes rouges » : \\(\\mathrm{card}(A)=\\binom{5}{2}=10\\).<br>
          \\(P(A)=\\dfrac{10}{66}=\\dfrac{5}{33}\\).`,
      },
      {
        enonce: `On tire une carte dans un jeu de 32 cartes. Calculer la
          probabilité de tirer un roi ou un cœur.`,
        solution: `\\(\\Omega\\) : 32 cartes équiprobables. \\(A\\)=« roi » (4
          rois), \\(B\\)=« cœur » (8 cœurs), \\(A\\cap B\\)=« roi de cœur »
          (1 carte).<br>
          \\(P(A\\cup B)=P(A)+P(B)-P(A\\cap B)=\\dfrac{4}{32}+\\dfrac{8}{32}-\\dfrac{1}{32}=\\dfrac{11}{32}\\).`,
      },
    ],
  },

  {
    id: 'proba-conditionnelle-bayes',
    title: 'Probabilité conditionnelle, indépendance, Bayes',
    signal: `L'énoncé donne une information partielle (« sachant que… ») ou
      une situation en plusieurs étapes (arbre de probabilité), et demande
      une probabilité conditionnelle, la probabilité d'une cause, ou de
      vérifier une indépendance.`,
    methode: [
      `Définition : \\(P(A|B)=\\dfrac{P(A\\cap B)}{P(B)}\\) (\\(P(B)\\ne0\\)).
       Reformulation utile : \\(P(A\\cap B)=P(B)\\times P(A|B)\\).`,
      `Formule des probabilités totales : si \\((B_1,\\dots,B_n)\\) partitionne
       l'univers, alors \\(P(A)=\\sum_i P(B_i)\\times P(A|B_i)\\). Un arbre de
       probabilité représente exactement cette décomposition.`,
      `Formule de Bayes (pour « retourner » un conditionnement) :
       \\(P(B_i|A)=\\dfrac{P(B_i)\\times P(A|B_i)}{P(A)}\\), le dénominateur
       se calculant avec la formule des probabilités totales.`,
      `Indépendance : \\(A\\) et \\(B\\) sont indépendants \\(\\iff
       P(A\\cap B)=P(A)\\times P(B) \\iff P(A|B)=P(A)\\). Ne jamais confondre
       « indépendants » et « incompatibles » : deux événements incompatibles
       de probabilité non nulle ne sont <i>jamais</i> indépendants.`,
      `Rédaction attendue : nommer explicitement les événements, écrire la
       formule utilisée AVANT l'application numérique.`,
    ],
    exemple: {
      enonce: `Un lac contient 40% de brochets, 25% de truites, 35% de
        sandres. 50% des brochets sont de taille réglementaire, ainsi que
        60% des truites et 45% des sandres. On pêche un poisson au hasard.
        Calculer la probabilité qu'il soit de taille réglementaire
        (événement \\(R\\)). Sachant qu'il est de taille réglementaire,
        quelle est la probabilité que ce soit un brochet ?`,
      solution: `Notons \\(B,T,S\\) « brochet », « truite », « sandre »
        (ils partitionnent l'univers) : \\(P(B)=0{,}40\\), \\(P(T)=0{,}25\\),
        \\(P(S)=0{,}35\\), \\(P(R|B)=0{,}50\\), \\(P(R|T)=0{,}60\\),
        \\(P(R|S)=0{,}45\\).<br>
        Probabilités totales :
        \\(P(R)=P(B)P(R|B)+P(T)P(R|T)+P(S)P(R|S)
        =0{,}40\\times0{,}50+0{,}25\\times0{,}60+0{,}35\\times0{,}45\\)
        \\(=0{,}20+0{,}15+0{,}1575=0{,}5075\\).<br>
        Bayes : \\(P(B|R)=\\dfrac{P(B)\\times P(R|B)}{P(R)}
        =\\dfrac{0{,}20}{0{,}5075}\\approx0{,}394\\).`,
    },
    exercices: [
      {
        enonce: `On lance deux dés équilibrés. Soit \\(A\\) « le premier dé
          est pair » et \\(B\\) « le second dé est pair ». Montrer que
          \\(A\\) et \\(B\\) sont indépendants.`,
        solution: `\\(P(A)=\\dfrac12\\), \\(P(B)=\\dfrac12\\) (3 faces paires
          sur 6, pour chaque dé).<br>
          \\(P(A\\cap B)\\) = probabilité que les deux dés soient pairs :
          \\(\\dfrac{3\\times3}{36}=\\dfrac{9}{36}=\\dfrac14\\).<br>
          Or \\(P(A)\\times P(B)=\\dfrac12\\times\\dfrac12=\\dfrac14=P(A\\cap B)\\) :
          \\(A\\) et \\(B\\) sont indépendants.`,
      },
      {
        enonce: `Une urne contient 3 boules blanches et 2 boules noires. On
          tire successivement deux boules sans remise. Sachant que la
          première boule tirée est blanche, quelle est la probabilité que
          la seconde soit noire ?`,
        solution: `C'est une lecture directe de « sachant que » : après un
          premier tirage blanc, il reste 4 boules dans l'urne (2 blanches,
          2 noires).<br>
          \\(P(\\text{2e noire}\\ |\\ \\text{1re blanche})=\\dfrac{2}{4}=\\dfrac12\\).`,
      },
    ],
  },

  {
    id: 'variable-aleatoire-discrete',
    title: 'Variable aléatoire discrète : loi, espérance, variance',
    signal: `L'énoncé définit une variable aléatoire \\(X\\) (un gain, un
      nombre de succès…) et demande sa loi de probabilité, son espérance
      \\(E(X)\\), sa variance \\(V(X)\\), ou son écart-type.`,
    methode: [
      `Identifier l'ensemble des valeurs possibles \\(X(\\Omega)=\\{x_1,\\dots,x_k\\}\\).`,
      `Pour chaque valeur \\(x_i\\), calculer \\(P(X=x_i)\\) en revenant à
       l'univers \\(\\Omega\\) sous-jacent (dénombrement ou probabilités
       conditionnelles) — présenter le résultat sous forme de tableau.`,
      `Vérifier que \\(\\sum_i P(X=x_i)=1\\) (garde-fou pour repérer une
       erreur de calcul).`,
      `Espérance : \\(E(X)=\\sum_i x_i\\,P(X=x_i)\\).`,
      `Variance (formule de König-Huygens, la plus rapide en pratique) :
       \\(V(X)=E(X^2)-E(X)^2\\) où \\(E(X^2)=\\sum_i x_i^2\\,P(X=x_i)\\).
       Écart-type \\(\\sigma(X)=\\sqrt{V(X)}\\).`,
    ],
    exemple: {
      enonce: `Un jeu coûte 10€ à jouer. On gagne 20€ si bonne réponse en
        sport (probabilité \\(3/8\\)), 10€ si bonne réponse en musique
        (probabilité \\(1/8\\)), et 0€ sinon. Soit \\(X\\) le gain net
        (gain reçu moins la mise de 10€). Donner la loi de \\(X\\), calculer
        \\(E(X)\\) et l'interpréter.`,
      solution: `\\(X(\\Omega)=\\{20-10,\\ 10-10,\\ 0-10\\}=\\{10,\\ 0,\\ -10\\}\\).<br>
        \\(P(X=10)=3/8\\), \\(P(X=0)=1/8\\), \\(P(X=-10)=1-3/8-1/8=1/2\\).<br>
        Vérification : \\(3/8+1/8+4/8=8/8=1\\) ✓.<br>
        \\(E(X)=10\\times\\dfrac38+0\\times\\dfrac18+(-10)\\times\\dfrac12
        =\\dfrac{30}{8}-5=3{,}75-5=-1{,}25\\).<br>
        Interprétation : en moyenne, sur un grand nombre de parties, le
        joueur perd 1,25€ par partie — le jeu lui est défavorable.`,
    },
    exercices: [
      {
        enonce: `On lance deux dés équilibrés et \\(X\\) est la somme des
          points obtenus (\\(X\\) varie de 2 à 12). Calculer \\(P(X=7)\\) et
          \\(P(X=12)\\).`,
        solution: `\\(\\mathrm{card}(\\Omega)=36\\) (couples équiprobables).<br>
          \\(X=7\\) : couples \\((1,6),(2,5),(3,4),(4,3),(5,2),(6,1)\\), soit
          6 cas : \\(P(X=7)=\\dfrac{6}{36}=\\dfrac16\\).<br>
          \\(X=12\\) : un seul couple \\((6,6)\\) : \\(P(X=12)=\\dfrac{1}{36}\\).`,
      },
      {
        enonce: `On reprend \\(X\\) = somme de deux dés, avec
          \\(P(X=7)=\\dfrac16\\). Un jeu propose de gagner 5€ si \\(X=7\\), et
          de perdre 1€ sinon. Soit \\(G\\) le gain. Donner la loi de \\(G\\)
          et calculer \\(E(G)\\). Le jeu est-il équitable ?`,
        solution: `\\(G(\\Omega)=\\{5,-1\\}\\). \\(P(G=5)=P(X=7)=\\dfrac16\\),
          \\(P(G=-1)=1-\\dfrac16=\\dfrac56\\).<br>
          \\(E(G)=5\\times\\dfrac16+(-1)\\times\\dfrac56=\\dfrac56-\\dfrac56=0\\).<br>
          \\(E(G)=0\\) : le jeu est équitable.`,
      },
    ],
  },

  {
    id: 'lois-usuelles',
    title: 'Lois usuelles : Bernoulli et binomiale',
    signal: `L'énoncé décrit une expérience répétée (pile/face, succès/échec)
      ou un tirage particulier — reconnaître la loi usuelle en jeu évite de
      tout recalculer à la main.`,
    methode: [
      `Loi de Bernoulli \\(\\mathcal B(p)\\) : une seule expérience à deux
       issues (succès/échec), \\(X=1\\) si succès (probabilité \\(p\\)),
       \\(X=0\\) sinon. \\(E(X)=p\\), \\(V(X)=p(1-p)\\).`,
      `Loi binomiale \\(\\mathcal B(n,p)\\) : \\(n\\) répétitions
       <b>indépendantes</b> d'une même expérience de Bernoulli \\(\\mathcal
       B(p)\\), \\(X\\) compte le nombre de succès.
       \\(P(X=k)=\\binom{n}{k}p^k(1-p)^{n-k}\\). \\(E(X)=np\\),
       \\(V(X)=np(1-p)\\).`,
      `Signal pour reconnaître une binomiale : « \\(n\\) fois », « avec
       remise » (tirages indépendants), « toujours la même probabilité
       \\(p\\) », « on compte le nombre de… » — les 4 conditions (\\(n\\)
       fixé, 2 issues, \\(p\\) constant, indépendance) doivent toutes être
       vérifiées.`,
      `<b>Piège classique</b> : un tirage <b>sans</b> remise (urne qui se
       vide) ne donne <b>pas</b> une binomiale, car les tirages ne sont
       plus indépendants (la probabilité change à chaque tirage) — il
       suffit de savoir repérer et justifier que la binomiale ne s'applique
       pas.`,
      `Toujours vérifier les 4 conditions avant d'écrire « \\(X\\) suit
       \\(\\mathcal B(n,p)\\) » — c'est ce qu'un correcteur contrôle en
       premier.`,
    ],
    exemple: {
      enonce: `On lance 5 fois une pièce équilibrée. Soit \\(X\\) le nombre
        de « pile » obtenus. Justifier que \\(X\\) suit une loi binomiale,
        préciser ses paramètres, puis calculer \\(P(X=3)\\), \\(E(X)\\) et
        \\(V(X)\\).`,
      solution: `Les 5 lancers sont indépendants, chacun a 2 issues avec une
        probabilité constante \\(p=1/2\\) de « pile », et \\(n=5\\) est fixé :
        \\(X\\) suit la loi binomiale \\(\\mathcal B(5,\\,1/2)\\).<br>
        \\(P(X=3)=\\binom53\\left(\\dfrac12\\right)^3\\left(\\dfrac12\\right)^2
        =10\\times\\dfrac{1}{8}\\times\\dfrac14=\\dfrac{10}{32}=\\dfrac{5}{16}\\).<br>
        \\(E(X)=np=5\\times\\dfrac12=2{,}5\\). \\(V(X)=np(1-p)=5\\times\\dfrac12\\times\\dfrac12=1{,}25\\).`,
    },
    exercices: [
      {
        enonce: `Une urne contient 30% de boules rouges. On tire une boule,
          on la remet, et on répète 8 fois cette opération. Soit \\(Y\\) le
          nombre de boules rouges obtenues. Justifier la loi de \\(Y\\) et
          calculer \\(P(Y=2)\\).`,
        solution: `Tirages avec remise : indépendants, \\(p=0{,}3\\) constant,
          \\(n=8\\) fixé, 2 issues (rouge / pas rouge) : \\(Y \\sim \\mathcal
          B(8,\\,0{,}3)\\).<br>
          \\(P(Y=2)=\\binom82(0{,}3)^2(0{,}7)^6
          =28\\times0{,}09\\times0{,}117649\\approx0{,}297\\).`,
      },
      {
        enonce: `Une urne contient 10 boules dont 3 rouges. On tire 3 boules
          sans remise. Peut-on dire que le nombre \\(Z\\) de boules rouges
          obtenues suit une loi binomiale ? Justifier.`,
        solution: `Non. Les tirages sont sans remise, donc la composition de
          l'urne (et donc la probabilité de tirer une boule rouge) change à
          chaque tirage — les tirages ne sont pas indépendants.<br>
          La condition « \\(p\\) constant + indépendance » de la loi
          binomiale n'est pas vérifiée : \\(Z\\) ne suit pas \\(\\mathcal
          B(n,p)\\) (elle suit en réalité une loi hypergéométrique, souvent
          hors-programme en L1 — il suffit de savoir justifier pourquoi la
          binomiale ne s'applique pas).`,
      },
    ],
  },
];
