/**
 * The interaction layer.
 *
 * Everything here is an enhancement over a page that already works: each piece
 * checks for support, bails on coarse pointers where it would hurt, and is
 * switched off entirely under prefers-reduced-motion.
 */

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const fine = matchMedia('(pointer: fine)');
const raf = requestAnimationFrame;

/* ------------------------------------------------------------------ *
 * 1. Inertial scrolling
 *
 * The single thing that separates a page that feels designed from one
 * that feels like a document. Wheel input drives a target, the page
 * eases toward it. Native scrolling is left alone for touch (already
 * smooth), for keyboard and scrollbar dragging (which stay exact), and
 * for anyone who asked for less motion.
 * ------------------------------------------------------------------ */
function smoothScroll() {
  if (reduced.matches || !fine.matches) return;

  let target = scrollY;
  let current = scrollY;
  let running = false;
  let wheeling = 0;

  // This handler calls preventDefault, so if anything in it ever throws the
  // page would stop scrolling altogether — a far worse outcome than scrolling
  // plainly. One failure permanently hands scrolling back to the browser.
  let enabled = true;

  const max = () => document.documentElement.scrollHeight - innerHeight;

  function loop() {
    try {
      const d = target - current;
      current += d * 0.115;
      if (Math.abs(d) < 0.4) { current = target; running = false; }
      scrollTo(0, current);
      if (running) raf(loop);
    } catch {
      enabled = false; running = false;
    }
  }

  addEventListener('wheel', (e) => {
    if (!enabled) return;
    // Let the browser handle zoom and horizontal intent.
    if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    try {
      e.preventDefault();
    } catch { enabled = false; return; }
    const step = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
    target = Math.max(0, Math.min(max(), target + step));
    clearTimeout(wheeling);
    wheeling = window.setTimeout(() => { wheeling = 0; }, 140);
    if (!running) { running = true; current = scrollY; raf(loop); }
  }, { passive: false });

  // Anything that is not the wheel — keys, scrollbar, anchors, find-in-page —
  // moves the page itself, so adopt its position rather than fighting it.
  addEventListener('scroll', () => { if (!running && !wheeling) target = scrollY; }, { passive: true });
  addEventListener('resize', () => { target = Math.min(target, max()); });
}

/* ------------------------------------------------------------------ *
 * 2. Cursor
 *
 * A ring that trails the pointer and reacts to what is under it:
 * it swells over links and squares off over the work rows.
 * ------------------------------------------------------------------ */
function cursor() {
  if (reduced.matches || !fine.matches) return;

  const ring = document.createElement('div');
  ring.className = 'cur';
  ring.innerHTML = '<span class="cur__dot"></span><span class="cur__ring"></span>';
  document.body.appendChild(ring);

  let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, on = false;

  addEventListener('pointermove', (e) => {
    x = e.clientX; y = e.clientY;
    if (!on) { on = true; ring.classList.add('is-on'); rx = x; ry = y; }
  }, { passive: true });

  addEventListener('pointerdown', () => ring.classList.add('is-down'));
  addEventListener('pointerup', () => ring.classList.remove('is-down'));
  addEventListener('pointerleave', () => ring.classList.remove('is-on'));

  const HOT = 'a, button, [data-hot]';
  addEventListener('pointerover', (e) => {
    const t = (e.target as Element).closest?.(HOT);
    ring.classList.toggle('is-hot', !!t);
    ring.classList.toggle('is-wide', !!(e.target as Element).closest?.('.work, .plane'));
  }, { passive: true });

  (function tick() {
    rx += (x - rx) * 0.18;
    ry += (y - ry) * 0.18;
    ring.style.setProperty('--x', rx + 'px');
    ring.style.setProperty('--y', ry + 'px');
    ring.style.setProperty('--dx', x + 'px');
    ring.style.setProperty('--dy', y + 'px');
    raf(tick);
  })();
}

