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


const panel =
      document.getElementById("quickPanel");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        panel.classList.add("hide");

    } else {

        panel.classList.remove("hide");

    }

});

fetch("data/competitions.json")

.then(res => res.json())

.then(data => {

    const container =
        document.getElementById(
            "competitionContainer"
        );

    const current =
        data.find(
            item => item.status === "ongoing"
        );

    container.innerHTML = `
        <div class="section accent">

            <div class="event-card">
                <div>
                    <span class="status ongoing">
                        进行中
                    </span>

                    <h3>
                        ${current.title}
                    </h3>
                </div>

                <a href="${current.link}" class="info-btn">
                    作品公示与投票
                </a>

            </div>

        </div>
    `;

});

fetch("data/projects.json")

.then(res => res.json())

.then(data => {

    const container =
        document.getElementById(
            "project-grid"
        );

    data.forEach(project => {

        container.innerHTML += `

            <article class="story-card">
                <img src="${project.image}">

                <div class="story-content">

                    <span class="story-tag ${project.region}">

                        ${project.tag}

                    </span>

                    <h3>

                        ${project.title}

                    </h3>

                    <p>

                        ${project.description}

                    </p>


                </div>

            </article>

        `;

    });

});
