export function initProjectsSlider() {
    const projectsSection = document.querySelector(".projects");

    if (!projectsSection) return;

    const track = projectsSection.querySelector(".projects__track");
    const viewport = projectsSection.querySelector(".projects__viewport");
    const slides = Array.from(projectsSection.querySelectorAll(".projects__slide"));
    const prevButton = projectsSection.querySelector(".projects__arrow--left");
    const nextButton = projectsSection.querySelector(".projects__arrow--right");
    const indicators = Array.from(projectsSection.querySelectorAll(".projects__indicator"));

    if (!track || !viewport || slides.length === 0 || !prevButton || !nextButton) return;

    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    firstClone.classList.add("is-clone");
    lastClone.classList.add("is-clone");

    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    const allSlides = Array.from(track.querySelectorAll(".projects__slide"));

    let currentIndex = 1;
    let isAnimating = false;

    function getSlideWidth() {
        return viewport.clientWidth;
    }

    function updateTrack(animate = true) {
        const slideWidth = getSlideWidth();
        track.style.transition = animate
            ? "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)"
            : "none";
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    function getRealIndex() {
        if (currentIndex === 0) return slides.length - 1;
        if (currentIndex === allSlides.length - 1) return 0;
        return currentIndex - 1;
    }

    function updateIndicators() {
        const realIndex = getRealIndex();

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle("is-active", index === realIndex);
        });
    }

    function moveToSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex = index;
        updateTrack(true);
        updateIndicators();
    }

    function handleNext() {
        moveToSlide(currentIndex + 1);
    }

    function handlePrev() {
        moveToSlide(currentIndex - 1);
    }

    nextButton.addEventListener("click", handleNext);
    prevButton.addEventListener("click", handlePrev);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            moveToSlide(index + 1);
        });
    });

    track.addEventListener("transitionend", () => {
        if (allSlides[currentIndex].classList.contains("is-clone")) {
            if (currentIndex === allSlides.length - 1) {
                currentIndex = 1;
            } else if (currentIndex === 0) {
                currentIndex = slides.length;
            }
            updateTrack(false);
        }

        updateIndicators();
        isAnimating = false;
    });

    window.addEventListener("resize", () => {
        updateTrack(false);
    });

    updateTrack(false);
    updateIndicators();
}