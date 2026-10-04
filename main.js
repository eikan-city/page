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
