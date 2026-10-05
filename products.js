let allProjects = [];

fetch("data/products.json")

.then(res => res.json())

.then(data => {

    allProjects = data;

    renderProjects(data);

});


function renderProjects(projects){

    const grid =
        document.getElementById(
            "project-grid"
        );

    grid.innerHTML = "";

    projects.forEach(project => {

        grid.innerHTML += `

        <article
            class="story-card ${project.region}">

            <img src="${project.image}">

            <div class="story-content">

                <span
                    class="story-tag ${project.region}">

                    ${project.tag}

                </span>

                <h3>

                    ${project.title}

                </h3>

                <p>

                    ${project.description}

                </p>

                <div class="badge-row">

                </div>

            </div>

        </article>

        `;

    });

}


function filterProjects(){

    const style =
        document.getElementById(
            "styleFilter"
        ).value;

    const type =
        document.getElementById(
            "typeFilter"
        ).value;

    const detail =
        document.getElementById(
            "detailFilter"
        ).value;

    const interior =
        document.getElementById(
            "interiorFilter"
        ).value;


    const filtered =
        allProjects.filter(project => {

            if (
                style !== "all" &&
                project.style !== style
            )
                return false;

            if (
                type !== "all" &&
                project.type !== type
            )
                return false;

            if (
                detail !== "all" &&
                project.detail !== detail
            )
                return false;

            if (
                interior !== "all" &&
                project.interior !== interior
            )
                return false;

            return true;
        });

    renderProjects(filtered);

}


document
.querySelectorAll("select,input")

.forEach(el => {

    el.addEventListener(
        "change",
        filterProjects
    );

});
