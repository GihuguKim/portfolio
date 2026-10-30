// 1. DOM Target References
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskCounter = document.getElementById("task-counter");

// 2. Add New Task Function
function addTask() {
  if (inputBox.value.trim() === '') {
    alert("Please write a task before clicking add!");
    return;
  }

  // Create new list element
  let li = document.createElement("li");
  li.innerHTML = inputBox.value;
  listContainer.appendChild(li);

  // Create delete cross icon (span)
  let span = document.createElement("span");
  span.innerHTML = "\u00d7"; // Unicode multiplication sign (×)
  li.appendChild(span);

  // Clear input box
  inputBox.value = "";
  
  saveData();
  updateCounter();
}

// 3. Enter Key Listener for Rapid Input
inputBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// 4. Event Delegation for Checking and Deleting
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
    updateCounter();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
    updateCounter();
  }
}, false);

// 5. Browser LocalStorage Persistence Engine
function saveData() {
  localStorage.setItem("gyannaTaskData", listContainer.innerHTML);
}

function showTask() {
  const savedData = localStorage.getItem("gyannaTaskData");
  if (savedData) {
    listContainer.innerHTML = savedData;
  }
  updateCounter();
}

// 6. Dynamic Task Counter Function
function updateCounter() {
  const totalTasks = listContainer.getElementsByTagName("li").length;
  const completedTasks = listContainer.getElementsByClassName("checked").length;
  const pendingTasks = totalTasks - completedTasks;

  if (taskCounter) {
    taskCounter.textContent = `Pending Tasks: ${pendingTasks} | Completed: ${completedTasks}`;
  }
}

// Initialize on page load!
showTask();