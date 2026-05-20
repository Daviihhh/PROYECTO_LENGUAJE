 /* CLICKAR EN FOTOS IMPORTANTE */
    // Añade el clic a todas las fotos de la galería
    document.querySelectorAll('.foto-grande, .foto-media, .foto-pequeña').forEach(function(div) {  /* Esta linea busca todos los elementos con estas clases */
    div.style.cursor = 'pointer';
    div.addEventListener('click', function() { 
        var img = this.querySelector('img');
        if (img) {
        document.getElementById('lightbox-img').src = img.src; /* Esta linea toma la imagen dentro del div que se ha clicado y la pone en el lightbox */
        document.getElementById('lightbox').classList.add('activo'); /* Esta linea muestra el lightbox añadiendo la clase 'activo' que hace que el lightbox sea visible */
        }
    });
    });

    function cerrarLightbox() {
    document.getElementById('lightbox').classList.remove('activo'); /* Esta linea oculta el lightbox quitando la clase 'activo' */
    }
 
 /* Animación de pétalos de cerezo (opcional) */
  const simbolos = ['✿', '❀', '✾', '·', '°']; 
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'petalo';
    p.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (6 + Math.random() * 10) + 's';
    p.style.animationDelay = (Math.random() * 8) + 's';
    p.style.fontSize = (8 + Math.random() * 10) + 'px';
    document.body.appendChild(p);
  }


  /* Animación de bokeh (orbes de luz) (mega opcional) */
  (function () {
    const canvas = document.getElementById('bokeh-canvas');
    const ctx = canvas.getContext('2d');
 
    /* ── Configuración ───────────────────────────────────────────── */
    const CONFIG = {
      count:      45,      // Número de orbes
      minRadius:  18,      // Radio mínimo (px)
      maxRadius:  70,      // Radio máximo (px)
      minAlpha:   0.04,    // Opacidad mínima
      maxAlpha:   0.13,    // Opacidad máxima (sube para más presencia)
      speed:      0.18,    // Velocidad de movimiento (0 = estático)
      /* Paleta: tonos rosa-dorado para encajar con los cerezos */
      colors: [
        { h: 320, s: 60, l: 75 },   // Rosa sakura
        { h:  35, s: 70, l: 70 },   // Dorado cálido
        { h: 340, s: 50, l: 65 },   // Rosa oscuro
        { h:  20, s: 55, l: 60 },   // Ámbar
        { h: 300, s: 30, l: 70 },   // Lila suave
      ],
    };
    /* ─────────────────────────────────────────────────────────────── */
 
    let orbs = [];
 
    function rnd(a, b) { return a + Math.random() * (b - a); }
 
    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
 
    function spawn(forceY) {
      const c = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
      return {
        x:   rnd(0, canvas.width),
        y:   forceY !== undefined ? forceY : rnd(0, canvas.height),
        r:   rnd(CONFIG.minRadius, CONFIG.maxRadius),
        vx:  rnd(-CONFIG.speed, CONFIG.speed),
        vy:  rnd(-CONFIG.speed, CONFIG.speed),
        op:  rnd(CONFIG.minAlpha, CONFIG.maxAlpha),
        h: c.h, s: c.s, l: c.l,
      };
    }
 
    function init() {
      orbs = [];
      for (let i = 0; i < CONFIG.count; i++) orbs.push(spawn());
    }
 
    function draw() {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
 
      orbs.forEach(o => {
        /* Movimiento */
        o.x += o.vx;
        o.y += o.vy;
 
        /* Rebote suave en bordes */
        if (o.x < -o.r)  o.x = W + o.r;
        if (o.x > W + o.r) o.x = -o.r;
        if (o.y < -o.r)  o.y = H + o.r;
        if (o.y > H + o.r) o.y = -o.r;
 
        /* Degradado radial para el bokeh */
        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        grad.addColorStop(0,   `hsla(${o.h},${o.s}%,${o.l}%,${o.op})`);
        grad.addColorStop(0.5, `hsla(${o.h},${o.s}%,${o.l}%,${o.op * 0.4})`);
        grad.addColorStop(1,   `hsla(${o.h},${o.s}%,${o.l}%,0)`);
 
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      });
 
      requestAnimationFrame(draw);
    }
 
    resize();
    init();
    draw();
 
    window.addEventListener('resize', () => { resize(); init(); });
  })();