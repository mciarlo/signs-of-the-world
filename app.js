/* ============================================================ catalogue */
// ids refer to the numbered PNG/SVG files (1–55). Several ids in one family = variants that morph.
const FAMILIES = [
  {name:'Stop',                   cat:'traffic',  t:'fade', ids:['stop','stop-japan','stop-brazil','stop-central-america','stop-china','stop-morocco','stop-nepal','stop-south-korea','stop-UAE'], v:['US','Japan','Brazil','Central America','China','Morocco','Nepal','South Korea','UAE']},
  {name:'Yield',                  cat:'traffic',  t:'fade', ids:['yield','yield-china','yield-ireland','yield-new-zealand','yield-south-africa','yield-thailand','yield-uk'], v:['US','China','Ireland','New Zealand','South Africa','Thailand','UK']},
  {name:'Traffic signal ahead',   cat:'hazard',   ids:['light-ahead','light-ahead-flat-new-zealand','light-ahead-ireland','light-ahead-uk','light-ahead-japan'], v:['US','New Zealand','Ireland','UK','Japan']},
  {name:'Roundabout ahead',     cat:'hazard',   ids:['roundabout-us','roundabout-uk','roundabout-south-africa','roundabout-japan'], v:['US','UK','South Africa','Japan']},
  {name:'Two way traffic ahead',cat:'hazard',   ids:['two-way-traffic','two-way-traffic-uk'], v:['US','UK']},
  {name:'Intersection ahead',    cat:'hazard',   ids:['intersection','intersection-uk'], v:['US','UK']},
  {name:'Traffic merges ahead', cat:'hazard',   ids:['merge']},
  {name:'Steep hill',           cat:'hazard',   t:'fade', ids:['steep-hill-downward-us','steep-hill-uk','steep-hill-australia'], v:['US','UK','Australia']},
  {name:'Slippery road',        cat:'hazard',   ids:['slippery']},
  {name:'Slippery surface',     cat:'hazard',   ids:['hazard-slip-iso7010']},
  {name:'Wild animals',         cat:'hazard',   t:'fade', ids:['wild-animals','wild-animals-uk','wild-animals-south-africa','wild-animals-australia'], v:['US','UK','South Africa','Australia']},
  {name:'Domestic animals',     cat:'hazard',   t:'fade', ids:['domesticated-animals','domesticated-animals-uk'], v:['US','UK']},
  {name:'Pedestrian crossing',  cat:'hazard',   ids:['pedestrian-crossing-us','pedestrian-crossing-ca','pedestrian-crossing-new-zealand','pedestrian-crossing-australia','pedestrian-crossing-uk','pedestrian-crossing-hong-kong','pedestrian-crossing-uganda'], v:['US','Canada','New Zealand','Australia','UK','Hong Kong','Uganda']},
  {name:'Road works',           cat:'hazard',   ids:['road-works-ahead','road-works-uk'], v:['US','UK'], t:'fade'},
  {name:'Flagger ahead',        cat:'hazard',   t:'fade', ids:['flagger-ahead-us','flagger-ahead-canada'], v:['US','Canada']},
  {name:'Turn',                 cat:'traffic',  ids:['short-turn-us','sharp-turn'], v:['Short turn','Sharp turn']},
  {name:'Keep right or left',   cat:'traffic',  ids:['keep-right','keep-right-uk'], v:['US','UK'], t:'fade'},
  {name:'No entry',             cat:'traffic',  ids:['no-entry-us','no-entry-germany','no-entry-denmark','no-entry-sweden','no-entry-china','no-entry-japan','no-entry-south-korea','no-entry-new-zealand'], v:['US','Germany','Denmark','Sweden','China','Japan','South Korea','New Zealand']},
  {name:'No motor vehicle',     cat:'traffic',  ids:['no-motor-vehicles-germany','no-motor-vehicles-spain','no-motor-vehicles-sweden','no-motor-vehicles-china','no-motor-vehicles-japan'], v:['Germany','Spain','Sweden','China','Japan']},
  {name:'No pedestrians',       cat:'traffic',  ids:['no-pedestrians-germany','no-pedestrians-spain','no-pedestrians-sweden','no-pedestrians-china','no-pedestrians-japan','no-pedestrians-us'], v:['Germany','Spain','Sweden','China','Japan','US']},
  {name:'No bikes',             cat:'traffic',  ids:['no-bikes-germany','no-bikes-spain','no-bikes-sweden','no-bikes-china','no-bikes-japan','no-bikes-us'], v:['Germany','Spain','Sweden','China','Japan','US']},
  {name:'No heavy goods vehicles',cat:'traffic',ids:['no-trucks-germany','no-trucks-spain','no-trucks-sweden','no-trucks-china','no-trucks-japan','no-trucks-us'], v:['Germany','Spain','Sweden','China','Japan','US']},
  {name:'No motorcycles',       cat:'traffic',  ids:['no-motorcycles-germany','no-motorcycles-spain','no-motorcycles-sweden','no-motorcycles-china','no-motorcycles-japan'], v:['Germany','Spain','Sweden','China','Japan']},
  {name:'Speed limit',          cat:'traffic',  ids:['speed-limit-uk','speed-limit-us','speed-limit-japan','speed-limit-nigeria'], v:['UK','US','Japan','Nigeria']},
  {name:'No left turn',         cat:'traffic',  ids:['no-left-turn','no-left-turn-spain','no-left-turn-sweden','no-left-turn-china'], v:['Europe','Spain','Sweden','China']},
  {name:'No right turn',        cat:'traffic',  ids:['no-right-turn','no-right-turn-spain','no-right-turn-sweden','no-right-turn-china'], v:['Europe','Spain','Sweden','China']},
  {name:'No U turn',            cat:'traffic',  ids:['no-u-turn','no-u-turn-spain','no-u-turn-sweden','no-u-turn-china','no-u-turn-japan'], v:['Europe','Spain','Sweden','China','Japan']},
  {name:'Parking zone',         cat:'guidance', ids:['parking-ca','parking-uk','parking-japan'], v:['Canada','UK','Japan']},
  {name:'Airport',              cat:'guidance', ids:['airport-ca','airport-us'], v:['Canada','US']},
  {name:'Hospital',             cat:'guidance', ids:['hospital-au','hospital-us','hospital-ca','first-aid-iso7010'], v:['Australia','US','Canada','First aid']},
  {name:'EV charging',          hidden:true, cat:'guidance', ids:['ev-charging-us']},
  {name:'Gas station',          cat:'guidance', ids:['gas-us']},
  {name:'International symbol of access', cat:'guidance', ids:['accessible']},
  {name:'Toxic material',       cat:'hazard',   t:'fade', ids:['danger-death','hazard-toxic-iso7010'], v:['Diamond','Triangle']},
  {name:'Biohazard',            cat:'hazard',   ids:['hazard-biohazard-iso7010','biohazard-symbol'], v:['Triangle','Symbol']},
  {name:'Radioactive material', cat:'hazard',   ids:['hazard-radioactive-iso7010','radioactive-iso7010'], v:['Triangle','Square']},
  {name:'Flammable',            cat:'hazard',   ids:['danger-flammable','hazard-flammable-iso7010'], v:['Diamond','Triangle']},
  {name:'Explosive substance',  cat:'hazard',   ids:['explosive-diamond','explosive-triangle'], v:['Diamond','Triangle'], hidden:true},
  {name:'General warning',      cat:'hazard',   ids:['hazard-general-iso7010']},
  {name:'Health hazard',        cat:'hazard',   ids:['health-mutagenic','health-hazard'], v:['Mutagenic','Health hazard'], hidden:true},
  {name:'Environmental hazard', cat:'hazard',   t:'fade', ids:['danger-environmental','hazard-environmental-iso7010'], v:['Diamond','Triangle']},
  {name:'Exit',                 cat:'guidance', ids:['exit-iso7010']},
  {name:'Stairs',               cat:'guidance', ids:['stairs']},
  {name:'Phone',                cat:'technology', last:true, ids:['phone-apple','phone-google','phone-samsung','emergency-phone-iso7010'], v:['Apple','Google','Samsung','Emergency']},
  {name:'Escape ladder',        cat:'guidance', ids:['escape-ladder-iso7010']},
  {name:'Drinking water',       cat:'guidance', ids:['drinking-water-iso7010']},
  {name:'Wi-Fi',                cat:'technology', last:true, ids:['wifi-apple','wifi-google','wifi-samsung'], v:['Apple','Google','Samsung']},
  {name:'Bluetooth',            cat:'technology', last:true, ids:['bluetooth']},
  {name:'Recycling',            cat:'guidance', last:true, ids:['recycling']},
  {name:'No smoking',           cat:'guidance', ids:['no-smoking']},
  {name:'Electrical hazard',    cat:'hazard',   ids:['hazard-electrical-iso7010']},
  {name:'Crossbuck',          cat:'hazard',   t:'fade', seq:true, ids:['crossbuck-US','crossbuck-vietnam','crossbuck-norway','crossbuck-japan','crossbuck-italy','crossbuck-denmark','crossbuck-austria','crossbuck-canada'], v:['US','Vietnam','Norway','Japan','Italy','Denmark','Austria','Canada']},
];
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
FAMILIES.forEach(f => { f.slug = slug(f.name); f.vnames = f.v || f.ids.map((_,i)=>'Variant '+(i+1)); f.vslugs = f.vnames.map(slug); });
const BY_SLUG = Object.fromEntries(FAMILIES.map(f => [f.slug, f]));

