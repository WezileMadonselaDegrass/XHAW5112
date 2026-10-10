/* ---------- data ---------- */
const PKGS=[
  {id:'casual',name:'Casual Gaming Session',tag:'Jump in and play',price:35,hrs:2,min:1,max:4,cats:['Individual','Family'],badge:'Best value',kind:'arena',h:0,
   desc:'Perfect for individuals or small groups wanting a fun, drop-in gaming experience with access to our full game library.',
   inc:['2 hours on a high-spec gaming station','Full game library access','Headset and controller hire','On-site support staff','Snack bar access']},
  {id:'train',name:'Competitive Training Pack',tag:'Level up your skills',price:65,hrs:3,min:1,max:10,cats:['Esports','Club'],kind:'arena',h:1,
   desc:'Structured practice for ranked players and teams, with a coach on the floor and match review after each block.',
   inc:['3 hours of reserved practice time','Coach-led drills and VOD review','Low-latency competitive stations','Private lobby setup','Team comms headsets']},
  {id:'party',name:'Birthday Party Package',tag:'Make it legendary',price:85,hrs:3,min:6,max:20,cats:['Birthday','Family'],badge:'Popular',kind:'party',h:2,
   desc:'A private gaming party hosted by our crew. We handle the games, the setup and the fun, so you can enjoy the day.',
   inc:['3 hours in the party zone','Dedicated party host','Mini tournament with prizes','Decor and gaming-themed setup','Party platters and drinks']},
  {id:'family',name:'Family Play Session',tag:'Everyone plays',price:40,hrs:2,min:2,max:6,cats:['Family','Individual'],kind:'party',h:3,
   desc:'Co-op and party games picked for all ages, so parents and kids can play together on the big screens.',
   inc:['2 hours in the family lounge','Age-friendly game selection','Big-screen co-op stations','Host to help with setup','Snack bar access']},
  {id:'school',name:'School Group Session',tag:'Learn, play, connect',price:45,hrs:3,min:10,max:40,cats:['School'],kind:'arena',h:1,
   desc:'Supervised group visits that mix teamwork games with an intro to esports careers, designed with educators in mind.',
   inc:['3 hours for the whole class','Teamwork and strategy games','Esports careers talk','Supervision ratios met','Teacher goes free with 15+ learners']},
  {id:'corp',name:'Corporate Team Challenge',tag:'Beat the boardroom',price:95,hrs:3,min:8,max:40,cats:['Corporate'],kind:'arena',h:2,
   desc:'A team-building tournament with live brackets, a commentator and a trophy. Catering and branding options available.',
   inc:['3 hours private arena hire','Live bracket and commentator','Team-building game formats','Catering add-on available','Branded screens on request']}
];
const FILTERS=['All','Individual','Family','Birthday','School','Corporate','Esports','Club'];
const TIME=['10:00','12:00','14:00','16:00','18:00','20:00'];
const TEAM=[['Alex Jacobs','Head of arena','#00E5FF,#7C4DFF'],['Emile Fortuin','Lead coach','#7C4DFF,#FF2DAA'],['Jamie Petersen','Events host','#FF2DAA,#00E5FF'],['Daniel Naidoo','Tech and stations','#00E5FF,#FF2DAA']];

/* ---------- state ---------- */
const S={route:'home',pkg:'casual',filter:'All',cart:[],booking:null,sheet:false,date:0,time:'14:00',f:{name:'',phone:'',cn:'',ce:'',ct:'Bookings',cm:''},done:null,sent:false};
const $=s=>document.querySelector(s);
const getP=id=>PKGS.find(p=>p.id===id);
const money=n=>'R'+(Math.round(n*100)/100).toFixed(2);

