/* ============================================================
   L1 MATHS — EXERCICES TYPE EXAMEN — engine.js
   Moteur commun aux 3 pages piliers (algebre.html, analyse.html,
   probabilites.html). Chaque page ne fournit que ses données
   (un tableau de "types d'exercice", voir data/*.js) et appelle
   initPillar(pillarKey, pillarLabel, types).

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
   \( ... \) (inline) ou \[ ... \] (bloc), et du HTML simple.
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

function renderExercice(pillarKey, typeId, exo, index, kind){
  const wrap = document.createElement('div');
  wrap.className = kind === 'exemple' ? 'exemple' : 'exercice';

  const label = document.createElement('div');
  label.className = 'bloc-label';
  label.textContent = kind === 'exemple' ? 'Exemple rédigé' : 'Exercice ' + index;
  wrap.appendChild(label);

  const enonce = document.createElement('div');
  enonce.className = 'enonce';
  enonce.innerHTML = exo.enonce;
  wrap.appendChild(enonce);

  const solution = document.createElement('div');
  solution.className = 'solution';
  solution.innerHTML = exo.solution;

  if(kind === 'exemple'){
    wrap.appendChild(solution);
  }else{
    solution.hidden = true;

    const feedback = document.createElement('div');
    feedback.className = 'feedback';
    feedback.hidden = true;

    const feedbackLabel = document.createElement('span');
    feedbackLabel.className = 'feedback-label';
    feedbackLabel.textContent = 'Réussi ?';
    feedback.appendChild(feedbackLabel);

    const okBtn = document.createElement('button');
    okBtn.type = 'button';
    okBtn.className = 'feedback-btn';
    okBtn.textContent = '✓ Réussi';
    feedback.appendChild(okBtn);

    const koBtn = document.createElement('button');
    koBtn.type = 'button';
    koBtn.className = 'feedback-btn';
    koBtn.textContent = '✗ Raté';
    feedback.appendChild(koBtn);

    function note(delta){
      bumpScore(pillarKey, typeId, delta);
      const scoreEl = document.getElementById('score-' + typeId);
      if(scoreEl) scoreEl.textContent = formatScore(pillarKey, typeId);
    }
    // Déclaratif et sans mémoire d'état : chaque clic ajuste le score de
    // ±1 immédiatement, les boutons restent cliquables (on peut refaire
    // l'exercice à une séance suivante et redéclarer un résultat). Rien
    // n'est désactivé ni "coché" — seul le score cumulé est conservé
    // (localStorage), pas l'état des boutons, qui repart à zéro visuellement
    // à chaque rechargement de page.
    okBtn.addEventListener('click', () => note(1));
    koBtn.addEventListener('click', () => note(-1));

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'reveal-btn';
    btn.textContent = 'Voir la solution rédigée';
    btn.addEventListener('click', () => {
      const showing = !solution.hidden;
      solution.hidden = showing;
      feedback.hidden = showing;
      btn.textContent = showing ? 'Voir la solution rédigée' : 'Masquer la solution';
      if(!showing){ markSeen(pillarKey, typeId); }
    });
    wrap.appendChild(btn);
    wrap.appendChild(solution);
    wrap.appendChild(feedback);
  }

  return wrap;
}

function renderType(pillarKey, type){
  const section = document.createElement('section');
  section.className = 'type';
  section.id = type.id;

  const h2 = document.createElement('h2');
  h2.textContent = type.title;
  section.appendChild(h2);

  const lastSeen = document.createElement('p');
  lastSeen.className = 'type-last-seen';
  lastSeen.id = 'lastseen-' + type.id;
  lastSeen.textContent = formatLastSeen(pillarKey, type.id);
  section.appendChild(lastSeen);

  const score = document.createElement('p');
  score.className = 'type-score';
  score.id = 'score-' + type.id;
  score.textContent = formatScore(pillarKey, type.id);
  section.appendChild(score);

  const signal = document.createElement('p');
  signal.className = 'signal';
  signal.innerHTML = '<span class="signal-label">Signal</span>' + type.signal;
  section.appendChild(signal);

  const methodeLabel = document.createElement('p');
  methodeLabel.className = 'methode-label';
  methodeLabel.textContent = 'Méthode';
  section.appendChild(methodeLabel);

  const ol = document.createElement('ol');
  ol.className = 'methode';
  type.methode.forEach(step => {
    const li = document.createElement('li');
    li.innerHTML = step;
    ol.appendChild(li);
  });
  section.appendChild(ol);

  section.appendChild(renderExercice(pillarKey, type.id, type.exemple, 0, 'exemple'));

  type.exercices.forEach((exo, i) => {
    section.appendChild(renderExercice(pillarKey, type.id, exo, i + 1, 'exercice'));
  });

  return section;
}

function renderToc(types){
  const toc = document.createElement('nav');
  toc.className = 'toc';
  toc.setAttribute('aria-label', 'Sommaire');
  const label = document.createElement('span');
  label.className = 'toc-label';
  label.textContent = 'Sommaire';
  toc.appendChild(label);
  const ol = document.createElement('ol');
  types.forEach(t => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + t.id;
    a.className = 'plain';
    a.textContent = t.title;
    li.appendChild(a);
    ol.appendChild(li);
  });
  toc.appendChild(ol);
  return toc;
}

function initPillar(pillarKey, types){
  const container = document.getElementById('typesContainer');
  if(!container) return;

  const tocSlot = document.getElementById('tocSlot');
  if(tocSlot) tocSlot.appendChild(renderToc(types));

  types.forEach(type => container.appendChild(renderType(pillarKey, type)));

  const toggleBtn = document.getElementById('toggleAllBtn');
  if(toggleBtn){
    let allShown = false;
    toggleBtn.addEventListener('click', () => {
      allShown = !allShown;
      container.querySelectorAll('.solution').forEach(sol => { sol.hidden = !allShown; });
      container.querySelectorAll('.feedback').forEach(fb => { fb.hidden = !allShown; });
      container.querySelectorAll('.reveal-btn').forEach(btn => {
        btn.textContent = allShown ? 'Masquer la solution' : 'Voir la solution rédigée';
      });
      toggleBtn.textContent = allShown ? 'Masquer toutes les solutions' : 'Afficher toutes les solutions';
      if(allShown){
        types.forEach(t => markSeen(pillarKey, t.id));
        types.forEach(t => {
          const el = document.getElementById('lastseen-' + t.id);
          if(el) el.textContent = formatLastSeen(pillarKey, t.id);
        });
      }
    });
  }

  typesetMath(container);
}
window.initPillar = initPillar;