/* ============================================================ geometry for morphing */
const NF = 160, NS = 220;                        // points per frame loop / symbol loop while morphing
const NS_URI = 'http://www.w3.org/2000/svg';
const hexRgb = h => [1,3,5].map(i => parseInt(h.slice(i,i+2),16));
const rgbCss = c => `rgb(${c.map(v=>Math.round(v)).join(',')})`;
const clamp = (x,a=0,b=1) => Math.min(b,Math.max(a,x));
/* one easing curve for the whole site, a CSS-style cubic bezier (x1, y1, x2, y2): the zoom (CSS) and every morph and fade (JS) share it */
const BEZIER=[.76,0,.24,1];
function cubicBezier(x1,y1,x2,y2){
  const cx=3*x1, bx=3*(x2-x1)-cx, ax=1-cx-bx, cy=3*y1, by=3*(y2-y1)-cy, ay=1-cy-by;
  const X=t=>((ax*t+bx)*t+cx)*t, Y=t=>((ay*t+by)*t+cy)*t, dX=t=>(3*ax*t+2*bx)*t+cx;
  return x=>{ x=clamp(x); let t=x;
    for (let i=0;i<8;i++){ const e=X(t)-x; if (Math.abs(e)<1e-6) return Y(t); const d=dX(t); if (Math.abs(d)<1e-6) break; t-=e/d; }     // Newton
    let lo=0, hi=1; t=x; while (hi-lo>1e-7){ const e=X(t); if (Math.abs(e-x)<1e-6) break; if (e<x) lo=t; else hi=t; t=(lo+hi)/2; }                // bisection fallback
    return Y(t); };
}
const ease = cubicBezier(...BEZIER), smooth = ease;

function parseLoops(d){                           // M/L/C/Z path -> array of polygons
  const tok = d.match(/[MLCZ]|-?\d*\.?\d+(?:e-?\d+)?/g) || [], loops = [];
  let cur = null, last = null, i = 0, cmd = null; const num = () => parseFloat(tok[i++]);
  while (i < tok.length) {
    if (/[MLCZ]/.test(tok[i])) cmd = tok[i++];
    if (cmd === 'M') { cur = [[num(),num()]]; loops.push(cur); last = cur[0]; cmd = 'L'; }
    else if (cmd === 'L') { last = [num(),num()]; cur.push(last); }
    else if (cmd === 'C') { const a=[num(),num()], b=[num(),num()], p=[num(),num()];
      for (let t=1;t<=14;t++){ const u=t/14, v=1-u; cur.push([v*v*v*last[0]+3*v*v*u*a[0]+3*v*u*u*b[0]+u*u*u*p[0], v*v*v*last[1]+3*v*v*u*a[1]+3*v*u*u*b[1]+u*u*u*p[1]]); }
      last = p; }
    else if (cmd === 'Z') { cmd = null; } else break;
  }
  return loops.filter(l => l.length > 2);
}
function resampleLoop(poly, N){
  let area = 0; const n = poly.length;
  for (let i=0;i<n;i++){ const a=poly[i], b=poly[(i+1)%n]; area += a[0]*b[1]-b[0]*a[1]; }
  if (area < 0) poly = poly.slice().reverse();
  const L=[0]; for (let i=0;i<n;i++){ const a=poly[i], b=poly[(i+1)%n]; L.push(L[i]+Math.hypot(b[0]-a[0],b[1]-a[1])); }
  const total = L[n] || 1, out = new Float32Array(2*N); let j = 0, best = 1e9, s = 0; const tmp = [];
  for (let k=0;k<N;k++){ const t=total*k/N; while (L[j+1] < t) j++; const a=poly[j], b=poly[(j+1)%n], f=(t-L[j])/((L[j+1]-L[j])||1);
    const x=a[0]+(b[0]-a[0])*f, y=a[1]+(b[1]-a[1])*f; tmp.push([x,y]); const v=y+x*.001; if (v<best){best=v;s=k;} }
  for (let k=0;k<N;k++){ const q=tmp[(k+s)%N]; out[2*k]=q[0]; out[2*k+1]=q[1]; }
  return out;
}
const centroid = a => { let x=0,y=0,n=a.length/2; for (let i=0;i<a.length;i+=2){x+=a[i];y+=a[i+1];} return [x/n,y/n]; };
const collapsed = (c, N) => { const o=new Float32Array(2*N); for (let i=0;i<N;i++){o[2*i]=c[0];o[2*i+1]=c[1];} return o; };
function rotateTo(a, b){                          // rotate loop b's start so it lines up with loop a
  const N = a.length/2; let bestS = 0, bestD = 1e18;
  for (let s=0;s<N;s++){ let d=0; for (let k=0;k<N;k+=4){ const j=(k+s)%N; const dx=a[2*k]-b[2*j], dy=a[2*k+1]-b[2*j+1]; d+=dx*dx+dy*dy; } if (d<bestD){bestD=d;bestS=s;} }
  if (!bestS) return b; const o = new Float32Array(b.length);
  for (let k=0;k<N;k++){ const j=(k+bestS)%N; o[2*k]=b[2*j]; o[2*k+1]=b[2*j+1]; } return o;
}
/* ---- corner-aware correspondence: corners land on corners, straight edges stay straight ---- */
function rawLoop(pts){                               // exact outline (array of [x,y]) -> flat, deduped, same winding as resampleLoop
  const q=[]; for (const p of pts){ const l=q[q.length-1]; if (!l || Math.hypot(p[0]-l[0],p[1]-l[1])>1e-3) q.push(p); }
  while (q.length>2 && Math.hypot(q[0][0]-q[q.length-1][0], q[0][1]-q[q.length-1][1])<1e-3) q.pop();
  let a=0; for (let i=0;i<q.length;i++){ const u=q[i], v=q[(i+1)%q.length]; a+=u[0]*v[1]-v[0]*u[1]; }
  if (a<0) q.reverse(); const o=new Float32Array(q.length*2); q.forEach((p,i)=>{o[2*i]=p[0];o[2*i+1]=p[1];}); return o;
}
function arcInfo(f){                                 // cumulative length, area, centroid of a flat closed loop
  const n=f.length/2, cum=new Float64Array(n+1); let A=0, cx=0, cy=0;
  for (let i=0;i<n;i++){ const j=(i+1)%n, x0=f[2*i], y0=f[2*i+1], x1=f[2*j], y1=f[2*j+1], cr=x0*y1-x1*y0;
    cum[i+1]=cum[i]+Math.hypot(x1-x0,y1-y0); A+=cr; cx+=(x0+x1)*cr; cy+=(y0+y1)*cr; }
  A/=2; return { f, n, cum, P:cum[n], area:Math.abs(A), c: A ? [cx/(6*A), cy/(6*A)] : [f[0],f[1]] };
}
function pointAt(L, t){                              // point at arc length t (wraps)
  const P=L.P; t=((t%P)+P)%P; let lo=0, hi=L.n;
  while (hi-lo>1){ const m=(lo+hi)>>1; if (L.cum[m]<=t) lo=m; else hi=m; }
  const j=(lo+1)%L.n, seg=L.cum[lo+1]-L.cum[lo], u=seg?(t-L.cum[lo])/seg:0;
  return [L.f[2*lo]+(L.f[2*j]-L.f[2*lo])*u, L.f[2*lo+1]+(L.f[2*j+1]-L.f[2*lo+1])*u];
}
function findCorners(L){                             // -> [{s,e}] arc ranges of corners (s==e for a sharp one), or null if smooth/too busy
  const n=L.n, f=L.f, sc=Math.sqrt(L.area)||1, tol=Math.max(0.25, 0.006*sc);
  if (n<3) return null;
  const pt=i=>[f[2*(i%n)],f[2*(i%n)+1]], keep=new Set([0]);
  let far=0, fi=0; for (let i=1;i<n;i++){ const d=Math.hypot(f[2*i]-f[0],f[2*i+1]-f[1]); if (d>far){far=d;fi=i;} } keep.add(fi);
  const dp=(i,j)=>{ const a=pt(i), b=pt(j), dx=b[0]-a[0], dy=b[1]-a[1], l=Math.hypot(dx,dy)||1; let w=-1, wi=-1;
    for (let k=i+1;k<j;k++){ const p=pt(k), d=Math.abs((p[0]-a[0])*dy-(p[1]-a[1])*dx)/l; if (d>w){w=d;wi=k;} }
    if (w>tol){ keep.add(wi%n); dp(i,wi); dp(wi,j); } };
  dp(0,fi); dp(fi,n);
  const V=[...keep].sort((x,y)=>x-y), m=V.length; if (m<3) return null;
  const turn=V.map((v,k)=>{ const a=pt(V[(k-1+m)%m]), b=pt(v), c=pt(V[(k+1)%m]);
    let t=Math.atan2(c[1]-b[1],c[0]-b[0])-Math.atan2(b[1]-a[1],b[0]-a[0]); while(t>Math.PI)t-=2*Math.PI; while(t<-Math.PI)t+=2*Math.PI; return Math.abs(t)*180/Math.PI; });
  const segLen=k=>{ const a=V[k], b=V[(k+1)%m]; return b>a ? L.cum[b]-L.cum[a] : L.P-L.cum[a]+L.cum[b]; };
  const BEND=8, SHARP=55, ARC=0.12*sc;
  let start=turn.findIndex((t,k)=>t<BEND || segLen((k-1+m)%m)>=ARC); if (start<0) return null;   // no edge to start from: a circle-like curve
  const out=[]; let run=null;
  const close=()=>{ if (run && run.tt>=30) out.push({ s:L.cum[V[run.a]], e:L.cum[V[run.b]] + (V[run.b]<V[run.a] ? L.P : 0) }); run=null; };
  for (let q=0;q<m;q++){ const k=(start+q)%m, t=turn[k];
    if (t<BEND){ close(); continue; }
    if (run && segLen((k-1+m)%m)<ARC) { run.b=k; run.tt+=t; } else { close(); run={a:k,b:k,tt:t}; }   // close vertices, sharp or not, make one (rounded) corner
    if (t>=SHARP && segLen(k)>=ARC) close(); }
  close();
  return out.length && out.length<=16 ? out : null;
}
function alignLoops(fa, fb, N){                      // two exact outlines -> two N-point loops whose corners correspond, or null
  const A=arcInfo(fa), B=arcInfo(fb), ca=findCorners(A), cb=findCorners(B); if (!ca || !cb || ca.length!==cb.length) return null;   // corners are matched one to one only when both outlines have the same number; otherwise the outlines are resampled by length (a rectangle simply rounds off into a capsule)
  const norm=(L,cr)=>cr.map(k=>{ const p=pointAt(L,(k.s+k.e)/2), s=Math.sqrt(L.area)||1; return [(p[0]-L.c[0])/s,(p[1]-L.c[1])/s]; });
  const pa=norm(A,ca), pb=norm(B,cb), swap=ca.length<cb.length;
  const [Lg,Sm,cL,cS,pL,pS]= swap ? [B,A,cb,ca,pb,pa] : [A,B,ca,cb,pa,pb], l=cL.length, sN=cS.length;
  const cost=(i,j)=>(pS[i][0]-pL[j][0])**2+(pS[i][1]-pL[j][1])**2;
  let best=null;                                     // every small corner gets its own large corner, order kept, best rotation
  for (let r=0;r<l;r++){ const D=[...Array(sN)].map(()=>new Float64Array(l).fill(Infinity)), from=[...Array(sN)].map(()=>new Int32Array(l).fill(-1));
    for (let j=0;j<l;j++) D[0][j]=cost(0,(j+r)%l);
    for (let i=1;i<sN;i++) for (let j=i;j<l;j++) for (let k=i-1;k<j;k++){ const v=D[i-1][k]+cost(i,(j+r)%l); if (v<D[i][j]){ D[i][j]=v; from[i][j]=k; } }
    let bj=-1, bv=Infinity; for (let j=sN-1;j<l;j++) if (D[sN-1][j]<bv){ bv=D[sN-1][j]; bj=j; }
    if (bv<(best?best.v:Infinity)){ const map=new Array(sN); for (let i=sN-1,j=bj;i>=0;i--){ map[i]=(j+r)%l; j=from[i][j]; } best={v:bv,map}; } }
  if (!best) return null;
  const of=new Map(best.map.map((j,i)=>[j,i])), anchors=[];          // [tLarge, tSmall] pairs, walking the large outline
  const matched=[...best.map].sort((x,y)=>x-y);
  for (let j=0;j<l;j++){
    if (of.has(j)){ const i=of.get(j); anchors.push([cL[j].s,cS[i].s],[cL[j].e,cS[i].e]); continue; }
    const pj=matched.filter(x=>x<j).pop() ?? matched[matched.length-1], nj=matched.find(x=>x>j) ?? matched[0];
    const ps=cS[of.get(pj)], ns=cS[of.get(nj)], gL=((cL[nj].s-cL[pj].e)%Lg.P+Lg.P)%Lg.P || Lg.P, gS=((ns.s-ps.e)%Sm.P+Sm.P)%Sm.P || Sm.P;
    const onAxis=Math.abs(pL[j][0])<.15 || Math.abs(pL[j][1])<.15;   // a leftover corner on the sign's symmetry axis flattens into the middle of the edge; any other slides along its edge into the previous matched corner (the straight side stays straight)
    const at=onAxis ? t=>ps.e+(((t-cL[pj].e)%Lg.P+Lg.P)%Lg.P)/gL*gS : ()=>ps.e;
    anchors.push([cL[j].s,at(cL[j].s)],[cL[j].e,at(cL[j].e)]); }
  const unwrap=(k,P)=>{ const t0=anchors[0][k]; let prev=t0; for (const a of anchors){ let t=t0+(((a[k]-t0)%P)+P)%P; if (t<prev-1e-6) t+=P; if (t<prev-1e-6 || t>t0+P+1e-6) return false; a[k]=prev=t; } return true; };
  if (!unwrap(0,Lg.P) || !unwrap(1,Sm.P)) return null;
  const K=anchors.length, segs=[];
  for (let k=0;k<K;k++){ const a=anchors[k], b=k+1<K?anchors[k+1]:[anchors[0][0]+Lg.P,anchors[0][1]+Sm.P];
    segs.push({ t0:a, dl:b[0]-a[0], ds:b[1]-a[1], w:(b[0]-a[0])/Lg.P+(b[1]-a[1])/Sm.P }); }
  const live=segs.filter(g=>g.w>1e-9); if (live.length>N) return null;
  const W=live.reduce((x,g)=>x+g.w,0); live.forEach(g=>{ g.c=Math.max(1,Math.floor(g.w/W*N)); g.r=g.w/W*N-g.c; });
  let left=N-live.reduce((x,g)=>x+g.c,0); [...live].sort((x,y)=>y.r-x.r).forEach(g=>{ if(left>0){g.c++;left--;} });
  while (left<0){ const g=live.filter(g=>g.c>1).sort((x,y)=>x.r-y.r)[0]; if(!g) return null; g.c--; left++; }
  const oL=new Float32Array(2*N), oS=new Float32Array(2*N); let q=0;
  for (const g of live) for (let u=0;u<g.c;u++,q++){ const a=pointAt(Lg,g.t0[0]+g.dl*u/g.c), b=pointAt(Sm,g.t0[1]+g.ds*u/g.c);
    oL[2*q]=a[0]; oL[2*q+1]=a[1]; oS[2*q]=b[0]; oS[2*q+1]=b[1]; }
  return swap ? [oS,oL] : [oL,oS];
}
/* ---- point to point: lettering drawn from one master (layers named symbol-text…). When two outlines have the same number of
   segments, every drawn point travels straight to its counterpart, the way a variable font does. ---- */
