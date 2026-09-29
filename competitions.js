document.querySelectorAll(".expand-btn").forEach(btn => {

  btn.addEventListener("click", () => {

    const content = btn.nextElementSibling;

    content.classList.toggle("open");

    btn.textContent =
      content.classList.contains("open")
        ? "收起详情"
        : "查看详情";

  });

});
document.querySelectorAll(".info-btn").forEach(btn => {
 
btn.addEventListener("click", () => {
 
const url = btn.dataset.url;
 
window.open(url, "_blank");
 
});
 
});