/* ---------- icons ---------- */
const P={
 home:'<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
 grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
 calc:'<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M8 18h2M12 18h2"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/>',
 mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
 phone:'<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
 pin:'<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14a6 6 0 0 1 3.5 6"/>',
 check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 minus:'<path d="M5 12h14"/>',
 x:'<path d="M6 6l12 12M18 6L6 18"/>',
 back:'<path d="M15 5l-7 7 7 7"/>',
 trophy:'<path d="M8 4h8v6a4 4 0 0 1-8 0zM8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 14v4M8 21h8"/>',
 heart:'<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>',
 bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>'
};
const ic=(n,extra='')=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${extra}>${P[n]}</svg>`;

/* ---------- logo + art ---------- */
function logo(sz=40){return `<svg width="${sz}" height="${sz}" viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="lg" x1="0" x2="1"><stop offset="0" stop-color="#00E5FF"/><stop offset=".55" stop-color="#7C4DFF"/><stop offset="1" stop-color="#FF2DAA"/></linearGradient></defs><rect width="48" height="48" rx="11" fill="#05070D" stroke="#1E2640"/><path d="M5 17l9 4-9 4M5 23l9 3-9 3" stroke="#9aa3c7" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M15 34V16l4 0 9 12V16h5v18h-4L20 22v12z" fill="url(#lg)"/><path d="M17 12l2.5-4 2 3 2.5-4 2 4 2.5-3 1.5 4z" fill="#FF2DAA" opacity=".9"/><path d="M34 32h9M32 36h11" stroke="#9aa3c7" stroke-width="1.4" stroke-linecap="round"/></svg>`}
let aid=0;
function art(kind='arena',h=0,tall=false){
  const pal=[['#00E5FF','#7C4DFF'],['#7C4DFF','#FF2DAA'],['#FF2DAA','#00E5FF'],['#00E5FF','#FF2DAA']][h%4];
  const id='a'+(++aid), W=400, H=tall?260:220;
  const n=kind==='hero'?5:3, gap=W/(n+1);
  let m='',p='',c='';
  for(let k=0;k<n;k++){
    const cx=gap*(k+1), w=kind==='hero'?52:78, y=56+(k%2)*8;
    m+=`<g><rect x="${cx-w/2}" y="${y}" width="${w}" height="${w*.62}" rx="4" fill="url(#${id}m)" stroke="${pal[k%2]}" stroke-width="1.5" filter="url(#${id}f)"/><rect x="${cx-3}" y="${y+w*.62}" width="6" height="9" fill="#1b2240"/></g>`;
    const hy=H-62;
    p+=`<circle cx="${cx}" cy="${hy}" r="${kind==='hero'?13:17}" fill="#05070D"/><path d="M${cx-34} ${H}c0-26 14-38 34-38s34 12 34 38z" fill="#070a16"/><path d="M${cx-34} ${H}c0-26 14-38 34-38" stroke="${pal[(k+1)%2]}" stroke-opacity=".55" fill="none"/>`;
  }
  if(kind==='party'){for(let k=0;k<26;k++){const x=(k*67+h*31)%W,y=(k*41+h*17)%110;c+=`<rect x="${x}" y="${y}" width="6" height="${3+k%4}" rx="1" fill="${['#00E5FF','#FF2DAA','#7C4DFF','#00D68F'][k%4]}" opacity=".8" transform="rotate(${k*37} ${x} ${y})"/>`}}
  let g='';for(let k=-8;k<=8;k++)g+=`<line x1="${W/2}" y1="${H*.52}" x2="${W/2+k*70}" y2="${H}" stroke="${pal[0]}" stroke-opacity=".22"/>`;
  for(let k=1;k<5;k++){const y=H*.52+(H*.48)*(k/5)**1.7;g+=`<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${pal[1]}" stroke-opacity=".25"/>`}
  return `<svg class="art" viewBox="0 0 ${W} ${H}" role="img" aria-label="Neon-lit gaming arena illustration"><defs><linearGradient id="${id}b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b1022"/><stop offset="1" stop-color="#150d34"/></linearGradient><linearGradient id="${id}m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${pal[0]}" stop-opacity=".55"/><stop offset="1" stop-color="${pal[1]}" stop-opacity=".75"/></linearGradient><radialGradient id="${id}r" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="${pal[1]}" stop-opacity=".5"/><stop offset="1" stop-color="${pal[1]}" stop-opacity="0"/></radialGradient><filter id="${id}f" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><rect width="${W}" height="${H}" fill="url(#${id}b)"/><rect width="${W}" height="${H}" fill="url(#${id}r)"/>${g}${c}${m}${p}</svg>`;
}

/* ---------- pricing ---------- */
function totals(items){
  const sub=items.reduce((a,i)=>a+getP(i.id).price*i.n,0), cnt=items.length;
  const pct=cnt>=4?15:cnt===3?10:cnt===2?5:0, disc=sub*pct/100, total=sub-disc;
  return {sub,cnt,pct,disc,total,vat:total*15/115};
}

/* ---------- views ---------- */
function pkgCard(p,compact){
  const inCart=S.cart.some(i=>i.id===p.id);
  return `<article class="card">${art(p.kind,p.h)}
  <div class="bd stack" style="gap:10px">
    <div class="row wrap" style="gap:6px">${p.badge?`<span class="tag gr">${p.badge}</span>`:''}${p.cats.slice(0,2).map(c=>`<span class="tag">${c}</span>`).join('')}</div>
    <div><h3>${p.name}</h3><div class="tg" style="margin-top:6px">${p.tag}</div></div>
    <div class="meta"><span>${ic('clock')}${p.hrs} hrs</span><span>${ic('users')}${p.min}–${p.max} players</span></div>
    <div class="row" style="justify-content:space-between"><div class="price">R${p.price}<small>per person</small></div></div>
    <div class="row"><button class="btn pri" style="flex:1;height:44px" data-a="open" data-id="${p.id}">View details</button>
    <button class="iconbtn" style="width:44px;height:44px;${inCart?'border-color:var(--green);color:var(--green)':''}" aria-label="${inCart?'Added to calculator':'Add to calculator'}" data-a="add" data-id="${p.id}">${ic(inCart?'check':'calc')}</button></div>
  </div></article>`;
}
const foot=()=>`<div class="foot">© 2026 Next Level Gaming &amp; Esports Arena<br>1 Gaming Street, Cape Town</div>`;

function vHome(){
  return `
  <section class="hero">
    <span class="eyebrow">Play · Compete · Connect</span>
    <h1>Your arena.<br><span class="grad">Next level.</span></h1>
    <p class="lead">Cape Town's premier esports arena. Gaming experiences for individuals, families, schools, corporates and competitive players.</p>
    <div class="row" style="margin:20px 0">
      <button class="btn pri" data-a="go" data-r="packages">Explore packages</button>
      <button class="btn out" data-a="go" data-r="fees">Calculate fees</button>
    </div>
    ${art('hero',0,true)}
  </section>
  <section class="sec" style="padding-bottom:6px">
    <div class="stats">
      <div class="stat"><b>2021</b><span>Doors opened</span></div>
      <div class="stat"><b>50+</b><span>Gaming stations</span></div>
      <div class="stat"><b>5,000+</b><span>Players hosted</span></div>
      <div class="stat"><b>40+</b><span>Events a year</span></div>
    </div>
  </section>
  <section style="padding:22px 0 8px">
    <div style="padding:0 16px 14px"><span class="eyebrow">Featured</span><h2 style="margin-top:10px">Good times.<br><span class="pu">Great games.</span></h2></div>
    <div class="hscroll">${PKGS.slice(0,4).map(p=>pkgCard(p)).join('')}</div>
  </section>
  <section class="sec">
    <p class="lbl">Who we serve</p>
    <div class="row wrap" style="gap:8px">${FILTERS.slice(1).map(f=>`<button class="chip" data-a="filter" data-v="${f}">${f}</button>`).join('')}</div>
  </section>
  <div class="cta"><h2>Bring your squad.<br>We'll bring the game.</h2><p>Group rates for schools, clubs and companies. Tell us what you have in mind.</p><button class="btn blk" style="background:#fff;color:#2a1a6e" data-a="go" data-r="contact">Talk to us</button></div>
  ${foot()}`;
}

function vAbout(){
  const V=[['bolt','Vision','A Cape Town where every person has access to world-class gaming and a community behind them.','rgba(0,229,255,.1)','#00E5FF','#0b5566'],
           ['trophy','Mission','Run an arena that is fair, welcoming and built for both first-timers and competitors.','rgba(124,77,255,.12)','#a98bff','#3a2a80'],
           ['heart','Values','Respect at the table, fair play on the screen and always room for one more player.','rgba(255,45,170,.1)','#FF2DAA','#5a1442']];
  return `
  <section class="hero">
    <span class="eyebrow" style="color:#a98bff">About us</span>
    <h1 style="font-size:40px">More than a venue.<br><span class="pu">A community.</span></h1>
    <div style="margin:18px 0 14px">${art('arena',1,true)}</div>
    <p class="lead" style="margin:0">Next Level Gaming &amp; Esports Arena was founded on a single belief: every person deserves access to world-class gaming infrastructure and a community that lifts them higher.</p>
  </section>
  <section class="sec"><p class="lbl">What we stand for</p>
    <div class="vals">${V.map(v=>`<div class="val"><i style="background:${v[3]};color:${v[4]};border:1px solid ${v[5]}">${ic(v[0])}</i><div><h3>${v[1]}</h3><p>${v[2]}</p></div></div>`).join('')}</div>
  </section>
  <section class="sec alt"><p class="lbl">Every visit includes</p>
    <ul class="checks">${['High-spec stations and peripherals','Friendly on-site support','Access to the whole facility','A game library for every age'].map(t=>`<li>${ic('check')}${t}</li>`).join('')}</ul>
  </section>
  <section class="sec"><p class="lbl">The team behind your next win</p>
    <div class="team">${TEAM.map(t=>`<div class="mem"><div class="av" style="background:linear-gradient(135deg,${t[2]})">${t[0].split(' ').map(x=>x[0]).join('')}</div><b>${t[0]}</b><span>${t[1]}</span></div>`).join('')}</div>
  </section>
  <div class="cta"><h2>There's a place for you here.</h2><p>Find a session that fits your crew.</p><button class="btn blk" style="background:#fff;color:#2a1a6e" data-a="go" data-r="packages">View packages</button></div>
  ${foot()}`;
}

function vPackages(){
  const list=PKGS.filter(p=>S.filter==='All'||p.cats.includes(S.filter));
  return `
  <section class="page-intro" style="padding:22px 16px 16px;background:radial-gradient(380px 200px at 100% 0,rgba(0,229,255,.12),transparent 70%)">
    <span class="eyebrow">All packages</span>
    <h1 style="font-size:36px;margin-top:12px">Find your <span class="pu">perfect session</span></h1>
    <p class="lead" style="font-size:14px">All packages include equipment, support and facility access. Prices are per person.</p>
  </section>
  <div class="chips" role="tablist" aria-label="Filter packages">${FILTERS.map(f=>`<button class="chip ${S.filter===f?'on':''}" data-a="filter" data-v="${f}" role="tab" aria-selected="${S.filter===f}">${f}</button>`).join('')}</div>
  <section class="sec package-list">${list.length?list.map(p=>pkgCard(p)).join(''):`<div class="empty">No ${S.filter.toLowerCase()} packages yet.<br>Contact us for a custom quote.</div>`}</section>
  ${foot()}`;
}

function vPackage(){
  const p=getP(S.pkg), inCart=S.cart.some(i=>i.id===p.id), rel=PKGS.filter(x=>x.id!==p.id&&x.cats.some(c=>p.cats.includes(c))).slice(0,2);
  return `
  <section style="padding:16px">
    ${art(p.kind,p.h,true)}
    <div class="row wrap" style="gap:6px;margin:16px 0 12px">${p.badge?`<span class="tag gr">${p.badge}</span>`:''}${p.cats.map(c=>`<span class="tag">${c}</span>`).join('')}</div>
    <h1 style="font-size:38px">${p.name}</h1>
    <div class="tg" style="margin:10px 0 14px;font-size:15px">${p.tag}</div>
    <div class="meta" style="margin-bottom:14px"><span>${ic('clock')}${p.hrs} hrs</span><span>${ic('users')}${p.min}–${p.max} players</span></div>
    <p class="lead" style="margin:0">${p.desc}</p>
  </section>
  <section class="sec alt"><div class="row" style="justify-content:space-between"><div><div class="mono" style="font-size:11px;color:var(--dim)">PRICE INCL. 15% VAT</div><div class="price" style="font-size:36px;margin-top:6px">R${p.price}<small>per person</small></div></div></div></section>
  <section class="sec"><p class="lbl">What's included</p><ul class="checks">${p.inc.map(t=>`<li>${ic('check')}${t}</li>`).join('')}</ul></section>
  <section class="sec" style="padding-top:0"><p class="lbl">Game library</p><div class="row wrap" style="gap:8px">${['Racing','Fighting','Shooters','Sports','Co-op','Party games','Strategy'].map(g=>`<span class="tag pp">${g}</span>`).join('')}</div></section>
  <section class="sec stack" style="padding-top:4px">
    <button class="btn pri blk" data-a="book" data-id="${p.id}">Book now</button>
    <button class="btn pur blk" data-a="add" data-id="${p.id}">${ic(inCart?'check':'calc')}${inCart?'Added to calculator':'Add to fee calculator'}</button>
  </section>
  ${rel.length?`<section class="sec alt"><p class="lbl">You may also like</p><div class="stack">${rel.map(r=>pkgCard(r)).join('')}</div></section>`:''}
  ${foot()}`;
}

function vFees(){
  const t=totals(S.cart), tier=t.cnt>=4?3:t.cnt-1;
  const T=[['1 booking','0%'],['2 bookings','5%'],['3 bookings','10%'],['4+ bookings','15%']];
  return `
  <section class="page-intro fee-intro" style="padding:22px 16px 6px">
    <span class="eyebrow" style="color:var(--pink)">Fee calculator</span>
    <h1 style="font-size:36px;margin-top:12px">Calculate <span class="pu">your fees</span></h1>
    <p class="lead" style="font-size:14px">Select packages below. Discounts apply automatically. All prices include 15% VAT.</p>
  </section>
  <section class="sec fee-tiers"><p class="lbl">Discount tiers</p>
    <div class="tiers">${T.map((x,i)=>`<div class="tier ${i===tier?'on':''}"><small>${x[0]}</small><b>${x[1]} off</b></div>`).join('')}</div>
  </section>
  <section class="sec alt fee-packages"><p class="lbl">Add packages</p>
    ${PKGS.map(p=>`<div class="line"><div style="min-width:0"><b style="font-size:15px">${p.name}</b><div class="mono" style="font-size:12px;color:var(--cyan);margin-top:3px">R${p.price}/pp · ${p.hrs} hrs</div></div><button class="btn out" style="height:38px;padding:0 14px;font-size:13px" data-a="add" data-id="${p.id}">${ic('plus')}Add</button></div>`).join('')}
  </section>
  <section class="sec fee-summary"><p class="lbl">Your summary</p>
    <div class="sum">
    ${S.cart.length?S.cart.map(i=>{const p=getP(i.id);return `<div class="line"><div style="min-width:0"><b style="font-size:14px">${p.name}</b><div class="mono" style="font-size:11.5px;color:var(--dim);margin-top:3px">${money(p.price*i.n)}</div></div>
      <div class="row" style="gap:8px"><div class="step"><button data-a="dec" data-id="${i.id}" aria-label="Fewer players">${ic('minus')}</button><b>${i.n}</b><button data-a="inc" data-id="${i.id}" aria-label="More players">${ic('plus')}</button></div><button class="iconbtn" style="width:32px;height:32px;border-radius:10px" data-a="rm" data-id="${i.id}" aria-label="Remove">${ic('x')}</button></div></div>`}).join('')
      +`<div style="margin-top:8px"><div class="r"><span>Subtotal</span><span>${money(t.sub)}</span></div>
      <div class="r"><span>Discount (${t.pct}%)</span><span class="${t.disc?'g':''}">−${money(t.disc)}</span></div>
      <div class="r"><span>VAT included (15%)</span><span>${money(t.vat)}</span></div>
      <div class="r t"><span>Total</span><b>${money(t.total)}</b></div></div>
      <button class="btn pri blk" style="margin-top:14px" data-a="bookcart">Book now</button>`
    :`<div class="empty">No packages selected yet.<br>Tap + Add above to start.</div>`}
    </div>
  </section>
  ${foot()}`;
}

function vContact(){
  const F=S.f;
  return `
  <section class="page-intro contact-intro" style="padding:22px 16px 8px">
    <span class="eyebrow">Contact us</span>
    <h1 style="font-size:36px;margin-top:12px">Get in <span class="pu">touch</span></h1>
    <p class="lead" style="font-size:14px">Bookings, group rates, school visits or corporate proposals. We would love to hear from you.</p>
  </section>
  <section class="sec contact-details"><p class="lbl">Contact details</p>
    <a class="ct" href="tel:+27100000000"><i style="background:rgba(0,229,255,.1);color:var(--cyan);border-color:#0b5566">${ic('phone')}</i><div><small>PHONE</small><b>+27 (0) 10 000 0000</b></div></a>
    <a class="ct" href="mailto:info@nlgesports.co.za"><i style="background:rgba(124,77,255,.12);color:#a98bff;border-color:#3a2a80">${ic('mail')}</i><div><small>EMAIL</small><b>info@nlgesports.co.za</b></div></a>
    <div class="ct"><i style="background:rgba(255,45,170,.1);color:var(--pink);border-color:#5a1442">${ic('pin')}</i><div><small>ADDRESS</small><b>1 Gaming Street, Cape Town</b></div></div>
    <div class="map" aria-label="Map showing the arena location"><svg viewBox="0 0 400 150" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><rect width="400" height="150" fill="#0c1124"/><g stroke="#1e2a52" stroke-width="10" fill="none"><path d="M-10 100L410 60"/><path d="M120 -10L180 160"/><path d="M300 -10L260 160"/></g><g stroke="#16203f" stroke-width="4" fill="none"><path d="M-10 40L410 20M-10 130L410 120M60 -10L40 160"/></g><circle cx="205" cy="82" r="30" fill="#00E5FF" opacity=".12"/><path d="M205 96s11-9 11-18a11 11 0 0 0-22 0c0 9 11 18 11 18z" fill="#FF2DAA"/><circle cx="205" cy="78" r="4" fill="#05070D"/></svg></div>
  </section>
  <section class="sec alt contact-form"><p class="lbl">Send a message</p>
    ${S.sent?`<div class="ok"><div class="ring">${ic('check')}</div><h2>Message sent</h2><p class="lead">Thanks ${F.cn||'there'}. We reply within one working day.</p><button class="btn out" style="margin-top:16px" data-a="again">Send another</button></div>`:`
    <div class="fld"><label for="cn">NAME</label><input class="in" id="cn" data-f="cn" value="${F.cn}" placeholder="Your full name" autocomplete="name"></div>
    <div class="fld"><label for="ce">EMAIL</label><input class="in" id="ce" type="email" data-f="ce" value="${F.ce}" placeholder="you@example.com" autocomplete="email"></div>
    <div class="fld"><label for="ct">ENQUIRY TYPE</label><select class="in" id="ct" data-f="ct">${['Bookings','Group rates','School visit','Corporate proposal','Something else'].map(o=>`<option ${F.ct===o?'selected':''}>${o}</option>`).join('')}</select></div>
    <div class="fld"><label for="cm">MESSAGE</label><textarea class="in" id="cm" data-f="cm" placeholder="Tell us about your group, date and ideas">${F.cm}</textarea></div>
    <button class="btn pri blk" data-a="send">Send message</button>`}
  </section>
  ${foot()}`;
}

/* ---------- shell ---------- */
const TABS=[['home','Home','home'],['packages','Packages','grid'],['fees','Calculator','calc'],['about','About','info'],['contact','Contact','mail']];
const VIEWS={home:vHome,about:vAbout,packages:vPackages,package:vPackage,fees:vFees,contact:vContact};
function renderTop(){
  const back=S.route==='package';
  $('#top').innerHTML=(back?`<button class="back" data-a="go" data-r="packages">${ic('back')}Packages</button>`:`<div class="brand">${logo(40)}<div class="wm">NEXT LEVEL<small>GAMING &amp; ESPORTS ARENA</small></div></div>`)
   +`<button class="iconbtn" data-a="go" data-r="fees" aria-label="Fee calculator, ${S.cart.length} selected">${ic('calc')}${S.cart.length?`<span class="badge">${S.cart.length}</span>`:''}</button>`;
}
function renderTabs(){
  const cur=S.route==='package'?'packages':S.route;
  $('#tabs').innerHTML=TABS.map(t=>`<button class="tab ${cur===t[0]?'on':''}" data-a="go" data-r="${t[0]}" ${cur===t[0]?'aria-current="page"':''}>${ic(t[2])}${t[1]}</button>`).join('');
}
function renderSheet(){
  const sh=$('#sheet'), sc=$('#scrim');
  sh.classList.toggle('on',S.sheet); sc.classList.toggle('on',S.sheet);
  if(!S.sheet)return;
  if(S.done){
    sh.innerHTML=`<div class="grab"></div><div class="in-sc"><div class="ok"><div class="ring">${ic('check')}</div><h2>You're booked</h2>
    <p class="lead">${S.done.when}<br>Reference <b class="mono" style="color:var(--cyan)">${S.done.ref}</b></p>
    <p class="lead" style="font-size:13px">A confirmation will be sent to ${S.f.phone||'your phone'}. Pay at the arena on arrival.</p>
    <button class="btn pri blk" style="margin-top:18px" data-a="closesheet">Done</button></div></div>`;return;
  }
  const t=totals(S.booking), d=dates();
  sh.innerHTML=`<div class="grab"></div><div class="in-sc">
   <div class="row" style="justify-content:space-between;margin-bottom:12px"><h2>Book your session</h2><button class="iconbtn" style="width:34px;height:34px" data-a="closesheet" aria-label="Close">${ic('x')}</button></div>
   <p class="lbl" style="margin-top:6px">Your packages</p>
   ${S.booking.map(i=>{const p=getP(i.id);return `<div class="line"><div style="min-width:0"><b style="font-size:14px">${p.name}</b><div class="mono" style="font-size:11.5px;color:var(--dim);margin-top:3px">R${p.price} × ${i.n} players</div></div><div class="step"><button data-a="sdec" data-id="${i.id}" aria-label="Fewer players">${ic('minus')}</button><b>${i.n}</b><button data-a="sinc" data-id="${i.id}" aria-label="More players">${ic('plus')}</button></div></div>`}).join('')}
   <p class="lbl" style="margin-top:18px">Pick a day</p>
   <div class="days">${d.map((x,i)=>`<button class="day ${S.date===i?'on':''}" data-a="date" data-v="${i}"><small>${x.w}</small><b>${x.d}</b></button>`).join('')}</div>
   <p class="lbl" style="margin-top:18px">Pick a time</p>
   <div class="slots">${TIME.map(x=>`<button class="slot ${S.time===x?'on':''}" data-a="time" data-v="${x}">${x}</button>`).join('')}</div>
   <div class="fld" style="margin-top:18px"><label for="bn">NAME</label><input class="in" id="bn" data-f="name" value="${S.f.name}" placeholder="Your name" autocomplete="name"></div>
   <div class="fld"><label for="bp">MOBILE NUMBER</label><input class="in" id="bp" data-f="phone" value="${S.f.phone}" inputmode="tel" placeholder="082 000 0000" autocomplete="tel"></div>
   <div class="sum" style="margin:6px 0 14px"><div class="r"><span>Subtotal</span><span>${money(t.sub)}</span></div><div class="r"><span>Discount (${t.pct}%)</span><span class="${t.disc?'g':''}">−${money(t.disc)}</span></div><div class="r t"><span>Total incl. VAT</span><b>${money(t.total)}</b></div></div>
   <button class="btn pri blk" data-a="confirm">Confirm booking</button></div>`;
}
function dates(){const o=[],n=new Date();for(let i=0;i<10;i++){const x=new Date(n.getFullYear(),n.getMonth(),n.getDate()+i);o.push({w:x.toLocaleDateString('en-ZA',{weekday:'short'}),d:x.getDate(),full:x.toLocaleDateString('en-ZA',{weekday:'long',day:'numeric',month:'long'})})}return o}
function render(scroll){
  renderTop();renderTabs();
  $('#view').dataset.route=S.route;
  $('#view').innerHTML=VIEWS[S.route]();
  if(scroll)$('#view').scrollTo({top:0,behavior:'instant'});
  renderSheet();
}
function go(r,sc=true){S.route=r;render(sc)}
let tt;function toast(m){const e=$('#toast');e.textContent=m;e.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>e.classList.remove('on'),1800)}

