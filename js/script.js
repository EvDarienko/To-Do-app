const data = {
    login: document.querySelector('.login'),
    searchButton: document.querySelector('.search-login'),
    taskContainer: document.querySelector('.tasks-container'),
    allTasks: document.querySelector('.all-tasks'),
    addNewTask: document.querySelector('.set-task'),
    newTask: document.querySelector('.new-task'),
    newTaskContainer: document.querySelector('.add-task'),
}

let {login, searchButton, taskContainer, allTasks, addNewTask, newTask, newTaskContainer} = data;

searchButton.addEventListener('click', (e) => {

    allTasks.innerHTML = '';
    taskContainer.style.display = 'block';

    if (localStorage.hasOwnProperty(login.value)) {
        setTasks();
    } else {
        localStorage.setItem(login.value, '[]')
    }

    document.body.style.height = 'auto';

    isDone();

})

addNewTask.addEventListener('click', addTask)

function setTasks() {

    let values = JSON.parse(localStorage.getItem(login.value));

    for (let i = 0; i < values.length; i++) {
        let item = values[i];
        allTasks.innerHTML += `<div><li>${i + 1}.<span>${item.task}</span></li><button class='done'>Done</button></div>`;
    }

    setDoneButtons();

}

function setDoneButtons() {

    document.querySelectorAll('.done').forEach((item, index) => {

        item.addEventListener('click', removeTask);
        item.setAttribute('data-id', index);

    })
}

function removeTask(e) {
   
    let values = JSON.parse(localStorage.getItem(login.value));

    values[e.currentTarget.dataset.id].done = true;

    localStorage.setItem(login.value, JSON.stringify(values));

    if (values[e.currentTarget.dataset.id].done == true) {

        e.currentTarget.closest('div').querySelector('span').style.textDecoration = 'line-through';
        e.currentTarget.dataset.id = '';

    }

    e.currentTarget.style.display = 'none';
    e.currentTarget.removeEventListener('click', removeTask);


}

function addTask() {

   let values = JSON.parse(localStorage.getItem(login.value));

   values.push({task: newTask.value, done: false});

   localStorage.setItem(login.value, JSON.stringify(values));

   allTasks.innerHTML += `<div><li>${values.length}. <span>${newTask.value}</span></li><button class='done'>Done</button></div>`;

   setDoneButtons();

   newTask.value = '';

}

function isDone() {

    let values = JSON.parse(localStorage.getItem(login.value));

    for (let i = 0; i < allTasks.children.length; i++) {

        let item = allTasks.children[i].querySelector('.done');

        if (values[i].done == true) {
            item.style.display = 'none';
            allTasks.children[i].querySelector('span').style.textDecoration = 'line-through';
        }

    }

}






