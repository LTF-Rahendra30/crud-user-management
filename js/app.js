
import { createUser,getUsers,deleteUser,editUser,filterUser,searchUser } from "./usersService.js";


const userList = document.getElementById('user-list');
const addUserButton = document.getElementById('add-usr');


const modalAddUser = document.getElementById('modal-add-user');
const addUserCencelBtn = document.getElementById('cencel-btn');

// ===== HENDLER DIALOG ADD USER ======
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





// ------ Listener to get li user target ---
const cencelEditUserBtn = document.getElementById('cencel-edit-usr-btn');
const filteredUsersList = document.getElementById('user-filtered-list');

let selectedUserId = null;
let liUser = null;

// ======== EVENTS DELEGATION WITH CALBACK FUNCTION =====
userList.addEventListener('click', handleUserListClick)
filteredUsersList.addEventListener('click',handleUserListClick);

function handleUserListClick(event){
    const editButton = event.target.closest('.edit-btn');
    console.log(editButton);
    const deleteButton = event.target.closest('.delete-btn');
    
    // Ignore click in card that dont Edit button or Delete button
    if(!editButton && !deleteButton) return;
    
    // li that click to get attribute user data id 
    liUser = event.target.closest('li');
    if(!liUser) return;
    
    selectedUserId = Number(liUser.dataset.userId);
    
    // ====== EDIT USER FORM AND FILED FROM USER DATA ======
    if(editButton){
        const selectedUser = getUsers().find(user => user.id === selectedUserId);
        
        if(!selectedUser) return;
        
        editUserForm.querySelector('[name="name"]').value = selectedUser.name;
        editUserForm.querySelector('[name="email"]').value = selectedUser.email;
        editUserForm.querySelector('[name="role"]').value = selectedUser.role;
        
        const statusInput = editUserForm.querySelector(
            `input[name="status"][value="${selectedUser.status}"]`
        )
        
        if (statusInput) statusInput.checked = true; 
            modalEditUser.showModal();
        } 
        
    else {
        modalDelUser.showModal();
    }
}




// ====== HENDLE EDIT USER =========
const editUserForm = document.getElementById('edit-usr-form');
const modalEditUser = document.getElementById('modal-edit-user');
// ======= LISTENER TO HENDLE YES COMIRM FOR EDIT USER =======
editUserForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const formData = new FormData(editUserForm);
    const idUser = selectedUserId;
    const newName = formData.get("name")
    const newEmail = formData.get("email")
    const newRole = formData.get("role")
    const newStatus = formData.get("status");
    
    editUser(idUser,newName,newEmail,newRole,newStatus);
    console.log(getUsers());
    
    modalEditUser.close();
    editUserForm.reset();
    renderMainPage();
    // --- FILTERED USER RENDER AGAIN IF EDIT USER FROM FILTERED USER ----
    filteredUserRender();
});


// ========= EVENT DELEGATION FOR SHOW DIALOG DELETE USER & EDIT USER =========

const modalDelUser = document.getElementById('modal-del-user');
const cencelDelUserBtn = document.getElementById('cencel-del-button');
const deleteUserButtonYes = document.getElementById('dialog-del-btn');

// --- Close dialog ---
cencelEditUserBtn.addEventListener('click', () => {
    modalEditUser.close();
});
// --- Close dialog ---
cencelDelUserBtn.addEventListener('click',() =>{
    modalDelUser.close();
});


// =========== FILTER USER ================
const filterBtn = document.getElementById('filter-btn')
const modalFilterUser = document.getElementById('modal-filter-user');
const closeFilterUser = document.getElementById('close-filter-user')
filterBtn.addEventListener('click' , () => {
    modalFilterUser.showModal();
});
closeFilterUser.addEventListener('click', () => {
    modalFilterUser.close();
})

// ====== FORM FOR FILTER USER DIALOG ====
const filterUsrForm = document.getElementById('filter-usr-form');
let filteredUser;
let filteredRole;
let filteredStatus;

// ------ LISTENER TO HENDLE YES COMIRM FOR DELETE USER -------
const users = getUsers();
console.log(users);
deleteUserButtonYes.addEventListener('click', () => {
    if(selectedUserId === null) return;
    
    deleteUser(selectedUserId);
    selectedUserId = null;
    
    filteredUser = filterUser(filteredRole,filteredStatus,getUsers());

    modalDelUser.close();
    renderMainPage();
    filteredUserRender();

    // Render with filtered again

    const users = getUsers();
    console.log(users);
    
});

