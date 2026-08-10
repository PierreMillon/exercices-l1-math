/* ============================================================
   katex-typeset.js — rendu KaTeX partagé entre engine.js (pages
   piliers) et python-applique.html (pas la même structure de
   données, donc pas engine.js en entier — juste ce helper).
   Chargé après vendor/katex/*.js (deferred), avant tout script qui
   appelle typesetMath().
   ============================================================ */

function typesetMath(el){
  if(window.renderMathInElement && el){
    window.renderMathInElement(el, {
      delimiters: [
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true },
      ],
      throwOnError: false,
    });
  }
}
