const newTask = document.getElementById('newTask');
const tasks = document.getElementById('tasks');

let n = 0;

const addTask = () => {
    if (newTask.value != '') {
        tasks.innerHTML += `<div class="task"><input id="${n}" type="checkbox"><label for="${n}">${newTask.value}</label></div>`;
        newTask.value = '';
        n += 1;
    }
}