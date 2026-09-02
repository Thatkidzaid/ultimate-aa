const fs = require('fs');
const path = 'index.html';
let html = fs.readFileSync(path, 'utf8');

// Keep the browser tab spelling correct.
html = html.replace(/<title>.*?<\/title>/s, '<title>Ultimate Key To Success</title>');

// Remove duplicate sidebar branding while preserving the header space for the close control.
html = html.replace(
  '<div class="sidebar-head">Hallab Education · Ultimate AA</div>',
  '<div class="sidebar-head" aria-hidden="true"></div>'
);

// Remove old repeated Hallab copy/tagline if present anywhere in the page shell.
html = html.replace(/Better Resources\. Higher Results\./g, '');
html = html.replace('<div class="hallab-footer"><strong>Hallab Education</strong></div>', '');

// Inject the final production-only layout corrections once.
const style = `
<style id="hallab-final-production-fix">
.sidebar-head{
  min-height:76px!important;
  height:76px!important;
  padding:0!important;
  font-size:0!important;
  line-height:0!important;
  color:transparent!important;
}
.hallab-hero-copy{
  width:100%!important;
  max-width:none!important;
}
.hallab-hero h1{
  width:100%!important;
  max-width:none!important;
  margin:0!important;
  color:#d6b47e!important;
  font-family:Georgia,'Times New Roman',serif!important;
  font-size:clamp(3rem,4.4vw,4.8rem)!important;
  font-weight:500!important;
  line-height:1!important;
  letter-spacing:-.045em!important;
  white-space:nowrap!important;
  text-wrap:nowrap!important;
}
@media(max-width:760px){
  .hallab-hero h1{
    font-size:clamp(2.25rem,9vw,3.6rem)!important;
    white-space:normal!important;
    text-wrap:balance!important;
  }
}
</style>`;

if (!html.includes('hallab-final-production-fix')) {
  html = html.replace('</head>', `${style}\n</head>`);
}

fs.writeFileSync(path, html);
console.log('Applied final Hallab production fixes.');
