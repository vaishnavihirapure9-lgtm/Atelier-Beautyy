/* =========================================================
   ATELIER BEAUTY
   Main JavaScript
========================================================= */


/* =========================================================
   1. NAVBAR — SCROLL EFFECT
========================================================= */

const navbar = document.getElementById("mainNav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =========================================================
   2. CLOSE MOBILE NAVIGATION AFTER CLICK
========================================================= */

const navLinks = document.querySelectorAll(".nav-link");
const navbarMenu = document.getElementById("navbarMenu");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (
            window.innerWidth < 992 &&
            navbarMenu.classList.contains("show")
        ) {

            const bsCollapse =
                bootstrap.Collapse.getInstance(navbarMenu);

            if (bsCollapse) {
                bsCollapse.hide();
            }

        }

    });

});


/* =========================================================
   3. SMOOTH SCROLLING
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (
            targetId === "#" ||
            targetId.length === 0
        ) {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        const navbarHeight = navbar.offsetHeight;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* =========================================================
   4. SCROLL REVEAL ANIMATION
========================================================= */

const revealElements = document.querySelectorAll(
    ".section-padding, .service-card, .artist-card, .journal-card, .testimonial-card"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================================
   5. STAGGERED SERVICE CARD ANIMATION
========================================================= */

const serviceCards =
    document.querySelectorAll(".service-card");

serviceCards.forEach((card, index) => {

    card.style.transitionDelay =
        `${index * 0.08}s`;

});


/* =========================================================
   6. BEFORE / AFTER SLIDER
========================================================= */

const beforeAfter =
    document.querySelector(".before-after");

const afterImage =
    document.querySelector(".after-image");

const sliderLine =
    document.querySelector(".slider-line");

const sliderHandle =
    document.querySelector(".slider-handle");


if (
    beforeAfter &&
    afterImage &&
    sliderLine &&
    sliderHandle
) {

    let isDragging = false;


    function updateSlider(clientX) {

        const rect =
            beforeAfter.getBoundingClientRect();

        let position =
            ((clientX - rect.left) / rect.width) * 100;


        position = Math.max(
            0,
            Math.min(100, position)
        );


        afterImage.style.width =
            `${position}%`;

        sliderLine.style.left =
            `${position}%`;

        sliderHandle.style.left =
            `${position}%`;

    }


    beforeAfter.addEventListener(
        "pointerdown",
        event => {

            isDragging = true;

            beforeAfter.setPointerCapture(
                event.pointerId
            );

            updateSlider(event.clientX);

        }
    );


    beforeAfter.addEventListener(
        "pointermove",
        event => {

            if (!isDragging) {
                return;
            }

            updateSlider(event.clientX);

        }
    );


    beforeAfter.addEventListener(
        "pointerup",
        () => {

            isDragging = false;

        }
    );


    beforeAfter.addEventListener(
        "pointercancel",
        () => {

            isDragging = false;

        }
    );

}


/* =========================================================
   7. IMAGE LOAD FADE-IN
========================================================= */

const images =
    document.querySelectorAll("img");

images.forEach(image => {

    if (image.complete) {
        image.classList.add("loaded");
    } else {

        image.addEventListener(
            "load",
            () => {
                image.classList.add("loaded");
            }
        );

    }

});


/* =========================================================
   8. HERO PARALLAX EFFECT
========================================================= */

const heroImage =
    document.querySelector(".hero-image");


window.addEventListener("scroll", () => {

    if (!heroImage) {
        return;
    }

    const scrollPosition =
        window.scrollY;

    if (scrollPosition < window.innerHeight) {

        heroImage.style.backgroundPosition =
            `center ${scrollPosition * 0.25}px`;

    }

});


/* =========================================================
   9. ACTIVE NAVIGATION LINK
========================================================= */

const sections =
    document.querySelectorAll("section[id]");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (
            href === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================================================
   10. BUTTON HOVER MICRO-INTERACTION
========================================================= */

const buttons =
    document.querySelectorAll(
        ".btn-main, .btn-light, .nav-appointment"
    );


buttons.forEach(button => {

    button.addEventListener(
        "mouseenter",
        () => {

            button.style.transform =
                "translateY(-2px)";

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform =
                "translateY(0)";

        }
    );

});


/* =========================================================
   11. JOURNAL LINKS
========================================================= */

document.querySelectorAll(".journal-info a").forEach(link => {

    link.addEventListener("click", event => {

        const href =
            link.getAttribute("href");

        if (href === "#") {

            event.preventDefault();

            alert(
                "This journal section is part of the Atelier Beauty concept."
            );

        }

    });

});


/* =========================================================
   12. DISABLE PLACEHOLDER LINKS
========================================================= */

document.querySelectorAll('a[href="#"]').forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

    });

});


/* =========================================================
   13. REDUCED MOTION SUPPORT
========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (prefersReducedMotion.matches) {

    document.documentElement.style.scrollBehavior =
        "auto";

}


/* =========================================================
   14. PAGE READY
========================================================= */

window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

});