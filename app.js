(() => {
  const P = window.AB_PRODUCTS, SIZES = window.AB_SIZES, COLORS = window.AB_COLORS, STORE = window.AB_STORE;
  const $ = (s, r = document) => r.querySelector(s);
  const money = n => '$' + n.toFixed(2);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let uid = 0;

  /* ---------- garment drawing ---------- */
  const TEE = {
    vb: '0 0 400 470',
    body: 'M150,24 Q200,60 250,24 L330,44 Q354,52 368,74 L398,150 L338,180 L318,152 L318,444 Q200,458 82,444 L82,152 L62,180 L2,150 L32,74 Q46,52 70,44 Z',
    collarF: 'M150,24 Q200,60 250,24', collarB: 'M150,24 Q200,40 250,24',
    seams: 'M82,152 Q80,100 70,44 M318,152 Q320,100 330,44 M10,160 L58,186 M390,160 L342,186',
    folds: 'M150,210 Q138,330 156,440 M262,250 Q272,350 250,440 M96,190 Q120,240 112,300',
    hem: 'M86,432 Q200,446 314,432'
  };
  const HOOD = {
    vb: '0 0 400 540',
    hood: 'M122,70 Q112,22 200,14 Q288,22 278,70 Q240,96 200,98 Q160,96 122,70 Z',
    body: 'M126,66 L72,84 Q44,94 36,126 L8,412 Q6,434 26,440 L54,442 Q68,440 70,422 L86,222 L86,476 Q200,488 314,476 L314,222 L330,422 Q332,440 346,442 L374,440 Q394,434 392,412 L364,126 Q356,94 328,84 L274,66 Q200,104 126,66 Z',
    opening: 'M146,70 Q200,120 254,70 Q236,52 200,50 Q164,52 146,70 Z',
    seams: 'M86,222 Q84,150 72,84 M314,222 Q316,150 328,84 M14,398 L64,404 M386,398 L336,404 M88,456 Q200,468 312,456',
    pocket: 'M120,352 L280,352 L302,450 Q200,458 98,450 Z',
    folds: 'M150,240 Q140,330 152,350 M258,250 Q266,320 250,350 M40,250 Q52,300 46,360 M360,250 Q348,300 354,360'
  };
  // where the print sits, as % of the garment box
  const PLACE = {
    tee: { full: [31, 19, 38], wide: [26, 22, 48], chest: [57, 15, 14] },
    hoodie: { full: [34.5, 30, 31], wide: [29, 32, 42], chestCenter: [40.5, 29, 19] }
  };

  function shade(fill) {
    // lighter edge colour for collar/rib so black still reads
    return fill === COLORS.Black.fill ? '#262523' : '#c7b48f';
  }

  function svgFor(kind, fill, side) {
    const id = 'g' + (++uid);
    const T = kind === 'hoodie' ? HOOD : TEE;
    const rib = shade(fill);
    const defs = `
      <defs>
        <clipPath id="${id}c"><path d="${T.body}"/></clipPath>
        <linearGradient id="${id}h" x1="0" x2="1">
          <stop offset="0" stop-color="#000" stop-opacity=".55"/>
          <stop offset=".2" stop-color="#000" stop-opacity="0"/>
          <stop offset=".5" stop-color="#fff" stop-opacity=".05"/>
          <stop offset=".8" stop-color="#000" stop-opacity="0"/>
          <stop offset="1" stop-color="#000" stop-opacity=".55"/>
        </linearGradient>
        <linearGradient id="${id}v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fff" stop-opacity=".08"/>
          <stop offset=".35" stop-color="#fff" stop-opacity="0"/>
          <stop offset="1" stop-color="#000" stop-opacity=".35"/>
        </linearGradient>
        <filter id="${id}b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="7"/></filter>
        <filter id="${id}n"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="${uid % 9}"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .55 0"/></filter>
      </defs>`;
    let parts = '';
    if (kind === 'hoodie') {
      parts += `<path d="${T.hood}" fill="${fill}"/><path d="${T.hood}" fill="url(#${id}v)"/>`;
    }
    parts += `<path d="${T.body}" fill="${fill}"/>`;
    parts += `<g clip-path="url(#${id}c)">
      <rect width="400" height="560" filter="url(#${id}n)" opacity=".16"/>
      <path d="${T.folds}" stroke="#000" stroke-opacity=".35" stroke-width="14" fill="none" filter="url(#${id}b)"/>
      <rect width="400" height="560" fill="url(#${id}h)"/>
      <rect width="400" height="560" fill="url(#${id}v)"/>
    </g>`;
    parts += `<path d="${T.seams}" stroke="${rib}" stroke-width="1.6" fill="none" stroke-dasharray="3 3" opacity=".9"/>`;
    if (kind === 'hoodie') {
      if (side === 'front') {
        parts += `<path d="${T.opening}" fill="#000" opacity=".55"/>`;
        parts += `<path d="${T.pocket}" fill="${fill}" stroke="${rib}" stroke-width="2"/><path d="${T.pocket}" fill="#000" opacity=".12"/>`;
        parts += `<path d="M180,96 Q176,140 178,190 M220,96 Q224,140 222,190" stroke="#e9e1d2" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
        parts += `<rect x="174" y="186" width="8" height="16" rx="2" fill="${'#c9a24b'}"/><rect x="218" y="186" width="8" height="16" rx="2" fill="${'#c9a24b'}"/>`;
      } else {
        parts += `<path d="M126,66 Q200,30 274,66 Q200,140 126,66 Z" fill="#000" opacity=".18"/>`;
      }
    } else {
      parts += `<path d="${side === 'front' ? T.collarF : T.collarB}" stroke="${rib}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
      parts += `<path d="${T.hem}" stroke="${rib}" stroke-width="1.4" fill="none" stroke-dasharray="3 3"/>`;
      if (side === 'back') parts += `<path d="M150,24 Q200,72 250,24" stroke="#000" stroke-opacity=".0" fill="none"/>`;
    }
    return `<svg viewBox="${T.vb}" aria-hidden="true" focusable="false">${defs}${parts}</svg>`;
  }

  const HANGER = `<svg class="hanger" viewBox="0 0 300 96" aria-hidden="true" focusable="false">
    <defs><linearGradient id="chr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbfbfa"/><stop offset=".55" stop-color="#9a9ca0"/><stop offset="1" stop-color="#55575b"/></linearGradient></defs>
    <path d="M150,58 V30 Q150,6 168,6 Q184,6 184,20" stroke="url(#chr)" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M14,86 L150,52 L286,86" stroke="url(#chr)" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14,86 H286" stroke="url(#chr)" stroke-width="4" opacity=".55"/>
  </svg>`;

  // photo-style renders from tools/render_garments.py (front + back per colour)
  function garmentHTML(p, color) {
    const base = `garments/${p.handle}-${color.toLowerCase()}`;
    const ar = p.kind === 'hoodie' ? '400 / 540' : '400 / 470';
    return `<div class="turn">
      <div class="face front"><img class="gimg" src="${base}-front.webp" alt="" style="aspect-ratio:${ar}" draggable="false" decoding="async"></div>
      <div class="face back"><img class="gimg" src="${base}-back.webp" alt="" style="aspect-ratio:${ar}" draggable="false" loading="lazy" decoding="async"></div>
    </div>`;
  }

  const kindName = p => (p.kind === 'hoodie' ? 'Hoodie' : 'Tee');
  const priceLine = p => `${money(p.price)}`;

  /* ---------- rails (one per line; lines never mix) ---------- */
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const narrow = () => innerWidth < 900;

  function buildRail(rail) {
    const line = rail.dataset.line;
    const idx = P.map((p, i) => i).filter(i => P[i].line === line);
    const cap = rail.closest('.showroom').querySelector('.caption');
    rail.innerHTML = idx.map(i => { const p = P[i]; return `
      <div class="slot" role="listitem" data-i="${i}">
        <button class="hang" type="button" aria-label="${p.name} ${kindName(p)}, ${p.soon ? 'coming soon' : money(p.price)}. Open details">
          <div class="sway">${HANGER}${garmentHTML(p, 'Black')}</div>
          <span class="tag">${p.name} ${kindName(p)}</span>
        </button>
      </div>`; }).join('');
    const slots = [...rail.children];
    let active = -1;

    function caption() {
      if (active < 0) { cap.innerHTML = `<p class="hint">${narrow() ? 'Swipe the rail. Tap a piece to open it.' : 'Hover a piece. It turns to face you.'}</p>`; return; }
      const i = idx[active], p = P[i];
      cap.innerHTML = `<p class="cap-name">${p.name} ${kindName(p)}</p>
        <p class="cap-meta"><span class="gold">${p.ref}</span> · ${p.soon ? 'Coming soon' : money(p.price)}</p>
        <button class="ghost" type="button" data-open="${i}">View piece</button>`;
    }
    function setActive(k, force) {
      if (k === active && !force) return;
      const prev = active; active = k;
      const spread = narrow() ? 0 : 66;
      slots.forEach((s, j) => {
        s.classList.toggle('on', j === k);
        s.style.setProperty('--shift', k < 0 || !spread ? '0px' : j < k ? `-${spread}px` : j > k ? `${spread}px` : '0px');
        s.style.setProperty('--z', j === k ? 10 : 1);
        if (!reduce.matches && !force && (j === k || j === prev || Math.abs(j - k) === 1)) {
          const sw = $('.sway', s); sw.classList.remove('go'); void sw.offsetWidth; sw.classList.add('go');
        }
      });
      caption();
    }
    cap.addEventListener('click', e => { const b = e.target.closest('[data-open]'); if (b) openPDP(+b.dataset.open); });
    slots.forEach((s, j) => {
      const btn = $('.hang', s);
      btn.addEventListener('pointerenter', () => { if (fine.matches && !narrow()) setActive(j); });
      btn.addEventListener('focus', () => setActive(j));
      btn.addEventListener('click', () => openPDP(idx[j]));
    });
    rail.addEventListener('pointerleave', () => { if (fine.matches && !narrow() && !rail.contains(document.activeElement)) setActive(-1); });
    let raf = 0;
    function centre() {
      if (!narrow()) return;
      const mid = rail.getBoundingClientRect().left + rail.clientWidth / 2;
      let best = 0, bd = 1e9;
      slots.forEach((s, j) => { const r = s.getBoundingClientRect(); const d = Math.abs(r.left + r.width / 2 - mid); if (d < bd) { bd = d; best = j; } });
      setActive(best);
    }
    rail.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(centre); }, { passive: true });
    addEventListener('resize', () => { if (narrow()) centre(); else setActive(-1, true); });
    if (narrow()) requestAnimationFrame(centre); else caption();
  }

  /* ---------- scripture cards (one per design) ---------- */
  const designs = P.filter(p => p.kind === 'tee' && p.line === 'ab' && !p.soon);
  if ($('#cards')) $('#cards').innerHTML = designs.map(p => `
    <button class="card" type="button" data-h="${p.handle}" aria-label="${p.name}: ${p.ref}. Open details">
      <span class="pic"><img src="${p.art}" alt="" loading="lazy"></span>
      <span class="txt"><span class="ref">${p.ref}</span><span class="nm">${p.name}</span><span class="vs">“${p.verse}”</span><span class="pr">From ${money(p.price)}</span></span>
    </button>`).join('');
  if ($('#cards')) $('#cards').addEventListener('click', e => { const c = e.target.closest('.card'); if (c) openPDP(P.findIndex(p => p.handle === c.dataset.h)); });

  /* ---------- product detail ---------- */
  const dlg = $('#pdp'), stage = $('#pdpStage'), hold = $('#pdpHold');
  let cur = null, color = 'Black', size = null, ry = 0, lastFocus = null;

  function placeText(p) {
    if (p.place === 'chest') return 'Left chest';
    if (p.place === 'chestCenter') return 'Front chest';
    return 'Full front';
  }

  let view = 'front';
  function drawPDPGarment() {
    const usePhoto = cur.photo && color === 'Black';
    hold.innerHTML = garmentHTML(cur, color) + (usePhoto ? `<img class="pdp-photo" src="${cur.photo}" alt="${cur.name} ${kindName(cur)} worn by a model">` : '');
    $('.turn-ctl [data-side="photo"]').hidden = !usePhoto;
    if (!usePhoto && view === 'photo') view = 'front';
    setView(view);
  }
  function setView(v) {
    view = v;
    stage.classList.toggle('photo-on', v === 'photo');
    if (v !== 'photo') setRY(v === 'back' ? 180 : 0);
    ['photo', 'front', 'back'].forEach(k => $(`.turn-ctl [data-side="${k}"]`).setAttribute('aria-pressed', String(k === v)));
  }
  function setRY(v) {
    ry = v;
    const t = $('.turn', hold);
    if (t) t.style.setProperty('--ry', v + 'deg');
    if (view === 'photo') return;
    const back = (((v % 360) + 360) % 360) > 90 && (((v % 360) + 360) % 360) < 270;
    view = back ? 'back' : 'front';
    $('.turn-ctl [data-side="photo"]').setAttribute('aria-pressed', 'false');
    $('.turn-ctl [data-side="front"]').setAttribute('aria-pressed', String(!back));
    $('.turn-ctl [data-side="back"]').setAttribute('aria-pressed', String(back));
  }

  function openPDP(i) {
    if (i < 0) return;
    cur = P[i]; color = 'Black'; size = null; ry = 0; view = cur.photo ? 'photo' : 'front';
    lastFocus = document.activeElement;
    $('#pdpKind').textContent = `${kindName(cur)} · ${cur.line === 'am' ? 'After Midnight' : 'Amen Brother'}${cur.soon ? ' · Coming soon' : ''}`;
    $('#pdpName').textContent = cur.name;
    $('#pdpVerse').textContent = `“${cur.verse}”`;
    $('#pdpRef').textContent = cur.ref;
    $('#pdpBlurb').textContent = cur.blurb;
    const colors = cur.soon ? ['Black'] : Object.keys(cur.variants);
    $('#colorSet').hidden = !!cur.soon;
    $('#sizes').closest('.opt').hidden = !!cur.soon;
    $('#swatches').innerHTML = colors.map(c => `<button type="button" class="sw" role="radio" aria-checked="${c === color}" aria-label="${c}" data-c="${c}" style="background-color:${COLORS[c].fill}"></button>`).join('');
    $('#swatches').setAttribute('role', 'radiogroup');
    $('#sizes').setAttribute('role', 'radiogroup');
    $('#sizes').innerHTML = SIZES.map(s => `<button type="button" class="sz" role="radio" aria-checked="false" data-s="${s}">${s}</button>`).join('');
    $('#facts').innerHTML = `
      <dt>Print</dt><dd>${placeText(cur)}, DTF</dd>
      <dt>Colour${colors.length > 1 ? 's' : ''}</dt><dd>${colors.join(', ')}</dd>
      <dt>Shipping</dt><dd>$5.95 flat in the US, free on orders $75+</dd>
      <dt>Printed</dt><dd>Denver, Colorado</dd>
      <dt>Size chart</dt><dd class="pending">Measured chart posts with our first samples</dd>
      <dt>Returns</dt><dd class="pending">Policy coming soon</dd>`;
    syncPDP();
    drawPDPGarment();
    dlg.showModal();
    $('#pdpClose').focus();
  }

  function syncPDP() {
    $('#colorName').textContent = color;
    [...$('#swatches').children].forEach(b => b.setAttribute('aria-checked', String(b.dataset.c === color)));
    [...$('#sizes').children].forEach(b => b.setAttribute('aria-checked', String(b.dataset.s === size)));
    const big = size === '2XL' || size === '3XL';
    $('#pdpPrice').textContent = size ? money(big ? cur.bigPrice : cur.price) : (cur.bigPrice !== cur.price ? `${money(cur.price)}  (2XL–3XL ${money(cur.bigPrice)})` : money(cur.price));
    $('#sizeName').textContent = size || 'Pick a size';
    const add = $('#addBtn');
    if (cur.soon) { add.disabled = true; add.textContent = 'Coming soon'; $('#pdpPrice').textContent = money(cur.price); return; }
    add.disabled = !size;
    add.textContent = size ? `Add to bag · ${money(big ? cur.bigPrice : cur.price)}` : 'Pick a size';
  }

  $('#swatches').addEventListener('click', e => { const b = e.target.closest('.sw'); if (!b) return; color = b.dataset.c; syncPDP(); drawPDPGarment(); });
  $('#sizes').addEventListener('click', e => { const b = e.target.closest('.sz'); if (!b) return; size = b.dataset.s; syncPDP(); });
  // arrow keys inside radio groups
  ['#swatches', '#sizes'].forEach(sel => $(sel).addEventListener('keydown', e => {
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(e.key)) return;
    const items = [...$(sel).children]; const k = items.indexOf(document.activeElement);
    const n = items[(k + (e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length];
    n.focus(); n.click(); e.preventDefault();
  }));

  $('.turn-ctl').addEventListener('click', e => {
    const b = e.target.closest('[data-side]'); if (!b) return;
    setView(b.dataset.side);
  });

  // drag to turn
  let dragX = null, dragStart = 0;
  stage.addEventListener('pointerdown', e => {
    if (e.target.closest('button')) return;
    if (view === 'photo') setView('front');
    dragX = e.clientX; dragStart = ry; stage.classList.add('dragging'); stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener('pointermove', e => { if (dragX === null) return; setRY(dragStart + (e.clientX - dragX) * 0.7); });
  const endDrag = () => { if (dragX === null) return; dragX = null; stage.classList.remove('dragging'); setRY(Math.round(ry / 180) * 180); };
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);

  $('#pdpClose').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', () => { if (lastFocus) lastFocus.focus(); });

  /* ---------- bag ---------- */
  const KEY = `ab-bag-v1-${document.body.dataset.line || 'ab'}`;
  let bag = [];
  try { bag = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { bag = []; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(bag)); } catch { /* private mode */ } };

  function variantId(p, c, s) { return p.variants[c][SIZES.indexOf(s)]; }
  function unit(p, s) { return s === '2XL' || s === '3XL' ? p.bigPrice : p.price; }

  function addLine(p, c, sz) {
    const id = variantId(p, c, sz);
    const line = bag.find(l => l.id === id);
    if (line) line.qty++; else bag.push({ id, h: p.handle, c, s: sz, qty: 1 });
    save(); renderBag();
    const n = $('#bagCount'); n.classList.add('bump'); setTimeout(() => n.classList.remove('bump'), 300);
    toast(`${p.name} ${kindName(p)} (${sz}) added`);
  }

  $('#addBtn').addEventListener('click', () => {
    if (!size) return;
    addLine(cur, color, size);
    dlg.close();
  });

  function renderBag() {
    const count = bag.reduce((a, l) => a + l.qty, 0);
    $('#bagCount').textContent = count;
    $('#bagBtn').setAttribute('aria-label', `Open bag, ${count} item${count === 1 ? '' : 's'}`);
    const sub = bag.reduce((a, l) => { const p = P.find(x => x.handle === l.h); return a + unit(p, l.s) * l.qty; }, 0);
    $('#subtotal').textContent = money(sub);
    const left = 75 - sub;
    $('#shipText').textContent = left > 0 ? `${money(left)} away from free shipping` : 'Free shipping unlocked';
    $('#shipBar').style.width = Math.min(100, (sub / 75) * 100) + '%';
    $('#checkoutBtn').disabled = !count;
    $('#bagList').innerHTML = count ? bag.map((l, k) => {
      const p = P.find(x => x.handle === l.h);
      return `<li>
        <span class="th"><img src="${p.art}" alt=""></span>
        <div><div class="nm">${p.name} ${kindName(p)}</div><div class="meta">${l.c} · ${l.s}</div>
          <div class="qty" role="group" aria-label="Quantity">
            <button type="button" data-k="${k}" data-d="-1" aria-label="One less">−</button><span>${l.qty}</span><button type="button" data-k="${k}" data-d="1" aria-label="One more">+</button>
          </div></div>
        <span class="lp">${money(unit(p, l.s) * l.qty)}</span>
      </li>`;
    }).join('') : '<li class="empty">Your bag is empty.</li>';
  }
  $('#bagList').addEventListener('click', e => {
    const b = e.target.closest('[data-k]'); if (!b) return;
    const l = bag[+b.dataset.k]; l.qty += +b.dataset.d;
    if (l.qty <= 0) bag.splice(+b.dataset.k, 1);
    save(); renderBag();
  });

  const bagEl = $('#bag'), scrim = $('#scrim');
  function openBag() { bagEl.classList.add('open'); bagEl.removeAttribute('inert'); bagEl.setAttribute('aria-hidden', 'false'); scrim.hidden = false; $('#bagClose').focus(); }
  function closeBag() { bagEl.classList.remove('open'); bagEl.setAttribute('inert', ''); bagEl.setAttribute('aria-hidden', 'true'); scrim.hidden = true; $('#bagBtn').focus(); }
  $('#bagBtn').addEventListener('click', openBag);
  $('#bagClose').addEventListener('click', closeBag);
  scrim.addEventListener('click', closeBag);
  addEventListener('keydown', e => { if (e.key === 'Escape' && bagEl.classList.contains('open')) closeBag(); });

  // Shopify cart permalink: sends the bag straight to Shopify checkout
  $('#checkoutBtn').addEventListener('click', () => {
    if (!bag.length) return;
    location.href = `${STORE}/cart/${bag.map(l => `${l.id}:${l.qty}`).join(',')}`;
  });

  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2200);
  }

  /* ---------- shoppable grid ---------- */
  const LINE = document.body.dataset.line || 'ab';
  function buildGrid() {
    const grid = $('#grid'); if (!grid) return;
    const items = P.map((p, i) => i).filter(i => P[i].line === LINE);
    grid.innerHTML = items.map(i => { const p = P[i]; const base = `garments/${p.handle}-black`;
      const ar = p.kind === 'hoodie' ? '400 / 540' : '400 / 470';
      const colors = Object.keys(p.variants);
      return `<article class="pcard" role="listitem" data-kind="${p.kind}">
        <button type="button" class="pimg${p.photo ? ' has-photo' : ''}" data-open="${i}" aria-label="${p.name} ${kindName(p)}: view details">
          ${p.photo
            ? `<img class="ph" src="${p.photo}" alt="" loading="lazy" decoding="async"><img class="b" src="${base}-front.webp" alt="" loading="lazy" decoding="async" style="aspect-ratio:${ar}">`
            : `<img class="f" src="${base}-front.webp" alt="" loading="lazy" decoding="async" style="aspect-ratio:${ar}"><img class="b" src="${base}-back.webp" alt="" loading="lazy" decoding="async" style="aspect-ratio:${ar}">`}
          ${p.soon ? '<span class="badge">Coming soon</span>' : colors.length > 1 ? `<span class="badge soft">${colors.length} colours</span>` : ''}
        </button>
        <div class="pinfo">
          <p class="ref">${p.ref}</p>
          <h3><button type="button" class="pname" data-open="${i}">${p.name} ${kindName(p)}</button></h3>
          <p class="pprice">${p.soon ? 'Coming soon' : money(p.price)}</p>
          ${p.soon ? '' : `<div class="quick" role="group" aria-label="Quick add ${p.name} ${kindName(p)} in black, pick a size">
            ${SIZES.map(sz => `<button type="button" data-q="${i}" data-s="${sz}" aria-label="Add size ${sz}${(sz === '2XL' || sz === '3XL') && p.bigPrice !== p.price ? ', ' + money(p.bigPrice) : ''}">${sz}</button>`).join('')}
          </div>`}
        </div>
      </article>`; }).join('');
    grid.addEventListener('click', e => {
      const q = e.target.closest('[data-q]');
      if (q) { addLine(P[+q.dataset.q], 'Black', q.dataset.s); return; }
      const o = e.target.closest('[data-open]');
      if (o) openPDP(+o.dataset.open);
    });
    document.querySelectorAll('.filters [data-f]').forEach(b => b.addEventListener('click', () => {
      document.querySelectorAll('.filters [data-f]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      grid.querySelectorAll('.pcard').forEach(c => { c.hidden = !(b.dataset.f === 'all' || c.dataset.kind === b.dataset.f); });
    }));
    // hide the hoodie filter when a storefront has none
    if (!items.some(i => P[i].kind === 'hoodie')) document.querySelectorAll('.filters').forEach(f => f.hidden = true);
  }

  buildGrid();
  document.querySelectorAll('.rail[data-line]').forEach(buildRail);

  // rail arrows (scroll cue + keyboard/mouse alternative to swiping)
  document.querySelectorAll('.showroom').forEach(room => {
    const rail = room.querySelector('.rail'), prev = room.querySelector('.rail-nav.prev'), next = room.querySelector('.rail-nav.next');
    if (!rail || !prev) return;
    const step = () => Math.max(160, rail.clientWidth * 0.6);
    const sync = () => {
      const max = rail.scrollWidth - rail.clientWidth - 2;
      prev.disabled = rail.scrollLeft <= 2; next.disabled = rail.scrollLeft >= max;
      prev.hidden = next.hidden = max <= 0;
    };
    prev.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: reduce.matches ? 'auto' : 'smooth' }));
    next.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: reduce.matches ? 'auto' : 'smooth' }));
    rail.addEventListener('scroll', sync, { passive: true }); addEventListener('resize', sync); sync();
  });

  // phone menu
  const menuBtn = $('#menuBtn'), nav = $('#mainNav');
  menuBtn.addEventListener('click', () => { const o = nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', String(o)); });
  nav.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); } });
  renderBag();
})();
