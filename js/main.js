/* ══════════════════════════════════════════════════════
   PORTFOLIO — Votre Nom
   main.js — scripts partagés sur toutes les pages
   ══════════════════════════════════════════════════════ */

(function () {

    /* ── THEME ────────────────────────────────────────── */
    function getTheme() { return localStorage.getItem('kb-theme') || 'dark'; }
    function setTheme(t) {
        localStorage.setItem('kb-theme', t);
        document.documentElement.setAttribute('data-theme', t);
        const btn = document.getElementById('themeToggle');
        if (btn) btn.innerHTML = t === 'light'
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    }

    document.addEventListener('DOMContentLoaded', function () {
        /* Sync icon on load */
        setTheme(getTheme());

        const btn = document.getElementById('themeToggle');
        if (btn) {
            btn.addEventListener('click', function () {
                setTheme(getTheme() === 'dark' ? 'light' : 'dark');
            });
        }

        /* ── BURGER MENU ──────────────────────────────── */
        const burger   = document.getElementById('burger');
        const navLinks = document.querySelector('.nav-links');
        if (burger && navLinks) {
            burger.addEventListener('click', function () {
                const open = navLinks.style.display === 'flex';
                navLinks.style.display = open ? 'none' : 'flex';
                if (!open) {
                    Object.assign(navLinks.style, {
                        flexDirection: 'column',
                        position:      'absolute',
                        top:           '64px',
                        left:          '0',
                        right:         '0',
                        background:    getTheme() === 'light'
                            ? 'rgba(240,244,248,0.97)'
                            : 'rgba(8,12,16,0.97)',
                        padding:       '1rem 2rem',
                        borderBottom:  '1px solid var(--border2)'
                    });
                }
            });
        }

        /* ── HEADER BORDER ON SCROLL ──────────────────── */
        const header = document.getElementById('header');
        if (header) {
            window.addEventListener('scroll', function () {
                header.style.borderBottomColor = window.scrollY > 50
                    ? 'rgba(0,212,255,0.15)'
                    : 'rgba(255,255,255,0.06)';
            });
        }

        /* ── REVEAL ON SCROLL ─────────────────────────── */
        const reveals  = document.querySelectorAll('.reveal');
        if (reveals.length) {
            const revealObs = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry, i) {
                    if (entry.isIntersecting) {
                        setTimeout(function () {
                            entry.target.classList.add('visible');
                        }, i * 80);
                        revealObs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.08 });
            reveals.forEach(function (el) { revealObs.observe(el); });
        }

        /* ── ANIMATED COUNTERS ────────────────────────── */
        const counters = document.querySelectorAll('.stat-number[data-target]');
        if (counters.length) {
            const counterObs = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            counters.forEach(function (el) { counterObs.observe(el); });
        }

        function animateCounter(el) {
            const target   = parseInt(el.getAttribute('data-target'));
            const suffix   = el.getAttribute('data-suffix') || '';
            const duration = 1400;
            const steps    = 50;
            let   step     = 0;
            const timer = setInterval(function () {
                step++;
                const eased = Math.round(target * (1 - Math.pow(1 - step / steps, 3)));
                el.textContent = Math.min(eased, target) + suffix;
                if (step >= steps) {
                    el.textContent = target + suffix;
                    clearInterval(timer);
                }
            }, duration / steps);
        }

        /* ── SKILL BAR ANIMATION ──────────────────────── */
        const bars = document.querySelectorAll('.skill-bar-fill, .lang-bar-fill');
        if (bars.length) {
            const barObs = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.width = entry.target.style.getPropertyValue('--target-width') || '100%';
                        barObs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            bars.forEach(function (el) { barObs.observe(el); });
        }

    }); /* end DOMContentLoaded */


    /* ── CURSOR (dot + lagging ring) ──────────────────── */
    if (!window.matchMedia('(pointer: coarse)').matches) {
        const dot  = document.createElement('div'); dot.id  = 'c-dot';
        const ring = document.createElement('div'); ring.id = 'c-ring';
        document.body.appendChild(dot);
        document.body.appendChild(ring);

        let mx = -100, my = -100;
        let rx = -100, ry = -100;

        document.addEventListener('mousemove', function (e) {
            mx = e.clientX; my = e.clientY;
            dot.style.left = mx + 'px';
            dot.style.top  = my + 'px';
        });

        (function lerpRing() {
            rx += (mx - rx) * 0.10;
            ry += (my - ry) * 0.10;
            ring.style.left = rx + 'px';
            ring.style.top  = ry + 'px';
            requestAnimationFrame(lerpRing);
        })();

        const sel = 'a, button, input, textarea, select, [onclick], label';
        document.addEventListener('mouseover',  function (e) { if (e.target.closest(sel)) { ring.classList.add('on-hover');    dot.classList.add('on-hover'); } });
        document.addEventListener('mouseout',   function (e) { if (e.target.closest(sel)) { ring.classList.remove('on-hover'); dot.classList.remove('on-hover'); } });
        document.addEventListener('mousedown',  function ()  { ring.classList.remove('on-hover'); ring.classList.add('on-click');    dot.classList.add('on-click'); });
        document.addEventListener('mouseup',    function ()  { ring.classList.remove('on-click'); dot.classList.remove('on-click'); });
        document.addEventListener('mouseleave', function ()  { ring.classList.add('gone');    dot.classList.add('gone'); });
        document.addEventListener('mouseenter', function ()  { ring.classList.remove('gone'); dot.classList.remove('gone'); });
    }

})();
