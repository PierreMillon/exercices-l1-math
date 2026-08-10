/* ============================================================
   L1 MATHS — EXERCICES TYPE EXAMEN — engine.js
   Moteur commun aux 3 pages piliers (algebre.html, analyse.html,
   probabilites.html). Chaque page ne fournit que ses données
   (un tableau de "types d'exercice", voir data/*.js) et appelle
   initPillar(pillarKey, types).

   Format d'un type d'exercice (voir data/*.js pour des exemples) :
   {
     id: 'identifiant-court',
     title: 'Titre affiché',
     signal: 'Comment reconnaître ce type dans un énoncé.',
     methode: ['étape 1', 'étape 2', ...],
     exemple: { enonce: '...', solution: '...' },
     exercices: [ { enonce: '...', solution: '...' }, ... ]
   }

   Le texte peut contenir des formules KaTeX délimitées par
   \( ... \) (inline) ou \[ ... \] (bloc), et du HTML simple —
   inséré tel quel (innerHTML), comme pour title/signal/methode :
   ce sont des données de premier parti (data/*.js), pas une saisie
   utilisateur, donc pas d'échappement ici.

   Rendu : chaque type est une chaîne HTML (template), assemblée et
   injectée en une fois par innerHTML plutôt que construite nœud par
   nœud — plus court à lire, et un seul listener par page (délégation
   d'événements sur #typesContainer) plutôt qu'un par bouton.
   typesetMath() vient de katex-typeset.js (chargé avant ce fichier).

   Progression : pas de gamification (pas de note calculée, pas de
   correction automatique). Deux mécanismes, tous deux déclaratifs :
   - dernière consultation de chaque type (localStorage), pour
     l'indicateur de régularité "à réviser en priorité" (index.html) ;
   - score de réussite déclaré à la main sur chaque exercice
     d'entraînement une fois la solution révélée (bouton Réussi/Raté),
     cumulé par type. C'est l'utilisateur qui juge s'il a réussi, pas
     le site — le score sert juste à faire remonter sur l'accueil les
     types les moins réussis (voir index.html).
   ============================================================ */

const SEEN_PREFIX = 'l1ex_seen_';
const SCORE_PREFIX = 'l1ex_score_';

function markSeen(pillarKey, typeId){
  try{ localStorage.setItem(SEEN_PREFIX + pillarKey + '_' + typeId, String(Date.now())); }
  catch(e){ /* localStorage indisponible (navigation privée…) : on ignore silencieusement */ }
}

function getSeen(pillarKey, typeId){
  try{
    const raw = localStorage.getItem(SEEN_PREFIX + pillarKey + '_' + typeId);
    return raw ? Number(raw) : null;
  }catch(e){ return null; }
}

function daysAgo(timestamp){
  return Math.floor((Date.now() - timestamp) / (1000 * 60 * 60 * 24));
}

function formatLastSeen(pillarKey, typeId){
  const ts = getSeen(pillarKey, typeId);
  if(!ts) return 'Jamais consulté';
  const d = daysAgo(ts);
  if(d <= 0) return 'Consulté aujourd’hui';
  if(d === 1) return 'Consulté hier';
  return 'Consulté il y a ' + d + ' jours';
}

function getScore(pillarKey, typeId){
  try{
    const raw = localStorage.getItem(SCORE_PREFIX + pillarKey + '_' + typeId);
    return raw === null ? null : Number(raw);
  }catch(e){ return null; }
}

function bumpScore(pillarKey, typeId, delta){
  try{
    const next = (getScore(pillarKey, typeId) || 0) + delta;
    localStorage.setItem(SCORE_PREFIX + pillarKey + '_' + typeId, String(next));
    return next;
  }catch(e){ return null; }
}

function formatScore(pillarKey, typeId){
  const s = getScore(pillarKey, typeId);
  if(s === null) return 'Pas encore auto-évalué';
  return 'Réussite déclarée : ' + (s > 0 ? '+' : '') + s;
}

function exempleTemplate(exo){
  return `
    <div class="exemple">
      <div class="bloc-label">Exemple rédigé</div>
      <div class="enonce">${exo.enonce}</div>
      <div class="solution">${exo.solution}</div>
    </div>`;
}

function exerciceTemplate(exo, index){
  return `
    <div class="exercice" data-exo>
      <div class="bloc-label">Exercice ${index}</div>
      <div class="enonce">${exo.enonce}</div>
      <button type="button" class="btn js-reveal">Voir la solution rédigée</button>
      <div class="solution" hidden>${exo.solution}</div>
      <div class="feedback" hidden>
        <span class="feedback-label">Réussi ?</span>
        <button type="button" class="btn js-feedback" data-delta="1">✓ Réussi</button>
        <button type="button" class="btn js-feedback" data-delta="-1">✗ Raté</button>
      </div>
    </div>`;
}