function pathSegs(d){                              // M/L/C/Z path -> loops of cubic segments [x0,y0, x1,y1, x2,y2, x3,y3]; a straight edge becomes a flat cubic
  const tok=d.match(/[MLCZ]|-?\d*\.?\d+(?:e-?\d+)?/g)||[], loops=[]; let i=0, cmd=null, cur=null, start=null, last=null; const num=()=>parseFloat(tok[i++]);
  const line=(p,q)=>[p[0],p[1], p[0]+(q[0]-p[0])/3, p[1]+(q[1]-p[1])/3, p[0]+(q[0]-p[0])*2/3, p[1]+(q[1]-p[1])*2/3, q[0],q[1]];
  const close=()=>{ if (cur && Math.hypot(last[0]-start[0], last[1]-start[1])>.05){ cur.push(line(last,start)); last=start; } };
  while (i<tok.length){ if (/[MLCZ]/.test(tok[i])) cmd=tok[i++];
    if (cmd==='M'){ close(); start=last=[num(),num()]; cur=[]; loops.push(cur); cmd='L'; }
    else if (cmd==='L'){ const q=[num(),num()]; cur.push(line(last,q)); last=q; }
    else if (cmd==='C'){ const s=[last[0],last[1],num(),num(),num(),num(),num(),num()]; cur.push(s); last=[s[6],s[7]]; }
    else if (cmd==='Z'){ close(); cmd=null; } else break; }
  close();
  return loops.filter(l=>l.length>1);
}
function pointMatch(da, db, N){                    // -> { from, to } with N points per loop, or null when the two paths are not built alike
  const box=l=>{ const x=l.map(s=>s[0]), y=l.map(s=>s[1]), x0=Math.min(...x), y0=Math.min(...y); return { x0, y0, w:Math.max(...x)-x0||1, h:Math.max(...y)-y0||1 }; };
  const turn=l=>Math.sign(l.reduce((a,s,i)=>{ const t=l[(i+1)%l.length]; return a+s[0]*t[1]-t[0]*s[1]; },0));
  const bySize=ls=>ls.map(l=>({ l, b:box(l) })).sort((p,q)=>q.b.w*q.b.h-p.b.w*p.b.h);
  const A=bySize(pathSegs(da)), B=bySize(pathSegs(db));
  if (!A.length || A.length!==B.length || A.some((a,i)=>a.l.length!==B[i].l.length || a.l.length>N || turn(a.l)!==turn(B[i].l))) return null;
  const at=(s,t)=>{ const u=1-t, a=u*u*u, b=3*u*u*t, c=3*u*t*t, e=t*t*t; return [a*s[0]+b*s[2]+c*s[4]+e*s[6], a*s[1]+b*s[3]+c*s[5]+e*s[7]]; };
  const from=[], to=[];
  A.forEach((a,i)=>{ const b=B[i], n=a.l.length; let best=0, bv=Infinity;   // the same starting point, even if the two files begin the outline in different places
    for (let k=0;k<n;k++){ let v=0; for (let s=0;s<n;s++){ const p=a.l[s], q=b.l[(s+k)%n]; v+=((p[0]-a.b.x0)/a.b.w-(q[0]-b.b.x0)/b.b.w)**2+((p[1]-a.b.y0)/a.b.h-(q[1]-b.b.y0)/b.b.h)**2; } if (v<bv){ bv=v; best=k; } }
    const f=new Float32Array(2*N), g=new Float32Array(2*N); let q=0;
    for (let s=0;s<n;s++){ const c=Math.floor(N/n)+(s<N%n?1:0); for (let u=0;u<c;u++,q++){ const x=at(a.l[s],u/c), y=at(b.l[(s+best)%n],u/c); f[2*q]=x[0]; f[2*q+1]=x[1]; g[2*q]=y[0]; g[2*q+1]=y[1]; } }
    from.push(f); to.push(g); });
  return { from, to };
}
const polyD = a => { let d='M'+a[0].toFixed(1)+' '+a[1].toFixed(1); for (let i=2;i<a.length;i+=2) d+='L'+a[i].toFixed(1)+' '+a[i+1].toFixed(1); return d+'Z'; };

