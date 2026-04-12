import { skillsData } from "../data/skillData.js";

export function loadSkills(){
  const container = document.querySelector(".skill-container");

  container.innerHTML = skillsData.map((skill, index) => `
    <div class="skill-card" style="transition-delay:${index * 0.1}s">
      
      <div class="skill-card-img">
        <img src="${skill.image}" alt="${skill.title}">
      </div>

      <div class="skill-card-overlay">
        <div class="skill-card-content">

          <div class="skill-card-title">
            <h2>${skill.title}</h2>
          </div>

          <span class="skill-card-tag">${skill.tag}</span>

          <div class="skill-card-details">
            <div class="skill-card-divider"></div>
            <ul class="skill-card-list">
              ${skill.items.map(item => `<li>${item}</li>`).join("")}
            </ul>
          </div>

        </div>
      </div>

    </div>
  `).join("");
}