import { createUser,getUsers } from "./usersService.js";


const userList = document.getElementById('user-list');
const addUserButton = document.getElementById('add-usr');
const users = getUsers();


const modalAddUser = document.getElementById('modal-add-user');
const addUserCencelBtn = document.getElementById('cencel-btn');

addUserButton.addEventListener('click', () => {
    modalAddUser.showModal();
    
})

addUserCencelBtn.addEventListener('click', () => {
    modalAddUser.close();
})

// =========== HENDLE ADD USER ==========
const addUserForm = document.getElementById('add-usr-form');

addUserForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const formData = new FormData(addUserForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const role = formData.get("role")
    
    const user = createUser(name,email,role);

    console.log(getUsers());
    
    

    addUserForm.reset();
    modalAddUser.close();
    renderMainPage();
})


// ============= RENDER USER ============
function renderUser(){
    userList.innerHTML = users.map(user => `
        <li>
            <h4>${user.name}</h4>
            <p>${user.email}</p>
            <span>${user.role}</span>
        </li>
    `).join("");
}
function renderMainPage(){
    renderUser();
}
renderMainPage();