/* ============================================================ per-sign layers (cached) */
const loopArea = a => { let s=0,n=a.length/2; for(let i=0;i<n;i++){const j=(i+1)%n; s+=a[2*i]*a[2*j+1]-a[2*j]*a[2*i+1];} return Math.abs(s)/2; };
function meta(it){                                   // area / centroid / biggest loop of an item
  let bi=-1, ba=-1; it.loops.forEach((l,i)=>{ const a=loopArea(l); if(a>ba){ba=a;bi=i;} });
  it.area=Math.max(ba,1); it.big=bi>=0?it.loops[bi]:null; it.c=it.big?centroid(it.big):[300,300]; return it;
}
const prepCache = {};
function prep(id){                                   // layers of one sign: frames (exact primitives) then symbol paths
  if (prepCache[id]) return prepCache[id];
  const D = SIGN_DATA[id];
  const frames = D.frame.map(f => f.k==='path'      // hand-drawn frame: keep its own outline (NF points, so it morphs with fitted frames too)
    ? (pl => meta({ kind:'f', fill:hexRgb(f.fill), d:f.d, loops:pl.map(l => resampleLoop(l, NF)), raw:pl.map(rawLoop) }))(parseLoops(f.d))
    : (o => meta({ kind:'f', fill:hexRgb(f.fill), d:o.d, loops:[resampleLoop(o.pts, NF)], raw:[rawLoop(o.pts)] }))(Shapes.outline(f)));
  const syms = D.sym.map(s => meta({ kind:'s', key:s.g||null, fill:hexRgb(s.fill), d:s.d, ...(pl => ({ loops:pl.map(l => resampleLoop(l, NS)), raw:pl.map(rawLoop) }))(parseLoops(s.d)) }));
  return prepCache[id] = [...frames, ...syms];
}
const itemsOf = layers => layers.map(l => ({ kind:l.kind, key:l.key||null, rgb:l.fill.slice(), op:1, d:l.d, loops:l.loops, raw:l.raw, area:l.area, c:l.c, big:l.big }));

/* ---- correspondence between two variants ---- */
const cdist = (a,b) => Math.hypot(a[0]-b[0], a[1]-b[1]);
function greedy(costs, limit){                       // costs: [[cost,i,j]...] -> matched pairs, cheapest first
  costs.sort((x,y)=>x[0]-y[0]); const ua=new Set(), ub=new Set(), out=[];
  for (const [c,i,j] of costs){ if (c>limit) break; if (ua.has(i)||ub.has(j)) continue; ua.add(i); ub.add(j); out.push([i,j]); }
  return out;
}
function matchItems(A, B, kind, skipA=new Set(), skipB=new Set()){
  const costs=[];
  A.forEach((a,i)=>{ if(a.kind!==kind||skipA.has(i)) return; B.forEach((b,j)=>{ if(b.kind!==kind||skipB.has(j)) return;
    const dc=Math.hypot(a.rgb[0]-b.rgb[0],a.rgb[1]-b.rgb[1],a.rgb[2]-b.rgb[2])/441;
    costs.push([ dc*1.6 + cdist(a.c,b.c)/600*2.2 + Math.abs(Math.log(a.area/b.area))*0.45 + (kind==='s' ? Math.min(glyphDistance(a,b),1.5)*1.3 : 0), i, j ]); }); });
  return greedy(costs, 2.0);
}
function glyphDistance(a, b){                        // 0 = same outline, ~1 = unrelated (outlines compared after alignment)
  if (!a.big || !b.big) return 9;
  const N=a.big.length/2, bb=b.big.length===a.big.length ? rotateTo(a.big,b.big) : null; if (!bb) return 1.5;
  let d=0; for (let k=0;k<N;k+=3) d+=Math.hypot(a.big[2*k]-bb[2*k]-(a.c[0]-b.c[0]), a.big[2*k+1]-bb[2*k+1]-(a.c[1]-b.c[1]));
  return (d/Math.ceil(N/3)) / Math.sqrt(Math.max(a.area,b.area));
}
function matchByKey(A, B){                         // symbol parts named alike in both variants: pair them, no outline check
  const keysB=new Set(B.filter(b=>b.kind==='s'&&b.key).map(b=>b.key)), pairs=[], resA=new Set(), resB=new Set(), costs=[];
  A.forEach((a,i)=>{ if(a.kind!=='s'||!a.key||!keysB.has(a.key)) return; resA.add(i);
    B.forEach((b,j)=>{ if(b.kind!=='s'||b.key!==a.key) return; resB.add(j);
      costs.push([cdist(a.c,b.c)/600 + Math.abs(Math.log(a.area/b.area))*0.3, i, j]); }); });
  return { pairs: greedy(costs, Infinity), resA, resB };   // res*: parts whose name exists on both sides; leftovers fade
}
/* ---- rotation rule: if turning a shape explains the change far better than deforming it, turn it ---- */
const SPIN_GAIN=0.5, SPIN_MIN=20*Math.PI/180, SPIN_MAX=100*Math.PI/180;   // rotate only if it leaves under half the deformation, for turns of 20 to 100 degrees
function findSpin(a, b){                             // two evenly sampled loops -> the angle (radians, clockwise on screen) that best carries a onto b, or 0
  const N=a.length/2, ca=centroid(a), cb=centroid(b); let aa=0, bb=0, still=0;
  const near=rotateTo(a,b);                          // what a plain morph would do
  for (let k=0;k<N;k++){ const px=a[2*k]-ca[0], py=a[2*k+1]-ca[1], qx=b[2*k]-cb[0], qy=b[2*k+1]-cb[1]; aa+=px*px+py*py; bb+=qx*qx+qy*qy;
    still+=(near[2*k]-cb[0]-px)**2+(near[2*k+1]-cb[1]-py)**2; }
  if (Math.sqrt(still/N) < 6) return 0;              // already nearly the same: nothing to gain
  const fits=[]; for (let s=0;s<N;s++){ let dot=0, crs=0;
    for (let k=0;k<N;k++){ const j=(k+s)%N, px=a[2*k]-ca[0], py=a[2*k+1]-ca[1], qx=b[2*j]-cb[0], qy=b[2*j+1]-cb[1]; dot+=px*qx+py*qy; crs+=px*qy-py*qx; }
    fits.push({ d:Math.sqrt(Math.max(0,aa+bb-2*Math.hypot(dot,crs))/N), th:Math.atan2(crs,dot) }); }
  const low=Math.min(...fits.map(f=>f.d)), good=fits.filter(f=>f.d <= low*1.05+1);   // among equally good fits take the smallest turn; a tie turns clockwise
  const best=good.reduce((m,f)=>{ const d=Math.abs(f.th)-Math.abs(m.th); return d < -0.05 || (d <= 0.05 && f.th > m.th) ? f : m; });
  return Math.abs(best.th) >= SPIN_MIN && Math.abs(best.th) <= SPIN_MAX && best.d < SPIN_GAIN*Math.sqrt(still/N) ? best.th : 0;
}
const turned = (l, th, from, to) => { const c=Math.cos(th), s=Math.sin(th), o=new Float32Array(l.length);   // rotate by th about "from", then move that point to "to"
  for (let q=0;q<l.length;q+=2){ const x=l[q]-from[0], y=l[q+1]-from[1]; o[q]=to[0]+x*c-y*s; o[q+1]=to[1]+x*s+y*c; } return o; };
function matchLoops(a, b, ra=a, rb=b, spins=false){              // loops inside one layer: pair by position and size
  const ca=a.map(centroid), cb=b.map(centroid), sa=a.map(l=>Math.sqrt(loopArea(l))), sb=b.map(l=>Math.sqrt(loopArea(l))), costs=[];
  // pair loops relative to each layer's own centre and extent, so the same drawing at another size/position still lines up part for part
  const frameOf=ls=>{ let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9; for(const l of ls) for(let q=0;q<l.length;q+=2){ x0=Math.min(x0,l[q]); x1=Math.max(x1,l[q]); y0=Math.min(y0,l[q+1]); y1=Math.max(y1,l[q+1]); }
    return { cx:(x0+x1)/2, cy:(y0+y1)/2, s:Math.max(x1-x0,y1-y0,1)/600 }; };
  const fa=frameOf(a), fb=frameOf(b), na=ca.map(c=>[(c[0]-fa.cx)/fa.s,(c[1]-fa.cy)/fa.s]), nb=cb.map(c=>[(c[0]-fb.cx)/fb.s,(c[1]-fb.cy)/fb.s]);
  a.forEach((_,i)=>b.forEach((__,j)=>costs.push([cdist(na[i],nb[j])/600 + Math.abs(sa[i]/fa.s-sb[j]/fb.s)/600, i, j])));
  const pairs=greedy(costs, 9), ua=new Set(pairs.map(p=>p[0])), ub=new Set(pairs.map(p=>p[1])), from=[], to=[];
  const spin=[];
  for (const [i,j] of pairs){ const th=spins ? findSpin(a[i], b[j]) : 0; let bj=b[j], rj=rb[j];
    if (th){ const A0=ca[i], B0=cb[j]; spin[from.length]={ th, ca:A0, cb:B0 }; bj=turned(bj,-th,B0,A0); rj=turned(rj,-th,B0,A0); }   // morph toward the target turned back; the turn is added while drawing
    const al=alignLoops(ra[i], rj, a[i].length/2);
    if (al){ from.push(al[0]); to.push(al[1]); } else { from.push(a[i]); to.push(rotateTo(a[i], bj)); } }
  a.forEach((l,i)=>{ if(!ua.has(i)){ from.push(l); to.push(collapsed(ca[i], l.length/2)); } });
  b.forEach((l,j)=>{ if(!ub.has(j)){ from.push(collapsed(cb[j], l.length/2)); to.push(l); } });
  return { from, to, spin };
}

const SEQ=[.15,.78], SEQ_SLOW=1.5;                    // sequenced transitions: quick symbol fade out (first 15%), the shape morphs alone, then a slower symbol fade in (last 22%)
const MORPH_COVER=0.8, DISSOLVE=0.08;                // symbol morphs if >=80% of its area pairs up on both sides; a fading symbol scales by 8%
const scaleLoops=(loops,h,k)=>loops.map(l=>{ const o=new Float32Array(l.length); for(let q=0;q<l.length;q+=2){ o[q]=h[0]+(l[q]-h[0])*k; o[q+1]=h[1]+(l[q+1]-h[1])*k; } return o; });
// a fading symbol scales only when its sign says so in defs.json ("symbolScale": 0.08 = 8%, or true); otherwise it simply fades
const symScale=id=>{ const v=SIGN_DEFS[id] && SIGN_DEFS[id].symbolScale; return v===true ? DISSOLVE : (+v||0); };

