document.addEventListener("DOMContentLoaded", function () {


    /* =========================
       LOGIN
    ========================= */

    const loginForm =
        document.getElementById("loginForm");


    if (loginForm) {

        const message =
            document.getElementById("formMessage");


        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const email =
                    document
                    .getElementById("email")
                    .value
                    .trim();


                const password =
                    document
                    .getElementById("password")
                    .value;


                if (
                    !email ||
                    !email.includes("@")
                ) {

                    message.textContent =
                        "Please enter a valid student email.";

                    return;
                }


                if (password.length < 4) {

                    message.textContent =
                        "Password must contain at least 4 characters.";

                    return;
                }


                localStorage.setItem(
                    "studentLoggedIn",
                    "true"
                );


                window.location.href =
                    "dashboard.html";

            }
        );

    }



    /* =========================
       FORGOT PASSWORD
    ========================= */

    const forgotPassword =
        document.getElementById(
            "forgotPassword"
        );


    if (forgotPassword) {

        forgotPassword.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                alert(
                    "Password reset is a demo feature."
                );

            }
        );

    }



    /* =========================
       MOBILE SIDEBAR
    ========================= */

    const menuBtn =
        document.getElementById(
            "menuBtn"
        );


    const sidebar =
        document.getElementById(
            "sidebar"
        );


    const overlay =
        document.getElementById(
            "sidebarOverlay"
        );


    function closeSidebar() {

        if (sidebar) {

            sidebar.classList.remove(
                "open"
            );

        }


        if (overlay) {

            overlay.classList.remove(
                "open"
            );

        }

    }


    if (menuBtn) {

        menuBtn.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle(
                    "open"
                );

                overlay.classList.toggle(
                    "open"
                );

            }
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    document
        .querySelectorAll(".side-link")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                closeSidebar
            );

        });



    /* =========================
       DATE
    ========================= */

    const todayDate =
        document.getElementById(
            "todayDate"
        );


    if (todayDate) {

        const today =
            new Date();


        todayDate.textContent =
            today.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                }
            );

    }



    /* =========================
       LOGOUT
    ========================= */

    const logoutLink =
        document.getElementById(
            "logoutLink"
        );


    if (logoutLink) {

        logoutLink.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    "studentLoggedIn"
                );

            }
        );

    }

});