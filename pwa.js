/* ============================================================
   EXERCICES TYPE EXAMEN — L1 MATHS — pwa.js
   Enregistrement du service worker (voir sw.js) pour le mode
   hors-ligne. Chargé sur les 5 pages du site. Garde standard, échec
   silencieux si indisponible — le site continue de fonctionner
   normalement, juste sans mode hors-ligne.
   ============================================================ */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
