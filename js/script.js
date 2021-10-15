let guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const todoList = document.getElementById("todo-list");
const addButton = document.getElementById("add-button");
const addInput = document.getElementById("add-input");
const todos = localStorage.getItem("todoList") !== null ? JSON.parse(localStorage.getItem("todoList")) : [];
for (let i = 0; i < todos.length; i++) {
    console.log(todos[i], i);
    const todoElement = createTodoElement(todos[i], i);
    todoList.innerHTML += todoElement;
}
addButton.addEventListener("click", addTodo);
addInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addTodo();
    }
});

function createTodoInnerHTML(todo) {
    const editButton = `<i class="bi bi-pen" style="font-size: 0.9rem; cursor: pointer;" onclick="editTodo('${todo.id}')"></i>`;
    const deleteButton = `<i class="bi bi-x" style="font-size: 1.5rem; vertical-align: middle; cursor: pointer;" onclick="deleteTodo('${todo.id}')"></i>`;
    const divIcons = `<div class="icon-container">${editButton} &nbsp&nbsp ${deleteButton}</div>`;
    return `${todo.content} ${divIcons}`;
}

function createTodoElement(todo, todoIndex) {
    const todoLiInnerHTML = createTodoInnerHTML(todo);
    return `<li class="li-el bg-li-${todoIndex % 2 === 0 ? 'light' : 'dark'}" id="${todo.id}">${todoLiInnerHTML}</li>`;
}

function addTodo() {
    const todoContent = addInput.value;
    if (todoContent === "") return;
    const todo = {
        id: guid(),
        content: todoContent
    }
    todos.push(todo);
    localStorage.setItem("todoList", JSON.stringify(todos));
    todoList.innerHTML += createTodoElement(todo, todos.length - 1);
    addInput.value = "";
}

function deleteTodo(id) {
    const indexToDelete = todos.findIndex(todo => id === todo.id);
    todos.splice(indexToDelete);
    localStorage.setItem("todoList", JSON.stringify(todos));
    const liElementToDelete = document.getElementById(id);
    liElementToDelete.remove();
}

function editTodo(id) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    const currentTodoContent = todos[todoIndex].content;
    const todoEditBox = `<input class="add-input" id="edit-input-${id}" value="${currentTodoContent}" />`;
    const todoDoneButton = `<div class="icon-container"><i class="bi bi-check-lg" onclick="editDone('${id}')"></i></div>`;
    const liElementToEdit = document.getElementById(id);
    liElementToEdit.innerHTML = todoEditBox + todoDoneButton;
}

function editDone(id) {
    const editedContent = document.getElementById(`edit-input-${id}`).value;
    if (editedContent === "") return;
    const todoIndex = todos.findIndex(todo => id === todo.id);
    todos[todoIndex].content = editedContent;
    localStorage.setItem("todoList", JSON.stringify(todos));
    const liElementToEdit = document.getElementById(id);
    liElementToEdit.innerHTML = createTodoInnerHTML(todos[todoIndex]);
}
