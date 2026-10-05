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
    const openSubjectModal = document.getElementById("openSubjectModal");
const closeSubjectModal = document.getElementById("closeSubjectModal");
const cancelSubject = document.getElementById("cancelSubject");

const subjectModal = document.getElementById("subjectModal");
const subjectForm = document.getElementById("subjectForm");

const subjectList = document.getElementById("subjectList");
const modalError = document.getElementById("modalError");

// Open modal
openSubjectModal.addEventListener("click", function () {
    subjectModal.classList.add("active");
});

// Close modal
closeSubjectModal.addEventListener("click", function () {
    subjectModal.classList.remove("active");
});

// Cancel
cancelSubject.addEventListener("click", function () {
    subjectModal.classList.remove("active");
    subjectForm.reset();
    modalError.textContent = "";
});

// Load subjects
let subjects = JSON.parse(localStorage.getItem("studentSubjects")) || [];

displaySubjects();

// Add subject
subjectForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("subjectName").value.trim();
    const code = document.getElementById("subjectCode").value.trim();
    const teacher = document.getElementById("teacherName").value.trim();

    const total = Number(
        document.getElementById("totalClassInput").value
    );

    const attended = Number(
        document.getElementById("attendedClassInput").value
    );

    // Validation
    if (attended > total) {
        modalError.textContent =
            "Attended classes cannot be greater than total classes.";
        return;
    }

    if (total <= 0) {
        modalError.textContent =
            "Total classes must be greater than 0.";
        return;
    }

    // Create subject
    const subject = {
        name: name,
        code: code,
        teacher: teacher,
        total: total,
        attended: attended
    };

    // Add subject
    subjects.push(subject);

    // Save
    localStorage.setItem(
        "studentSubjects",
        JSON.stringify(subjects)
    );

    // Show subjects
    displaySubjects();

    // Close modal
    subjectModal.classList.remove("active");

    // Clear form
    subjectForm.reset();
    modalError.textContent = "";
});


// Display subjects
function displaySubjects() {

    subjectList.innerHTML = "";

    subjects.forEach(function (subject, index) {

        const percentage =
            Math.round((subject.attended / subject.total) * 100);

        const subjectDiv = document.createElement("div");

        subjectDiv.className = "subject-item";

        subjectDiv.innerHTML = `
            <div>
                <h3>${subject.name}</h3>
                <p>Code: ${subject.code}</p>
                <p>Teacher: ${subject.teacher}</p>
                <p>
                    Attendance:
                    ${subject.attended}/${subject.total}
                    (${percentage}%)
                </p>
            </div>

            <button
                class="delete-btn"
                onclick="deleteSubject(${index})">
                Delete
            </button>
        `;

        subjectList.appendChild(subjectDiv);
    });
}


// Delete subject
function deleteSubject(index) {

    subjects.splice(index, 1);

    localStorage.setItem(
        "studentSubjects",
        JSON.stringify(subjects)
    );

    displaySubjects();
}

});