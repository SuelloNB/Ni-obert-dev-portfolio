import { initProjectsSlider } from "../js/pages/projects.js";
// import { initContactForm } from "./contact.js";
import { loadSkills } from "../js/pages/skill.js";

document.addEventListener("DOMContentLoaded", () => {
  loadSkills();
  initScrollAnimation();
});

function initScrollAnimation(){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".skill-card").forEach(card => {
    observer.observe(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
    initProjectsSlider();
    // initContactForm();
});