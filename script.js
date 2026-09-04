const KEY = 'bcs-score-v1';
const scoreEl = document.getElementById('score');
const clicker = document.getElementById('clicker');
const resetBtn = document.getElementById('reset');
const autoCheckbox = document.getElementById('autoclick');
let score = 0;
let autoInterval = null;

function load(){
  try{
    const raw = localStorage.getItem(KEY);
    score = raw ? parseInt(raw,10) : 0;
    if (!Number.isFinite(score)) score = 0;
  }catch(e){ score = 0 }
  update();
}

function save(){
  try{ localStorage.setItem(KEY, String(score)) }catch(e){}
}

function update(){
  scoreEl.textContent = score;
}

clicker.addEventListener('click', ()=>{
  score += 1;
  update();
  save();
});

resetBtn.addEventListener('click', ()=>{
  if(confirm('Reset score to 0?')){
    score = 0; update(); save();
  }
});

autoCheckbox.addEventListener('change', ()=>{
  if(autoCheckbox.checked){
    startAuto();
  }else{
    stopAuto();
  }
});

function startAuto(){
  if(autoInterval) return;
  autoInterval = setInterval(()=>{ score += 1; update(); save(); }, 1000);
}
function stopAuto(){ if(autoInterval){ clearInterval(autoInterval); autoInterval = null } }

// init
load();
// restore auto state if previously enabled? keep unchecked by default
