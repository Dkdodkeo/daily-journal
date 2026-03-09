const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask"); 
const taskList = document.getElementById("taskList");
const themeToggle = document.getElementById("themeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.done) li.classList.add("done");

    // отметить выполненной
    li.addEventListener("click", () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    });

    // удалить по двойному клику
    li.addEventListener("dblclick", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, done: false });
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
});

renderTasks();