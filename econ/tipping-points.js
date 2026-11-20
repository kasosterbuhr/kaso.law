/* Coase Machine tipping points. Model arithmetic copied automatically from
   explorer.html's own recalculate() at build time; not invented thresholds. */
(()=>{
"use strict";
const labels={abandon:"NO FILING",settle:"SETTLE",trial:"TRIAL"};
const colors={abandon:"#fb7185",settle:"#34d399",trial:"#fbbf24"};
const cash=n=>"$"+Math.round(n).toLocaleString("en-US");
function pathAt(change={}){
 const st={...state,...change},s=SCENARIOS[st.scenarioIndex];
 const isDefense=st.role==="defense",lambda=st.rep/100,alpha=st.ai/100;
 const V=st.V,pBase=st.p,C_atty_full=st.C0;
  const scaleRatio = Math.max(0.25, V / s.V);
  const filingFee = isDefense ? 0 : s.filingFee * Math.pow(scaleRatio, 0.35);
  const baseSelfTimeCost = (isDefense ? s.proseTimeBase * 0.75 : s.proseTimeBase) * Math.pow(scaleRatio, 0.65);

  const selfShare = 1 - lambda;
  const selfAiEfficiency = 1 - (0.62 * Math.pow(alpha, 0.85));
  const userTimeAndFrictionCost = selfShare * baseSelfTimeCost * selfAiEfficiency;

  const attorneyScopeFactor = Math.pow(lambda, 1.45);
  const attorneyAiEfficiency = 1 - (0.55 * Math.pow(alpha, 0.90));
  const userAttorneyFeeCost = C_atty_full * attorneyScopeFactor * attorneyAiEfficiency;

  const totalUserCost = filingFee + userTimeAndFrictionCost + userAttorneyFeeCost;
  const userCf = filingFee + (userTimeAndFrictionCost + userAttorneyFeeCost) * 0.32;
  const userCt = Math.max(0, totalUserCost - userCf);

  // Opponent cost & AI modeling
  let oppAlpha = alpha;
  if (st.oppMode === 'asymmetric_player') oppAlpha = alpha * 0.15;
  if (st.oppMode === 'asymmetric_repeat') oppAlpha = Math.min(1, alpha + 0.45);

  const oppBaseCost = (isDefense ? s.C0 * 0.55 : s.defendantC0) * Math.pow(scaleRatio, 0.65);
  const totalOppCost = Math.max(120, oppBaseCost * (1 - 0.60 * Math.pow(oppAlpha, 0.85)));
  const oppCt = totalOppCost * 0.68;

  // Effective probability of Plaintiff prevailing
  const humanAdvocacyDelta = (1 - lambda) * -0.16 + (lambda * 0.04);
  const aiBoost = (1 - lambda) * (0.16 * Math.sin(alpha * Math.PI * 0.72));
  const hallucinationPenalty = (1 - lambda) * (alpha > 0.70 ? (alpha - 0.70) * 0.30 : 0);
  const oppStrengthDelta = (oppAlpha - (0.5 * alpha + 0.5 * lambda)) * 0.08;

  let pPlaintiffEff = pBase;
  if (!isDefense) {
    pPlaintiffEff = Math.min(0.96, Math.max(0.05, pBase + humanAdvocacyDelta + aiBoost - hallucinationPenalty - oppStrengthDelta));
  } else {
    // Defense representation & AI reduce plaintiff's win probability
    pPlaintiffEff = Math.min(0.96, Math.max(0.05, pBase - humanAdvocacyDelta - aiBoost + hallucinationPenalty + oppStrengthDelta));
  }

  const pStage2Eff = Math.min(0.96, Math.max(0.05, st.pStage2 + (0.08 * lambda) + (0.08 * alpha * (1 - lambda))));

  const optimismBias = (1 - 0.7 * lambda) * (alpha > 0.60 ? (alpha - 0.60) * 0.32 : 0.03 * alpha);
  const pPlaintiffBelief = Math.min(0.98, pPlaintiffEff + optimismBias);
  const pDefendantBelief = Math.max(0.02, pPlaintiffEff - optimismBias);

  const plCt = isDefense ? oppCt : userCt;
  const defCt = isDefense ? userCt : oppCt;
  const totalPlCost = isDefense ? totalOppCost : totalUserCost;
  const totalDefCost = isDefense ? totalUserCost : totalOppCost;

  const Tp = (pPlaintiffBelief * V) - plCt;
  const defStakes = V * (s.defendantV / s.V);
  const Td = (pDefendantBelief * defStakes) + defCt;

  const evPlaintiffFromStart = (pPlaintiffEff * V) - totalPlCost;
  const zopaExists = Td >= Tp;
  const settleAmount = zopaExists ? (Tp + Td) / 2 : 0;
  const evFile = zopaExists ? Math.max(evPlaintiffFromStart, settleAmount - (isDefense ? totalOppCost * 0.32 : userCf)) : evPlaintiffFromStart;

  let equilibrium = 'abandon';
  if (evFile <= 0) {
    equilibrium = 'abandon';
  } else if (zopaExists) {
    equilibrium = 'settle';
  } else {
    equilibrium = 'trial';
  }

return {path:equilibrium,ev:evFile};
}
const CSS="\n.coaseTipsNow{border:1px solid #477e92;background:linear-gradient(115deg,#143443,#152943);\nborder-radius:13px;padding:12px 15px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}\n.coaseTipsNow .label{font-size:11px;font-weight:850;letter-spacing:.12em;color:#cae0e9}\n.coaseTipsNow .value{font-size:clamp(20px,3vw,30px);font-weight:950}\n.coaseTipsNow .help{font-size:11px;color:#d1e2f0;max-width:450px;line-height:1.45}\n.coaseTipsLegend{display:flex;gap:12px;flex-wrap:wrap;font-size:10px;font-weight:850;margin-top:5px;color:#b6ccdd}\n.coaseTipsLegend i{display:inline-block;width:9px;height:9px;margin-right:4px;border-radius:50%}\n.coaseTipsWrap{margin-top:5px;padding-top:5px;min-width:0}\n.coaseTipsRail{position:relative;height:8px;border-radius:50px;margin:8px 3px 5px;background:#456079}\n.coaseTipsTick{position:absolute;top:-10px;width:28px;height:28px;transform:translateX(-50%);\nbackground:transparent;border:0;cursor:pointer;z-index:3}\n.coaseTipsTick:after{content:\"\";position:absolute;left:12px;top:4px;width:4px;height:20px;border-radius:4px;\nbackground:white;box-shadow:0 0 0 2px #0c1827,0 0 9px #fff9}\n.coaseTipsTick:focus-visible{outline:2px solid #fff;border-radius:8px}\n.coaseTipsHere{position:absolute;top:-3px;height:14px;width:3px;transform:translateX(-50%);\nbackground:#eef9ff;pointer-events:none;box-shadow:0 0 0 1px #14273b}\n.coaseTipsFooter{min-height:31px;display:flex;justify-content:space-between;align-items:center;\ngap:6px;font-size:11px;line-height:1.3;color:#b4c6d8}\n.coaseTipsJump{min-height:29px;background:#1b3d55;color:white;border-radius:8px;border:1px solid #7796b3;\nfont-weight:850;font-size:11px;padding:5px 8px;cursor:pointer;text-align:left}\n.coaseTipsJump:hover{background:#2c5774}.coaseTipsJump:focus-visible{outline:2px solid white}\n@media(max-width:600px){.coaseTipsNow{padding:10px}.coaseTipsJump{font-size:10px;padding:6px}\n.coaseTipsFooter{font-size:10px}}\n";

const meta=[
 ["repSlider","rep",v=>v,v=>Math.round(v)+"% attorney"],
 ["aiSlider","ai",v=>v,v=>Math.round(v)+"% AI"],
 ["valSlider","V",v=>v,v=>cash(v)+" stakes"],
 ["probSlider","p",v=>v/100,v=>Math.round(v)+"% odds"],
 ["costSlider","C0",v=>v,v=>cash(v)+" legal fees"]
];
const style=document.createElement("style");
style.textContent=CSS;document.head.appendChild(style);
const controls=[],rep=document.getElementById("repSlider");
if(!rep||typeof recalculate!=="function")return;
const section=rep.closest("section");
if(section){
 const p=document.createElement("div");
 p.className="coaseTipsNow";
 p.innerHTML='<div><div class="label">LIVE MODEL PATH</div><div class="value" id="coaseCurrentPath"></div>'+
 '<div class="coaseTipsLegend"><span><i style="background:#fb7185"></i>NO FILING</span>'+
 '<span><i style="background:#34d399"></i>SETTLE</span><span><i style="background:#fbbf24"></i>TRIAL</span></div></div>'+
 '<div class="help">Change a slider to test the economics. Colored bands show the modeled outcome; white ticks show where the decision changes. Tap a tick or JUMP to try it.</div>';
 section.insertBefore(p,section.lastElementChild);
}
for(const [id,field,toState,show] of meta){
 const slider=document.getElementById(id);if(!slider)continue;
 const holder=document.createElement("div");holder.className="coaseTipsWrap";
 holder.innerHTML='<div class="coaseTipsRail"><span class="coaseTipsHere"></span></div>'+
 '<div class="coaseTipsFooter"><span class="coaseTipsCaption"></span>'+
 '<button class="coaseTipsJump" type="button" hidden></button></div>';
 slider.insertAdjacentElement("afterend",holder);
 controls.push({slider,field,toState,show,rail:holder.querySelector(".coaseTipsRail"),
 here:holder.querySelector(".coaseTipsHere"),caption:holder.querySelector(".coaseTipsCaption"),
 jump:holder.querySelector(".coaseTipsJump")});
}
function jump(c,v){
 c.slider.value=String(v);
 c.slider.dispatchEvent(new Event("input",{bubbles:true}));
 c.slider.focus({preventScroll:true});
}
function crossings(c){
 const min=Number(c.slider.min),max=Number(c.slider.max);
 if(!(max>min))return null;
 const step=Math.max(.000001,Number(c.slider.step)||1);
 const n=Math.max(1,Math.round((max-min)/step));
 const stride=Math.max(1,Math.ceil(n/320));
 const val=k=>min+Math.min(n,k)*step;
 const type=k=>pathAt({[c.field]:c.toState(val(k))}).path;
 const initial=type(0),ticks=[];
 let previous=initial;
 for(let k=stride;k<=n+stride;k+=stride){
  const top=Math.min(k,n),next=type(top);
  if(next!==previous){
   let low=Math.max(0,top-stride),high=top,base=type(low);
   while(high-low>1){
    const mid=Math.floor((high+low)/2);
    if(type(mid)===base)low=mid;else high=mid;
   }
   const v=val(high);
   ticks.push({value:v,pos:(v-min)/(max-min)*100,path:type(high)});
  }
  previous=next;if(top===n)break;
 }
 return {min,max,initial,ticks};
}
function render(c){
 const d=crossings(c);if(!d)return;
 const bounds=[{pos:0,path:d.initial},...d.ticks,{pos:100}],gradient=[];
 for(let i=0;i<bounds.length-1;i++){
  const from=bounds[i],to=bounds[i+1],color=colors[from.path];
  gradient.push(color+" "+from.pos.toFixed(2)+"%",color+" "+to.pos.toFixed(2)+"%");
 }
 c.rail.style.background="linear-gradient(to right,"+gradient.join(",")+")";
 c.rail.querySelectorAll(".coaseTipsTick").forEach(e=>e.remove());
 const current=Math.max(d.min,Math.min(d.max,Number(c.slider.value)));
 c.here.style.left=((current-d.min)/(d.max-d.min)*100).toFixed(2)+"%";
 for(const t of d.ticks.slice(0,10)){
  const b=document.createElement("button");b.className="coaseTipsTick";b.type="button";
  b.style.left=t.pos.toFixed(2)+"%";
  b.title="At "+c.show(t.value)+": "+labels[t.path];
  b.setAttribute("aria-label",b.title);
  b.addEventListener("click",()=>jump(c,t.value));
  c.rail.appendChild(b);
 }
 if(!d.ticks.length){
  c.caption.textContent="NO CHANGE IN RANGE · "+labels[d.initial];
  c.jump.hidden=true;return;
 }
 c.caption.textContent=d.ticks.length+" tipping point"+(d.ticks.length===1?"":"s");
 const nearest=[...d.ticks].sort((a,b)=>Math.abs(a.value-current)-Math.abs(b.value-current))[0];
 c.jump.hidden=false;c.jump.textContent="JUMP "+c.show(nearest.value)+" → "+labels[nearest.path];
 c.jump.onclick=()=>jump(c,nearest.value);
}
let queued=false;
function update(){
 if(queued)return;queued=true;
 requestAnimationFrame(()=>{
  queued=false;
  const result=pathAt(),element=document.getElementById("coaseCurrentPath");
  if(element){element.textContent=labels[result.path];element.style.color=colors[result.path];}
  for(const c of controls)render(c);
 });
}
const old=recalculate;
recalculate=function(...args){const out=old.apply(this,args);update();return out;};
update();
window.__coaseTips={pathAt,update,controls};
})();
