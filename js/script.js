document.addEventListener("DOMContentLoaded", function () {

    const taskInput = document.getElementById("taskInput");
    const dateInput = document.getElementById("dateInput");
    const addBtn = document.getElementById("addBtn");
    const taskTable = document.getElementById("taskTable");
    const deleteAllBtn = document.getElementById("deleteAllBtn");
    const filterBtn = document.getElementById("filterBtn");

    let tasks = [];
    let showCompletedOnly = false;

    addBtn.addEventListener("click", function () {

        const taskText = taskInput.value.trim();
        const taskDate = dateInput.value;

        if (taskText === "" || taskDate === "") {
            alert("Please fill in all fields!");
            return;
        }

        tasks.push({
            text: taskText,
            date: taskDate,
            completed: false
        });

        taskInput.value = "";
        dateInput.value = "";

        renderTasks();
    });

    deleteAllBtn.addEventListener("click", function () {
        tasks = [];
        renderTasks();
    });

    filterBtn.addEventListener("click", function () {
        showCompletedOnly = !showCompletedOnly;
        filterBtn.textContent = showCompletedOnly ? "Show All" : "Show Completed";
        renderTasks();
    });

    function renderTasks() {

        taskTable.innerHTML = "";

        let filteredTasks = showCompletedOnly
            ? tasks.filter(task => task.completed)
            : tasks;

        if (filteredTasks.length === 0) {
            taskTable.innerHTML = `
                <tr>
                    <td colspan="4" class="empty">No task found</td>
                </tr>
            `;
            return;
        }

        filteredTasks.forEach(function (task, index) {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td class="${task.completed ? 'completed' : ''}">
                    ${task.text}
                </td>
                <td>${task.date}</td>
                <td>${task.completed ? "Completed" : "Pending"}</td>
                <td>
                    <button class="completeBtn">✓</button>
                    <button class="deleteBtn">🗑</button>
                </td>
            `;

            // toggle
            row.querySelector(".completeBtn").addEventListener("click", function () {
                tasks[index].completed = !tasks[index].completed;
                renderTasks();
            });

            // delete
            row.querySelector(".deleteBtn").addEventListener("click", function () {
                tasks.splice(index, 1);
                renderTasks();
            });

            taskTable.appendChild(row);
        });
    }

});
