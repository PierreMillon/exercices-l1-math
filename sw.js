/* ============================================================
   EXERCICES TYPE EXAMEN — L1 MATHS — sw.js
   Service worker : mode hors-ligne minimal mais complet — une fois le
   site visité une première fois avec réseau, cache-first offre à la
   fois vitesse et fonctionnement à 100% en avion (recharger la page
   ne casse rien). Même dispositif que sur licence-math et
   alice-et-sophie (dépôts du même auteur).

   Stratégie volontairement simple, cohérente avec un site statique
   sans build ni API :
   - install  : précharge tout ce qu'il faut pour une utilisation
     complète hors-ligne (les 5 pages, le CSS/JS, les données de
     chaque pilier, KaTeX vendorisé, manifest, icônes).
   - activate : supprime les anciens caches (versions précédentes du
     site) pour ne jamais accumuler de fichiers obsolètes.
   - fetch    : sert depuis le cache en priorité (cache-first) — plus
     rapide, et ne dépend du réseau que pour aller chercher une MISE
     À JOUR (nouveau sw.js, détecté automatiquement par le navigateur
     à chaque visite quand il y a du réseau ; rien de spécial à coder
     pour ça, comportement natif des service workers).

   Ce site n'a pas de numéro de version affiché (contrairement à
   licence-math/alice-et-sophie) : VERSION ci-dessous est une
   constante locale à sw.js, à incrémenter manuellement à chaque ship
   qui touche un fichier précaché (HTML/CSS/JS/data/*.js) — sinon le
   service worker sert indéfiniment une vieille version en cache. */
const VERSION = 1;
const CACHE_NAME = 'exercices-l1-math-v' + VERSION;

const PRECACHE_URLS = [
  './', 'index.html', 'algebre.html', 'analyse.html', 'probabilites.html',
  'python-applique.html',
  'style.css', 'engine.js', 'katex-typeset.js',
  'data/algebre-index.js', 'data/algebre.js',
  'data/analyse-index.js', 'data/analyse.js',
  'data/probabilites-index.js', 'data/probabilites.js',
  'data/python-applique.js',
  'manifest.json',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png',
  'vendor/katex/katex.min.css', 'vendor/katex/katex.min.js',
  'vendor/katex/auto-render.min.js',
  'vendor/katex/fonts/KaTeX_AMS-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Caligraphic-Bold.woff2',
  'vendor/katex/fonts/KaTeX_Caligraphic-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Fraktur-Bold.woff2',
  'vendor/katex/fonts/KaTeX_Fraktur-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Main-Bold.woff2',
  'vendor/katex/fonts/KaTeX_Main-BoldItalic.woff2',
  'vendor/katex/fonts/KaTeX_Main-Italic.woff2',
  'vendor/katex/fonts/KaTeX_Main-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Math-BoldItalic.woff2',
  'vendor/katex/fonts/KaTeX_Math-Italic.woff2',
  'vendor/katex/fonts/KaTeX_SansSerif-Bold.woff2',
  'vendor/katex/fonts/KaTeX_SansSerif-Italic.woff2',
  'vendor/katex/fonts/KaTeX_SansSerif-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Script-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Size1-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Size2-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Size3-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Size4-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Typewriter-Regular.woff2',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      // skipWaiting : la nouvelle version prend la main dès son
      // installation terminée, sans attendre la fermeture de tous les
      // onglets.
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if(event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  // Laisse passer tel quel tout ce qui n'est pas sur ce domaine —
  // jamais mis en cache, jamais ce qui bloque le mode hors-ligne du
  // reste du site si injoignable.
  if(url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
