const fs = require('fs');

const file = 'index.html';
let html = fs.readFileSync(file, 'utf8');

const oldBlock = `  const applyList = async el => {
    const {file,path}=parse(el.dataset.cmsList); const data=await loadFile(file); const value=getPath(data,path); if(!Array.isArray(value)) return;
    const tag = el.tagName.toLowerCase();
    el.replaceChildren(...value.map(text => { const li=document.createElement('li'); li.textContent=text; return li; }));
  };`;

const newBlock = `  const applyList = async el => {
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

if (html.includes(oldBlock)) {
  html = html.replace(oldBlock, newBlock);
  fs.writeFileSync(file, html, 'utf8');
  console.log('CMS list renderer fixed.');
} else if (html.includes(newBlock)) {
  console.log('CMS list renderer already fixed.');
} else {
  throw new Error('CMS list renderer block not found.');
}
