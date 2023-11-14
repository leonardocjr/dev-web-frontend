function getStoredTasks() {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function populateTaskList() {
    const tasks = getStoredTasks();
    const itemLista = document.getElementById('itemLista');

    itemLista.innerHTML = '';

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.setAttribute('data-task-id', task.id);
        li.textContent = task.description;

        let span = document.createElement('span');
        span.className = 'close';
        span.appendChild(document.createTextNode('\u00D7'));
        li.appendChild(span);

        itemLista.appendChild(li);
    });
}

function addElemento() {
    const inputValue = document.getElementById('tarefa').value.trim();

    if (inputValue === '') {
        alert('Você precisa descrever a tarefa');
        return;
    }

    const task = {
        id: Date.now(),
        description: inputValue,
    };

    let tasks = getStoredTasks();
    tasks.push(task);
    saveTasksToLocalStorage(tasks);

    populateTaskList();
    document.getElementById('tarefa').value = '';
}

function closeAll() {
    let item = document.querySelectorAll('#itemLista li');
    item.forEach((div) => {
        const taskId = div.getAttribute('data-task-id');
        let tasks = getStoredTasks();
        tasks = tasks.filter(task => task.id != taskId);
        saveTasksToLocalStorage(tasks);

        div.remove();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const itemLista = document.getElementById('itemLista');

    itemLista.addEventListener('click', function (ev) {
        if (ev.target.className === 'close') {
            const li = ev.target.parentElement;
            const taskId = li.getAttribute('data-task-id');
            let tasks = getStoredTasks();
            tasks = tasks.filter(task => task.id !== parseInt(taskId));
            saveTasksToLocalStorage(tasks);

            li.remove();
        } else if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
        }
    });

    populateTaskList();
});