/* ============================================================ sign definitions: defs.json -> frame state ============================================================
   A sign's frame is one definition: shape + box + corner radius (a fraction of the shape's size) + border. Three layers are cut from the same shape:
   halo (outer edge), ring (inset a) and face (inset b), a and b being fractions of the size. Morphing only interpolates these numbers. */
function clipHalf(poly, n, c){
  const out=[]; for (let i=0;i<poly.length;i++){ const a=poly[i], b=poly[(i+1)%poly.length], da=n[0]*a[0]+n[1]*a[1]-c, db=n[0]*b[0]+n[1]*b[1]-c, ia=da>=-1e-7, ib=db>=-1e-7;
    if (ia) out.push(a); if (ia!==ib){ const t=da/(da-db); out.push([a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t]); } }
  return out;
}
function insetPoly(P, d){                              // convex polygon (clockwise on screen, may have coincident points) pulled in by d
  let poly=[[-1e5,-1e5],[1e5,-1e5],[1e5,1e5],[-1e5,1e5]];
  for (let i=0;i<P.length;i++){ const a=P[i], b=P[(i+1)%P.length], dx=b[0]-a[0], dy=b[1]-a[1], len=Math.hypot(dx,dy); if (len<1e-6) continue;
    const n=[-dy/len, dx/len]; poly=clipHalf(poly, n, n[0]*a[0]+n[1]*a[1]+d); if (!poly.length) break; }
  const q=[]; for (const p of poly){ const l=q[q.length-1]; if (!l || Math.hypot(p[0]-l[0],p[1]-l[1])>1e-2) q.push(p); }
  while (q.length>1 && Math.hypot(q[0][0]-q[q.length-1][0], q[0][1]-q[q.length-1][1])<=1e-2) q.pop();
  return q;
}
function roundedPath(P, d, rho){                       // (P inset by d) grown by rho: rounded corners that survive collapsed points
  const Q=insetPoly(P,d), f=v=>v.toFixed(2); if (!Q.length) return '';
  if (Q.length===1){ const [x,y]=Q[0]; return rho<1e-2 ? '' : `M${f(x-rho)} ${f(y)}A${f(rho)} ${f(rho)} 0 1 1 ${f(x+rho)} ${f(y)}A${f(rho)} ${f(rho)} 0 1 1 ${f(x-rho)} ${f(y)}Z`; }
  const n=Q.length, no=[]; for (let i=0;i<n;i++){ const a=Q[i], b=Q[(i+1)%n], dx=b[0]-a[0], dy=b[1]-a[1], l=Math.hypot(dx,dy)||1; no.push([dy/l,-dx/l]); }
  let s=''; for (let i=0;i<n;i++){ const q=Q[i], ni=no[(i-1+n)%n], nu=no[i], a=[q[0]+ni[0]*rho,q[1]+ni[1]*rho], e=[q[0]+nu[0]*rho,q[1]+nu[1]*rho];
    s+=(i?'L':'M')+f(a[0])+' '+f(a[1]); if (rho>1e-2 && Math.hypot(e[0]-a[0],e[1]-a[1])>1e-2) s+=`A${f(rho)} ${f(rho)} 0 0 1 ${f(e[0])} ${f(e[1])}`; }
  return s+'Z';
}
const layerPath = (P, r, d) => d<=1e-6 ? roundedPath(P,r,r) : (r>=d ? roundedPath(P,r,r-d) : roundedPath(P,d,0));   // inner layers keep radius r-d, and go sharp once d > r
const pairsOf = p => { const o=[]; for (let i=0;i<p.length;i+=2) o.push([p[i],p[i+1]]); return o; };      // 8 points: every corner is a pair that can slide apart (octagon)
const sizeOfP = P => { const xs=P.map(q=>q[0]), ys=P.map(q=>q[1]); return Math.min(Math.max(...xs)-Math.min(...xs), Math.max(...ys)-Math.min(...ys)); };
function expandDef(j){                                 // flat json -> frame state, exactly the prototype's model (../signsoftheworld-proto/shape-morph-8.html)
  if (j.shape==='x'){                                  // crossbuck: two bars crossing at +-angle about the centre. Corner radius and border are fractions of the bar length.
    const bw=j.borderWidth||0, c=hexRgb;                // each bar end: a cap of length endLength whose tip is endWidth of the bar wide (1 = flat end, 0 = a point)
    return { kind:'x', th:j.angle, L:j.length, W:j.width, t:j.endLength||0, f:j.endWidth==null?1:j.endWidth, r:j.radius||0, a:0, b:bw, halo:c(j.borderColor), ring:c(j.borderColor), face:c(j.fill), alpha:1 }; }
  const [x0,y0,x1,y1]=j.box, w=x1-x0, mx=(x0+x1)/2, my=(y0+y1)/2; let p=[x0,y0,x1,y0,x1,y1,x0,y1], rot=0, r=j.radius;   // square / rect: TL, TR, BR, BL
  if (j.shape==='circle') r=.5;                                                     // a circle is a square with the largest radius
  else if (j.shape==='diamond'){ const s=w/Math.SQRT2; p=[mx-s/2,my-s/2,mx+s/2,my-s/2,mx+s/2,my+s/2,mx-s/2,my+s/2]; rot=45; }   // the same square, rotated 45 degrees
  else if (j.shape==='triangle') p=[mx,y0,mx,y0,x1,y1,x0,y1];                      // the apex is split across the top-left and top-right points
  else if (j.shape==='triangleDown') p=[x0,y0,x1,y0,mx,y1,mx,y1];
  else if (j.shape==='octagon'){ const k=(j.cut==null?.2929:j.cut), s=x1-x0, e=s*k; p=[x0,y0+e, x0+e,y0, x1-e,y0, x1,y0+e, x1,y1-e, x1-e,y1, x0+e,y1, x0,y1-e]; }   // each corner pair slides apart along its edges
  if (p.length===8){ const q=[]; for (let i=0;i<8;i+=2) q.push(p[i],p[i+1],p[i],p[i+1]); p=q; }   // every other shape: both points of a pair on the corner
  const bw=j.borderWidth||0, g=j.gap||0, c=hexRgb, st={ p, r, rot, alpha:1 };
  if (j.borderStyle==='inset') Object.assign(st,{ halo:c(j.fill), ring:c(j.borderColor), face:c(j.fill), a:g, b:g+bw });   // fill margin outside the border
  else Object.assign(st,{ halo:c(j.borderColor), ring:c(j.borderColor), face:c(j.fill), a:0, b:bw });                        // border on the shape's edge
  return st;
}
const defCache = {};
const defState = id => { const j=SIGN_DEFS[id]; if (!j || j.shape==='none') return null; return defCache[id] || (defCache[id]=expandDef(j)); };   // null = no frame (symbol only)
const mixFrame = (a,b,t) => { const m=(x,y)=>x+(y-x)*t, mv=(u,v)=>u.map((q,i)=>m(q,v[i]));
  if (a.kind==='x' && b.kind==='x') return { kind:'x', th:m(a.th,b.th), L:m(a.L,b.L), W:m(a.W,b.W), t:m(a.t,b.t), f:m(a.f,b.f), r:m(a.r,b.r), a:m(a.a,b.a), b:m(a.b,b.b), halo:mv(a.halo,b.halo), ring:mv(a.ring,b.ring), face:mv(a.face,b.face), alpha:m(a.alpha,b.alpha) };
  if (!!a.kind!==!!b.kind) return t<.5 ? a : b;       // an X never morphs into a four-point shape (no family mixes them)
  return { p:mv(a.p,b.p), r:m(a.r,b.r), rot:m(a.rot,b.rot), a:m(a.a,b.a), b:m(a.b,b.b), halo:mv(a.halo,b.halo), ring:mv(a.ring,b.ring), face:mv(a.face,b.face), alpha:m(a.alpha,b.alpha) }; };
const xBar = (L,W,t,f,ang) => { const E=L/2-t, h=f*W/2, loc=[[-E,-W/2],[E,-W/2],[E+t,-h],[E+t,h],[E,W/2],[-E,W/2],[-E-t,h],[-E-t,-h]], c=Math.cos(ang*Math.PI/180), s=Math.sin(ang*Math.PI/180);
  return loc.map(([x,y])=>[300+x*c-y*s, 300+x*s+y*c]); };
function frameD(st){
  if (st.kind==='x'){ const bars=[xBar(st.L,st.W,st.t,st.f,st.th), xBar(st.L,st.W,st.t,st.f,-st.th)], r=st.r*st.L; const lay=d=>bars.map(P=>layerPath(P,r,d)).join('');
    return [lay(0), lay(st.a*st.L), lay(st.b*st.L)]; }
  const P=pairsOf(st.p), S=sizeOfP(P), r=st.r*S; return [layerPath(P,r,0), layerPath(P,r,st.a*S), layerPath(P,r,st.b*S)]; }

