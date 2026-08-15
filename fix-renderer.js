const fs = require('fs');

const file = 'index.html';
let html = fs.readFileSync(file, 'utf8');

const oldList = `  const applyList = async el => {
    const {file,path}=parse(el.dataset.cmsList); const data=await loadFile(file); const value=getPath(data,path); if(!Array.isArray(value)) return;
    const tag = el.tagName.toLowerCase();
    el.replaceChildren(...value.map(text => { const li=document.createElement('li'); li.textContent=text; return li; }));
  };`;
const fixedList = `  const applyList = async el => {
    const {file,path}=parse(el.dataset.cmsList); const data=await loadFile(file); const value=getPath(data,path); if(!Array.isArray(value)) return;
    const isList = /^(UL|OL)$/.test(el.tagName);
    const heading = !isList ? el.querySelector(':scope > h3')?.cloneNode(true) : null;
    const items = value.map(text => {
      const node=document.createElement(isList ? 'li' : 'p');
      node.textContent=text;
      return node;
    });
    el.replaceChildren(...(heading ? [heading] : []), ...items);
  };`;
if (html.includes(oldList)) html = html.replace(oldList, fixedList);

const localLoader = `  const loadFile = async (file) => {
    if (!cache.has(file)) cache.set(file, fetch('./content/' + file, {cache:'no-store'}).then(r => { if(!r.ok) throw new Error(file); return r.json(); }));
    return cache.get(file);
  };`;
const liveLoader = `  const SUPABASE_URL = 'https://gsgvejjnorbnizddjnfw.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_A4eEoTqk47CdDo76iJZGqg_w-4qg7fd';
  const loadFile = async (file) => {
    if (!cache.has(file)) {
      const url = \`${SUPABASE_URL}/rest/v1/ala_content?path=eq.\${encodeURIComponent(file)}&select=content\`;
      cache.set(file, fetch(url, { cache:'no-store', headers:{ apikey:SUPABASE_KEY } }).then(async r => {
        if(!r.ok) throw new Error(file);
        const rows=await r.json();
        if(!rows.length || !rows[0].content) throw new Error(file);
        return rows[0].content;
      }));
    }
    return cache.get(file);
  };`;
if (html.includes(localLoader)) html = html.replace(localLoader, liveLoader);

if (!html.includes(fixedList) || !html.includes('rest/v1/ala_content')) {
  throw new Error('Could not prepare live Supabase content renderer.');
}
fs.writeFileSync(file, html, 'utf8');
console.log('ALA live content renderer prepared.');
