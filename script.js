// Server status
fetch("https://api.mcsrvstat.us/2/mc.gnwork.cn:59903")
  .then(r => r.json())
  .then(data => {
    document.getElementById("status").innerText =
      data.online ? "在线" : "下线";
  });

// Scroll animations
function activateOnScroll() {
  const elements = document.querySelectorAll(
    '.reveal, .fade-section, .fly-left, .fly-right, .fly-up, .fly-down'
  );

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.2;

    if (rect.top < triggerPoint) {
      el.classList.add('active');

      if (el.dataset.flyaway === "true") {
        setTimeout(() => {
          el.classList.add('fly-away');
        }, el.dataset.delay || 2000);
      }
    }
  });
}
section {
  border: 1px solid red;
}

window.addEventListener('scroll', activateOnScroll);
window.addEventListener('load', activateOnScroll);

// Parallax effect
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.parallax');
  if (!hero) return;

  const offset = window.scrollY * 0.2;
  hero.style.backgroundPositionY = `${offset}px`;
});

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let index = 1; // start with second slide as center

function updateCarousel() {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  const slideWidth = slides[0].getBoundingClientRect().width;
  const offset = -(index - 1) * slideWidth;
  track.style.transform = `translateX(${offset}px)`;
}

next.addEventListener('click', () => {
  index = (index + 1) % slides.length;
  updateCarousel();
});

prev.addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
});

// Initialize
updateCarousel();
