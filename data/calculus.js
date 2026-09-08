/* ============================================================
   L1 MATHS — EXERCICES TYPE EXAMEN — data/calculus.js
   Pilier "Calculus" (nommé "Pratique du calcul mathématique" sur les
   sujets de contrôle continu — même cours, deux intitulés). Contenu
   reconstruit à partir de la Séance 1 (INU Champollion, Sept. 2026,
   source Drive : dossier partagé "TD1" — énoncés
   "Séance 1_Calculus_2026_2027_coef binomiaux.pdf" +
   "TD1 correction.pdf"). Voir engine.js pour le format attendu.

   5 types, un par sous-partie de la séance : fractions, coefficients
   binomiaux, puissances entières, radicaux (racine carrée), radicaux
   (puissances fractionnaires). Tous les exercices numérotés 1 à 16 du
   TD sont repris (exhaustif), répartis en exemple rédigé + exercices
   d'entraînement par type. Deux exercices supplémentaires (marqués
   "inventé" ci-dessous) ont été ajoutés pour étoffer le dernier type,
   qui n'avait qu'un seul exercice officiel.

   Coquille corrigée dans le corrigé source (type radicaux-racine-carree,
   exemple, 3e fraction) : le corrigé donnait
   -√3/6 + √2/12 + √30/12, ce qui ne vérifie pas numériquement
   1/(√5-√3+√2) ≈ 0,5213 (le calcul donne ≈0,2856 avec /12). Recalculé
   à la main et vérifié numériquement : c'est √2/4, pas √2/12. Utilisé
   ici tel que corrigé.
   ============================================================ */

