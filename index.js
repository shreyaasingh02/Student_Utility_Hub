document.addEventListener("DOMContentLoaded", () => {

    // NAVIGATION BAR ACTIVE---------------------------------------------
    const nav = document.querySelectorAll(".navigation-bar");
    const currentPage = window.location.pathname.split("/").pop();

    nav.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
    });


    // DASHBOARD TODOS 5 LIST DISPLAY-------------------------------------
    function renderDashboard(fiveTask) {
        const container = document.querySelector(".dashboard-tasklist");
        container.innerHTML = "";

        if(fiveTask.length == 0) {
            container.innerHTML = `<p>No Tasks for Now</p>`;
            return;
        }

        fiveTask.forEach(task => {
            const div = document.createElement("div");
            div.className = "dashboard-task";

            div.innerHTML = `
            <input type="checkbox" class="dash-checkbox" ${task.completed ? 'checked' : ''}/>
            <span class="task-text">${task.text}</span>
            <span class="task-time"> <b> ${task.sttime} - ${task.edtime}</b></span> `;

            container.appendChild(div);
        })
    }

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const fiveTask = tasks.slice(2).reverse();
    renderDashboard(fiveTask);



});