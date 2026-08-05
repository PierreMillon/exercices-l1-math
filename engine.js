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
   Progression : on ne note pas un score, on trace juste la
   dernière consultation de chaque type dans localStorage, pour
   afficher un indicateur de régularité sobre sur l'accueil
   (voir index.html) — pas de gamification ici.
   ============================================================ */

const SEEN_PREFIX = 'l1ex_seen_';

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
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'reveal-btn';
    btn.textContent = 'Voir la solution rédigée';
    btn.addEventListener('click', () => {
      const showing = !solution.hidden;
      solution.hidden = showing;
      btn.textContent = showing ? 'Voir la solution rédigée' : 'Masquer la solution';
      if(!showing){ markSeen(pillarKey, typeId); }
    });
    wrap.appendChild(btn);
    wrap.appendChild(solution);
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
