/* ============================================================
   L1 MATHS — EXERCICES TYPE EXAMEN — data/analyse.js
   5 types d'exercice : suites, suites récurrentes, séries
   numériques, dérivation/étude de fonction, développements
   limités. Voir engine.js pour le format attendu.
   L'exemple « Dérivation » est adapté d'un TD de Calculus L1
   (Séance 4, INU Champollion, source Drive).
   ============================================================ */

const ANALYSE_TYPES = [
  {
    id: 'etude-suites',
    title: 'Étudier une suite (monotonie, bornes, convergence)',
    signal: `L'énoncé donne une suite \\((u_n)\\) définie explicitement (une
      formule en fonction de \\(n\\)) et demande d'étudier sa monotonie, sa
      bornitude, ou sa convergence.`,
    methode: [
      `Monotonie : étudier le signe de \\(u_{n+1}-u_n\\) (ou, si \\(u_n>0\\)
       pour tout \\(n\\), comparer \\(u_{n+1}/u_n\\) à 1).`,
      `Bornée : chercher une majoration/minoration, souvent en réécrivant
       \\(u_n\\) ou en comparant à une suite de référence connue.`,
      `Théorème de la limite monotone : une suite croissante et majorée
       converge (de même, décroissante et minorée converge) — cela prouve
       l'<i>existence</i> de la limite, pas sa valeur.`,
      `Pour calculer la limite : opérations sur les limites, ou passage à
       la limite dans une relation vérifiée par \\(u_n\\).`,
      `Rédaction attendue : nommer le théorème utilisé — « \\((u_n)\\) est
       croissante et majorée par \\(M\\), donc par le théorème de la limite
       monotone, elle converge ».`,
    ],
    exemple: {
      enonce: `Soit \\(u_n=\\dfrac{2n+1}{n+1}\\) pour \\(n\\ge0\\). Étudier la
        monotonie et la convergence de \\((u_n)\\).`,
      solution: `On réécrit \\(u_n=2-\\dfrac{1}{n+1}\\) (vérification :
        \\(2-\\dfrac{1}{n+1}=\\dfrac{2(n+1)-1}{n+1}=\\dfrac{2n+1}{n+1}\\)).<br>
        \\(u_{n+1}-u_n=\\left(2-\\dfrac{1}{n+2}\\right)-\\left(2-\\dfrac{1}{n+1}\\right)
        =\\dfrac{1}{n+1}-\\dfrac{1}{n+2}=\\dfrac{1}{(n+1)(n+2)}>0\\).<br>
        Donc \\((u_n)\\) est strictement croissante. De plus
        \\(u_n=2-\\dfrac{1}{n+1}<2\\) pour tout \\(n\\), donc \\((u_n)\\) est
        majorée par 2.<br>
        Par le théorème de la limite monotone, \\((u_n)\\) converge. Comme
        \\(\\dfrac{1}{n+1}\\to0\\), on a \\(u_n \\to 2\\).`,
    },
    exercices: [
      {
        enonce: `Soit \\(v_n=\\dfrac{n}{n^2+1}\\) pour \\(n\\ge1\\). Montrer que
          \\((v_n)\\) est décroissante à partir d'un certain rang, puis
          déterminer sa limite.`,
        solution: `On étudie \\(f(x)=\\dfrac{x}{x^2+1}\\) sur \\([1,+\\infty[\\)
          (avec \\(v_n=f(n)\\)). \\(f'(x)=\\dfrac{(x^2+1)-x(2x)}{(x^2+1)^2}
          =\\dfrac{1-x^2}{(x^2+1)^2}\\).<br>
          \\(f'(x)<0\\) dès que \\(x>1\\), donc \\(f\\) est décroissante sur
          \\([1,+\\infty[\\), donc \\((v_n)_{n\\ge1}\\) est décroissante.<br>
          De plus \\(v_n>0\\) pour tout \\(n\\ge1\\) : \\((v_n)\\) est minorée
          par 0. Par le théorème de la limite monotone, \\((v_n)\\) converge.
          En écrivant \\(v_n=\\dfrac{1}{n}\\times\\dfrac{1}{1+1/n^2}\\), on
          obtient \\(v_n \\to 0\\).`,
      },
      {
        enonce: `Soit \\(w_n=\\dfrac{(-1)^n}{n}\\) pour \\(n\\ge1\\). Montrer que
          \\((w_n)\\) est bornée, et déterminer sa limite si elle existe.`,
        solution: `\\(|w_n|=\\dfrac{1}{n}\\le1\\) pour tout \\(n\\ge1\\), donc
          \\(-1\\le w_n\\le1\\) : \\((w_n)\\) est bornée.<br>
          Comme \\(|w_n|=\\dfrac{1}{n}\\to0\\), on a \\(w_n\\to0\\) par
          encadrement.<br>
          <b>Remarque</b> : être bornée seule ne suffit pas à garantir la
          convergence (par exemple \\((-1)^n\\) est bornée mais diverge) —
          ici c'est \\(|w_n|\\to0\\) qui donne la convergence, pas seulement
          la bornitude.`,
      },
    ],
  },

  {
    id: 'suites-recurrentes',
    title: 'Suites récurrentes (u_{n+1}=f(u_n))',
    signal: `La suite est définie par une valeur initiale \\(u_0\\) et une
      relation \\(u_{n+1}=f(u_n)\\).`,
    methode: [
      `Chercher un intervalle stable \\(I\\) tel que \\(f(I)\\subset I\\) et
       \\(u_0\\in I\\) (à montrer par récurrence : \\(u_n\\in I \\Rightarrow
       u_{n+1}\\in I\\)).`,
      `Étudier le sens de variation de \\(f\\) sur \\(I\\) : si \\(f\\) est
       croissante, \\((u_n)\\) est monotone (le sens dépend du signe de
       \\(u_1-u_0\\)) ; si \\(f\\) est décroissante, les suites \\((u_{2n})\\)
       et \\((u_{2n+1})\\) sont monotones de sens opposés.`,
      `Chercher les points fixes de \\(f\\) (solutions de \\(f(\\ell)=\\ell\\)) :
       si \\((u_n)\\) converge, sa limite \\(\\ell\\) est nécessairement un
       point fixe de \\(f\\), à condition que \\(f\\) soit continue.`,
      `Combiner monotonie + bornitude (théorème de la limite monotone) pour
       prouver la convergence, PUIS passer à la limite dans
       \\(u_{n+1}=f(u_n)\\) pour identifier \\(\\ell\\) parmi les points
       fixes trouvés.`,
      `<b>Piège classique</b> : ne jamais écrire « \\(u_n\\to\\ell\\) donc
       \\(\\ell=f(\\ell)\\) » sans avoir <i>d'abord</i> justifié que
       \\((u_n)\\) converge.`,
    ],
    exemple: {
      enonce: `Soit \\(u_0=0\\) et \\(u_{n+1}=\\sqrt{u_n+2}\\). Étudier la
        convergence de \\((u_n)\\) et donner sa limite.`,
      solution: `Points fixes : \\(\\ell=\\sqrt{\\ell+2}\\) avec \\(\\ell\\ge0\\)
        donne \\(\\ell^2=\\ell+2\\), soit \\(\\ell^2-\\ell-2=0\\), soit
        \\((\\ell-2)(\\ell+1)=0\\). On rejette \\(\\ell=-1<0\\) : \\(\\ell=2\\).<br>
        Intervalle stable \\([0,2]\\) : si \\(0\\le x\\le2\\) alors
        \\(2\\le x+2\\le4\\) donc \\(0\\le\\sqrt{x+2}\\le2\\). Par récurrence
        (\\(u_0=0\\in[0,2]\\)), \\(u_n\\in[0,2]\\) pour tout \\(n\\).<br>
        Monotonie (récurrence) : \\(u_0=0\\le u_1=\\sqrt2\\). Si
        \\(u_n\\le u_{n+1}\\), alors \\(u_n+2\\le u_{n+1}+2\\) (les deux
        \\(\\ge0\\)), et comme \\(\\sqrt{\\cdot}\\) est croissante,
        \\(u_{n+1}\\le u_{n+2}\\). Donc \\((u_n)\\) est croissante.<br>
        \\((u_n)\\) croissante et majorée par 2 : elle converge (théorème de
        la limite monotone) vers \\(\\ell\\in[0,2]\\). En passant à la limite
        dans \\(u_{n+1}=\\sqrt{u_n+2}\\) (\\(\\sqrt{\\cdot}\\) continue),
        \\(\\ell=\\sqrt{\\ell+2}\\), donc \\(\\ell=2\\).`,
    },
    exercices: [
      {
        enonce: `Soit \\(u_0=3\\) et \\(u_{n+1}=\\dfrac{u_n+2}{2}\\). Étudier la
          convergence de \\((u_n)\\).`,
        solution: `Point fixe : \\(\\ell=\\dfrac{\\ell+2}{2}\\) donne
          \\(2\\ell=\\ell+2\\), soit \\(\\ell=2\\).<br>
          \\(f(x)=\\dfrac{x+2}{2}\\) est croissante. \\(u_1=\\dfrac{3+2}{2}=2{,}5<u_0=3\\) :
          comme \\(f\\) est croissante et \\(u_1<u_0\\), la suite est
          décroissante (récurrence immédiate via \\(f\\) croissante).<br>
          Minoration par 2 (récurrence) : \\(u_0=3\\ge2\\). Si \\(u_n\\ge2\\),
          alors \\(u_{n+1}=\\dfrac{u_n+2}{2}\\ge\\dfrac{2+2}{2}=2\\).<br>
          \\((u_n)\\) décroissante et minorée par 2 : elle converge, et par
          passage à la limite, \\(\\ell=2\\).`,
      },
      {
        enonce: `Soit \\(u_0=2\\) et \\(u_{n+1}=4-\\dfrac{3}{u_n}\\) (définie tant
          que \\(u_n\\ne0\\)). On admet que \\((u_n)\\) converge vers une
          limite \\(\\ell\\ne0\\). Déterminer les valeurs possibles de
          \\(\\ell\\).`,
        solution: `Si \\((u_n)\\) converge vers \\(\\ell\\ne0\\), en passant à
          la limite dans la relation, \\(\\ell=4-\\dfrac{3}{\\ell}\\).<br>
          En multipliant par \\(\\ell\\) : \\(\\ell^2=4\\ell-3\\), soit
          \\(\\ell^2-4\\ell+3=0\\), soit \\((\\ell-1)(\\ell-3)=0\\).<br>
          Donc \\(\\ell=1\\) ou \\(\\ell=3\\) : ce sont les deux seules valeurs
          possibles pour la limite.`,
      },
    ],
  },

  {
    id: 'series-numeriques',
    title: 'Nature d\'une série numérique',
    signal: `L'énoncé porte sur une somme infinie \\(\\sum u_n\\) et demande
      d'étudier sa <i>nature</i> (convergente ou divergente) — rarement de
      calculer sa valeur exacte.`,
    methode: [
      `Réflexe n°1 : si \\(u_n\\) ne tend pas vers 0 quand \\(n\\to\\infty\\),
       la série diverge grossièrement (condition nécessaire, jamais
       suffisante — s'arrêter ici si elle échoue).`,
      `Reconnaître les séries de référence : géométrique \\(\\sum r^n\\)
       (converge \\(\\iff |r|<1\\)) ; de Riemann \\(\\sum 1/n^\\alpha\\)
       (converge \\(\\iff \\alpha>1\\)).`,
      `Si \\(u_n\\ge0\\) (termes positifs) : comparer \\(u_n\\) à une série de
       référence (équivalent \\(u_n\\sim v_n\\) avec \\(v_n\\) de nature
       connue \\(\\Rightarrow\\) même nature ; ou \\(u_n\\le v_n\\) avec
       \\(\\sum v_n\\) convergente \\(\\Rightarrow \\sum u_n\\) convergente).`,
      `Règle de d'Alembert (utile avec factorielles/puissances) : si
       \\(u_{n+1}/u_n \\to L\\), alors \\(L<1\\) donne la convergence,
       \\(L>1\\) la divergence, et \\(L=1\\) ne permet aucune conclusion.`,
      `Si la série est alternée et que \\(|u_n|\\) décroît vers 0, le critère
       spécial des séries alternées donne la convergence — mais pas
       forcément la convergence <i>absolue</i>, à vérifier séparément.`,
    ],
    exemple: {
      enonce: `Étudier la nature de \\(\\displaystyle\\sum_{n\\ge1}\\dfrac{1}{n(n+1)}\\).`,
      solution: `\\(u_n=\\dfrac{1}{n(n+1)} \\sim \\dfrac{1}{n^2}\\) quand
        \\(n\\to\\infty\\) (équivalent), et \\(\\sum\\dfrac{1}{n^2}\\) est une
        série de Riemann avec \\(\\alpha=2>1\\), donc convergente.<br>
        Par comparaison de séries à termes positifs équivalentes,
        \\(\\sum\\dfrac{1}{n(n+1)}\\) converge.`,
    },
    exercices: [
      {
        enonce: `Étudier la nature de \\(\\displaystyle\\sum_{n\\ge1}\\dfrac{n}{2^n}\\).`,
        solution: `\\(\\dfrac{u_{n+1}}{u_n}=\\dfrac{(n+1)/2^{n+1}}{n/2^n}
          =\\dfrac{n+1}{2n} \\to \\dfrac{1}{2}\\) quand \\(n\\to\\infty\\).<br>
          Par la règle de d'Alembert, \\(L=1/2<1\\) : la série converge (les
          termes sont positifs, donc convergence tout court).`,
      },
      {
        enonce: `Étudier la nature de \\(\\displaystyle\\sum_{n\\ge1}\\dfrac{(-1)^n}{\\sqrt n}\\).
          Est-elle absolument convergente ?`,
        solution: `\\(|u_n|=\\dfrac{1}{\\sqrt n}\\) décroît vers 0. Par le
          critère spécial des séries alternées, \\(\\sum\\dfrac{(-1)^n}{\\sqrt n}\\)
          converge.<br>
          Convergence absolue ? \\(\\sum|u_n|=\\sum\\dfrac{1}{n^{1/2}}\\) est
          une série de Riemann avec \\(\\alpha=1/2<1\\) : elle diverge.<br>
          La série est donc <b>semi-convergente</b> : convergente, mais pas
          absolument convergente.`,
      },
    ],
  },

  {
    id: 'derivation-etude-fonction',
    title: 'Dérivation et étude de fonction',
    signal: `L'énoncé demande de dériver une fonction composée / produit /
      quotient, ou d'étudier les variations d'une fonction (signe de
      \\(f'\\)).`,
    methode: [
      `Connaître par cœur les dérivées usuelles : \\(x^\\alpha\\), \\(\\sqrt x\\),
       \\(\\ln x\\), \\(e^x\\), \\(\\cos x\\), \\(\\sin x\\), et
       \\((\\tan x)'=1+\\tan^2x=\\dfrac{1}{\\cos^2x}\\).`,
      `Formules : \\((f+g)'=f'+g'\\) ; \\((fg)'=f'g+fg'\\) ;
       \\(\\left(\\dfrac{1}{f}\\right)'=-\\dfrac{f'}{f^2}\\) ;
       \\(\\left(\\dfrac{f}{g}\\right)'=\\dfrac{f'g-fg'}{g^2}\\) ;
       \\((f\\circ g)'(x)=g'(x)\\times f'\\!\\left[g(x)\\right]\\).`,
      `Pour une composée, écrire explicitement « \\(u=\\dots\\) » avant de
       dériver, puis appliquer la formule en \\(u\\) — c'est cette étape que
       les correcteurs veulent voir apparaître.`,
      `Pour étudier les variations : calculer \\(f'\\), étudier son signe
       (souvent en factorisant), puis dresser le tableau de signes de
       \\(f'\\) pour en déduire le tableau de variations de \\(f\\).`,
      `<b>Piège classique</b> : pour \\(f^g\\) avec \\(g\\) non constante
       (par exemple \\(x^x\\)), toujours réécrire \\(f^g=e^{g\\ln f}\\) avant
       de dériver — jamais dériver « comme une puissance » directement.`,
    ],
    exemple: {
      enonce: `Dériver \\(h(x)=\\ln(x^2+1)\\) et \\(f(x)=\\sqrt{1-x^2}\\), en
        précisant à chaque fois la composition utilisée.`,
      solution: `\\(h(x)=\\ln(u(x))\\) avec \\(u(x)=x^2+1\\), \\(u'(x)=2x\\).
        Formule : \\((\\ln u)'=u'/u\\). Donc \\(h'(x)=\\dfrac{2x}{x^2+1}\\).<br>
        \\(f(x)=\\sqrt{u(x)}\\) avec \\(u(x)=1-x^2\\), \\(u'(x)=-2x\\). Formule :
        \\((\\sqrt u)'=u'/(2\\sqrt u)\\). Donc
        \\(f'(x)=\\dfrac{-2x}{2\\sqrt{1-x^2}}=\\dfrac{-x}{\\sqrt{1-x^2}}\\).`,
    },
    exercices: [
      {
        enonce: `Dériver \\(g(x)=e^{2x+3}\\) et \\(k(x)=\\cos(3x-1)\\), en
          précisant la composition utilisée.`,
        solution: `\\(g(x)=e^{u(x)}\\) avec \\(u(x)=2x+3\\), \\(u'=2\\).
          \\((e^u)'=u'e^u\\), donc \\(g'(x)=2e^{2x+3}\\).<br>
          \\(k(x)=\\cos(u(x))\\) avec \\(u(x)=3x-1\\), \\(u'=3\\).
          \\((\\cos u)'=-u'\\sin(u)\\), donc \\(k'(x)=-3\\sin(3x-1)\\).`,
      },
      {
        enonce: `Soit \\(f(x)=x^2e^{-x}\\) sur \\(\\mathbb{R}\\). Calculer
          \\(f'(x)\\), étudier son signe, et donner le sens de variation de
          \\(f\\).`,
        solution: `\\(f'(x)=(x^2)'e^{-x}+x^2(e^{-x})'=2xe^{-x}-x^2e^{-x}
          =e^{-x}(2x-x^2)=e^{-x}\\,x(2-x)\\).<br>
          \\(e^{-x}>0\\) toujours, donc le signe de \\(f'(x)\\) est celui de
          \\(x(2-x)\\) : un trinôme de racines 0 et 2, négatif à l'extérieur
          de \\([0,2]\\), positif à l'intérieur.<br>
          \\(f\\) est donc décroissante sur \\(]-\\infty,0]\\), croissante sur
          \\([0,2]\\), décroissante sur \\([2,+\\infty[\\) — minimum local
          \\(f(0)=0\\), maximum local \\(f(2)=4e^{-2}\\).`,
      },
    ],
  },

  {
    id: 'developpements-limites',
    title: 'Développements limités',
    signal: `L'énoncé demande un développement limité (DL), souvent pour
      calculer une limite indéterminée ou obtenir un équivalent.`,
    methode: [
      `Connaître les DL usuels en 0 : \\(e^x\\), \\(\\ln(1+x)\\),
       \\((1+x)^\\alpha\\), \\(\\sin x\\), \\(\\cos x\\), \\(\\dfrac{1}{1-x}\\) —
       ce sont les briques de base à mémoriser.`,
      `Pour un DL ailleurs qu'en 0 (en \\(x=a\\)) : poser \\(h=x-a\\) et
       écrire un DL en \\(h=0\\).`,
      `Composer/multiplier les DL usuels terme à terme jusqu'à l'ordre
       demandé, en ne gardant que les termes d'ordre \\(\\le n\\) (le reste
       part dans le petit-o).`,
      `Pour une limite indéterminée : remplacer chaque terme par son DL à
       un ordre suffisant pour que les termes dominants ne s'annulent pas,
       puis simplifier.`,
      `<b>Piège classique</b> : choisir un ordre trop bas fait tout
       s'annuler sans rien conclure — il faut aller jusqu'au premier terme
       non nul après simplification.`,
    ],
    exemple: {
      enonce: `Calculer \\(\\displaystyle\\lim_{x\\to0}\\dfrac{e^x-1-x}{x^2}\\).`,
      solution: `DL de \\(e^x\\) à l'ordre 2 en 0 : \\(e^x=1+x+\\dfrac{x^2}{2}+o(x^2)\\).<br>
        Donc \\(e^x-1-x=\\dfrac{x^2}{2}+o(x^2)\\).<br>
        \\(\\dfrac{e^x-1-x}{x^2}=\\dfrac{1}{2}+o(1) \\to \\dfrac{1}{2}\\)
        quand \\(x\\to0\\). La limite vaut \\(\\dfrac12\\).`,
    },
    exercices: [
      {
        enonce: `Calculer \\(\\displaystyle\\lim_{x\\to0}\\dfrac{\\cos x-1}{x^2}\\).`,
        solution: `DL de \\(\\cos x\\) à l'ordre 2 en 0 : \\(\\cos x=1-\\dfrac{x^2}{2}+o(x^2)\\).<br>
          \\(\\dfrac{\\cos x-1}{x^2}=\\dfrac{-x^2/2+o(x^2)}{x^2}=-\\dfrac{1}{2}+o(1)
          \\to -\\dfrac12\\).`,
      },
      {
        enonce: `Donner le DL à l'ordre 2 en 0 de \\(f(x)=\\ln(1+x)\\times e^x\\),
          puis en déduire un équivalent de \\(f(x)\\) en 0.`,
        solution: `\\(\\ln(1+x)=x-\\dfrac{x^2}{2}+o(x^2)\\) et
          \\(e^x=1+x+\\dfrac{x^2}{2}+o(x^2)\\).<br>
          Produit, en ne gardant que les termes d'ordre \\(\\le2\\) :
          \\(\\ln(1+x)e^x = x\\times1+x\\times x+\\left(-\\dfrac{x^2}{2}\\right)\\times1+o(x^2)
          = x+x^2-\\dfrac{x^2}{2}+o(x^2)=x+\\dfrac{x^2}{2}+o(x^2)\\).<br>
          Un équivalent en 0 est donné par le premier terme non nul :
          \\(f(x)\\sim x\\).`,
      },
    ],
  },
];