// ========= FITERED USER FORM =============
filterUsrForm.addEventListener('submit' , (event) => {
    event.preventDefault();
    
    const formData = new FormData(filterUsrForm);
    filteredRole = formData.get("role");
    filteredStatus = formData.get("status");
    
    filteredUser = filterUser(filteredRole,filteredStatus,getUsers());
    
    filteredSection.style.display = 'block';
    console.log(filteredRole);
    console.log(filteredStatus);
    
    console.log(filteredUser);
    modalFilterUser.close();
    filterUsrForm.reset();
    filteredUserRender();

    
    
})
// ========= SEARCH USER =============
const searchForm = document.getElementById('search-form');

let searchUsr;
let usersSearched;
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(searchForm);
    searchUsr = formData.get("search-input");
    usersSearched = searchUser(searchUsr,getUsers());

    
    searchSection.style.display = 'block';
    if(usersSearched.length === 0) console.log("Not found");
    else {
        console.log(usersSearched);
        searchedUserRender();
        
    }
    
    
})


// ======= SEARCED USER RENDER =======
const searchSection = document.getElementById('search-user-container');
searchSection.style.display = 'none';
const searchInfoContent = document.getElementById('search-info');

function searchedUserRender(){
    searchInfoContent.innerHTML = `
    <p><span>${usersSearched.length}</span> Users found after filtering about <span>${searchUsr}</span></p>`
}

// ====== FILTERED USER RENDER ======
const filteredSection = document.getElementById('filtered-user');
filteredSection.style.display = 'none';
const filterSectionParagraph = document.getElementById('filter-usr-info');


function filteredUserRender(){
    const usersFiltered = filteredUser;
    filterSectionParagraph.innerHTML = `<p>
        <span>${usersFiltered.length}</span> Users found after filtering about <span>${filteredRole}</span> and <span>${filteredStatus}</span>
        </p>`

    // ----- FILTERED USR LIST -------
    filteredUsersList.innerHTML = usersFiltered.map(user => `
        <li class="user-card" data-user-id="${user.id}">
            <div class="user-information">
                <div class="user-profile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor"
                        class="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>
                </div>
                <div class="user-descrb">
                    <h4>${user.name}</h4>
                    <p>${user.email}</p>
                    <div class="user-status-role">
                        <span class="role ${user.role}-badge">${user.role}</span>
                        <span class="status ${user.status}-badge">${user.status}</span>
                    </div>
                </div>
            </div>
            <div class="user-del-edit">
                <button class="edit-btn" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil-square"
                        viewBox="0 0 16 16">
                        <path
                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                    </svg>
                </button>
                <button class="delete-btn" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash-fill"
                        viewBox="0 0 16 16">
                        <path
                            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                    </svg>
                </button>
            </div>
        </li>
        
    `).join("");
    // renderBagdeCardStyle();
}

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
                        <span class="role ${user.role}-badge">${user.role}</span>
                        <span class="status ${user.status}-badge">${user.status}</span>
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
// ====== THIS FUNCTION IS NO LONGER NEEDED =====
// // // ====== ROLE BAGDE STYLE =====
// function renderBagdeCardStyle(){
//     const userCard = document.querySelectorAll('.user-card');
//     userCard.forEach(card => {
//         const roleBagde = card.querySelector('.role');
//         const statusBagde = card.querySelector('.status');

//         if(roleBagde.textContent.trim() === 'admin'){
//             roleBagde.classList.add('admin-badge')
//         } else if(roleBagde.textContent.trim() === 'editor'){
//             roleBagde.classList.add('editor-badge');
//         }else if(roleBagde.textContent.trim() === 'viewer'){
//             roleBagde.classList.add('viewer-badge');
//         }

//         if(statusBagde.textContent.trim() === 'active'){
//             statusBagde.classList.add('active-badge');
//         }else if(statusBagde.textContent.trim() === 'inactive'){
//             statusBagde.classList.add('inactive-badge');
//         }
//     });
// }



// ===== RENDER MAIN PAGE =====
function renderMainPage(){
    renderUser();
}
renderMainPage();