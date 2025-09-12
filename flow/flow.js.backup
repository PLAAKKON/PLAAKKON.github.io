(function(){
  const url = new URL(window.location.href);
  const mode = url.searchParams.get('mode') || 'hire'; // 'hire' or 'course'
  const countParam = parseInt(url.searchParams.get('count') || '10', 10);
  const N_DEFAULT = Number.isFinite(countParam) ? Math.min(Math.max(countParam,1),100) : 10;
  // Dry-run testing: by default, do NOT write anything to Firestore. Enable with &write=on or &dryRun=0
  const DRY_RUN = (url.searchParams.get('write') !== 'on') && (url.searchParams.get('dryRun') !== '0');

  const modeText = document.getElementById('modeText');
  const countInput = document.getElementById('countInput');
  const textInput = document.getElementById('textInput');
  const pdfInput = document.getElementById('pdfInput');
  const parsePdfBtn = document.getElementById('parsePdfBtn');
  const startBtn = document.getElementById('startBtn');
  const progressBox = document.getElementById('progressBox');
  const progressList = document.getElementById('progressList');
  const resultsBox = document.getElementById('resultsBox');
  const resultsMeta = document.getElementById('resultsMeta');
  const resultsList = document.getElementById('resultsList');
  const authBox = document.getElementById('authBox');
  const reviewBox = document.getElementById('reviewBox');
  const reviewLxpEl = document.getElementById('reviewLxp');
  const reviewReasonsEl = document.getElementById('reviewReasons');
  const reviewLxpInput = document.getElementById('reviewLxpInput');
  const reviewCountdownEl = document.getElementById('reviewCountdown');
  const reviewProceedBtn = document.getElementById('reviewProceedBtn');
  const reviewCancelBtn = document.getElementById('reviewCancelBtn');
  const debugBox = document.getElementById('debugBox');
  const debugPre = document.getElementById('debugPre');
  const toggleDebugBtn = document.getElementById('toggleDebugBtn');
  const copyDebugBtn = document.getElementById('copyDebugBtn');

  modeText.textContent = `Tila: ${mode === 'course' ? 'Kohdenna kurssi-/koulutustarjonta' : 'Etsi työntekijä'}`;
  countInput.value = N_DEFAULT;

  // Initialize TWO Firebase apps using compat SDK
  const searchConfig = {
    apiKey: "AIzaSyBdY2Xl5q2gW0ZlqjvHwmx2wIo1c3vZKfA",
    authDomain: "urapolku-7781a.firebaseapp.com",
    projectId: "urapolku-7781a"
  };
  const profilesConfig = {
    apiKey: "AIzaSyAnfsX522_ybXR7yhnAJbxDjuszVu4rZLE",
    authDomain: "urapolku-7780a.firebaseapp.com",
    projectId: "urapolku-7780a"
  };

  const searchApp = firebase.apps.find(a=>a.name==='[DEFAULT]') ? firebase.app() : firebase.initializeApp(searchConfig);
  const profilesApp = firebase.apps.find(a=>a.name==='profiles') ? firebase.app('profiles') : firebase.initializeApp(profilesConfig, 'profiles');

  const auth = searchApp.auth();
  const dbProfiles = profilesApp.firestore();

  // Debug state
  const debugState = {
    startAt: new Date().toISOString(),
    searchProject: searchConfig.projectId,
    profilesProject: profilesConfig.projectId,
    steps: [],
    memoryWrites: []
  };
  // In-memory buffer for test-mode writes
  const memoryWrites = debugState.memoryWrites;
  // Expose for manual inspection in console
  try{ window.__flowMemoryWrites = memoryWrites; }catch(_){ /* no-op */ }
  function dbg(event, data){
    const safe = sanitizePII(typeof data === 'string' ? data : JSON.stringify(data||{}));
    debugState.steps.push({ t: new Date().toISOString(), event, data: safe });
    if(debugPre){ debugPre.textContent = JSON.stringify(debugState, null, 2); }
  }
  function showDebug(){ if(debugBox) debugBox.style.display = 'block'; }
  if(toggleDebugBtn){ toggleDebugBtn.onclick = ()=>{ if(debugBox.style.display==='none'){ debugBox.style.display='block'; toggleDebugBtn.textContent='Piilota'; } else { debugBox.style.display='none'; toggleDebugBtn.textContent='Näytä'; } }; }
  if(copyDebugBtn){ copyDebugBtn.onclick = async ()=>{ try{ await navigator.clipboard.writeText(debugPre.textContent||''); tick('Debug kopioitu leikepöydälle.'); }catch(e){ console.warn('Copy failed', e); } }; }

  // Optional notice: show that login unlocks full results
  auth.onAuthStateChanged((user)=>{
    // Show a hint if not logged in, but do not block usage
    if(!user && authBox){
      authBox.style.display = 'block';
      authBox.innerHTML = '<p>Demo-tila: Ilman kirjautumista näytetään vain ID ja 2 riviä tekstiä, rajoitettu määrä.</p>';
  dbg('auth.state', { loggedIn: false });
    } else if (user && authBox) {
      authBox.style.display = 'none';
  dbg('auth.state', { loggedIn: true, email: sanitizePII(user.email||'') });
    }
  });

  // Access level helper
  function getAccessLevel(){
    const u = auth.currentUser;
    if (u && (u.email||'').toLowerCase() === 'pasi.laakkonen@hotmail.com') return 'superuser';
    if (u) return 'paid';
    return 'public';
  }

  // PDF parsing
  parsePdfBtn.addEventListener('click', async ()=>{
    const file = pdfInput.files && pdfInput.files[0];
    if(!file){
      alert('Valitse PDF ensin.');
      return;
    }
    try{
      const buf = await file.arrayBuffer();
      const pdf = await window['pdfjsLib'].getDocument({data: buf}).promise;
      let fullText = '';
      for(let i=1;i<=pdf.numPages;i++){
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map(it=>it.str);
        fullText += '\n' + strings.join(' ');
      }
      textInput.value = (textInput.value+"\n"+fullText).trim();
      tick(`Luettu PDF: ${file.name}, sivuja ${pdf.numPages}`);
    }catch(e){
      console.error(e);
      alert('PDF:n lukeminen epäonnistui. Liitä teksti käsin.');
    }
  });

  // Progress helper
  function tick(msg){
    progressBox.style.display = 'block';
    const li = document.createElement('li');
    li.textContent = `${new Date().toLocaleTimeString()} – ${msg}`;
    progressList.appendChild(li);
  dbg('progress', msg);
  showDebug();
  }

  // Very small AI stub: extract keywords by frequency and simple normalizations
  function aiStub(text){
    const cleaned = (text||'').toLowerCase().replace(/[^a-zåäöA-ZÅÄÖ0-9\s]/g,' ');
    const words = cleaned.split(/\s+/).filter(w=>w.length>2);
    const stop = new Set(['ja','the','for','with','you','that','this','from','are','was','were','have','has','not','oli','kun','tai','sekä','että','miten','missä','joka']);
    const freq = new Map();
    for(const w of words){
      if(stop.has(w)) continue;
      freq.set(w, (freq.get(w)||0)+1);
    }
    const top = Array.from(freq.entries()).sort((a,b)=>b[1]-a[1]).slice(0,15).map(([w])=>w);
  const out = { keywords: top };
  dbg('ai.stub', out);
  return out;
  }

  // LxP derivation from text (stub: dictionary + keyword match)
  const LXP_DICTIONARY = [
    { key: 'IT_SOFTWARE', terms: ['ohjelmistokehittäjä','developer','ohjelmointi','software','frontend','backend','fullstack','react','node','java','.net','c#'] },
    { key: 'LOGISTICS', terms: ['logistiikka','varasto','warehouse','kuljetus','trukki','forklift','keräily','pakkaminen'] },
    { key: 'HEALTHCARE', terms: ['sairaanhoitaja','lähihoitaja','hoitaja','terveydenhoito','healthcare','nurse'] },
    { key: 'CONSTRUCTION', terms: ['rakennus','työmaa','kirvesmies','maalari','sähköasentaja','putkiasentaja','lvi'] },
    { key: 'CLEANING', terms: ['siivous','siivooja','cleaning','cleaner','hygienia'] },
    { key: 'OFFICE', terms: ['toimisto','office','assistentti','hallinto','talous','kirjanpito','accounting'] },
  ];
  function deriveLxpKey(text){
    const t = (text||'').toLowerCase();
    let best = { key: null, score: 0 };
    for(const entry of LXP_DICTIONARY){
      let s = 0;
      for(const term of entry.terms){ if (t.includes(term)) s++; }
      if (s > best.score){ best = { key: entry.key, score: s }; }
    }
  const key = best.key; // may be null if no match
  dbg('lxp.derive.local', { key, score: best.score });
  return key;
  }

  // Safe text helpers (remove emails/phones)
  const EMAIL_RE = /[\w.+-]+@[\w.-]+\.[A-Za-z]{2,7}/g;
  const PHONE_RE = /(\+\d{1,3}[\s-]?)?(\(?\d{2,3}\)?[\s-]?)?\d{3,}[\d\s-]{3,}/g;
  function sanitizePII(s){
    return (s||'').replace(EMAIL_RE,'[pii]').replace(PHONE_RE,'[pii]');
  }
  function firstNonEmpty(arr){
    for(const v of arr){ if(v && (Array.isArray(v) ? v.length>0 : String(v).trim().length>0)) return v; }
    return '';
  }
  function buildTwoLinePreview(p, keywords){
    // Line 1: short capability summary from allowed fields
    const line1Parts = [];
    if (Array.isArray(p.ammatit) && p.ammatit.length) line1Parts.push(p.ammatit.slice(0,2).join(', '));
    if (Array.isArray(p.osaamiset) && p.osaamiset.length && line1Parts.length<2) line1Parts.push(p.osaamiset.slice(0,2).join(', '));
    const line1 = sanitizePII(line1Parts.join(' • ')).slice(0,140);

    // Line 2: a brief snippet from non-PII fields (osaamisteksti/esittely) sanitized
    const snippetSource = sanitizePII(firstNonEmpty([p.osaamisteksti, p.esittely]));
    const line2 = snippetSource.split(/\s+/).slice(0,20).join(' ');
    return { line1, line2 };
  }

  // Firestore search (profiles DB), return minimal results: id + score + tags + safe preview
  async function searchProfilesMinimal(keywords, N, lxpKey){
    const BATCH = 500;
    const results = [];
    const seen = new Set();
    const kwSet = new Set(keywords);

    // Helper to score and push
  function considerDoc(doc){
      if (seen.has(doc.id)) return;
      const p = doc.data();
      const fields = [];
      if(Array.isArray(p.ammatit)) fields.push(...p.ammatit);
      if(Array.isArray(p.osaamiset)) fields.push(...p.osaamiset);
      if(Array.isArray(p.kielitaito)) fields.push(...p.kielitaito);
      if(typeof p.esittely === 'string') fields.push(p.esittely);
      if(typeof p.osaamisteksti === 'string') fields.push(p.osaamisteksti);
      if(p.lxpKey || p.lxp) fields.push(p.lxpKey || p.lxp);
      const text = (fields.join(' ')||'').toLowerCase();
      let score = 0;
      for(const kw of kwSet){ if(text.includes(kw)) score++; }
      // LxP boost
      const profLxp = String(p.lxpKey || (Array.isArray(p.lxp)? p.lxp[0]: p.lxp) || '').toUpperCase();
      const targetLxp = String(lxpKey||'').toUpperCase();
      if (targetLxp && profLxp === targetLxp) score += 5;
  if(score>0){
        const preview = buildTwoLinePreview(p, keywords);
        results.push({ id: doc.id, score, tags: pickTags(p), preview });
        seen.add(doc.id);
      }
    }

    // Phase 1: LxP-targeted search first
    if (lxpKey){
      dbg('fs.query.phase','lxpKey == '+lxpKey);
      // Try lxpKey equality
      let last1 = null; let fetched1 = 0;
      while(results.length < N && fetched1 < 5000){
        let q1 = dbProfiles.collection('profiles').where('lxpKey','==', lxpKey).limit(BATCH);
        if (last1) q1 = q1.startAfter(last1);
        const snap1 = await q1.get().catch(()=>null);
        if (!snap1 || snap1.empty) break;
        snap1.forEach(considerDoc);
        fetched1 += snap1.size;
        last1 = snap1.docs[snap1.docs.length-1];
        if (snap1.size < BATCH) break;
      }

      // If still not enough, try array-contains on lxp
      if (results.length < N){
        dbg('fs.query.phase','lxp array-contains '+lxpKey);
        let last2 = null; let fetched2 = 0;
        while(results.length < N && fetched2 < 5000){
          let q2 = dbProfiles.collection('profiles').where('lxp','array-contains', lxpKey).limit(BATCH);
          if (last2) q2 = q2.startAfter(last2);
          const snap2 = await q2.get().catch(()=>null);
          if (!snap2 || snap2.empty) break;
          snap2.forEach(considerDoc);
          fetched2 += snap2.size;
          last2 = snap2.docs[snap2.docs.length-1];
          if (snap2.size < BATCH) break;
        }
      }
    }

    // Phase 2: Fallback to general sweep if still short
    if (results.length < N){
      dbg('fs.query.phase','fallback sweep by id');
      let last = null; let totalRead = 0;
      while(results.length < N && totalRead < 5000){
        let q = dbProfiles.collection('profiles').orderBy(firebase.firestore.FieldPath.documentId()).limit(BATCH);
        if(last) q = q.startAfter(last);
        const snap = await q.get();
        if(snap.empty) break;
        snap.forEach(considerDoc);
        totalRead += snap.size;
        last = snap.docs[snap.docs.length-1];
        if(snap.size < BATCH) break;
      }
    }

    results.sort((a,b)=>b.score-a.score);
    dbg('fs.results', { considered: seen.size, returned: results.length });
    return results.slice(0, N);
  }

  function pickTags(p){
    const tags = [];
    if(p.ammatit && p.ammatit.length) tags.push('AMM');
    if(p.osaamiset && p.osaamiset.length) tags.push('SKL');
    if(p.kielitaito && p.kielitaito.length) tags.push('KIE');
    if(p.lxpKey || p.lxp) tags.push('LxP');
    return tags.slice(0,2);
  }

  function validate(){
    const N = parseInt(countInput.value,10);
    const txt = (textInput.value||'').trim();
    if(!Number.isFinite(N) || N<1 || N>100){
      alert('Syötä määrä väliltä 1–100.');
      return false;
    }
    if(!txt){
      alert('Liitä kuvaus tai lataa PDF.');
      return false;
    }
    // No login required for demo usage
    return true;
  }

  // External LxP API config (replace endpoints when available)
  const STRICT_LXP = true; // enforce using lxp.yoro.fi only; no local fallbacks
  const LXP_BASE_OVERRIDE = (new URL(window.location.href)).searchParams.get('lxpBase');
  const CF_FALLBACK_BASE = 'https://us-central1-urapolku-7780a.cloudfunctions.net';
  const LXP_API = {
    base: LXP_BASE_OVERRIDE || 'https://lxp.yoro.fi',
    analyzeJob: '/api/analyze', // POST { text } -> { lxpKey, labels?: string[] }
    analyzeCandidates: '/api/analyze-candidates' // POST { candidates:[{id, text?}], lxpKey } -> { codes: [{id, code}] }
  };

  async function fetchLxp(path, options){
    // Try primary base, then fallback to Cloud Function once if default base fails.
    const tryOnce = async (base)=>{
      const res = await fetch(base + path, options);
      return { base, res };
    };
    try{
      const { base, res } = await tryOnce(LXP_API.base);
      if (!res.ok) throw { step:'primary', base, res };
      return { base, res };
    }catch(err){
      const canFallback = !LXP_BASE_OVERRIDE && LXP_API.base.includes('lxp.yoro.fi');
      if (!canFallback) throw err;
      dbg('lxp.retry', { reason: 'primary_failed', from: LXP_API.base, to: CF_FALLBACK_BASE });
      const { base, res } = await fetch(CF_FALLBACK_BASE + path, options).then(res=>({ base: CF_FALLBACK_BASE, res }));
      if (!res.ok) throw { step:'fallback', base, res };
      // Switch base for subsequent calls
      LXP_API.base = CF_FALLBACK_BASE;
      return { base, res };
    }
  }

  async function lxpAnalyzeJobText(text){
    try{
  const { res } = await fetchLxp(LXP_API.analyzeJob, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
  if(!res.ok) throw new Error('LxP analyze job failed');
      const ct = (res.headers.get('content-type')||'').toLowerCase();
      if(!ct.includes('application/json')){
        throw new Error('Invalid Content-Type from LxP (expected JSON, got '+ct+')');
      }
      const data = await res.json();
      // Accept various field names: lxpKey | key | code ; reasons | labels | justifications
      const lxpKey = data.lxpKey || data.key || data.code || null;
      const reasons = data.reasons || data.labels || data.justifications || [];
      const out = { lxpKey, labels: reasons };
  dbg('lxp.job.remote', out);
  return out;
    }catch(e){
      console.warn('LxP job analysis failed:', e);
      dbg('lxp.job.error', { error: String(e) });
      if (STRICT_LXP){
        tick('LxP-palvelu ei vastaa. Jatketaan ilman LxP-koodia.');
        return { lxpKey: null, labels: [] };
      } else {
        const out = { lxpKey: deriveLxpKey(text), labels: [] };
        dbg('lxp.job.fallback', out);
        return out;
      }
    }
  }

  async function lxpAnalyzeCandidates(candidates, lxpKey, keywords){
    // candidates: [{ id, preview: {line1,line2} }]
    try{
  const { res } = await fetchLxp(LXP_API.analyzeCandidates, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidates, lxpKey, keywords })
      });
      if(!res.ok) throw new Error('LxP analyze candidates failed');
      const ct = (res.headers.get('content-type')||'').toLowerCase();
      if(!ct.includes('application/json')){
        throw new Error('Invalid Content-Type from LxP (expected JSON, got '+ct+')');
      }
      const data = await res.json();
      // Accept arrays under different keys and map field names
      const raw = Array.isArray(data.codes) ? data.codes
                : Array.isArray(data.results) ? data.results
                : Array.isArray(data.items) ? data.items
                : [];
      const arr = raw.map(r=>({
        id: r.id || r.docId || r.profileId,
        code: r.code || r.lxpCode || r.key || null,
        reasons: r.reasons || r.labels || r.justifications || []
      })).filter(x=>x.id);
  dbg('lxp.candidates.remote', { count: arr.length });
  return arr;
    }catch(e){
      console.warn('LxP candidate analysis failed:', e);
      dbg('lxp.candidates.error', { error: String(e) });
      if (STRICT_LXP){
        tick('Ehdokaskohtainen LxP-analyysi ohitettu (palvelu ei vastaa).');
        return [];
      } else {
        // Fallback: synthesize simple codes and generic reasons using preview + keywords
        const arr = candidates.map((c, idx)=>{
          const rank = idx<10?'A':idx<20?'B':idx<30?'C':'D';
          const code = (lxpKey||'GEN') + '-' + rank;
          const text = `${c.preview?.line1||''} ${c.preview?.line2||''}`.toLowerCase();
          const hits = (keywords||[]).filter(k=>text.includes(String(k).toLowerCase())).slice(0,3);
          const reasons = [
            `Kierros 1: Kohteen LxP = ${lxpKey||'—'} (vastaa työnkuvaa)`,
            hits.length ? `Kierros 2: Avainsanat osuma: ${hits.join(', ')}` : 'Kierros 2: Yleinen soveltuvuus arvioitu esittelytekstistä'
          ];
          return { id: c.id, code, reasons };
        });
        dbg('lxp.candidates.fallback', { count: arr.length });
        return arr;
      }
    }
  }

  async function writeLxpCodesToFirestore(codeEntries){
    // Allow writes also in demo, but restrict strictly to tool-generated fields
    const access = getAccessLevel();
    const source = access === 'public' ? 'flow-public' : access === 'paid' ? 'flow-paid' : 'flow-superuser';
    let ok=0, fail=0, skipped=0, filtered=0;
    for(const entry of codeEntries){
      try{
        const ref = dbProfiles.collection('profiles').doc(entry.id);
        const snap = await ref.get();
        const data = snap.exists ? (snap.data()||{}) : {};
        // Skip if LxP/lxpKey already present
        const hasExisting = !!(data.LxP || data.lxpKey || (Array.isArray(data.lxp) && data.lxp.length));
        if(hasExisting){
          skipped++;
          dbg('fs.write.skip.existing', { id: entry.id });
          continue;
        }
        // Sanitize and validate code to ensure it's a plausible tool output
        let code = String(entry.code||'').toUpperCase().replace(/[^A-Z0-9_-]/g,'-').slice(0,32);
        if(!code || !/^[A-Z0-9_-]{1,32}$/.test(code)){
          filtered++;
          dbg('fs.write.skip.filtered', { id: entry.id, code: entry.code });
          continue;
        }
        if (DRY_RUN){
          // Simulate write in memory only
          const previewWrite = { id: entry.id, LxP: code, lxpUpdatedAt: new Date().toISOString(), lxpUpdatedBy: source };
          memoryWrites.push(previewWrite);
          ok++;
          dbg('fs.write.dryRun.ok', previewWrite);
        } else {
          await ref.set({
            LxP: code,
            lxpUpdatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            lxpUpdatedBy: source
          }, { merge: true });
          ok++;
          dbg('fs.write.ok', { id: entry.id, code });
        }
      }catch(e){
        console.warn('Write LxP failed for', entry.id, e);
        fail++;
        dbg('fs.write.fail', { id: entry.id, error: String(e) });
      }
    }
    if (DRY_RUN){
      tick(`Test-tila: ${ok} kpl kirjauksia simuloitu muistissa, ei tallennettu Firestoreen.`);
      dbg('fs.write.dryRun.summary', { ok, fail, skipped, filtered, sample: memoryWrites.slice(0,5) });
    }
    if (skipped>0) tick(`Ohitettu ${skipped} profiilia (LxP jo olemassa).`);
    if (filtered>0) tick(`Suodatettu ${filtered} koodia (virheellinen muoto).`);
    return { ok, fail, skipped, filtered, dryRun: !!DRY_RUN };
  }

  startBtn.addEventListener('click', async ()=>{
    if(!validate()) return;
    const access = getAccessLevel();
    const requestedN = parseInt(countInput.value,10);
    const PUBLIC_LIMIT = 30; // limit for anonymous demo users
    const N = access === 'public' ? Math.min(requestedN, PUBLIC_LIMIT) : requestedN;

    resultsBox.style.display = 'none';
    progressList.innerHTML = '';
    tick('Luetaan...');
  dbg('context', { mode, requestedN, access, searchProject: searchConfig.projectId, profilesProject: profilesConfig.projectId, dryRun: DRY_RUN, lxpBase: LXP_API.base });
    await delay(800 + Math.random()*500);

    // Stage 1: Analyze job text via LxP service (or fallback)
  tick(`Vaihe 1/2: Analysoidaan työnkuva LxP:ksi (${STRICT_LXP ? 'lxp.yoro.fi' : 'lxp.yoro.fi tai paikallinen varajärjestelmä'})...`);
    const { keywords } = aiStub(textInput.value);
    const jobLxp = await lxpAnalyzeJobText(textInput.value);
    const lxpKey = jobLxp.lxpKey;
  dbg('lxp.job.result', { lxpKey, labels: jobLxp.labels });
    tick(`LxP: ${lxpKey || 'ei tunnistettu'} | Avainsanat: ${keywords.slice(0,6).join(', ')}${jobLxp.labels && jobLxp.labels.length? ' | Perustelut: ' + jobLxp.labels.slice(0,3).join('; ') : ''}`);

    // 10s review window to accept/override the job LxP before searching
    const confirmedLxp = await reviewLxp(lxpKey, jobLxp.labels||[]);
    if (confirmedLxp === null){
      tick('Keskeytetty käyttäjän toimesta.');
      return;
    }
    // Candidate search using confirmed LxP
    tick('Haetaan ehdokkaita Firestoresta...');
    const items = await searchProfilesMinimal(keywords, N, confirmedLxp);
  dbg('fs.selected', { returned: items.length, firstIds: items.slice(0,5).map(i=>i.id) });

    // Stage 2: Analyze up to 50 candidates and write LxP code
  const toAnalyze = items.slice(0, Math.min(items.length, 50)).map(i=>({
      id: i.id,
      preview: i.preview,
      // Provide a plain text field many APIs expect
      text: `${i.preview?.line1||''} ${i.preview?.line2||''}`.trim()
    }));
  tick(`Vaihe 2/2: Analysoidaan ${toAnalyze.length} ehdokasta (${STRICT_LXP ? 'lxp.yoro.fi' : 'lxp.yoro.fi tai paikallinen varajärjestelmä'})...`);
  const codes = await lxpAnalyzeCandidates(toAnalyze, confirmedLxp, keywords);
  dbg('lxp.candidates.result', { count: codes.length });

    // Attach codes and reasons to items for UI
    const codeMap = new Map(codes.map(c=>[c.id, { code: c.code, reasons: c.reasons||[] }]));
    items.forEach(i=>{ const x = codeMap.get(i.id)||{}; i.lxpCode = x.code||null; i.reasons = Array.isArray(x.reasons)? x.reasons: []; });

    // Persist codes to Firestore (paid/superuser only)
    let writeRes = { ok: 0, fail: 0, skipped: 0, filtered: 0 };
    if (codes.length){
      tick('Tallennetaan LxP-koodit Firestoreen...');
      writeRes = await writeLxpCodesToFirestore(codes);
    } else {
      tick('Ei tallennettavia LxP-koodeja (analyysi puuttuu).');
    }
  dbg('fs.write.summary', writeRes);
    tick(`Tallennus valmis: OK ${writeRes.ok}, epäonnistui ${writeRes.fail}`);

    tick('Järjestetään...');
    await delay(400 + Math.random()*400);
    tick('Valmis');
    renderResults(items, keywords, access, requestedN, N, PUBLIC_LIMIT, confirmedLxp, jobLxp.labels||[]);
  });

  function reviewLxp(initialLxp, reasons){
    return new Promise(resolve=>{
      const lxp = (initialLxp||'').toString().toUpperCase();
      reviewLxpEl.textContent = lxp || '—';
      reviewLxpInput.value = lxp || '';
      reviewReasonsEl.textContent = (reasons||[]).map(sanitizePII).slice(0,3).join(' | ');
      reviewBox.style.display = 'block';
      let secs = 10;
      reviewCountdownEl.textContent = String(secs);
      const timer = setInterval(()=>{
        secs -= 1;
        reviewCountdownEl.textContent = String(secs);
        if (secs <= 0){ done('timeout'); }
      }, 1000);
      function done(mode){
        clearInterval(timer);
        reviewBox.style.display = 'none';
        if (mode === 'cancel') return resolve(null);
        const val = (reviewLxpInput.value||'').trim().toUpperCase();
        return resolve(val || lxp || null);
      }
      reviewProceedBtn.onclick = ()=> done('proceed');
      reviewCancelBtn.onclick = ()=> done('cancel');
    });
  }

  function renderResults(items, keywords, access, requestedN, effectiveN, PUBLIC_LIMIT, lxpKey, jobReasons){
    const jr = (jobReasons||[]).map(sanitizePII).slice(0,3);
  const src = (LXP_API.base||'').replace(/^https?:\/\//,'');
  resultsMeta.innerHTML = `LxP (lähde: ${src||'—'}): <strong>${lxpKey || '—'}</strong>${jr.length? ` | Perustelut: ${jr.join('; ')}`:''} | Avainsanat: <code>${keywords.join(', ')}</code> | Tuloksia: <strong>${items.length}</strong>${access==='public' ? ` (demo, max ${PUBLIC_LIMIT})` : ''}`;
    resultsList.innerHTML = '';
    items.forEach(i=>{
      const li = document.createElement('li');
      const reasons = (i.reasons||[]).map(sanitizePII).slice(0,2); // show for everyone, PII-sanitized
      if (access === 'public'){
        li.innerHTML = `
          <div><strong>ID:</strong> ${i.id} ${i.lxpCode?`<span class="badge">LxP:${i.lxpCode}</span>`:''}</div>
          <div>${i.preview.line1 || ''}</div>
          <div>${i.preview.line2 || ''}</div>
          ${reasons.length? `<div class="reason">${reasons[0]}</div>${reasons[1]?`<div class="reason">${reasons[1]}</div>`:''}`:''}
        `;
      } else {
        li.innerHTML = `
          <div><strong>ID:</strong> ${i.id} ${i.lxpCode?`<span class="badge">LxP:${i.lxpCode}</span>`:''} &nbsp; <em>score:</em> ${i.score} ${i.tags&&i.tags.length?`<span class="tags">(${i.tags.join(',')})</span>`:''}</div>
          <div>${i.preview.line1 || ''}</div>
          <div>${i.preview.line2 || ''}</div>
          ${reasons.length? `<div class="reason">${reasons[0]}</div>${reasons[1]?`<div class="reason">${reasons[1]}</div>`:''}`:''}
        `;
      }
      resultsList.appendChild(li);
    });

    if (access === 'public' && requestedN > effectiveN){
      const info = document.createElement('p');
      info.className = 'hint';
      info.textContent = 'Lisää tuloksia ja LxP-koodien tallennus käytettävissä asiakkaille.';
      resultsList.parentElement.appendChild(info);
    }

    resultsBox.style.display = 'block';
  }

  function delay(ms){ return new Promise(r=>setTimeout(r, ms)); }
})();