/* ============================================================ SignView: a live, morphable svg */
const VB = '-140 -140 880 880';
class SignView{
  constructor(fam, vi=0){
    this.fam=fam; this.vi=vi; this.state=null; this.fs=null;
    this.shaped = fam.ids.every(id=>SIGN_DEFS[id]);          // every variant has a definition: frames come from the definitions, only symbols come from the artwork
    this.off = this.shaped ? 3 : 0;                                                // the first three paths are halo, ring, face
    this.L=fam.ids.map(id=>this.shaped ? prep(id).filter(l=>l.kind==='s') : prep(id));
    this.svg=document.createElementNS(NS_URI,'svg'); this.svg.setAttribute('viewBox',VB); this.svg.setAttribute('role','img'); this.svg.setAttribute('aria-label',fam.name);
    this.base=this.shaped ? this.svg.appendChild(document.createElementNS(NS_URI,'g')) : null;   // the frame's own group, so the frame can fade as one piece
    this.paths=[]; this.ensure(this.off+Math.max(...this.L.map(l=>l.length)));
    this.showExact(vi);
  }
  ensure(n){ while (this.paths.length<n){ const p=document.createElementNS(NS_URI,'path'); p.setAttribute('fill-rule','evenodd'); (this.paths.length<this.off ? this.base : this.svg).appendChild(p); this.paths.push(p); } }
  showExact(vi){
    this.vi=vi; this.state=null; const lay=this.L[vi];
    if (this.shaped){ this.fs=defState(this.fam.ids[vi]); this.drawFrame(this.fs); }
    this.paths.forEach((p,i)=>{ if (i<this.off) return; const l=lay[i-this.off]; if(!l){ p.setAttribute('d',''); return; }
      p.setAttribute('d',l.d); p.setAttribute('fill',rgbCss(l.fill)); p.setAttribute('fill-opacity',1); });
  }
  drawFrame(st){
    this.base.setAttribute('opacity', st ? st.alpha.toFixed(3) : '1');   // fading the group, not each layer: the layers underneath never show through (a frame leaving or arriving stays its own colours)
    for (let i=0;i<3;i++){ const p=this.paths[i];
      if (!st){ p.setAttribute('d',''); continue; }
      const isX=st.kind==='x', P=isX?null:pairsOf(st.p), xs=isX?[0]:P.map(q=>q[0]), ys=isX?[0]:P.map(q=>q[1]), cx=(Math.min(...xs)+Math.max(...xs))/2, cy=(Math.min(...ys)+Math.max(...ys))/2;
      p.setAttribute('fill-rule', isX?'nonzero':'evenodd');
      p.setAttribute('d',frameD(st)[i]); p.setAttribute('fill',rgbCss([st.halo,st.ring,st.face][i]));
      if (i===0){ const w=Math.max(0,Math.min(1,(Math.min(...st.halo)-225)/30)); p.setAttribute('stroke','#c1c1c1'); p.setAttribute('stroke-width','1'); p.setAttribute('vector-effect','non-scaling-stroke'); p.setAttribute('stroke-opacity',w.toFixed(3)); }   // a white outer edge gets a 1px #c1c1c1 outline, faded in and out as the colour morphs
      if (!isX && st.rot) p.setAttribute('transform',`rotate(${st.rot.toFixed(2)} ${cx.toFixed(1)} ${cy.toFixed(1)})`); else p.removeAttribute('transform'); }
  }
  // build the list of transitions from what is on screen now to variant vi
  plan(vi){
    const A=(this.state||itemsOf(this.L[this.vi])).map(it=>it.area?it:meta(it)), B=itemsOf(this.L[vi]), tr=[], ua=new Set(), ub=new Set();
    const lettering=it=>/^symbol-text/.test(it.key||'') && it.d;
    const morph=(kind,i,j)=>{ ua.add(i); ub.add(j); const lp=(kind==='s' && lettering(A[i]) && lettering(B[j]) && pointMatch(A[i].d,B[j].d,NS)) || matchLoops(A[i].loops,B[j].loops,A[i].raw,B[j].raw,kind==='s');
      tr.push({ type:'morph', kind, key:B[j].key, oa_:(kind==='f'?0:1000)+i, ob_:(kind==='f'?0:1000)+j, from:lp.from, to:lp.to, spin:lp.spin, fa:A[i].rgb, fb:B[j].rgb, oa:A[i].op, ob:B[j].op }); };
    if (this.shaped){                                // frame: interpolate the two definitions. A variant without a frame keeps the other's shape and fades it.
      let f0=this.fs||defState(this.fam.ids[this.vi]), f1=defState(this.fam.ids[vi]);
      if (f0 && !f1) f1={...f0, alpha:0}; else if (!f0 && f1) f0={...f1, alpha:0};
      tr.frame = f0&&f1 ? { from:f0, to:f1 } : null; }
    const named=matchByKey(A,B), sPairs=[...named.pairs];
    // frames are drawn by depth (frame-1 = bottom, last = the face). Same layer count: pair depth for depth.
    // Different counts: face with face, the rest by colour and size; extras fade.
    const fA=A.map((x,k)=>k).filter(k=>A[k].kind==='f'), fB=B.map((x,k)=>k).filter(k=>B[k].kind==='f');
    if (fA.length && fB.length){                     // every frame layer morphs; surplus layers collapse onto the nearest outline (face stays with face), nothing fades into a ghost
      const d=fA.length-fB.length, pr=new Set(), cl=(x,n)=>Math.max(0,Math.min(n-1,x));
      fA.forEach((i,k)=>pr.add(i+','+fB[cl(k-d,fB.length)]));
      fB.forEach((j,k)=>pr.add(fA[cl(k+d,fA.length)]+','+j));
      pr.forEach(p=>{ const [i,j]=p.split(',').map(Number); morph('f',i,j); }); }
    const skA=new Set(named.resA), skB=new Set(named.resB);
    if (named.pairs.length){ A.forEach((x,k)=>{ if(x.kind==='s'&&x.key) skA.add(k); }); B.forEach((x,k)=>{ if(x.kind==='s'&&x.key) skB.add(k); }); }   // the drawer named parts to match: a named part with no partner fades instead of pairing by outline
    for (const kind of fA.length&&fB.length?['s']:['f','s']) for (const [i,j] of matchItems(A,B,kind,skA,skB)) {
      if (kind==='s') { if (glyphDistance(A[i],B[j]) <= 0.33) sPairs.push([i,j]); continue; }   // different drawing: never twist one into the other
      morph(kind,i,j); }
    // symbol mode: morph when parts are named alike, or the drawings are really the same (most symbol area on both sides found a partner);
    // otherwise the frame still morphs but the symbol dissolves. fam.t = 'morph' | 'fade' overrides.
    const symArea=(X,idx)=>idx.reduce((s,k)=>s+X[k].area,0), allS=X=>X.map((x,k)=>k).filter(k=>X[k].kind==='s');
    const cov=Math.min(symArea(A,sPairs.map(p=>p[0]))/(symArea(A,allS(A))||1), symArea(B,sPairs.map(p=>p[1]))/(symArea(B,allS(B))||1));
    tr.cov=cov; tr.mode=this.fam.t || (named.pairs.length || cov>=MORPH_COVER ? 'morph' : 'fade');   // named pairs = the drawer's intent
    if (tr.mode==='morph') for (const [i,j] of sPairs) morph('s',i,j);
    const hub=X=>{ const k=allS(X), w=symArea(X,k)||1; return [0,1].map(d=>k.reduce((s,q)=>s+X[q].c[d]*X[q].area,0)/w); };   // the symbol's own centre, for the scale
    const ha=hub(A), hb=hub(B);
    A.forEach((a,i)=>{ if(!ua.has(i)) tr.push({ type:'out', kind:a.kind, key:a.key, d:a.d, oa_:(a.kind==='f'?0:1000)+i, from:a.loops, fa:a.rgb, oa:a.op, hub:ha, sc:a.kind==='s' ? symScale(this.fam.ids[this.vi]) : 0 }); });
    B.forEach((b,j)=>{ if(!ub.has(j)) tr.push({ type:'in',  kind:b.kind, key:b.key, d:b.d, ob_:(b.kind==='f'?0:1000)+j, to:b.loops,   fb:b.rgb, ob:b.op, hub:hb, sc:b.kind==='s' ? symScale(this.fam.ids[vi]) : 0 }); });
    // stacking: morphing layers follow the old sign's order for the first half, the new sign's order for the second half. A fading
    // layer stays over or under the same morphing layers throughout, as in its own sign, so nothing jumps on top of another halfway.
    // With nothing morphing there is nothing to follow: old layers stay underneath, new ones on top.
    const morphs=tr.filter(t=>t.type==='morph');
    const stack=(own,other,guest)=>{                 // own: this half's order; guest: the fading layers that only exist in the other sign
      const key=t=>{ if (t.type!==guest) return t[own];
        const above=morphs.filter(m=>m[other]>t[other]).map(m=>m[own]);
        return (above.length ? Math.min(...above)-.5 : Math.max(...morphs.map(m=>m[own]))+.5) + t[other]*1e-6; };
      return [...tr].sort((x,y)=>key(x)-key(y)); };
    if (morphs.length){ tr.byA=stack('oa_','ob_','in'); tr.byB=stack('ob_','oa_','out'); }
    else tr.byA=tr.byB=[...tr.filter(t=>t.type==='out'), ...tr.filter(t=>t.type==='in')];
    tr.seq = !!this.fam.seq && this.shaped && tr.some(t=>t.kind==='s');   // symbols fade out, then the base shape morphs, then new symbols fade in
    return tr;
  }
  renderAt(tr, T){
    this.ensure(this.off+tr.length); const st=[], list=T<.5?tr.byA:tr.byB;
    if (this.shaped){ this.fs = tr.frame ? mixFrame(tr.frame.from, tr.frame.to, ease(tr.seq ? clamp((T-SEQ[0])/(SEQ[1]-SEQ[0])) : T)) : null; this.drawFrame(this.fs); }
    this.paths.forEach((p,i)=>{
      if (i<this.off) return;
      const t=list[i-this.off]; if(!t){ p.setAttribute('d',''); return; }
      let loops, rgb, op, d=t.d;                     // d: the drawn path. A fading layer keeps it, so nothing shifts when the exact sign is swapped in at the end
      if (t.type==='morph'){ d=undefined;
        const e=ease(T); loops=t.from.map((a,k)=>{ const b=t.to[k], o=new Float32Array(a.length); for(let q=0;q<a.length;q++) o[q]=a[q]+(b[q]-a[q])*e;
          const w=t.spin && t.spin[k]; return w ? turned(o, w.th*e, w.ca, [w.ca[0]+(w.cb[0]-w.ca[0])*e, w.ca[1]+(w.cb[1]-w.ca[1])*e]) : o; });
        rgb=[0,1,2].map(c=>t.fa[c]+(t.fb[c]-t.fa[c])*e); op=t.oa+(t.ob-t.oa)*e;
      } else if (t.type==='out'){ const e=smooth(tr.seq ? T/SEQ[0] : T); loops=t.sc?scaleLoops(t.from,t.hub,1-t.sc*e):t.from; if (t.sc) d=undefined; rgb=t.fa; op=t.oa*(1-e); }
      else { const e=smooth(tr.seq ? (T-SEQ[1])/(1-SEQ[1]) : T); loops=t.sc?scaleLoops(t.to,t.hub,1-t.sc*(1-e)):t.to; if (t.sc) d=undefined; rgb=t.fb; op=t.ob*e; }
      p.setAttribute('d',d || loops.map(polyD).join('')); p.setAttribute('fill',rgbCss(rgb)); p.setAttribute('fill-opacity',op.toFixed(3));
      st.push({ kind:t.kind, key:t.key||null, rgb, op, d, loops });
    });
    this.state=st;
  }
  morphTo(vi, ms=600){
    cancelAnimationFrame(this.raf);
    const tr=this.plan(vi), t0=performance.now(); if (tr.seq) ms*=SEQ_SLOW;
    const tick = now => { const T=clamp((now-t0)/ms); this.renderAt(tr,T); if (T<1) this.raf=requestAnimationFrame(tick); else this.showExact(vi); };
    this.vi=vi; this.raf=requestAnimationFrame(tick);
  }
}

