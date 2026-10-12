const mainApp = document.getElementById('main-app');
const addUserButton = document.getElementById('add-usr');

let users = [];


const modalAddUser = document.getElementById('modal-add-user');
const addUserCencelBtn = document.getElementById('cencel-btn');
const addUserSaveBtn = document.getElementById('save-btn');

addUserButton.addEventListener('click', () => {
    modalAddUser.showModal();
    
})

addUserCencelBtn.addEventListener('click', () => {
    modalAddUser.close();
})