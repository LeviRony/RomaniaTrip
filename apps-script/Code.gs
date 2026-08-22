const SPREADSHEET_ID = '1YcX5VHC2IAovzp3pYhmuIkzDN1cnR-14MSxvL8jD1sU';
const SHEETS = ['Expenses','Todo','Car','Itinerary','Votes','Family','Settings','ActivityLog'];

function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) || 'snapshot';
    if (action === 'ping') return json_({ok:true,service:'RomaniaTrip Family Sync',time:new Date().toISOString()});
    if (action === 'snapshot') return json_({ok:true,data:getSnapshot_(),time:new Date().toISOString()});
    return json_({ok:false,error:'Unknown action'});
  } catch (err) {
    return json_({ok:false,error:String(err && err.message || err)});
  }
}

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (body.action === 'sync') {
      const result = syncPayload_(body);
      return json_({ok:true,result,data:getSnapshot_(),time:new Date().toISOString()});
    }
    if (body.action === 'upsert') {
      const count = upsertRows_(body.sheet, body.rows || [], body.keyField || 'id');
      return json_({ok:true,count,time:new Date().toISOString()});
    }
    if (body.action === 'delete') {
      const count = deleteRows_(body.sheet, body.ids || [], body.keyField || 'id');
      return json_({ok:true,count,time:new Date().toISOString()});
    }
    return json_({ok:false,error:'Unknown action'});
  } catch (err) {
    return json_({ok:false,error:String(err && err.message || err)});
  }
}

function getSnapshot_() {
  const out = {};
  SHEETS.forEach(name => out[name] = readSheetObjects_(name));
  return out;
}

function syncPayload_(body) {
  const device = body.device || 'unknown';
  const member = body.member || device;
  const migrated = {};
  const payload = body.data || {};

  if (Array.isArray(payload.Expenses)) migrated.Expenses = upsertRows_('Expenses', payload.Expenses, 'id');
  if (Array.isArray(payload.Todo)) migrated.Todo = upsertRows_('Todo', payload.Todo, 'id');
  if (Array.isArray(payload.Itinerary)) migrated.Itinerary = upsertRows_('Itinerary', payload.Itinerary, 'id');
  if (Array.isArray(payload.Votes)) migrated.Votes = upsertRows_('Votes', payload.Votes, 'id');
  if (Array.isArray(payload.Family)) migrated.Family = upsertRows_('Family', payload.Family, 'id');
  if (Array.isArray(payload.Car)) migrated.Car = upsertRows_('Car', payload.Car, 'key');
  if (Array.isArray(payload.Settings)) migrated.Settings = upsertRows_('Settings', payload.Settings, 'key');

  appendActivity_(member, 'sync', 'device', device, JSON.stringify(migrated));
  return migrated;
}

function readSheetObjects_(name) {
  const sh = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(name);
  if (!sh) return [];
  const values = sh.getDataRange().getValues();
  if (!values.length) return [];
  const headers = values[0].map(String);
  return values.slice(1).filter(r => r.some(v => v !== '')).map(row => {
    const o = {};
    headers.forEach((h,i) => { if (h) o[h] = row[i]; });
    return o;
  });
}

function upsertRows_(sheetName, rows, keyField) {
  if (!SHEETS.includes(sheetName)) throw new Error('Unsupported sheet: ' + sheetName);
  if (!Array.isArray(rows) || !rows.length) return 0;
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sh = ss.getSheetByName(sheetName);
  if (!sh) throw new Error('Missing sheet: ' + sheetName);
  const data = sh.getDataRange().getValues();
  const headers = data[0].map(String);
  const keyCol = headers.indexOf(keyField);
  if (keyCol < 0) throw new Error('Missing key column ' + keyField + ' in ' + sheetName);
  const index = new Map();
  for (let i=1;i<data.length;i++) {
    const k = String(data[i][keyCol] ?? '');
    if (k) index.set(k, i+1);
  }
  let count = 0;
  rows.forEach(obj => {
    if (!obj || obj[keyField] === undefined || obj[keyField] === null || obj[keyField] === '') return;
    const row = headers.map(h => normalizeCell_(obj[h]));
    const key = String(obj[keyField]);
    const rowNum = index.get(key);
    if (rowNum) sh.getRange(rowNum,1,1,headers.length).setValues([row]);
    else {
      sh.appendRow(row);
      index.set(key, sh.getLastRow());
    }
    count++;
  });
  return count;
}

function deleteRows_(sheetName, ids, keyField) {
  if (!Array.isArray(ids) || !ids.length) return 0;
  const sh = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(sheetName);
  const values = sh.getDataRange().getValues();
  const headers = values[0].map(String);
  const keyCol = headers.indexOf(keyField);
  const wanted = new Set(ids.map(String));
  const rows = [];
  for (let i=1;i<values.length;i++) if (wanted.has(String(values[i][keyCol]))) rows.push(i+1);
  rows.sort((a,b)=>b-a).forEach(r=>sh.deleteRow(r));
  return rows.length;
}

function appendActivity_(member, action, entity, entityId, details) {
  const sh = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('ActivityLog');
  if (!sh) return;
  sh.appendRow([new Date(), member || '', action || '', entity || '', entityId || '', details || '']);
}

function normalizeCell_(v) {
  if (v === undefined || v === null) return '';
  if (typeof v === 'object') return JSON.stringify(v);
  return v;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