const CALCULUS_TYPES = [
  {
    id: 'fractions',
    title: 'Simplifier une fraction (numérique ou littérale)',
    signal: `L'énoncé demande de simplifier une expression composée de plusieurs
      fractions (numériques ou avec des lettres), ou de démontrer une égalité
      entre deux telles expressions.`,
    methode: [
      `Ne jamais diviser par zéro : identifier les valeurs interdites
       (dénominateurs qui s'annulent) avant de simplifier.`,
      `Factoriser chaque numérateur et chaque dénominateur (nombres premiers
       pour du numérique, mise en facteur pour du littéral).`,
      `Pour une somme/différence de fractions, chercher le plus petit
       dénominateur commun plutôt que d'appliquer aveuglément la formule du
       produit des dénominateurs.`,
      `Pour un quotient de deux fractions (une fraction de fractions), le
       calculer en une seule étape : produit des extrêmes divisé par produit
       des moyens.`,
      `Simplifier le résultat final en annulant les facteurs communs.`,
    ],
    exemple: {
      enonce: `Simplifier les expressions suivantes :<br>
        \\(A = \\dfrac{123}{270} - \\dfrac{45}{175} + \\dfrac{77}{882}\\)<br>
        \\(B = \\dfrac{\\frac{16}{15}\\times\\frac{25}{24}}{\\frac{1}{4}-\\frac{1}{6}}\\)`,
      solution: `<b>A</b> : on simplifie chaque fraction avant d'additionner :
        \\(\\dfrac{123}{270}=\\dfrac{41}{90}\\) (÷3), \\(\\dfrac{45}{175}=\\dfrac{9}{35}\\) (÷5),
        \\(\\dfrac{77}{882}=\\dfrac{11}{126}\\) (÷7).<br>
        Comme \\(90=2\\times3^2\\times5\\), \\(35=5\\times7\\), \\(126=2\\times3^2\\times7\\),
        le dénominateur commun est \\(2\\times3^2\\times5\\times7=630\\) :
        \\[A=\\dfrac{41\\times7-9\\times18+11\\times5}{630}=\\dfrac{287-162+55}{630}=\\dfrac{180}{630}=\\dfrac{2}{7}\\]
        <b>B</b> : on calcule le numérateur puis le dénominateur séparément.
        \\(\\dfrac{16}{15}\\times\\dfrac{25}{24}=\\dfrac{2^4\\times5^2}{(3\\times5)\\times(2^3\\times3)}=\\dfrac{2\\times5}{3^2}=\\dfrac{10}{9}\\).<br>
        \\(\\dfrac{1}{4}-\\dfrac{1}{6}=\\dfrac{3}{12}-\\dfrac{2}{12}=\\dfrac{1}{12}\\).<br>
        \\[B=\\dfrac{10/9}{1/12}=\\dfrac{10}{9}\\times12=\\dfrac{120}{9}=\\dfrac{40}{3}\\]`,
    },
    exercices: [
      {
        enonce: `Simplifier les expressions suivantes (\\(x,y\\) réels tels que tous les
          dénominateurs soient non nuls) :<br>
          \\(A = \\dfrac{100}{275} - \\dfrac{45}{189} + \\dfrac{60}{198}\\)<br>
          \\(B = \\dfrac{2x}{x^2+2xy} - \\dfrac{y}{xy-2y^2} + \\dfrac{4y}{x^2-4y^2}\\)`,
        solution: `<b>A</b> : \\(\\dfrac{100}{275}=\\dfrac{4}{11}\\) (÷25),
          \\(\\dfrac{45}{189}=\\dfrac{5}{21}\\) (÷9), \\(\\dfrac{60}{198}=\\dfrac{10}{33}\\) (÷6).<br>
          Dénominateur commun \\(11\\times3\\times7=231\\) (\\(21=3\\times7\\), \\(33=3\\times11\\)) :
          \\[A=\\dfrac{84-55+70}{231}=\\dfrac{99}{231}=\\dfrac{3}{7}\\]
          <b>B</b> : on factorise chaque dénominateur : \\(x^2+2xy=x(x+2y)\\),
          \\(xy-2y^2=y(x-2y)\\), \\(x^2-4y^2=(x-2y)(x+2y)\\), d'où
          \\[B=\\dfrac{2}{x+2y}-\\dfrac{1}{x-2y}+\\dfrac{4y}{(x-2y)(x+2y)}\\]
          Sur le dénominateur commun \\((x-2y)(x+2y)\\) :
          \\[B=\\dfrac{2(x-2y)-(x+2y)+4y}{(x-2y)(x+2y)}=\\dfrac{x-2y}{(x-2y)(x+2y)}=\\dfrac{1}{x+2y}\\]`,
      },
      {
        enonce: `(Sujet CC n°1, 2022) Montrer que pour \\(a,x\\) réels tels que tous les
          dénominateurs soient non nuls :
          \\[\\dfrac{\\dfrac{a+x}{ax+1}-\\dfrac{a-x}{ax-1}}{1-\\dfrac{(a+x)(a-x)}{(ax+1)(ax-1)}}=\\dfrac{2a}{a^2+1}\\]`,
        solution: `On note \\(D=(ax+1)(ax-1)\\). Le numérateur, mis sur \\(D\\), vaut
          \\((a+x)(ax-1)-(ax+1)(a-x)=2a(x^2-1)\\) (en développant les deux produits et
          en simplifiant).<br>
          Le dénominateur, mis sur \\(D\\), vaut
          \\[D-(a+x)(a-x)=D-(a^2-x^2)=(a^2x^2-1)-a^2+x^2=(a^2+1)(x^2-1)\\]
          L'expression complète vaut donc
          \\[\\dfrac{2a(x^2-1)/D}{(a^2+1)(x^2-1)/D}=\\dfrac{2a(x^2-1)}{(a^2+1)(x^2-1)}=\\dfrac{2a}{a^2+1}\\]
          (en simplifiant par \\(x^2-1\\), non nul car aucun dénominateur de l'énoncé ne
          s'annule).`,
      },
    ],
  },

  {
    id: 'coefficients-binomiaux',
    title: 'Coefficients binomiaux',
    signal: `L'énoncé fait apparaître des coefficients binomiaux \\(\\binom{n}{p}\\)
      (à calculer, à factoriser, ou dans une équation d'inconnue \\(n\\)).`,
    methode: [
      `Repartir de la définition \\(\\binom{n}{p} = \\dfrac{n!}{p!(n-p)!}\\) pour
       \\(0 \\le p \\le n\\), et \\(\\binom{n}{p}=0\\) si \\(p>n\\).`,
      `Simplifier les factorielles en écrivant
       \\(n! = n\\times(n-1)\\times\\cdots\\times(n-p+1)\\times(n-p)!\\) plutôt qu'en
       développant tout.`,
      `Pour un rapport ou une équation entre coefficients binomiaux, multiplier
       les deux membres par les factorielles qui gênent, pour les faire
       disparaître.`,
      `Terminer par une factorisation en nombres premiers si demandé.`,
    ],
    exemple: {
      enonce: `Écrire en produit de facteurs premiers les coefficients binomiaux
        \\(\\dbinom{51}{4}\\) et \\(\\dbinom{42}{38}\\).`,
      solution: `\\(\\dbinom{51}{4}=\\dfrac{51!}{4!\\,47!}=\\dfrac{48\\times49\\times50\\times51}{4!}\\).
        Comme \\(48=2\\times4!\\), il reste \\(2\\times49\\times50\\times51\\).<br>
        En factorisant chaque terme (\\(49=7^2\\), \\(50=2\\times5^2\\), \\(51=3\\times17\\)) :
        \\[\\dbinom{51}{4}=2^2\\times3\\times5^2\\times7^2\\times17\\;(=249\\,900)\\]
        \\(\\dbinom{42}{38}=\\dbinom{42}{4}=\\dfrac{42!}{4!\\,38!}=\\dfrac{39\\times40\\times41\\times42}{4!}\\).
        Comme \\(40=4\\times10\\) et \\(42=6\\times7\\) avec \\(4!=4\\times6\\), il reste
        \\(39\\times10\\times41\\times7\\), soit :
        \\[\\dbinom{42}{38}=2\\times3\\times5\\times7\\times13\\times41\\;(=111\\,930)\\]`,
    },
    exercices: [
      {
        enonce: `Calculer les expressions suivantes :<br>
          \\(C = \\dfrac{\\dbinom{2022}{2019}}{\\dbinom{1011}{1009}}\\)
          &nbsp;&nbsp;&nbsp; \\(D = \\dfrac{14!}{13!+12!}\\)`,
        solution: `\\(\\dbinom{2022}{2019}=\\dbinom{2022}{3}=\\dfrac{2022\\times2021\\times2020}{3!}\\) et
          \\(\\dbinom{1011}{1009}=\\dbinom{1011}{2}=\\dfrac{1011\\times1010}{2}\\).<br>
          \\[C=\\dfrac{2022\\times2021\\times2020}{3!}\\times\\dfrac{2}{1011\\times1010}
          =\\dfrac{2022}{1011}\\times2021\\times\\dfrac{2020}{1010}\\times\\dfrac{2}{3!}
          =\\dfrac{4}{3}\\times2021=\\dfrac{8084}{3}\\]
          Pour \\(D\\), on factorise \\(14!=14\\times13\\times12!\\) et \\(13!=13\\times12!\\) :
          \\[D=\\dfrac{14\\times13\\times12!}{13\\times12!+12!}=\\dfrac{14\\times13\\times12!}{12!(13+1)}=\\dfrac{14\\times13}{14}=13\\]`,
      },
      {
        enonce: `Résoudre les équations suivantes, d'inconnue \\(n\\) :<br>
          1. Pour \\(n\\ge9\\) : \\(4\\dbinom{n}{8}=\\dbinom{n}{9}\\)<br>
          2. \\(\\dfrac{2}{7!}+\\dfrac{6}{8!}+\\dfrac{18}{9!}=\\dfrac{n}{7!}\\)`,
        solution: `<b>1.</b> \\(4\\dbinom{n}{8}=\\dbinom{n}{9} \\iff
          \\dfrac{4\\times n!}{8!(n-8)!}=\\dfrac{n!}{9!(n-9)!}\\). On multiplie les deux côtés
          par \\(\\dfrac{9!}{n!}\\) :
          \\[\\dfrac{4\\times9}{(n-8)!}=\\dfrac{1}{(n-9)!}\\]
          Or \\((n-8)!=(n-9)!\\times(n-8)\\), donc \\(\\dfrac{36}{n-8}=1\\), soit \\(n=44\\).<br>
          <b>2.</b> On multiplie toute l'équation par \\(9!\\) : comme
          \\(\\dfrac{9!}{7!}=9\\times8=72\\) et \\(\\dfrac{9!}{8!}=9\\), l'équation devient
          \\[2\\times72+6\\times9+18=72n \\iff 144+54+18=72n \\iff 216=72n \\iff n=3\\]`,
      },
      {
        enonce: `Démontrer la formule de Pascal : pour tout \\(n,p\\in\\mathbb{N}\\) tels que
          \\(n\\ge1\\) et \\(0\\le p\\le n-1\\),
          \\[\\dbinom{n}{p}+\\dbinom{n}{p+1}=\\dbinom{n+1}{p+1}\\]`,
        solution: `On repart de la définition et on met sur le même dénominateur :
          \\[\\dbinom{n}{p}+\\dbinom{n}{p+1}=\\dfrac{n!}{p!(n-p)!}+\\dfrac{n!}{(p+1)!(n-p-1)!}\\]
          \\[=\\dfrac{n!\\times(p+1)}{(p+1)!(n-p)!}+\\dfrac{n!\\times(n-p)}{(p+1)!(n-p)!}
          =\\dfrac{n!\\times\\big[(p+1)+(n-p)\\big]}{(p+1)!(n-p)!}=\\dfrac{n!\\times(n+1)}{(p+1)!(n-p)!}\\]
          Comme \\(n!\\times(n+1)=(n+1)!\\) et \\((n-p)=(n+1)-(p+1)\\), on reconnaît :
          \\[=\\dfrac{(n+1)!}{(p+1)!\\times\\big[(n+1)-(p+1)\\big]!}=\\dbinom{n+1}{p+1}\\]`,
      },
    ],
  },

  {
    id: 'puissances-entieres',
    title: 'Puissances entières',
    signal: `L'énoncé porte sur des puissances entières (produit, quotient, puissance
      de puissance) et demande de simplifier ou de calculer une expression.`,
    methode: [
      `Utiliser les règles de base : \\(a^m \\times a^n = a^{m+n}\\),
       \\((a^m)^n=a^{mn}\\), \\((ab)^n=a^nb^n\\).`,
      `Factoriser en une seule base commune quand c'est possible, pour faire
       apparaître des simplifications.`,
      `Une puissance négative \\(a^{-n}=\\dfrac{1}{a^n}\\) est parfois plus simple à
       manipuler qu'une fraction.`,
      `Ne pas oublier \\(a^0=1\\) pour \\(a \\ne 0\\).`,
    ],
    exemple: {
      enonce: `Soit \\(n\\in\\mathbb{N}^*\\) et
        \\(u_n=\\dfrac{1\\times3\\times\\cdots\\times(2n-1)}{2\\times4\\times\\cdots\\times(2n)}\\).
        Exprimer \\(u_n\\) à l'aide de factorielles et de puissances.`,
      solution: `L'astuce : multiplier numérateur et dénominateur par
        \\(2\\times4\\times\\cdots\\times(2n)\\), pour faire apparaître \\((2n)!\\) au numérateur
        (produit de tous les entiers de 1 à \\(2n\\)) :
        \\[u_n=\\dfrac{\\big[1\\times3\\times\\cdots\\times(2n-1)\\big]\\times\\big[2\\times4\\times\\cdots\\times(2n)\\big]}{\\big[2\\times4\\times\\cdots\\times(2n)\\big]^2}=\\dfrac{(2n)!}{\\big[2\\times4\\times\\cdots\\times(2n)\\big]^2}\\]
        Or \\(2\\times4\\times\\cdots\\times(2n)=2^n\\times(1\\times2\\times\\cdots\\times n)=2^n\\,n!\\),
        donc :
        \\[u_n=\\dfrac{(2n)!}{2^{2n}(n!)^2}\\]`,
    },
    exercices: [
      {
        enonce: `Simplifier les expressions suivantes :<br>
          \\(A = \\dfrac{6^{12}}{12^6}\\) &nbsp;&nbsp;&nbsp;
          \\(B = \\dfrac{2^{100}-2^{99}}{2^{101}+2^{99}}\\)`,
        solution: `<b>A</b> : \\(12=2\\times6\\), donc \\(12^6=2^6\\times6^6\\), et
          \\[A=\\dfrac{6^{12}}{2^6\\times6^6}=\\dfrac{6^6}{2^6}=\\left(\\dfrac{6}{2}\\right)^6=3^6=729\\]
          <b>B</b> : on met \\(2^{99}\\) en facteur au numérateur et au dénominateur :
          \\[B=\\dfrac{2^{99}(2-1)}{2^{99}(2^2+1)}=\\dfrac{1}{5}\\]`,
      },
      {
        enonce: `On pose \\(F_n=2^{2^n}\\). Calculer, sous forme factorisée et simplifiée,
          \\(F_n^2\\), \\(\\dfrac{F_{n+1}}{F_n}\\) et \\(\\dfrac{F_n^{2^n}}{F_{2n}}\\).`,
        solution: `\\(F_n^2=\\left(2^{2^n}\\right)^2=2^{2\\times2^n}=2^{2^{n+1}}=F_{n+1}\\).<br>
          On en déduit directement \\(\\dfrac{F_{n+1}}{F_n}=\\dfrac{F_n^2}{F_n}=F_n\\).<br>
          Pour le dernier, \\(F_n^{2^n}=\\left(2^{2^n}\\right)^{2^n}=2^{2^n\\times2^n}=2^{2^{2n}}=F_{2n}\\),
          donc \\(\\dfrac{F_n^{2^n}}{F_{2n}}=1\\).`,
      },
    ],
  },

  {
    id: 'radicaux-racine-carree',
    title: 'Radicaux : racine carrée',
    signal: `L'énoncé contient des racines carrées à simplifier, un dénominateur à
      rationaliser, ou une équation avec des racines à résoudre.`,
    methode: [
      `Rappeler que \\(\\sqrt{x^2}=|x|\\) : une racine carrée est toujours
       positive — c'est souvent la source du piège.`,
      `Pour rationaliser un dénominateur \\(a+\\sqrt{b}\\), multiplier numérateur et
       dénominateur par la quantité conjuguée \\(a-\\sqrt{b}\\)
       (utilise \\((a+\\sqrt b)(a-\\sqrt b)=a^2-b\\)).`,
      `S'il y a plusieurs racines dans le dénominateur, rationaliser en
       plusieurs étapes (une quantité conjuguée à la fois).`,
      `Pour une équation avec une racine carrée, isoler la racine puis élever
       au carré des deux côtés — et vérifier les solutions à la fin (le carré
       peut introduire des solutions parasites).`,
    ],
    exemple: {
      enonce: `Rendre rationnel le dénominateur des fractions suivantes :<br>
        \\(\\dfrac{1}{3+\\sqrt5}\\) &nbsp;&nbsp;&nbsp; \\(\\dfrac{\\sqrt5-\\sqrt{20}}{\\sqrt5+\\sqrt{20}}\\)
        &nbsp;&nbsp;&nbsp; \\(\\dfrac{1}{\\sqrt5-\\sqrt3+\\sqrt2}\\)`,
      solution: `<b>1re</b> : on multiplie par la quantité conjuguée \\(3-\\sqrt5\\) :
        \\[\\dfrac{1}{3+\\sqrt5}=\\dfrac{3-\\sqrt5}{(3+\\sqrt5)(3-\\sqrt5)}=\\dfrac{3-\\sqrt5}{9-5}=\\dfrac{3-\\sqrt5}{4}\\]
        <b>2e</b> : on remarque \\(\\sqrt{20}=2\\sqrt5\\), donc directement
        \\[\\dfrac{\\sqrt5-\\sqrt{20}}{\\sqrt5+\\sqrt{20}}=\\dfrac{\\sqrt5-2\\sqrt5}{\\sqrt5+2\\sqrt5}=\\dfrac{-\\sqrt5}{3\\sqrt5}=-\\dfrac13\\]
        <b>3e</b> : deux conjugaisons successives. On multiplie d'abord par la
        conjuguée de \\((\\sqrt5-\\sqrt3)+\\sqrt2\\), qui est \\((\\sqrt5-\\sqrt3)-\\sqrt2\\) :
        \\[\\dfrac{1}{\\sqrt5-\\sqrt3+\\sqrt2}=\\dfrac{\\sqrt5-\\sqrt3-\\sqrt2}{(\\sqrt5-\\sqrt3)^2-2}=\\dfrac{\\sqrt5-\\sqrt3-\\sqrt2}{6-2\\sqrt{15}}\\]
        puis par la conjuguée de \\(6-2\\sqrt{15}\\), qui est \\(6+2\\sqrt{15}\\)
        (dénominateur : \\(36-4\\times15=-24\\)) :
        \\[=\\dfrac{(\\sqrt5-\\sqrt3-\\sqrt2)(6+2\\sqrt{15})}{-24}=\\dfrac{4\\sqrt3-6\\sqrt2-2\\sqrt{30}}{-24}=-\\dfrac{\\sqrt3}{6}+\\dfrac{\\sqrt2}{4}+\\dfrac{\\sqrt{30}}{12}\\]`,
    },
    exercices: [
      {
        enonce: `Résoudre, d'inconnue \\(a\\) : \\(\\sqrt{\\dfrac{3^6+3^a}{3^a+3^2}}=3\\)`,
        solution: `On élève au carré (le membre de droite est positif) :
          \\[\\dfrac{3^6+3^a}{3^a+3^2}=3^2 \\iff 3^6+3^a=3^2\\times3^a+3^2\\times3^2
          \\iff 3^6-3^4=3^a\\times(3^2-1)\\]
          Or \\(3^6-3^4=3^4(3^2-1)\\), donc l'équation devient
          \\((3^2-1)\\times3^4=3^a\\times(3^2-1)\\), et en simplifiant par \\(3^2-1\\ne0\\) :
          \\[3^a=3^4 \\iff a=4\\]`,
      },
      {
        enonce: `Pour \\(x,y\\) réels tels que \\(0<x<y\\), on pose
          \\[B=\\dfrac{\\sqrt{\\frac{x}{y}}+\\sqrt{\\frac{y}{x}}}{\\sqrt{\\frac{x}{y}}-\\sqrt{\\frac{y}{x}}}\\]
          Montrer que \\(B=\\dfrac{x+y}{x-y}\\).`,
        solution: `On pose \\(u=\\sqrt{x/y}\\) et \\(v=\\sqrt{y/x}\\), de sorte que \\(uv=1\\)
          (car \\(uv=\\sqrt{(x/y)(y/x)}=\\sqrt1=1\\)) et \\(u^2=x/y\\).<br>
          On multiplie numérateur et dénominateur de \\(B\\) par \\(u\\) :
          \\[B=\\dfrac{u+v}{u-v}=\\dfrac{u(u+v)}{u(u-v)}=\\dfrac{u^2+uv}{u^2-uv}=\\dfrac{u^2+1}{u^2-1}\\]
          (en utilisant \\(uv=1\\)). Il reste à remplacer \\(u^2\\) par \\(x/y\\) :
          \\[B=\\dfrac{\\frac{x}{y}+1}{\\frac{x}{y}-1}=\\dfrac{\\frac{x+y}{y}}{\\frac{x-y}{y}}=\\dfrac{x+y}{x-y}\\]`,
      },
      {
        enonce: `Attention, piège ! Soit \\(A=\\sqrt{3-\\sqrt5}-\\sqrt{3+\\sqrt5}\\). Calculer
          \\(A^2\\) et en déduire une expression simplifiée de \\(A\\).`,
        solution: `\\[A^2=(3-\\sqrt5)-2\\sqrt{(3-\\sqrt5)(3+\\sqrt5)}+(3+\\sqrt5)=6-2\\sqrt{9-5}=6-2\\times2=2\\]
          Donc \\(A=\\sqrt2\\) ou \\(A=-\\sqrt2\\). <b>Le piège</b> : il faut trancher entre les
          deux à partir du signe de \\(A\\), pas juste dire « \\(A=\\sqrt{A^2}\\) ». Comme
          \\(\\sqrt5>0\\), on a \\(3+\\sqrt5>3-\\sqrt5\\ge0\\), donc
          \\(\\sqrt{3+\\sqrt5}>\\sqrt{3-\\sqrt5}\\), ce qui donne
          \\(A=\\sqrt{3-\\sqrt5}-\\sqrt{3+\\sqrt5}<0\\). Donc \\(A=-\\sqrt2\\).`,
      },
    ],
  },

  {
    id: 'radicaux-puissances-fractionnaires',
    title: 'Radicaux : puissances fractionnaires',
    signal: `L'énoncé demande de simplifier une racine (carrée, cubique...) affectée
      d'un exposant fractionnaire, ou de calculer une racine cubique d'un
      produit ou d'un quotient.`,
    methode: [
      `Réécrire toute racine comme une puissance fractionnaire :
       \\(\\sqrt[n]{x}=x^{1/n}\\).`,
      `Utiliser \\((x^{a})^{b}=x^{ab}\\) pour combiner les exposants en un seul.`,
      `Décomposer les nombres en produit de facteurs premiers pour faire
       apparaître les puissances exactes cachées dans le radical.`,
      `Simplifier l'exposant obtenu, et repasser en écriture avec radical si
       besoin pour la réponse finale.`,
    ],
    exemple: {
      enonce: `Simplifier \\(\\sqrt{54}^{-\\frac23}\\).`,
      solution: `On réécrit la racine carrée en puissance :
        \\(\\sqrt{54}^{-\\frac23}=\\left(54^{\\frac12}\\right)^{-\\frac23}=54^{-\\frac13}\\).<br>
        Or \\(54=2\\times27=2\\times3^3\\), donc :
        \\[54^{-\\frac13}=\\left(2\\times3^3\\right)^{-\\frac13}=2^{-\\frac13}\\times3^{-1}=\\dfrac{1}{3\\sqrt[3]{2}}\\]`,
    },
    exercices: [
      {
        enonce: `Calculer les racines cubiques suivantes :<br>
          \\(\\sqrt[3]{\\dfrac{500}{2048}}\\) &nbsp;&nbsp;&nbsp;
          \\(\\sqrt[3]{14\\times36\\times49\\times81}\\)`,
        solution: `<b>1re</b> : on factorise : \\(500=2^2\\times5^3\\) et \\(2048=2^{11}\\), donc
          \\[\\dfrac{500}{2048}=\\dfrac{5^3}{2^9} \\quad\\Rightarrow\\quad \\sqrt[3]{\\dfrac{500}{2048}}=\\dfrac{5}{2^3}=\\dfrac58\\]
          <b>2e</b> : on factorise chaque terme en nombres premiers :
          \\(14=2\\times7\\), \\(36=2^2\\times3^2\\), \\(49=7^2\\), \\(81=3^4\\), donc
          \\[14\\times36\\times49\\times81=2^3\\times3^6\\times7^3=\\left(2\\times3^2\\times7\\right)^3\\]
          \\[\\sqrt[3]{14\\times36\\times49\\times81}=2\\times3^2\\times7=126\\]`,
      },
      {
        // Inventé (pas dans le TD source) : même technique que l'exemple
        // (puissance fractionnaire d'une racine carrée), pour un 2e exercice
        // sur ce type qui n'en avait qu'un seul côté officiel.
        enonce: `Simplifier \\(\\sqrt{32}^{-\\frac45}\\).`,
        solution: `\\(32=2^5\\), donc \\(\\sqrt{32}=32^{\\frac12}=2^{\\frac52}\\). En élevant à la
          puissance \\(-\\frac45\\) :
          \\[\\sqrt{32}^{-\\frac45}=\\left(2^{\\frac52}\\right)^{-\\frac45}=2^{\\frac52\\times(-\\frac45)}=2^{-2}=\\dfrac14\\]`,
      },
    ],
  },
];
