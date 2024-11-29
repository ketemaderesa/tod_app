document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todoInput");
  const addBtn = document.getElementById("addBtn");
  const todoList = document.getElementById("todoList");
  const allBtn = document.getElementById("allBtn");
  const activeBtn = document.getElementById("activeBtn");
  const completedBtn = document.getElementById("completedBtn");
  const clearCompletedBtn = document.getElementById("clearCompletedBtn");
  const taskCounter = document.getElementById("taskCounter");

  let tasks = [];

  // Function to render tasks
  function renderTasks(filter = "all") {
    todoList.innerHTML = "";

    const filteredTasks = tasks.filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    });

    filteredTasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.classList.toggle("completed", task.completed);

      const span = document.createElement("span");
      span.textContent = task.text;
      span.addEventListener("click", () => {
        task.completed = !task.completed;
        renderTasks(filter);
      });

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Delete";
      removeBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        renderTasks(filter);
      });

      li.appendChild(span);
      li.appendChild(removeBtn);
      todoList.appendChild(li);
    });

    updateTaskCounter();
  }

  // Update the task counter
  function updateTaskCounter() {
    const remainingTasks = tasks.filter((task) => !task.completed).length;
    taskCounter.textContent = `${remainingTasks} task${remainingTasks !== 1 ? "s" : ""} left`;
  }

  // Add task
  addBtn.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText) {
      tasks.push({ text: taskText, completed: false });
      todoInput.value = "";
      renderTasks();
    }
  });

  // Clear completed tasks
  clearCompletedBtn.addEventListener("click", () => {
    tasks = tasks.filter((task) => !task.completed);
    renderTasks();
  });

  // Filter buttons
  allBtn.addEventListener("click", () => renderTasks("all"));
  activeBtn.addEventListener("click", () => renderTasks("active"));
  completedBtn.addEventListener("click", () => renderTasks("completed"));

  // Initial render
  renderTasks();
});