function typeTemplate(pillarKey, type){
  const methodeHtml = type.methode.map(step => `<li>${step}</li>`).join('');
  const exercicesHtml = type.exercices.map((exo, i) => exerciceTemplate(exo, i + 1)).join('');
  return `
    <section class="type" id="${type.id}" data-type-id="${type.id}">
      <h2>${type.title}</h2>
      <p class="type-last-seen" data-role="last-seen">${formatLastSeen(pillarKey, type.id)}</p>
      <p class="type-score" data-role="score">${formatScore(pillarKey, type.id)}</p>
      <p class="signal"><span class="signal-label">Signal</span>${type.signal}</p>
      <p class="methode-label">Méthode</p>
      <ol class="methode">${methodeHtml}</ol>
      ${exempleTemplate(type.exemple)}
      ${exercicesHtml}
    </section>`;
}

function tocTemplate(types){
  const items = types.map(t => `<li><a href="#${t.id}" class="plain">${t.title}</a></li>`).join('');
  return `
    <nav class="toc" aria-label="Sommaire">
      <span class="toc-label">Sommaire</span>
      <ol>${items}</ol>
    </nav>`;
}

// Une révélation de solution montre/masque .solution ET .feedback
// ensemble (même exercice), marque le type comme consulté, et
// rafraîchit l'affichage "dernière consultation" de ce type.
function handleReveal(container, pillarKey, btn){
  const exo = btn.closest('[data-exo]');
  const typeSection = btn.closest('.type');
  const solution = exo.querySelector('.solution');
  const feedback = exo.querySelector('.feedback');

  const nowHidden = !solution.hidden;
  solution.hidden = nowHidden;
  feedback.hidden = nowHidden;
  btn.textContent = nowHidden ? 'Voir la solution rédigée' : 'Masquer la solution';

  if(!nowHidden){
    const typeId = typeSection.dataset.typeId;
    markSeen(pillarKey, typeId);
    typeSection.querySelector('[data-role="last-seen"]').textContent = formatLastSeen(pillarKey, typeId);
  }
}

// Déclaratif et sans mémoire d'état : chaque clic ajuste le score de
// ±1 immédiatement, les boutons restent cliquables (on peut refaire
// l'exercice à une séance suivante et redéclarer un résultat). Rien
// n'est désactivé ni "coché" — seul le score cumulé est conservé
// (localStorage), pas l'état des boutons ni de la solution/feedback
// affichés, qui repartent à zéro visuellement à chaque rechargement.
function handleFeedback(pillarKey, btn){
  const typeSection = btn.closest('.type');
  const typeId = typeSection.dataset.typeId;
  bumpScore(pillarKey, typeId, Number(btn.dataset.delta));
  typeSection.querySelector('[data-role="score"]').textContent = formatScore(pillarKey, typeId);
}

function initPillar(pillarKey, types){
  const container = document.getElementById('typesContainer');
  if(!container) return;

  const tocSlot = document.getElementById('tocSlot');
  if(tocSlot) tocSlot.innerHTML = tocTemplate(types);

  container.innerHTML = types.map(t => typeTemplate(pillarKey, t)).join('');

  // Un seul listener pour tous les boutons de la page (révélation de
  // solution + auto-évaluation), plutôt qu'un par exercice.
  container.addEventListener('click', e => {
    const revealBtn = e.target.closest('.js-reveal');
    if(revealBtn){ handleReveal(container, pillarKey, revealBtn); return; }

    const feedbackBtn = e.target.closest('.js-feedback');
    if(feedbackBtn){ handleFeedback(pillarKey, feedbackBtn); }
  });

  const toggleBtn = document.getElementById('toggleAllBtn');
  if(toggleBtn){
    let allShown = false;
    toggleBtn.addEventListener('click', () => {
      allShown = !allShown;
      container.querySelectorAll('.solution').forEach(sol => { sol.hidden = !allShown; });
      container.querySelectorAll('.feedback').forEach(fb => { fb.hidden = !allShown; });
      container.querySelectorAll('.js-reveal').forEach(btn => {
        btn.textContent = allShown ? 'Masquer la solution' : 'Voir la solution rédigée';
      });
      toggleBtn.textContent = allShown ? 'Masquer toutes les solutions' : 'Afficher toutes les solutions';
      if(allShown){
        types.forEach(t => {
          markSeen(pillarKey, t.id);
          const el = document.getElementById(t.id).querySelector('[data-role="last-seen"]');
          if(el) el.textContent = formatLastSeen(pillarKey, t.id);
        });
      }
    });
  }

  typesetMath(container);
}
window.initPillar = initPillar;
