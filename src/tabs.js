document.addEventListener("DOMContentLoaded", () => {
  const tabsList = document.querySelector(".tabs > ul");
  const tabs = document.querySelectorAll(".tabs > ul > li");
  const tabContents = document.querySelectorAll(".tab-content");

  tabsList.addEventListener("click", (event) => {
    if (event.target.tagName !== "A") {
      event.stopPropagation();
      return;
    }

    tabs.forEach((item) => item.classList.remove("is-active"));
    tabContents.forEach((content) => content.classList.remove("is-active"));

    const currentTab = event.target.parentNode;
    const currentTabContentId = currentTab.getAttribute("data-tab");

    currentTab.classList.add("is-active");
    document.getElementById(currentTabContentId).classList.add("is-active");
  });
});
