const formAddTasks = document.querySelector("#form-add-taks");
const inputTask = document.querySelector("[data-input-task]");
const listTasks = document.querySelector(".list-tasks");

let myListaToTask = [];

formAddTasks.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputTask.value == "") {
    inputTask.style.border = "2px solid red";
    alert("Campo vazio, digite uma tarefa!");
    return;
  }
  inputTask.style.border = "";
  myListaToTask.push({
    task: inputTask.value,
    check: false,
  });

  AddTasks();

  inputTask.value = "";
});

function AddTasks() {
  let newTask = "";

  myListaToTask.forEach((item, index) => {
    newTask += `
            <li class="tasks ${item.check && "done"}">
                <img src="./IMG/checked.png" alt="checked" onclick="btnCheckTask(${index})"/>
                <p>${item.task}</p>
                <img src="./IMG/trash.png" alt="trash" onclick="btnRemoveTask(${index})"/>
            </li>
  `;
  });

  listTasks.innerHTML = newTask;

  localStorage.setItem("tasks", JSON.stringify(myListaToTask));
}

function btnCheckTask(index) {
  myListaToTask[index].check = !myListaToTask[index].check;

  AddTasks();
}

function btnRemoveTask(index) {
  myListaToTask.splice(index, 1);

  AddTasks();
}

function refreshTasksPage() {
  const tasksLocalStorage = localStorage.getItem("tasks");

  myListaToTask = JSON.parse(tasksLocalStorage);

  AddTasks();

  console.log(tasksLocalStorage);
}

refreshTasksPage();