/* ------------------------------------------------------------------ *
 * 3. Decoding labels
 *
 * Section labels resolve out of noise the first time they are reached.
 * On a page about reading telemetry correctly, text that resolves into
 * legibility is the right kind of ornament — it is the only effect here
 * that is pure style, and it lasts under a second.
 * ------------------------------------------------------------------ */
function decode() {
  if (reduced.matches) return;
  const GLYPHS = '▚▞░▒▓█/\\<>[]{}|=+*—·01';
  const labels = document.querySelectorAll<HTMLElement>('.kicker');

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      const el = e.target as HTMLElement;
      const final = el.textContent ?? '';
      const start = performance.now();
      const DUR = 520;
      const run = (now: number) => {
        const t = Math.min(1, (now - start) / DUR);
        const shown = Math.floor(final.length * t * 1.35);
        let out = '';
        for (let i = 0; i < final.length; i++) {
          out += i < shown || final[i] === ' '
            ? final[i]
            : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        el.textContent = out;
        if (t < 1) raf(run); else el.textContent = final;
      };
      raf(run);
    }
  }, { threshold: 0.9 });

  labels.forEach((l) => io.observe(l));
}

/* ------------------------------------------------------------------ *
 * 4. Tilt
 *
 * Work rows and plane rows lean toward the pointer. Small angles only —
 * enough to feel like a surface, not enough to become a gimmick.
 * ------------------------------------------------------------------ */
function tilt() {
  if (reduced.matches || !fine.matches) return;
  for (const el of document.querySelectorAll<HTMLElement>('.work, .plane')) {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      // Clamped: a pointer event can carry coordinates outside the element's
      // box (synthetic events, capture, a drag leaving the row), and unclamped
      // this produced rotations in the hundreds of degrees rather than three.
      const cl = (v: number) => Math.max(-0.5, Math.min(0.5, v));
      const px = cl((e.clientX - r.left) / r.width - 0.5);
      const py = cl((e.clientY - r.top) / r.height - 0.5);
      el.style.setProperty('--rx', (-py * 3.2).toFixed(2) + 'deg');
      el.style.setProperty('--ry', (px * 4.5).toFixed(2) + 'deg');
      el.style.setProperty('--mx', (px * 14).toFixed(1) + 'px');
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--mx', '0px');
    });
  }
}

/* ------------------------------------------------------------------ *
 * 5. Scroll rail
 *
 * A hairline down the right edge marking the acts, with the passed
 * portion filled. It doubles as a read on how far the incident has run.
 * ------------------------------------------------------------------ */
function rail() {
  const acts = [...document.querySelectorAll<HTMLElement>('.act')];
  if (acts.length < 3) return;

  const rail = document.createElement('nav');
  rail.className = 'rail';
  rail.setAttribute('aria-label', 'Sections');
  rail.innerHTML = acts.map((_, i) => `<button class="rail__t" data-i="${i}"></button>`).join('')
    + '<span class="rail__fill"></span>';
  document.body.appendChild(rail);

  const ticks = [...rail.querySelectorAll<HTMLElement>('.rail__t')];
  const fill = rail.querySelector<HTMLElement>('.rail__fill')!;

  ticks.forEach((t, i) => t.addEventListener('click', () => {
    acts[i].scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth', block: 'start' });
  }));

  let queued = false;
  const update = () => {
    queued = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    fill.style.transform = `scaleY(${max > 0 ? scrollY / max : 0})`;
    const mid = scrollY + innerHeight * 0.4;
    let active = 0;
    acts.forEach((a, i) => { if (a.offsetTop <= mid) active = i; });
    ticks.forEach((t, i) => t.classList.toggle('is-on', i === active));
  };
  addEventListener('scroll', () => { if (!queued) { queued = true; raf(update); } }, { passive: true });
  update();
}

smoothScroll();
cursor();
decode();
tilt();
rail();
