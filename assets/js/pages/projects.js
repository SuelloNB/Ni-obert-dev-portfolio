import { projects } from "../data/projectData.js";

const wrapper = document.getElementById("cardWrapper");
const indicatorBar = document.getElementById("indicatorBar");

let index = 0;
let isAnimating = false;
let startX = 0;

export function initProjects() {
    render();
    renderIndicators();
    attachListeners();
}

function render() {
    const p = projects[index];
    const card = document.createElement('article');
    card.className = 'project-card';
    
    // Check if link exists, otherwise create a placeholder info tag
    const actionElement = p.link 
        ? `<a href="${p.link}" target="_blank" class="project-card__button">Launch Project</a>`
        : `<div class="project-card__status">Project Documentation Only</div>`;

    card.innerHTML = `
        <div class="project-card__header">
            <span class="project-card__badge">${p.tag}</span>
            <span class="project-card__date">${p.year || '2026'}</span>
        </div>
        
        <div class="project-card__image">
            <img src="${p.image}" alt="${p.title}" draggable="false">
        </div>

        <div class="project-card__info">
            <div class="project-card__content-box">
                <h2 class="project-card__title-main">${p.title}</h2>
                
                <ul class="project-card__list">
                    ${p.description.map(item => `<li>${item}</li>`).join('')}
                </ul>

                ${actionElement}
            </div>
        </div>
    `;

    // Mobile tap logic
    card.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') return;
        if (window.innerWidth <= 1024) {
            card.classList.toggle('is-active');
        }
    });

    wrapper.innerHTML = "";
    wrapper.appendChild(card);
    updateIndicators();
}
function navigate(dir) {
    if (isAnimating) return;
    isAnimating = true;

    // INFINITE LOOP
    if (dir === 'next') {
        index = (index + 1) % projects.length;
    } else {
        index = (index - 1 + projects.length) % projects.length;
    }

    render();
    setTimeout(() => isAnimating = false, 600);
}

function attachListeners() {
    document.getElementById("nextBtn").onclick = () => navigate('next');
    document.getElementById("prevBtn").onclick = () => navigate('prev');

    // GESTURES
    wrapper.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    wrapper.addEventListener('touchend', e => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            diff > 0 ? navigate('next') : navigate('prev');
        }
    }, { passive: true });
}

function renderIndicators() {
    indicatorBar.innerHTML = projects.map((_, i) => 
        `<div class="project-indicator ${i === index ? 'active' : ''}"></div>`
    ).join('');
}

function updateIndicators() {
    document.querySelectorAll(".project-indicator").forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}