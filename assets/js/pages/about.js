import { aboutData } from "../data/aboutData.js";

export function loadAbout() {
  loadSkills();
  loadMetrics();
}

// ================= SKILLS =================
function loadSkills() {
  const skillContainer = document.querySelector(".skill-list-container");
  skillContainer.innerHTML = "";

  aboutData.skills.forEach((skill) => {
    const skillItem = document.createElement("div");
    skillItem.classList.add("skill-item");

    skillItem.innerHTML = `
    <div class="skill-info">
        <span class="skill-list-name">${skill.name}</span>
    </div>
    <div class="progress-bar">
        <div class="progress-fill">
            <span class="skill-list-percentage">${skill.percentage}%</span>
        </div>
    </div>
    `;

    skillContainer.appendChild(skillItem);

    // Animate after render
    const fill = skillItem.querySelector(".progress-fill");
    setTimeout(() => {
        fill.style.width = skill.percentage + "%";
      
        const percentLabel = skillItem.querySelector(".skill-list-percentage");
      
        // move label with the bar
        percentLabel.style.left = skill.percentage + "%";
      }, 100);
  });
  
}

// ================= METRICS =================
function loadMetrics() {
  const metricGrid = document.querySelector(".metric-grid");
  metricGrid.innerHTML = "";

  aboutData.metrics.forEach((metric) => {
    const metricCard = document.createElement("div");
    metricCard.classList.add("metric-card");

    metricCard.innerHTML = `
      <span class="metric-value">${metric.value}</span>
      <span class="metric-title">${metric.title}</span>
    `;

    metricGrid.appendChild(metricCard);
  });
}
