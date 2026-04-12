import { projects } from "../data/projectData.js";

const wrapper = document.getElementById("cardWrapper");
const indicatorBar = document.getElementById("indicatorBar");

let index = 0;
let isAnimating = false;

export function initProjects(){
    render();
    renderIndicators();
    attachEvents();
}

/* RENDER CARD */
function render(){

    const p = projects[index];

    wrapper.innerHTML = `
        <article class="project-card">

            <div class="project-card__image">
                <img src="${p.image}" alt="${p.title}">
            </div>

            <div class="project-card__overlay">
                <div class="project-card__content">

                    <h2 class="project-card__title">${p.title}</h2>
                    <h3 class="project-card__subtitle">${p.subtitle}</h3>

                    <div class="project-card__meta">
                        <span>${p.year}</span>
                    </div>

                    <span class="project-card__tag">${p.tag}</span>

                    <div class="project-card__details">
                        <ul class="project-card__list">
                            ${p.description.map(d => `<li>${d}</li>`).join("")}
                        </ul>

                        ${p.link ? `
                            <a class="project-card__button" href="${p.link}" target="_blank">
                                View Project
                            </a>
                        ` : ""}
                    </div>

                </div>
            </div>

        </article>
    `;

    updateIndicators();
}

/* INDICATORS */
function renderIndicators(){
    indicatorBar.innerHTML = projects.map((_, i) => `
        <div class="project-indicator ${i === 0 ? "active" : ""}"></div>
    `).join("");
}

function updateIndicators(){
    document.querySelectorAll(".project-indicator")
        .forEach((el, i) => {
            el.classList.toggle("active", i === index);
        });
}

/* EVENTS */
function attachEvents(){

    renderIndicators();

    document.getElementById("nextBtn").onclick = () => {
        if(isAnimating) return;
        isAnimating = true;

        index = (index + 1) % projects.length;
        render();

        setTimeout(()=> isAnimating = false, 300);
    };

    document.getElementById("prevBtn").onclick = () => {
        if(isAnimating) return;
        isAnimating = true;

        index = (index - 1 + projects.length) % projects.length;
        render();

        setTimeout(()=> isAnimating = false, 300);
    };
}