/* ---------- events ---------- */
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-a]');if(!b)return;
  const a=b.dataset.a,id=b.dataset.id,v=b.dataset.v;
  const item=(arr)=>arr.find(i=>i.id===id);
  switch(a){
    case 'go':go(b.dataset.r);break;
    case 'open':S.pkg=id;go('package');break;
    case 'filter':S.filter=v;go('packages');break;
    case 'add':{const x=item(S.cart);if(x){x.n=Math.min(getP(id).max,x.n+1);toast('Added another player')}else{S.cart.push({id,n:getP(id).min});toast(getP(id).name+' added')}render(false);break}
    case 'inc':{const x=item(S.cart);x.n=Math.min(getP(id).max,x.n+1);render(false);break}
    case 'dec':{const x=item(S.cart);x.n=Math.max(1,x.n-1);render(false);break}
    case 'rm':S.cart=S.cart.filter(i=>i.id!==id);render(false);break;
    case 'book':S.booking=[{id,n:getP(id).min}];S.done=null;S.sheet=true;render(false);break;
    case 'bookcart':S.booking=S.cart.map(i=>({...i}));S.done=null;S.sheet=true;render(false);break;
    case 'closesheet':if(S.done){S.cart=[];S.done=null}S.sheet=false;render(false);break;
    case 'sinc':{const x=item(S.booking);x.n=Math.min(getP(id).max,x.n+1);renderSheet();break}
    case 'sdec':{const x=item(S.booking);x.n=Math.max(1,x.n-1);renderSheet();break}
    case 'date':S.date=+v;renderSheet();break;
    case 'time':S.time=v;renderSheet();break;
    case 'confirm':{
      if(!S.f.name.trim()||S.f.phone.replace(/\D/g,'').length<9){toast('Add your name and mobile number');break}
      S.done={ref:'NL-'+Math.random().toString(36).slice(2,7).toUpperCase(),when:dates()[S.date].full+' at '+S.time};renderSheet();break}
    case 'send':
      if(!S.f.cn.trim()||!/\S+@\S+\.\S+/.test(S.f.ce)||!S.f.cm.trim()){toast('Fill in name, a valid email and message');break}
      S.sent=true;render(false);break;
    case 'again':S.sent=false;S.f.cm='';render(false);break;
  }
});
document.addEventListener('input',e=>{const k=e.target.dataset&&e.target.dataset.f;if(k)S.f[k]=e.target.value});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&S.sheet){S.sheet=false;S.done=null;renderSheet()}});
render(true);
