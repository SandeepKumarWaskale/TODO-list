const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a task
function addTask() {
    const taskValue = inputBox.value.trim();
    if (taskValue === '') {
        alert("You must write something");
        return;
    }

    const li = document.createElement("li");
    li.textContent = taskValue;

    const span = document.createElement("span");
    span.textContent = "\u00d7";
    span.classList.add("delete-btn");

    li.appendChild(span);
    listContainer.appendChild(li);

    inputBox.value = "";
    saveData();
}

// Event delegation for handling click events on the list
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Function to save data to localStorage
function saveData() {
    const tasks = [];
    listContainer.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.textContent.slice(0, -1), // Get task text without delete button
            checked: li.classList.contains("checked")
        });
    });
    localStorage.setItem("data", JSON.stringify(tasks));
}

// Function to show tasks from localStorage
function showTask() {
    const data = JSON.parse(localStorage.getItem("data")) || [];
    data.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.checked) {
            li.classList.add("checked");
        }

        const span = document.createElement("span");
        span.textContent = "\u00d7";
        span.classList.add("delete-btn");

        li.appendChild(span);
        listContainer.appendChild(li);
    });
}

// Initialize tasks on page load
showTask();

// Add event listener for Enter key to add a task
inputBox.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault(); // Prevent form submission if inside a form
        addTask();
    }
});
