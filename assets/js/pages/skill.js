import { skillsData } from "../data/skillData.js";

export function loadSkills() {
  const container = document.querySelector(".skill-container");

  if (!container) return;

  container.innerHTML = skillsData.map((skill, index) => `
    <div class="skill-card reveal" style="transition-delay:${index * 0.1}s">
      <div class="skill-card-img">
        <img src="${skill.image}" alt="${skill.title}" loading="lazy">
      </div>

      <div class="skill-card-overlay">
        <div class="skill-card-content">
          <span class="skill-card-tag">${skill.tag}</span>
          <h2>${skill.title}</h2>
          <ul>
            ${skill.items.map(item => `<li>${item}</li>`).join("")}
          </ul>
        </div>
      </div>
    </div>
  `).join("");
}