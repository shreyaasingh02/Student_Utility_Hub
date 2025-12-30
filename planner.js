document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelectorAll(".navigation-bar");
    const currentPage = window.location.pathname.split("/").pop();

    nav.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
    });

    const taskInput = document.getElementById('task-input');
    const startTime = document.getElementById('st-time');
    const endTime = document.getElementById('end-time');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const emptyImage = document.querySelector('.empty-image');
    const todosContainer = document.querySelector('.todos-container');
    const taskNo = document.querySelector('.task-no');
    const doneTask = document.querySelector('.done-task');


    
    const updateTaskCount = () => {
        taskNo.textContent = `${taskList.children.length}`;

    }

    const doneTaskCount = () => {
        const doneCount = document.querySelectorAll('#task-list .checkbox:checked').length;
        doneTask.textContent = `${doneCount}`;

    }
    
    const saveTask = () => {
        const tasks = [];

        document.querySelectorAll('#task-list li').forEach(li => {
            tasks.push({text: li.querySelector('.texttask').textContent, completed: li.querySelector('.checkbox').checked, sttime: li.dataset.sttime || "", edtime: li.dataset.edtime || ""});
        })

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    const loadTask = () => {
        const saved = JSON.parse(localStorage.getItem("tasks")) || [];
        saved.forEach(task => addTask(task.text, task.completed, task.sttime, task.edtime));
        updateProgress();
    }

    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
    }

    function updateProgress() {
        const total = document.querySelectorAll('#task-list li').length;
        const completed = document.querySelectorAll('#task-list .checkbox:checked').length;
        const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

        document.querySelector(".progress-fill").style.width = percent + "%";
        
    }

    function formateTime(time) {
        if(!time) return;
        let [hours, minutes] = time.split(":");
        hours = Number(hours);
        let period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return(`${hours}:${minutes} ${period}`);

    };


    const addTask = (text, completed = false, sttime="", edtime="") => {
        const taskText = text || taskInput.value.trim();
        const startingTime = sttime || startTime.value;
        const endingTime = edtime || endTime.value;
        if(!taskText) {
            return;
        }


        const li = document.createElement('li'); 
        li.dataset.sttime = startingTime;
        li.dataset.edtime = endingTime;
        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}/>
        <span class="texttask">${taskText}</span>
        <span class="timetaskSt">${formateTime(startingTime)}</span>
        <span class="timetaskEd">${formateTime(endingTime)}</span>
        <div class="task-buttons">
            <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
            <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
        
        
        li.addEventListener("click", () => {
            const head = li.querySelector('.texttask').textContent;
            const taskHead = document.querySelector('.task-name');
            taskHead.innerHTML = `<h1>${head}</h1>`;
            const sttimeHead = li.querySelector('.timetaskSt').innerText;
            const taskstart = document.querySelector('.time-sec');
            const edtimeHead = li.querySelector('.timetaskEd').innerText;
            taskstart.innerHTML = `<h1>${sttimeHead} - ${edtimeHead}</h1>`;
            
        })
    

        const checkbox = li.querySelector('.checkbox')
        const editBtn = li.querySelector('.edit-btn');

        if(completed) {
            li.classList.add('completed');
            editBtn.disabled = true;
            editBtn.style.opacity = '0.5';
            editBtn.style.pointerEvents = 'none';
        }

        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? '0.5' : '1';
            editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
            doneTaskCount();
            saveTask();
            updateProgress();
        })
        editBtn.addEventListener('click', () => {
            if(!checkbox.checked) {
                taskInput.value = li.querySelector('.texttask').textContent;
                startTime.value = li.dataset.sttime;
                endTime.value = li.dataset.edtime;
                li.remove();
                toggleEmptyState();
            }
        })

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            doneTaskCount();
            updateTaskCount();
            saveTask();
            toggleEmptyState();
            updateProgress();
        })

        taskList.appendChild(li);
        taskInput.value = '';
        startTime.value = '';
        endTime.value = '';
        toggleEmptyState();

        updateTaskCount();
        doneTaskCount();
        saveTask();
        updateProgress();
    };

    addTaskBtn.addEventListener('click', () =>  addTask()); 
    taskInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            addTask();
        }
    })

    

    loadTask();
})