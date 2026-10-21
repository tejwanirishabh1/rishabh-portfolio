
/* =========================================
   1. AUTOMATIC FOOTER YEAR
========================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================================
   2. MOBILE NAVIGATION MENU
========================================= */

const menuButton = document.getElementById("menu-toggle");
const navigation = document.getElementById("main-navigation");

if (menuButton && navigation) {

    // Open or close the menu when the button is clicked
    menuButton.addEventListener("click", function () {

        const isOpen = navigation.classList.toggle("menu-open");

        // Update accessibility information
        menuButton.setAttribute("aria-expanded", String(isOpen));

        // Change the button label
        menuButton.textContent = isOpen ? "Close Menu" : "Menu";
    });

    // Close the menu after selecting a navigation link
    const navigationLinks = navigation.querySelectorAll("a");

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navigation.classList.remove("menu-open");

            menuButton.setAttribute("aria-expanded", "false");

            menuButton.textContent = "Menu";
        });
    });
}


/* =========================================
   3. ACTIVE SECTION HIGHLIGHTING
========================================= */

const pageSections = document.querySelectorAll("main section[id]");
const pageLinks = document.querySelectorAll("#main-navigation a");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const currentId = entry.target.id;

                    pageLinks.forEach(function (link) {

                        const isActive =
                            link.getAttribute("href") === "#" + currentId;

                        if (isActive) {

                            link.setAttribute("aria-current", "location");

                        } else {

                            link.removeAttribute("aria-current");
                        }
                    });
                }
            });
        },

        {
            rootMargin: "-20% 0px -65% 0px"
        }
    );

    // Watch each section as it enters the viewing area
    pageSections.forEach(function (section) {
        sectionObserver.observe(section);
    });
}
