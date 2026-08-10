#!/usr/bin/env node
/* ============================================================
   Vérifie que chaque data/<pilier>-index.js (id + titre seuls,
   chargé par l'accueil pour rester léger) reste synchronisé avec
   le data/<pilier>.js complet (source de vérité : ALGEBRE_TYPES,
   ANALYSE_TYPES, PROBABILITES_TYPES) — mêmes types, dans le même
   ordre, mêmes id/title. Exécuté en CI sur chaque pull request.
   ============================================================ */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const PILLARS = [
  { full: 'data/algebre.js', fullVar: 'ALGEBRE_TYPES', index: 'data/algebre-index.js', indexVar: 'ALGEBRE_INDEX' },
  { full: 'data/analyse.js', fullVar: 'ANALYSE_TYPES', index: 'data/analyse-index.js', indexVar: 'ANALYSE_INDEX' },
  { full: 'data/probabilites.js', fullVar: 'PROBABILITES_TYPES', index: 'data/probabilites-index.js', indexVar: 'PROBABILITES_INDEX' },
];

// Les fichiers de données déclarent leur variable avec `const` au
// niveau racine : dans un contexte vm, ça ne devient pas une propriété
// de l'objet global (contrairement à `var`), donc on exécute plutôt le
// code dans le corps d'une fonction et on récupère la variable locale
// via `return` — fonctionne aussi bien avec `const`/`let` que `var`.
function loadVar(relPath, varName){
  const code = fs.readFileSync(path.join(ROOT, relPath), 'utf8');
  const run = new Function(code + '\nreturn typeof ' + varName + ' === "undefined" ? undefined : ' + varName + ';');
  const result = run();
  if(result === undefined){
    throw new Error(varName + ' introuvable dans ' + relPath);
  }
  return result;
}

let fail = false;

for(const p of PILLARS){
  const expected = loadVar(p.full, p.fullVar).map(t => ({ id: t.id, title: t.title }));
  const actual = loadVar(p.index, p.indexVar);

  const expectedStr = JSON.stringify(expected, null, 2);
  const actualStr = JSON.stringify(actual, null, 2);

  if(expectedStr !== actualStr){
    console.error('::error file=' + p.index + '::désynchronisé de ' + p.full + '. Attendu :\n' + expectedStr);
    fail = true;
  }else{
    console.log('OK — ' + p.index + ' synchronisé avec ' + p.full + ' (' + actual.length + ' types).');
  }
}

process.exit(fail ? 1 : 0);
