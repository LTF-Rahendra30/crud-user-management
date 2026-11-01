
import { createUser,getUsers,deleteUser,editUser,filterUser,searchUser,calculateResume } from "./usersService.js";


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
let searchUsr;
let usersSearched;
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

    //  ---- CHECK RESOUSCE DATA ------
    if(searchedUserList.contains(liUser)){
        usersSearched = searchUser(searchUsr,getUsers());
        searchedUserRender();
    } else{
        // --- FILTERED USER RENDER AGAIN IF EDIT USER FROM FILTERED USER ----
        filteredUserRender();
    }    
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
});

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
    
    // ---- CHECK WHERE DATA CARD COME FORM ----
    const deletedFromSearch = searchedUserList.contains(liUser);
    const deletedFromFilter = filteredUsersList.contains(liUser);

    deleteUser(selectedUserId);
    selectedUserId = null;
    
    modalDelUser.close();
    renderMainPage();

    if (deletedFromSearch){
        usersSearched = searchUser(searchUsr,getUsers());

        searchedUserRender();

    } else if(deletedFromFilter){
        filteredUser = filterUser(filteredRole,filteredStatus,getUsers());
    
        // -- Render with filtered again ---
        filteredUserRender();
    }
    
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


searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(searchForm);
    searchUsr = formData.get("search-input");
    usersSearched = searchUser(searchUsr,getUsers());

    
    searchSection.style.display = 'block';
    if(usersSearched.length < 1 ){
        searchInfoContent.style.display = 'none';
        searchedUserList.style.display = 'none';
        notFoundContainer.classList.add('not-found-container-wrap');
        notFoundContainer.classList.remove('not-found-container-none');
        notFoundSearchRender();
    } 
    else {
        notFoundContainer.classList.add('not-found-container-none');
        notFoundContainer.classList.remove('not-found-container-wrap');
        
        searchInfoContent.style.display = 'block';
        searchedUserList.style.display = 'grid';
        console.log(usersSearched);
        searchedUserRender();
        
    }
    
    
})


// ======= SEARCED USER RENDER =======
const searchSection = document.getElementById('search-user-container');
searchSection.style.display = 'none';
const searchInfoContent = document.getElementById('search-info');
const searchedUserList = document.getElementById('search-usr-list');

function searchedUserRender(){
    const searcedUsers = usersSearched;
    filteredSection.style.display = 'none';

    searchInfoContent.innerHTML = `
    <p><span>${usersSearched.length}</span> Users found about <span>${searchUsr}</span></p>`

    // --- render usr list -----
    searchedUserList.innerHTML = searcedUsers.map(user => `
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
    `).join("")
}

// ====== FILTERED USER RENDER ======
const filteredSection = document.getElementById('filtered-user');
filteredSection.style.display = 'none';
const filterSectionParagraph = document.getElementById('filter-usr-info');


function filteredUserRender(){
    searchSection.style.display = 'none';

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
// ======= EMPTY STETE NOT FOUND USER SEARCH =======
const notFoundContainer = document.getElementById('not-found-container');
function notFoundSearchRender(){
    notFoundContainer.innerHTML = `
        <div class="not-found-logo">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-ban" viewBox="0 0 16 16">
                <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
            </svg>
        </div>
        <h2>User Not Found</h2>
        <p>No users match the keyword "<span>${searchUsr}</span>"</p>
    `
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
    renderResumeData();
}
// ======== EVENTS DELEGATION WITH CALBACK FUNCTION =====
userList.addEventListener('click', handleUserListClick)
filteredUsersList.addEventListener('click',handleUserListClick);
searchedUserList.addEventListener('click',handleUserListClick);






















// ========== HENDLE NAVIGATION PAGE ========
const usersPage = document.getElementById('users-page');
const dashboardPage = document.getElementById('dashboard-page');
const settingsPage = document.getElementById('settings-page');
// ===== NAV FUNCTION ========
function navigate(){
    const route = location.hash.slice(2) || 'users';

    usersPage.hidden = route !== 'users';
    dashboardPage.hidden = route !== 'dashboard';
    settingsPage.hidden = route !== 'settings'
}

window.addEventListener('hashchange',navigate);
navigate();

// ======== DASHBOARD PAGE =========
const resumeDataContainer = document.getElementById('resume-data-container');

function renderResumeData(){
    const usersData = getUsers();
    const usersResmue = calculateResume(usersData);
    resumeDataContainer.innerHTML = `
    <div class="resume-card">
        <div class="resume-icon">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
            </svg>
        </div>
        <div class="resume-content">
            <p>Total Users</p>
            <span>${usersResmue.totalUsers}</span>
        </div>
    </div>
    <div class="resume-card">
        <div class="resume-icon">
            <svg xmlns="http://www.w3.org/2000/svg" <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-gear" viewBox="0 0 16 16">
                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
            </svg>
        </div>
        <div class="resume-content">
            <p>Total Admin</p>
            <span>${usersResmue.admin}</span>
        </div>
    </div>
    <div class="resume-card">
        <div class="resume-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
            </svg>
        </div>
        <div class="resume-content">
            <p>Total Editor</p>
            <span>${usersResmue.editor}</span>
        </div>
    </div>
    <div class="resume-card">
        <div class="resume-icon">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
            </svg>
        </div>
        <div class="resume-content">
            <p>Total Viewer</p>
            <span>${usersResmue.viewer}</span>
        </div>
    </div>
    <div class="resume-card">
        <div class="resume-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
                <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0"/>
                <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708"/>
            </svg>
        </div>
        <div class="resume-content">
            <p>User Active</p>
            <span>${usersResmue.activeUsers}</span>
        </div>
    </div>
    <div class="resume-card">
        <div class="resume-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-ban" viewBox="0 0 16 16">
                <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
            </svg>
        </div>
        <div class="resume-content">
            <p>User Inactive</p>
            <span>${usersResmue.inactiveUsers}</span>
        </div>
    </div>
    `
}


renderMainPage();






