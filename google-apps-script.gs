/**
 * Learn 2 Fly — acumulador de estrellas + verificación de nombre (Google Sheets)
 *
 * CÓMO CONECTARLO (una sola vez):
 * 1. Crea una Google Sheet nueva.
 * 2. Extensiones → Apps Script. Borra todo y pega este archivo. Guarda.
 * 3. Implementar → Nueva implementación → "Aplicación web"
 *      - Ejecutar como: Yo
 *      - Quién tiene acceso: Cualquiera
 *    Copia la URL (termina en /exec).
 * 4. En index.html pon esa URL en:   const SHEET_URL='...';
 *
 * Qué hace:
 *  - POST {name, earned}      -> suma "earned" estrellas a la fila de ese nombre (las acumula).
 *  - GET  ?check=NAME&callback=fn  -> responde fn({"taken":true|false})  (para "disponible / ocupado").
 *  - GET  ?callback=fn        -> responde fn([...top 20...])  (leaderboard, opcional).
 */

function doPost(e){
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try{
    var data = JSON.parse(e.postData.contents);
    var name = (data.name || 'Player').toString().substring(0,16);
    var earned = Number(data.earned) || 0;
    var sh = sheet_();
    var row = findRow_(sh, name);
    if (row === -1){
      sh.appendRow([name, earned, new Date()]);
    } else {
      var cur = Number(sh.getRange(row,2).getValue()) || 0;
      sh.getRange(row,2).setValue(cur + earned);
      sh.getRange(row,3).setValue(new Date());
    }
    return ContentService.createTextOutput('ok');
  } catch(err){
    return ContentService.createTextOutput('error: ' + err);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e){
  var cb    = e && e.parameter ? e.parameter.callback : null;
  var check = e && e.parameter ? e.parameter.check    : undefined;
  var sh = sheet_();
  var payload;

  if (check !== undefined && check !== null){
    payload = { taken: findRow_(sh, check.toString()) !== -1 };
  } else {
    var out = [];
    if (sh.getLastRow() > 1){
      out = sh.getRange(2,1,sh.getLastRow()-1,2).getValues()
        .sort(function(a,b){ return b[1]-a[1]; }).slice(0,20);
    }
    payload = out;
  }

  var json = JSON.stringify(payload);
  if (cb){
    return ContentService.createTextOutput(cb + '(' + json + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function sheet_(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('Scores') || ss.insertSheet('Scores');
  if (sh.getLastRow() === 0) sh.appendRow(['Nombre','Estrellas','Última vez']);
  return sh;
}
function findRow_(sh, name){
  var last = sh.getLastRow();
  if (last < 2) return -1;
  var names = sh.getRange(2,1,last-1,1).getValues();
  for (var i=0;i<names.length;i++){ if ((names[i][0]||'').toString() === name) return i+2; }
  return -1;
}
