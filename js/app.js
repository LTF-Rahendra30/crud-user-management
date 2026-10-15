import { createUser,getUsers,deleteUser } from "./usersService.js";


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
    const role = formData.get("role");
    const status = formData.get("status");
    
    const user = createUser(name,email,role,status);

    console.log(getUsers());
    
    

    addUserForm.reset();
    modalAddUser.close();
    renderMainPage();
})

// ========= EVENT DELEGATION FOR DELETE USER IN USER CARD =========

const modalDelUser = document.getElementById('modal-del-user');
const cencelDelUserBtn = document.getElementById('cencel-del-button');
const deleteUserButtonYes = document.getElementById('dialog-del-btn');

cencelDelUserBtn.addEventListener('click',() =>{
    modalDelUser.close();
});

let userIdThatDeleted = null;
userList.addEventListener('click', (event) => {
    const deleteButton = event.target.closest('.delete-btn');
    
    if(!deleteButton) return;
    
    const liUser = event.target.closest('li');
    if(!liUser) return;
    // ----- DELETE USER FORM ARRAY ----
    
    userIdThatDeleted = Number(liUser.dataset.userId);
    
    modalDelUser.showModal();
    
})
// ------ LISTENER TO HENDLE YES COMIRM FOR DELETE USER -------
const users = getUsers();
console.log(users);
deleteUserButtonYes.addEventListener('click', () => {
    if(userIdThatDeleted === null) return;

    deleteUser(userIdThatDeleted);
    userIdThatDeleted = null;

    modalDelUser.close();
    renderMainPage();
    const users = getUsers();
    console.log(users);
    
})

// ============= RENDER USER ============
function renderUser(){
    const users = getUsers();
    userList.innerHTML = users.map(user => `
        <li class="user-card" data-user-id="${user.id}">
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
                        <span class="role">${user.role}</span>
                        <span class="status">${user.status}</span>
                    </div>
                </div>
            </div>
            <div class="user-del-edit">
                <button class="edit-btn" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                </button>
                <button class="delete-btn" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                    </svg>
                </button>
            </div>
        </li>
    `).join("");
}
function renderMainPage(){
    renderUser();
}
renderMainPage();