/* ============================================================ grid */
const grid=document.getElementById('grid'), tiles={};
/* addresses. Served over the web, each sign has a real page (build.py writes <slug>/index.html), and moving around the home
   page uses those same addresses. Opened as a file, the site uses #/ addresses instead. */
const SIGN=document.body.dataset.sign;                                // set on a sign's own page
const ABOUT=document.body.dataset.page==='about';
const PATHS=/^https?:$/.test(location.protocol) && document.body.hasAttribute('data-pages');
const ROOT=new URL(document.body.dataset.root||'./', location.href);   // the home folder, worked out before the address first changes
if (PATHS && !SIGN){ const base=document.createElement('base'); base.href=ROOT.href; document.head.prepend(base); }   // keeps images/… working while the address shows /stop/
function urlFor(fam,vi){
  const v = fam.ids.length>1 && vi>0 ? fam.vslugs[vi] : '';
  if (PATHS && !fam.hidden) return new URL(fam.slug+'/'+(v?'#'+v:''), ROOT).href;
  return new URL((PATHS ? ROOT.pathname : location.pathname)+location.search+'#/'+fam.slug+(v?'/'+v:''), location.href).href;
}
const newTab = e => e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button>0;   // leave those clicks to the browser
const el=(tag,cls,text)=>{ const e=document.createElement(tag); if (cls) e.className=cls; if (text!=null) e.textContent=text; return e; };
const decorative=svg=>{ svg.removeAttribute('role'); svg.removeAttribute('aria-label'); svg.setAttribute('aria-hidden','true'); return svg; };   // a sign whose name is already in the text beside it
// the grid is ordered by form: shape of the outer frame, then the sign's main colour (hue), so like signs sit together
const SHAPE_ORDER=['octagon','triangle-down','triangle','diamond','circle','square','rectangle','other'];
function shapeOf(id){
  const fr=prep(id).filter(l=>l.kind==='f'); if (!fr.length) return 'other';
  const L=arcInfo(fr[0].raw[0]), c=findCorners(L); if (!c) return 'circle';
  let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9; for (let i=0;i<L.f.length;i+=2){ x0=Math.min(x0,L.f[i]); x1=Math.max(x1,L.f[i]); y0=Math.min(y0,L.f[i+1]); y1=Math.max(y1,L.f[i+1]); }
  const w=x1-x0, h=y1-y0, pts=c.map(k=>pointAt(L,((k.s+k.e)/2)%L.P));
  if (c.length===8) return 'octagon';
  if (c.length===3) return pts.filter(p=>p[1]<y0+h*.25).length===1 ? 'triangle' : 'triangle-down';
  if (c.length===4){ if (pts.filter(p=>Math.abs(p[0]-(x0+x1)/2)<w*.15 || Math.abs(p[1]-(y0+y1)/2)<h*.15).length>=3) return 'diamond';
    return Math.abs(w-h)<.05*Math.max(w,h) ? 'square' : 'rectangle'; }
  return 'other';
}
function hueOf(id){                                  // hue of the biggest saturated frame layer (else symbol layer); 999 = black/white sign
  const ls=prep(id), sat=l=>(Math.max(...l.fill)-Math.min(...l.fill))/255;
  const pick=X=>X.filter(l=>sat(l)>.25).sort((a,b)=>b.area-a.area)[0], l=pick(ls.filter(l=>l.kind==='f'))||pick(ls.filter(l=>l.kind==='s'));
  if (!l) return 999;
  const [r,g,b]=l.fill.map(v=>v/255), mx=Math.max(r,g,b), d=mx-Math.min(r,g,b);
  let hh=(mx===r?((g-b)/d)%6 : mx===g?(b-r)/d+2 : (r-g)/d+4)*60; hh=(hh+360)%360;
  return hh>=345 ? hh-360 : hh;                        // keep the reds together
}
// a family flagged last:true (Wi-Fi, Bluetooth, Phone, Recycling) goes after every shape group
const GRID_ORDER=FAMILIES.map((f,i)=>({ f, i, s:f.last ? 99 : SHAPE_ORDER.indexOf(shapeOf(f.ids[0])), h:hueOf(f.ids[0]) }))
  .sort((a,b)=>a.s-b.s || a.h-b.h || a.i-b.i).map(x=>x.f);
for (const f of grid ? GRID_ORDER.filter(f=>!f.hidden) : []){              // hidden: specialist signs, kept (and linkable) but off the grid
  const cell=document.createElement('li'); cell.className='cell'; cell.dataset.cat=f.cat;
  const link=document.createElement('a'); link.href=urlFor(f,0); cell.appendChild(link);
  const b=el('span','tile'); b.appendChild(decorative(new SignView(f,0).svg)); link.appendChild(b);          // b is what zooms into the detail page
  link.append(el('h2','',f.name), el('p','',f.ids.length+(f.ids.length===1?' version':' versions')));
  link.addEventListener('click', e => { if (newTab(e)) return; e.preventDefault(); openFrom = b;
    if (PATHS){ history.pushState(null,'',urlFor(f,0)); route(); } else location.hash = '#/'+f.slug; });
  grid.appendChild(cell); tiles[f.slug]=b;
}

/* ---- logo: a small shape beside the wordmark that holds a shape, morphs to the next on the site's curve, and repeats ---- */
const MARK_STATES=[ {shape:'square',box:[0,0,600,600],radius:.06}, {shape:'triangle',box:[-11,23,611,561],radius:.06}, {shape:'circle',box:[0,0,600,600],radius:.5}, {shape:'diamond',box:[-10,-10,610,610],radius:.06} ]
  .map(d=>expandDef({...d,fill:'#111111',borderColor:'#111111',borderStyle:'edge',borderWidth:0}));
let markRaf=0;
function drawMark(path,st){ const P=pairsOf(st.p), xs=P.map(q=>q[0]), ys=P.map(q=>q[1]), cx=(Math.min(...xs)+Math.max(...xs))/2, cy=(Math.min(...ys)+Math.max(...ys))/2;
  path.setAttribute('d',frameD(st)[0]); path.setAttribute('fill',rgbCss(st.halo)); path.setAttribute('transform',st.rot?`rotate(${st.rot.toFixed(2)} ${cx.toFixed(1)} ${cy.toFixed(1)})`:''); }
function newMark(){ const svg=document.createElementNS(NS_URI,'svg'); svg.setAttribute('viewBox','-60 -60 720 720'); svg.setAttribute('aria-hidden','true'); svg.setAttribute('class','mark'); const p=document.createElementNS(NS_URI,'path'); svg.appendChild(p); return {svg,p}; }
function buildLogo(){
  const bs=[...document.querySelectorAll('.logo')]; bs.forEach(b=>b.textContent='');
  const marks=bs.map(b=>{ const m=newMark(); b.append(m.svg,'Signs of the World'); return m; });          // the header logo and the one on the page
  const draw=st=>marks.forEach(m=>drawMark(m.p,st)); draw(MARK_STATES[0]);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;                // stays on the first shape
  const HOLD=850, MOVE=500; let i=0, t0=performance.now();                          // hold a shape, morph to the next on the site's curve
  const tick=now=>{ markRaf=requestAnimationFrame(tick); const t=now-t0;
    if (t<HOLD) draw(MARK_STATES[i]);
    else if (t<HOLD+MOVE) draw(mixFrame(MARK_STATES[i],MARK_STATES[(i+1)%4],ease((t-HOLD)/MOVE)));
    else { i=(i+1)%4; t0=now; draw(MARK_STATES[i]); } };
  markRaf=requestAnimationFrame(tick);
}

