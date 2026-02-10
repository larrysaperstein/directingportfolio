const images = document.querySelectorAll('.lightbox-gallery img');
let currentIndex = 0;

// Preload all full-size images
images.forEach(img => {
  const fullSrc = img.dataset.full || img.src;
  const preload = new Image();
  preload.src = fullSrc;
});

images.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';

    const fullImg = document.createElement('img');
    fullImg.src = img.dataset.full || img.src;
    fullImg.style.opacity = 0;

    const leftArrow = document.createElement('div');
    leftArrow.className = 'lightbox-arrow left';
    leftArrow.innerHTML = '‹';

    const rightArrow = document.createElement('div');
    rightArrow.className = 'lightbox-arrow right';
    rightArrow.innerHTML = '›';

    function showImage(i) {
      currentIndex = i;
      const target = images[i];
      fullImg.style.opacity = 0;
      fullImg.style.opacity = 0;

setTimeout(() => {
  fullImg.src = target.dataset.full || target.src;
  fullImg.onload = () => {
    fullImg.style.opacity = 1;
  };
}, 100);
      fullImg.onload = () => {
        fullImg.style.opacity = 1;
      };
    }

    function handleKey(e) {
      if (e.key === 'ArrowRight') showImage((currentIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') showImage((currentIndex - 1 + images.length) % images.length);
      if (e.key === 'Escape') closeLightbox();
    }

    function closeLightbox() {
      document.removeEventListener('keydown', handleKey);
      lightbox.remove();
    }

    leftArrow.onclick = (e) => { e.stopPropagation(); showImage((currentIndex - 1 + images.length) % images.length); };
    rightArrow.onclick = (e) => { e.stopPropagation(); showImage((currentIndex + 1) % images.length); };

    // Swipe support
    let touchStartX = 0, touchEndX = 0;
    lightbox.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
    lightbox.addEventListener('touchend', e => { touchEndX = e.changedTouches[0].screenX; handleSwipe(); });
    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      if (swipeDistance > 50) showImage((currentIndex - 1 + images.length) % images.length);
      if (swipeDistance < -50) showImage((currentIndex + 1) % images.length);
    }

    lightbox.append(fullImg, leftArrow, rightArrow);
    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', handleKey);

    // Fade in the first image immediately
    fullImg.onload = () => { fullImg.style.opacity = 1; };
  });
});

// Select all internal links
const links = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');

links.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');

    // Ignore links with target="_blank" or hash links
    if (this.target === '_blank' || href.startsWith('#')) return;

    e.preventDefault();           // stop default navigation
    document.body.classList.add('fade-out'); // start fade

    // Wait for the fade to finish, then navigate
    setTimeout(() => {
      window.location.href = href;
    }, 500); // match CSS transition duration
  });
});

// Optional: fade in on page load
window.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = 0;       // start invisible
  setTimeout(() => {
    document.body.style.opacity = 1;     // fade in
  }, 50);
});

// Hamburger Mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
