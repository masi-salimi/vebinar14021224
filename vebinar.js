const notesList = [
  {
    id: 1,
    title: "Coding JavaScript",
    createdAt: "2024-03-13T20:43:34.067Z",
    completed: false,
  },
  {
    id: 2,
    title: "Study physics",
    createdAt: "2024-02-13T20:43:34.067Z",
    completed: true,
  },
  {
    id: 3,
    title: "React.js intervew",
    createdAt: "2024-01-13T20:43:34.067Z",
    completed: true,
  },
  {
    id: 4,
    title: "Cooking",
    createdAt: "2024-04-13T20:43:34.067Z",
    completed: false,
  },
];

let filterNot = { title: "" };
let filterValue = "all";
let sortValue = "earliest";

//selecting:
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todolist");
const filteredTodos = document.querySelector(".filter-todos");
const sorttodos = document.querySelector(".sorttodos");

//event:
document.addEventListener("DOMContentLoaded", (e) => {
  sortValue = "earliest";
  filterValue = "all";
  filterNot = { title: "" };
  // sorttodos.options[0].text ="asc";
  // filteredTodos.options[0].text ="all";
  const nots = renderproducts(notesList, filterNot);
  let todos = queryData({
    sort: sortValue,
    filter: nots,
    status: filterValue,
  });
  createTodo(todos);
});

todoInput.addEventListener("input", (e) => {
  filterNot.title = e.target.value.trim();
  let todos = renderproducts(notesList, filterNot);
  createTodo(todos);
});

function renderproducts(_nots, _filters) {
  const filteredNots = _nots.filter((n) => {
    return n.title.toLowerCase().includes(_filters.title.toLowerCase());
  });
  return filteredNots;
}

filteredTodos.addEventListener("change", (e) => {
  filterValue = e.target.value;
  const nots = renderproducts(notesList, filterNot);
  const filteredNots = queryData({
    sort: sortValue,
    filter: nots,
    status: filterValue,
  });
  let todos = renderproducts(filteredNots, filterNot);
  createTodo(todos);
});

sorttodos.addEventListener("change", (e) => {
  sortValue = e.target.value;
  const nots = renderproducts(notesList, filterNot);
  const sortedNots = queryData({
    sort: sortValue,
    filter: nots,
    status: filterValue,
  });
  let todos = renderproducts(sortedNots, filterNot);
  createTodo(todos);
});
function queryData({ sort, filter, status }) {
  const filterd = filterTodos(filter, status);  
  const todos = sortTodos(filterd, sort);
  return todos;
}

function createTodo(todos) {
  let result = "";

  todos.forEach((todo) => {
    result += `<li class="todo">   
    <p class="todo__title">${todo.title}</p>    
    <p class="todo__title">${todo.completed}</p> 
      <span>${new Date(todo.createdAt).toLocaleDateString("fa-IR")}</span>
      </li>`;
  });
  todoList.innerHTML = result;
  // todoInput.value = "";
}

function sortTodos(_filter, _sort) {
  return [..._filter].sort((a, b) => {
    const dataA = new Date(a.createdAt).getTime();
    const dataB = new Date(b.createdAt).getTime();
    if (_sort === "earliest") return dataA - dataB;
    if (_sort === "latest") return dataB - dataA;
  });
}

function filterTodos(_filter, status) {
  switch (status) {
    case "all": {
      return _filter;
      break;
    }
    case "completed": {
      return _filter.filter((t) => t.completed);
      break;
    }
    case "uncompleted": {
      return _filter.filter((t) => !t.completed);
      break;
    }
    default: {
      return _filter;
      break;
    }
  }
}