/* ============================================================ detail view + zoom */
const detail=document.getElementById('detail'), hero=document.getElementById('hero'), $=id=>document.getElementById(id);
const EASE=`cubic-bezier(${BEZIER.join(',')})`; document.documentElement.style.setProperty('--ease',EASE);
let cur=null, openFrom=null, animating=false;
const rectCss=r=>({left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px'});

const META=[['history','History'],['adoption','Adoption'], ['sources','Sources'],];    // optional per-variant fields in defs.json; a row shows only when it has text
// sources: [{"Wikipedia":"https://…"}, "https://…"] → one link per line (http/https only)
function addSources(box,label,list){
  if (!Array.isArray(list)) list = list ? [list] : [];
  const links=[];
  for (const it of list){
    const pairs = typeof it==='string' ? [[it,it]] : Object.entries(it||{});
    for (const [name,url] of pairs) if (/^https?:\/\//i.test(url)) links.push([name,url]);
  }
  if (!links.length) return;
  const list_=el('ul');
  links.forEach(([name,url])=>{ const a=el('a','',name), li=el('li'); a.href=url; a.target='_blank'; a.rel='noopener noreferrer'; li.appendChild(a); list_.appendChild(li); });
  addRow(box,label,list_);
}
function addRow(box,label,...content){ const row=el('section','row'); row.append(el(SIGN?'h2':'h3','',label),...content); box.appendChild(row); }   // on a sign's own page the sign name is the h1
// each edge of the switcher fades in step with how far there is still to scroll that way, up to FADE pixels
const FADE=48;
function fadeEdges(){
  const v=$('d-vars'), left=v.scrollLeft, right=v.scrollWidth-v.clientWidth-left;
  v.style.setProperty('--fade-l', Math.max(0,Math.min(FADE,left))+'px');
  v.style.setProperty('--fade-r', Math.max(0,Math.min(FADE,right))+'px');
}
// when the switcher is wider than the stage, slide it just far enough to show the chosen thumbnail
function showThumb(vars,vi){
  const b=vars.children[vi]; if (!b) return;
  const box=vars.getBoundingClientRect(), r=b.getBoundingClientRect(), inset=FADE;     // clear of the faded edge
  const dx = Math.min(0, r.left-box.left-inset) || Math.max(0, r.right-box.right+inset);
  if (dx) vars.scrollBy({left:dx, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
}
function fillInfo(fam,vi){
  $('d-tag').textContent = fam.ids.length>1 ? fam.vnames[vi] : '';
  $('d-name').textContent=fam.name;
  [...$('d-vars').children].forEach((b,i)=>{ b.classList.toggle('on',i===vi); b.setAttribute('aria-pressed',i===vi); });
  hero.firstElementChild.setAttribute('aria-label', fam.name+' sign'+(fam.ids.length>1 ? ', '+fam.vnames[vi] : ''));
  showThumb($('d-vars'), vi);
  const box=$('d-meta'); box.innerHTML=''; const own=SIGN_DEFS[fam.ids[vi]]||{}, base=SIGN_DEFS[fam.ids[0]]||{};
  const d={}; for (const [k] of META) d[k] = own[k]!=null && own[k]!=='' && !(Array.isArray(own[k])&&!own[k].length) ? own[k] : base[k];   // a variant's own text wins; otherwise it shares the family's first entry
  for (const [k,label] of META){ let v=d[k];
    if (k==='sources'){ addSources(box,label,v); continue; }
    if (Array.isArray(v)) v=v.join('\n'); if (v==null||v==='') continue;
    addRow(box,label,...String(v).split(/\n+/).map(line=>el('p','',line))); }
}
function buildDetail(fam,vi){
  hero.innerHTML=''; const sign=new SignView(fam,vi); hero.appendChild(sign.svg);
  const vars=$('d-vars'); vars.innerHTML='';
  if (fam.ids.length>1) fam.ids.forEach((_,i)=>{ const b=el('button'); b.type='button'; b.title=fam.vnames[i]; b.setAttribute('aria-label',fam.vnames[i]); b.appendChild(decorative(new SignView(fam,i).svg));
    b.addEventListener('click',()=>selectVariant(i)); vars.appendChild(b); });
  vars.scrollLeft=0; fadeEdges();
  fillInfo(fam,vi); return sign;
}
function setUrl(fam,vi){
  const u = urlFor(fam,vi);
  if (location.href !== u) history.replaceState(history.state,'',u);
}
function selectVariant(i){
  if(!cur||i===cur.sign.vi) return;
  cur.sign.morphTo(i,560); fillInfo(cur.fam,i); setUrl(cur.fam,i);
}

function openDetail(fam, vi, tile, instant){
  if (cur) return;
  document.body.classList.add('lock'); detail.classList.add('open'); detail.scrollTop=0; if (!SIGN) detail.classList.remove('in');   // a sign page arrives with its text showing
  hero.className='pending'; const sign=buildDetail(fam,vi); cur={fam,tile,sign};
  document.title = fam.name+' · Signs of the World';
  if (instant || !tile){ detail.style.opacity=1; hero.className='ready'; detail.classList.add('in'); return; }
  const from=tile.getBoundingClientRect(), to=hero.getBoundingClientRect();
  const fly=document.createElement('div'); fly.className='flyer'; Object.assign(fly.style,rectCss(from)); fly.appendChild(new SignView(fam,vi).svg); document.body.appendChild(fly); fly.firstChild.animate([{transform:'scale(.78)'},{transform:'scale(1)'}],{duration:600,easing:EASE,fill:'forwards'});
  tile.classList.add('away'); animating=true;
  detail.style.opacity=0; detail.animate([{opacity:0},{opacity:1}],{duration:380,fill:'forwards',easing:'ease-out'});
  fly.animate([rectCss(from),rectCss(to)],{duration:600,easing:EASE,fill:'forwards'}).onfinish=()=>{
    hero.className='ready'; fly.remove(); detail.classList.add('in'); animating=false; detail.getAnimations().forEach(a=>a.cancel()); detail.style.opacity=1; };
}
function closeDetail(instant){
  if(!cur) return; const {fam,tile,sign}=cur; cur=null; document.title='Signs of the World · Universal signs and symbols';
  detail.classList.remove('in');
  const finish=()=>{ if (tile) tile.classList.remove('away'); detail.classList.remove('open'); detail.getAnimations().forEach(a=>a.cancel()); detail.style.opacity=0; hero.style.background=''; document.body.classList.remove('lock'); animating=false; };
  if (instant || !tile){ finish(); return; }
  animating=true;
  const from=hero.getBoundingClientRect(), fs=new SignView(fam,sign.vi);
  const fly=document.createElement('div'); fly.className='flyer'; Object.assign(fly.style,rectCss(from)); fly.appendChild(fs.svg); document.body.appendChild(fly); fly.firstChild.animate([{transform:'scale(1)'},{transform:'scale(.78)'}],{duration:400,easing:EASE,fill:'forwards'});
  hero.className='pending'; hero.style.background='transparent';
  if (fs.vi!==0) fs.morphTo(0,400);                 // settle back to the grid look while shrinking
  const to=tile.getBoundingClientRect(); tile.classList.add('away');
  detail.animate([{opacity:1},{opacity:0}],{duration:320,delay:80,fill:'forwards',easing:'ease-in'});
  fly.animate([rectCss(from),rectCss(to)],{duration:400,easing:EASE,fill:'forwards'}).onfinish=()=>{ fly.remove(); finish(); };
}

/* ============================================================ routing: /family/#variant, or #/family/variant */
// which sign the address names
function wanted(){
  let [, slug, v] = location.hash.match(/^#\/([^/]+)(?:\/([^/]+))?/) || [];
  if (!slug && (SIGN || (PATHS && location.pathname.startsWith(ROOT.pathname)))){
    slug = SIGN || (location.pathname.slice(ROOT.pathname.length).match(/^([^/]+)\/(?:index\.html)?$/)||[])[1];
    v = location.hash.slice(1);
  }
  const fam = slug && BY_SLUG[slug];
  return fam ? { fam, vi: v ? Math.max(0, fam.vslugs.indexOf(v)) : 0 } : null;
}
function route(){
  const w = wanted();
  if (!w){ if (cur) closeDetail(); return; }
  const {fam,vi} = w;
  if (cur && cur.fam===fam){ selectVariant(vi); return; }
  if (cur) closeDetail(true);
  const tile = tiles[fam.slug], first = !route.done;
  openDetail(fam, vi, openFrom && openFrom===tile ? tile : (first ? null : tile), first || !(openFrom===tile));
  openFrom = null;
  if (!SIGN) setUrl(fam,vi);                                       // an old #/ link settles on the sign's real address
}
window.addEventListener(PATHS ? 'popstate' : 'hashchange', route);
function requestClose(){
  if(!cur) return;
  if (SIGN){ location.assign(PATHS ? ROOT.href : new URL('index.html',ROOT).href); return; }   // a sign page has no grid behind it: go home
  if (history.length>1 && !firstLoadOpen) history.back();
  else { try{ history.replaceState(null,'',(PATHS ? ROOT.pathname : location.pathname)+location.search); }catch(e){} closeDetail(); }
}
$('close')?.addEventListener('click',()=>requestClose());
$('d-vars')?.addEventListener('scroll',fadeEdges,{passive:true});
if (detail) new ResizeObserver(()=>{ if (cur){ showThumb($('d-vars'),cur.sign.vi); fadeEdges(); } }).observe(document.querySelector('.stage'));
document.querySelectorAll('.logo').forEach(b=>b.addEventListener('click',e=>{ if (newTab(e) || ABOUT) return; e.preventDefault(); if (cur) requestClose(); else scrollTo({top:0,behavior:'smooth'}); }));
addEventListener('keydown',e=>{
  if(!cur) return;
  if(e.key==='Escape') requestClose();
  if(e.key==='ArrowRight') selectVariant(Math.min(cur.fam.ids.length-1,cur.sign.vi+1));
  if(e.key==='ArrowLeft') selectVariant(Math.max(0,cur.sign.vi-1));
});
let firstLoadOpen = false;
route(); route.done = true; firstLoadOpen = !!cur;                    // arrived straight on a sign: closing must not leave the site
buildLogo();                                                          // after everything it uses ($) exists

/* footer contact: the address is stored scrambled and only assembled when a person clicks, so it is never in the page for scrapers to read */
{ const c=[64,93,91,74,54,12,54,55,8,9,0,26,28,231,237,243,245,207,193,195,218,223,170,171,189,190,173,220,140,157,156,112,106,121,120,48,74,88,68], o=[19,23,0,11,3,34,27,21,22,15,26,16,17,4,10,14,37,38,9,31,6,36,25,18,8,13,33,28,2,5,30,7,12,29,24,35,32,20,1];
  $('contact')?.addEventListener('click', e => { if (!e.isTrusted) return;     // ignore clicks made by scripts
    location.href = o.map(n => String.fromCharCode(c[n] ^ ((41+7*n)&255))).join(''); }); }
