import { aboutData } from "../data/aboutData.js";

export function loadAbout() {
  loadSkills();
  loadMetrics();
}

// ================= SKILLS =================
function loadSkills() {
    const skillContainer = document.querySelector(".skill-list-container");
    if (!skillContainer) return; // Safety check
    skillContainer.innerHTML = "";

    aboutData.skills.forEach((skill) => {
        const skillItem = document.createElement("div");
        skillItem.classList.add("skill-item");

        skillItem.innerHTML = `
        <div class="skill-info">
            <span class="skill-list-name">${skill.name}</span>
        </div>
        <div class="progress-bar">
            <div class="progress-fill" data-value="${skill.percentage}" style="width: 0%;">
                <span class="skill-list-percentage">${skill.percentage}%</span>
            </div>
        </div>
        `;

        skillContainer.appendChild(skillItem);
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
