/* ============================================================
   katex-typeset.js — rendu KaTeX partagé entre engine.js (pages
   piliers) et python-applique.html (pas la même structure de
   données, donc pas engine.js en entier — juste ce helper).
   Chargé après vendor/katex/*.js (deferred), avant tout script qui
   appelle typesetMath().

   Débordement horizontal (formules trop larges pour un petit écran,
   ex. fractions imbriquées avec \dfrac) : .katex-display (formules
   \[ ... \]) a overflow-x:auto en CSS (style.css), donc scrolle déjà
   toute seule. Une formule \( ... \) (inline) n'a pas cette chance :
   KaTeX la rend dans un <span> en `white-space:nowrap` qui ne peut
   pas se couper, donc si elle dépasse son conteneur, ça déborde du
   cadre au lieu de scroller. wrapOverflowingMath() détecte ces
   dépassements après coup et enveloppe le <span class="katex">
   concerné dans un conteneur scrollable (.math-scroll).

   Repassage après document.fonts.ready : la mesure de largeur juste
   après renderMathInElement() peut avoir lieu AVANT que les polices
   KaTeX (auto-hébergées, vendor/katex/fonts/) soient effectivement
   chargées — la formule "tient" alors avec la police de secours,
   puis déborde une fois KaTeX_Main etc. en place, sans jamais être
   rattrapée. wrapOverflowingMath() est donc rejouée une seconde fois
   au chargement des polices ; elle ignore déjà ce qui est correct,
   donc ce second passage ne fait rien sur ce qui était déjà bon.
   ============================================================ */

function wrapOverflowingMath(el){
  if(!el) return;
  el.querySelectorAll('.katex').forEach(katexEl => {
    if(katexEl.closest('.katex-display')) return; // déjà géré par overflow-x sur .katex-display
    if(katexEl.closest('.math-scroll')) return; // déjà enveloppée

    // .katex (formule inline \( ... \)) est display:inline — scrollWidth et
    // clientWidth valent alors TOUJOURS 0 par spec (comme pour n'importe
    // quel élément inline), y compris sur son parent immédiat quand
    // renderMathInElement a lui-même inséré un <span> intermédiaire
    // (également inline) autour du texte+formules. Il faut donc mesurer
    // la largeur réelle avec getBoundingClientRect() (fiable pour du
    // inline, la formule elle-même ne peut pas se couper en interne —
    // voir .katex .base{white-space:nowrap} dans katex.min.css), et
    // remonter jusqu'au premier ancêtre non-inline pour avoir une
    // largeur de conteneur exploitable.
    let container = katexEl.parentElement;
    while(container && container.clientWidth === 0){
      container = container.parentElement;
    }
    if(!container) return;
    if(katexEl.getBoundingClientRect().width <= container.clientWidth) return;

    const wrap = document.createElement('span');
    wrap.className = 'math-scroll';
    katexEl.parentNode.insertBefore(wrap, katexEl);
    wrap.appendChild(katexEl);
  });
}

function typesetMath(el){
  if(window.renderMathInElement && el){
    window.renderMathInElement(el, {
      delimiters: [
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true },
      ],
      throwOnError: false,
    });
    wrapOverflowingMath(el);
    if(document.fonts && document.fonts.ready){
      document.fonts.ready.then(() => wrapOverflowingMath(el));
    }
  }
}
