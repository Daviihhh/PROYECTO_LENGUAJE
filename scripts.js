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