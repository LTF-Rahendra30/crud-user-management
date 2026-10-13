import { createUser,getUsers } from "./usersService.js";


const userList = document.getElementById('user-list');
const addUserButton = document.getElementById('add-usr');


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
    const users = getUsers();
    userList.innerHTML = users.map(user => `
        <li class="user-card">
            <div class="user-information">
                <div class="user-profile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    </svg>
                </div>
                <div class="user-descrb">
                    <h4>${user.name}</h4>
                    <p>${user.email}</p>
                    <div class="user-status-role">
                        <span clas="role">${user.role}</span>
                        <span clas="status">${user.role}</span>
                    </div>
                </div>
            </div>
            <div class="user-del-edit">
                <button class="edit-btn" type="button">Edit</button>
                <button class="delete-btn" type="button">Delete</button>
            </div>
        </li>
    `).join("");
}
function renderMainPage(){
    renderUser();
}
renderMainPage();