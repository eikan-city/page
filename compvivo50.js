document
.querySelectorAll(".expand-btn")
.forEach(button => {

    button.addEventListener("click", () => {

        const detail =
            button.parentElement.nextElementSibling;

        detail.classList.toggle("open");

        if(detail.classList.contains("open")) {

            button.innerText = "收起详情";

        } else {

            button.innerText = "查看作品详情";

        }

    });

});
