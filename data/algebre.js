/* ============================================================
   L1 MATHS — EXERCICES TYPE EXAMEN — data/algebre.js
   5 types d'exercice couvrant systèmes linéaires, sous-espaces
   vectoriels, familles/bases/dimension, calcul matriciel et
   applications linéaires. Voir engine.js pour le format attendu.
   L'exemple « Systèmes linéaires » est adapté directement d'un
   TD de Calculus L1 (Séance 8, INU Champollion, source Drive).
   ============================================================ */

const ALGEBRE_TYPES = [
  {
    id: 'systemes-lineaires',
    title: 'Résoudre un système linéaire',
    signal: `L'énoncé demande de résoudre un système d'équations linéaires, de le
      discuter selon un paramètre, ou dit implicitement qu'il faut résoudre
      \\(AX=B\\).`,
    methode: [
      `Écrire le système sous forme d'égalités numérotées \\(L_1, L_2, L_3, \\dots\\)`,
      `Éliminer une inconnue à la fois par combinaisons de lignes
       (\\(L_i \\leftarrow L_i - \\lambda L_j\\)), en gardant une trace des
       opérations effectuées à côté du système.`,
      `Réduire jusqu'à une forme triangulaire (échelonnée).`,
      `Remonter par substitution pour exprimer chaque inconnue.`,
      `Conclure explicitement : solution unique, infinité de solutions
       paramétrées, ou aucune solution (une ligne du type \\(0 = c\\) avec
       \\(c \\ne 0\\) apparaît).`,
    ],
    exemple: {
      enonce: `Résoudre le système <br>
        \\[\\begin{cases} x+y+2z=3 \\\\ x+2y+z=1 \\\\ 2x+y+z=0 \\end{cases}\\]`,
      solution: `On élimine \\(x\\) des lignes 2 et 3 :
        \\(L_2 \\leftarrow L_2-L_1\\) donne \\(y-z=-2\\) ;
        \\(L_3 \\leftarrow L_3-2L_1\\) donne \\(-y-3z=-6\\).<br>
        On additionne ces deux nouvelles lignes : \\(-4z=-8\\), soit \\(z=2\\).<br>
        En remontant : \\(y=z-2=0\\), puis \\(x=3-y-2z=3-0-4=-1\\).<br>
        Le système admet une solution unique : \\((x,y,z)=(-1,0,2)\\).
        Vérification rapide dans les 3 équations : \\(-1+0+4=3\\) ✓,
        \\(-1+0+2=1\\) ✓, \\(-2+0+2=0\\) ✓.`,
    },
    exercices: [
      {
        enonce: `Résoudre le système
          \\[\\begin{cases} x+2z=1 \\\\ -y+z=2 \\\\ x-2y=1 \\end{cases}\\]`,
        solution: `De \\(L_1\\) : \\(x=1-2z\\). De \\(L_2\\) : \\(y=z-2\\).
          On reporte dans \\(L_3\\) : \\((1-2z)-2(z-2)=1\\), soit \\(1-2z-2z+4=1\\),
          donc \\(-4z=-4\\), soit \\(z=1\\).<br>
          On en déduit \\(x=1-2=-1\\) et \\(y=1-2=-1\\).<br>
          Solution unique : \\((x,y,z)=(-1,-1,1)\\).`,
      },
      {
        enonce: `\\(m\\) est un nombre réel. Discuter, selon la valeur de \\(m\\),
          les solutions du système
          \\[\\begin{cases} 2x+3y=1 \\\\ 6x+9y=m \\end{cases}\\]`,
        solution: `On remarque que \\(L_2\\) est \\(3 \\times L_1\\) à gauche du signe égal :
          \\(L_2 \\leftarrow L_2-3L_1\\) donne \\(0 = m-3\\).<br>
          <b>Si \\(m \\ne 3\\)</b> : la ligne \\(0=m-3\\ne 0\\) est impossible, le
          système n'a aucune solution.<br>
          <b>Si \\(m = 3\\)</b> : cette ligne est toujours vraie, il ne reste que
          \\(2x+3y=1\\), soit \\(y=\\dfrac{1-2x}{3}\\) : une infinité de solutions,
          paramétrées par \\(x \\in \\mathbb{R}\\).`,
      },
    ],
  },

  {
    id: 'sous-espace-vectoriel',
    title: 'Montrer qu\'un ensemble est un sous-espace vectoriel',
    signal: `L'énoncé demande de montrer qu'un ensemble \\(F\\) est un sous-espace
      vectoriel (sev) d'un espace vectoriel \\(E\\).`,
    methode: [
      `Vérifier que \\(0_E \\in F\\) (le vecteur nul appartient à \\(F\\)) — sinon
       \\(F\\) n'est pas un sev, inutile d'aller plus loin.`,
      `Prendre deux vecteurs <b>génériques</b> \\(u, v \\in F\\) (pas des exemples
       numériques) et deux scalaires \\(\\lambda, \\mu \\in \\mathbb{R}\\).`,
      `Montrer que \\(\\lambda u + \\mu v \\in F\\), en utilisant uniquement la
       définition qui caractérise les éléments de \\(F\\).`,
      `Conclure : \\(F\\) contient \\(0_E\\) et est stable par combinaison
       linéaire, donc \\(F\\) est un sous-espace vectoriel de \\(E\\).`,
      `<b>Piège classique</b> : si \\(F\\) est défini par une inégalité, une
       équation non homogène (\\(=c \\ne 0\\)), ou une condition non linéaire
       (un carré, un produit...), ce n'est presque jamais un sev — cherchez
       plutôt un contre-exemple explicite.`,
    ],
    exemple: {
      enonce: `Dans \\(E=\\mathbb{R}^3\\), soit \\(F=\\{(x,y,z)\\in\\mathbb{R}^3 : x+2y-z=0\\}\\).
        Montrer que \\(F\\) est un sous-espace vectoriel de \\(\\mathbb{R}^3\\).`,
      solution: `\\(0=(0,0,0)\\) vérifie \\(0+2\\times0-0=0\\), donc \\(0 \\in F\\).<br>
        Soient \\(u=(x_1,y_1,z_1)\\), \\(v=(x_2,y_2,z_2) \\in F\\) et
        \\(\\lambda,\\mu\\in\\mathbb{R}\\). Alors
        \\(\\lambda u+\\mu v=(\\lambda x_1+\\mu x_2,\\ \\lambda y_1+\\mu y_2,\\ \\lambda z_1+\\mu z_2)\\).<br>
        On calcule : \\((\\lambda x_1+\\mu x_2)+2(\\lambda y_1+\\mu y_2)-(\\lambda z_1+\\mu z_2)
        = \\lambda(x_1+2y_1-z_1)+\\mu(x_2+2y_2-z_2) = \\lambda\\times 0+\\mu\\times 0=0\\)
        (car \\(u,v\\in F\\)). Donc \\(\\lambda u+\\mu v \\in F\\).<br>
        \\(F\\) contient \\(0\\) et est stable par combinaison linéaire : c'est un
        sous-espace vectoriel de \\(\\mathbb{R}^3\\).`,
    },
    exercices: [
      {
        enonce: `Montrer que \\(F=\\{(x,y,z)\\in\\mathbb{R}^3 : x-y+3z=0\\}\\) est un
          sous-espace vectoriel de \\(\\mathbb{R}^3\\).`,
        solution: `\\(0\\) vérifie \\(0-0+0=0\\) donc \\(0\\in F\\).<br>
          Soient \\(u=(x_1,y_1,z_1),v=(x_2,y_2,z_2)\\in F\\) et
          \\(\\lambda,\\mu\\in\\mathbb{R}\\). On calcule pour
          \\(\\lambda u+\\mu v\\) :
          \\((\\lambda x_1+\\mu x_2)-(\\lambda y_1+\\mu y_2)+3(\\lambda z_1+\\mu z_2)
          =\\lambda(x_1-y_1+3z_1)+\\mu(x_2-y_2+3z_2)=\\lambda\\times0+\\mu\\times0=0\\).<br>
          Donc \\(\\lambda u+\\mu v\\in F\\) : \\(F\\) est un sous-espace vectoriel
          de \\(\\mathbb{R}^3\\).`,
      },
      {
        enonce: `\\(F=\\{(x,y)\\in\\mathbb{R}^2 : x^2=y\\}\\) est-il un sous-espace
          vectoriel de \\(\\mathbb{R}^2\\) ? Justifier.`,
        solution: `Non. Le vecteur \\(u=(1,1)\\) est dans \\(F\\) car \\(1^2=1\\).
          Mais \\(2u=(2,2)\\) : a-t-on \\(2^2=2\\) ? Non, \\(4 \\ne 2\\), donc
          \\(2u \\notin F\\).<br>
          \\(F\\) n'est pas stable par multiplication par un scalaire, donc
          \\(F\\) n'est pas un sous-espace vectoriel (la condition \\(x^2=y\\)
          n'est pas linéaire — c'est une parabole, pas une droite ni un plan
          passant par l'origine).`,
      },
    ],
  },

  {
    id: 'famille-base-dimension',
    title: 'Famille libre/liée, base et dimension',
    signal: `L'énoncé demande si une famille de vecteurs est libre ou liée, si
      elle engendre un espace, ou de déterminer une base et une dimension.`,
    methode: [
      `Pour montrer qu'une famille \\((v_1,\\dots,v_p)\\) est <b>libre</b> :
       poser \\(\\lambda_1 v_1+\\dots+\\lambda_p v_p=0\\) et montrer que la
       <i>seule</i> solution est \\(\\lambda_1=\\dots=\\lambda_p=0\\) (résoudre
       le système obtenu coordonnée par coordonnée).`,
      `Si une combinaison non triviale (pas tous nuls) donne \\(0\\), la
       famille est <b>liée</b> — donner explicitement la relation trouvée.`,
      `Pour montrer qu'une famille est <b>génératrice</b> d'un espace \\(E\\) :
       montrer que tout vecteur de \\(E\\) s'écrit comme combinaison linéaire
       des \\(v_i\\) (souvent via un système à résoudre en les
       \\(\\lambda_i\\), avec un second membre quelconque).`,
      `Une famille est une <b>base</b> de \\(E\\) si elle est libre ET
       génératrice. Sa taille donne alors la dimension de \\(E\\) (ou du
       sous-espace engendré).`,
      `<b>Raccourci utile</b> : si \\(\\dim E=n\\) est connue et que la famille
       a exactement \\(n\\) vecteurs, il suffit de montrer <i>libre</i> (ou
       <i>génératrice</i>) seul — l'autre propriété suit automatiquement.`,
    ],
    exemple: {
      enonce: `Dans \\(\\mathbb{R}^3\\), la famille \\((v_1,v_2,v_3)\\) avec
        \\(v_1=(1,1,0)\\), \\(v_2=(0,1,1)\\), \\(v_3=(1,0,1)\\) est-elle une base
        de \\(\\mathbb{R}^3\\) ?`,
      solution: `\\(\\dim\\mathbb{R}^3=3\\) et la famille a 3 vecteurs : par le
        raccourci, il suffit de montrer qu'elle est libre.<br>
        \\(\\lambda_1 v_1+\\lambda_2 v_2+\\lambda_3 v_3=0\\) donne le système
        \\[\\begin{cases}\\lambda_1+\\lambda_3=0\\\\ \\lambda_1+\\lambda_2=0\\\\ \\lambda_2+\\lambda_3=0\\end{cases}\\]
        De la 2<sup>e</sup> équation : \\(\\lambda_2=-\\lambda_1\\). De la
        3<sup>e</sup> : \\(\\lambda_3=-\\lambda_2=\\lambda_1\\). En reportant
        dans la 1<sup>re</sup> : \\(\\lambda_1+\\lambda_1=0\\), donc
        \\(\\lambda_1=0\\), puis \\(\\lambda_2=0\\), \\(\\lambda_3=0\\).<br>
        Seule solution triviale : la famille est libre, donc c'est une base
        de \\(\\mathbb{R}^3\\).`,
    },
    exercices: [
      {
        enonce: `La famille \\(((1,2),(2,4))\\) est-elle libre dans \\(\\mathbb{R}^2\\) ?`,
        solution: `Non : \\(v_2=2v_1\\), donc \\(2v_1-1\\cdot v_2=(0,0)\\) est une
          combinaison <i>non triviale</i> (\\(\\lambda_1=2,\\lambda_2=-1\\), pas
          tous nuls) qui donne le vecteur nul. La famille est liée.`,
      },
      {
        enonce: `Dans l'espace \\(\\mathbb{R}_2[X]\\) des polynômes de degré
          \\(\\le 2\\) (de dimension 3), la famille \\((1,X,X^2)\\) est-elle une
          base ?`,
        solution: `\\(\\dim \\mathbb{R}_2[X]=3\\) et la famille a 3 vecteurs :
          il suffit de montrer qu'elle est libre.<br>
          Soit \\(a+bX+cX^2=0\\) (le polynôme nul). Par identification des
          coefficients d'un polynôme nul, \\(a=b=c=0\\).<br>
          Seule solution triviale : la famille est libre, donc c'est une base
          de \\(\\mathbb{R}_2[X]\\) (c'est la « base canonique »).`,
      },
    ],
  },

  {
    id: 'calcul-matriciel',
    title: 'Calcul matriciel : produit, déterminant, inverse',
    signal: `L'énoncé demande de calculer un produit de matrices, un
      déterminant, ou une matrice inverse.`,
    methode: [
      `Produit \\(AB\\) : vérifier d'abord la compatibilité des tailles
       (nombre de colonnes de \\(A\\) = nombre de lignes de \\(B\\)). Le
       coefficient \\((i,j)\\) du produit est le produit scalaire de la ligne
       \\(i\\) de \\(A\\) par la colonne \\(j\\) de \\(B\\).`,
      `Déterminant \\(2\\times2\\) : \\(\\det\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}=ad-bc\\).`,
      `Déterminant \\(3\\times3\\) : règle de Sarrus, ou développement selon
       une ligne/colonne (recommandé si elle contient des 0).`,
      `\\(A\\) est inversible \\(\\iff \\det(A) \\ne 0\\).`,
      `Calcul de \\(A^{-1}\\), deux méthodes : (a) via la comatrice,
       \\(A^{-1}=\\dfrac{1}{\\det A}\\,{}^t\\!\\mathrm{Com}(A)\\) ; (b) via le
       pivot de Gauss sur \\((A\\,|\\,I)\\) jusqu'à obtenir \\((I\\,|\\,A^{-1})\\)
       — souvent plus rapide en examen dès que \\(n\\ge3\\).`,
    ],
    exemple: {
      enonce: `Soit \\(A=\\begin{pmatrix}2&1\\\\1&1\\end{pmatrix}\\). Calculer
        \\(\\det(A)\\), puis \\(A^{-1}\\) si elle existe.`,
      solution: `\\(\\det(A)=2\\times1-1\\times1=1 \\ne 0\\) : \\(A\\) est inversible.<br>
        Cofacteurs : \\(C_{11}=1\\), \\(C_{12}=-1\\), \\(C_{21}=-1\\), \\(C_{22}=2\\),
        donc \\(\\mathrm{Com}(A)=\\begin{pmatrix}1&-1\\\\-1&2\\end{pmatrix}\\)
        (matrice symétrique ici, sa transposée est elle-même).<br>
        \\(A^{-1}=\\dfrac{1}{1}\\begin{pmatrix}1&-1\\\\-1&2\\end{pmatrix}
        =\\begin{pmatrix}1&-1\\\\-1&2\\end{pmatrix}\\).<br>
        Vérification : \\(A \\times A^{-1}=\\begin{pmatrix}2\\times1+1\\times(-1) & 2\\times(-1)+1\\times2\\\\
        1\\times1+1\\times(-1) & 1\\times(-1)+1\\times2\\end{pmatrix}=\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}\\) ✓`,
    },
    exercices: [
      {
        enonce: `Soit \\(B=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}\\). Calculer
          \\(\\det(B)\\) et \\(B^{-1}\\).`,
        solution: `\\(\\det(B)=1\\times4-2\\times3=-2 \\ne 0\\) : \\(B\\) est inversible.<br>
          Cofacteurs : \\(C_{11}=4,\\ C_{12}=-3,\\ C_{21}=-2,\\ C_{22}=1\\), donc
          \\(\\mathrm{Com}(B)=\\begin{pmatrix}4&-3\\\\-2&1\\end{pmatrix}\\) et
          \\({}^t\\mathrm{Com}(B)=\\begin{pmatrix}4&-2\\\\-3&1\\end{pmatrix}\\).<br>
          \\(B^{-1}=\\dfrac{1}{-2}\\begin{pmatrix}4&-2\\\\-3&1\\end{pmatrix}
          =\\begin{pmatrix}-2&1\\\\ 1{,}5&-0{,}5\\end{pmatrix}\\).`,
      },
      {
        enonce: `Soit \\(C=\\begin{pmatrix}1&2&0\\\\0&1&3\\\\2&0&1\\end{pmatrix}\\).
          Calculer \\(\\det(C)\\) (par la règle de Sarrus ou par développement)
          et dire si \\(C\\) est inversible.`,
        solution: `Développement selon la 1<sup>re</sup> ligne :
          \\(\\det(C)=1\\times\\det\\begin{pmatrix}1&3\\\\0&1\\end{pmatrix}
          -2\\times\\det\\begin{pmatrix}0&3\\\\2&1\\end{pmatrix}
          +0\\times\\det\\begin{pmatrix}0&1\\\\2&0\\end{pmatrix}\\)<br>
          \\(=1\\times(1-0)-2\\times(0-6)+0=1+12=13\\).<br>
          \\(\\det(C)=13 \\ne 0\\) : \\(C\\) est inversible.`,
      },
    ],
  },

  {
    id: 'application-lineaire-rang',
    title: 'Application linéaire : noyau, image, théorème du rang',
    signal: `L'énoncé donne une application linéaire \\(f\\) (souvent via une
      formule ou une matrice) et demande son noyau, son image, ou d'utiliser
      le théorème du rang.`,
    methode: [
      `Noyau : \\(\\mathrm{Ker}(f)=\\{x\\in E : f(x)=0_F\\}\\). Poser
       \\(f(x)=0\\) et résoudre le système linéaire obtenu (mêmes techniques
       que pour un système « classique »).`,
      `Une fois \\(\\mathrm{Ker}(f)\\) décrit par une famille génératrice,
       vérifier qu'elle est libre pour obtenir une base de \\(\\mathrm{Ker}(f)\\),
       et \\(\\dim\\mathrm{Ker}(f)\\) = nombre de vecteurs de cette base.`,
      `Théorème du rang : \\(\\dim E=\\dim\\mathrm{Ker}(f)+\\dim\\mathrm{Im}(f)\\).
       Très utile pour obtenir \\(\\dim\\mathrm{Im}(f)\\) sans la calculer
       directement, dès que \\(\\dim\\mathrm{Ker}(f)\\) est connue.`,
      `Image : \\(\\mathrm{Im}(f)=\\mathrm{Vect}(f(e_1),\\dots,f(e_n))\\) où
       \\((e_1,\\dots,e_n)\\) est une base de \\(E\\) — les images des vecteurs
       de base engendrent \\(\\mathrm{Im}(f)\\).`,
      `\\(f\\) injective \\(\\iff \\mathrm{Ker}(f)=\\{0\\}\\). \\(f\\) surjective
       \\(\\iff \\mathrm{Im}(f)=F\\) (souvent \\(\\iff \\dim\\mathrm{Im}(f)=\\dim F\\)).
       \\(f\\) bijective \\(\\iff\\) injective et surjective.`,
    ],
    exemple: {
      enonce: `Soit \\(f:\\mathbb{R}^3\\to\\mathbb{R}^3\\) définie par
        \\(f(x,y,z)=(x+y,\\ y+z,\\ x+z)\\). Déterminer \\(\\mathrm{Ker}(f)\\), en
        déduire \\(\\dim\\mathrm{Im}(f)\\), et dire si \\(f\\) est bijective.`,
      solution: `\\(f(x,y,z)=0\\) donne le système
        \\(\\begin{cases}x+y=0\\\\y+z=0\\\\x+z=0\\end{cases}\\).
        De la 1<sup>re</sup> : \\(y=-x\\). De la 2<sup>e</sup> : \\(z=-y=x\\).
        En reportant dans la 3<sup>e</sup> : \\(x+x=2x=0\\), donc \\(x=0\\),
        puis \\(y=0,z=0\\).<br>
        \\(\\mathrm{Ker}(f)=\\{(0,0,0)\\}\\), donc \\(\\dim\\mathrm{Ker}(f)=0\\)
        et \\(f\\) est injective.<br>
        Théorème du rang : \\(\\dim\\mathrm{Im}(f)=\\dim\\mathbb{R}^3-\\dim\\mathrm{Ker}(f)=3-0=3\\),
        donc \\(\\mathrm{Im}(f)=\\mathbb{R}^3\\) : \\(f\\) est surjective.<br>
        \\(f\\) injective et surjective : \\(f\\) est bijective.`,
    },
    exercices: [
      {
        enonce: `Soit \\(f:\\mathbb{R}^3\\to\\mathbb{R}^2\\) définie par
          \\(f(x,y,z)=(x+y+z,\\ x-y)\\). Déterminer \\(\\mathrm{Ker}(f)\\) et sa
          dimension, puis \\(\\dim\\mathrm{Im}(f)\\). \\(f\\) est-elle
          injective ? surjective ?`,
        solution: `\\(f(x,y,z)=0\\) donne \\(\\begin{cases}x+y+z=0\\\\x-y=0\\end{cases}\\).
          De la 2<sup>e</sup> : \\(x=y\\). En reportant : \\(x+x+z=0\\), soit
          \\(z=-2x\\).<br>
          \\(\\mathrm{Ker}(f)=\\{(x,x,-2x):x\\in\\mathbb{R}\\}=\\mathrm{Vect}((1,1,-2))\\),
          donc \\(\\dim\\mathrm{Ker}(f)=1\\) : \\(f\\) n'est pas injective
          (\\(\\mathrm{Ker}(f)\\ne\\{0\\}\\)).<br>
          Théorème du rang : \\(\\dim\\mathrm{Im}(f)=3-1=2=\\dim\\mathbb{R}^2\\),
          donc \\(\\mathrm{Im}(f)=\\mathbb{R}^2\\) : \\(f\\) est surjective.`,
      },
      {
        enonce: `Soit \\(f:\\mathbb{R}^2\\to\\mathbb{R}^3\\) définie par
          \\(f(x,y)=(x,\\ y,\\ x+y)\\). Montrer que \\(f\\) est injective. Peut-elle
          être surjective ?`,
        solution: `\\(f(x,y)=0\\) donne \\(x=0\\), \\(y=0\\), \\(x+y=0\\) : seule
          solution \\((0,0)\\). \\(\\mathrm{Ker}(f)=\\{0\\}\\) : \\(f\\) est
          injective.<br>
          Théorème du rang : \\(\\dim\\mathrm{Im}(f)=\\dim\\mathbb{R}^2-0=2\\).
          Or l'espace d'arrivée \\(\\mathbb{R}^3\\) est de dimension 3, donc
          \\(\\mathrm{Im}(f)\\ne\\mathbb{R}^3\\) : \\(f\\) ne peut pas être
          surjective (une image de dimension 2 ne peut pas remplir un espace
          de dimension 3).`,
      },
    ],
  },
];
