const palettes = {
  moonlit: {bg:'#0b1020', fg:'#e6eef8', muted:'#93a6c4', accent:'#8b5cf6'},
  aurora: {bg:'#071232', fg:'#eafff9', muted:'#86e3ce', accent:'#7b61ff'},
  sunrise: {bg:'#fff7eb', fg:'#3a2b20', muted:'#b78a6f', accent:'#ff8a65'}
};
// Contributors add palettes here

const sel = document.getElementById('palette');
Object.keys(palettes).forEach(k=>{
  const o = document.createElement('option'); o.value=k; o.textContent = k;
  sel.appendChild(o);
});
sel.addEventListener('change', e => applyPalette(e.target.value));
document.getElementById('export').addEventListener('click', ()=> {
  const key = sel.value;
  const css = generateCss(palettes[key]);
  const out = document.getElementById('cssout');
  out.hidden = false; out.textContent = css;
});

function applyPalette(key){
  const p = palettes[key];
  if(!p) return;
  Object.entries(p).forEach(([k,v]) => {
    document.documentElement.style.setProperty(`--${k}`, v);
  });
}

function generateCss(p){
  return `:root {
  --bg: ${p.bg};
  --fg: ${p.fg};
  --muted: ${p.muted};
  --accent: ${p.accent};
}`;
}

// initial
applyPalette('moonlit');
