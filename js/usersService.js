let users = [
    {
        id: 1,
        name: "Budi Santoso",
        email: "budi@example.com",
        status: "active",
        role: "admin"
    },
    {
        id: 2,
        name: "Sari Dewi",
        email: "sari@example.com",
        status: "active",
        role: "editor"
    },
    {
        id: 3,
        name: "Andi Pratama",
        email: "andi@example.com",
        status: "active",
        role: "viewer"
    },
    {
        id: 4,
        name: "Dewi Lestari",
        email: "dewi@example.com",
        status: "inactive",
        role: "editor"
    },
    {
        id: 5,
        name: "Rizky Kurniawan",
        email: "rizky@example.com",
        status: "active",
        role: "viewer"
    },
    {
        id: 6,
        name: "Nadia Putri",
        email: "nadia@example.com",
        status: "inactive",
        role: "admin"
    },
    {
        id: 7,
        name: "Fajar Ramadhan",
        email: "fajar@example.com",
        status: "active",
        role: "editor"
    },
    {
        id: 8,
        name: "Intan Permata",
        email: "intan@example.com",
        status: "active",
        role: "viewer"
    },
    {
        id: 9,
        name: "Reza Maulana",
        email: "reza@example.com",
        status: "inactive",
        role: "viewer"
    },
    {
        id: 10,
        name: "Putri Amelia",
        email: "putri@example.com",
        status: "active",
        role: "admin"
    },
    {
        id: 11,
        name: "Dimas Saputra",
        email: "dimas@example.com",
        status: "inactive",
        role: "editor"
    },
    {
        id: 12,
        name: "Alya Safitri",
        email: "alya@example.com",
        status: "active",
        role: "viewer"
    }
];


// ============ FUNCTION CREATE & ADD USER ========
export function createUser(name,email,role,status){
    let userId = Math.max(...users.map(user => user.id)) + 1;
    const cleanName = name.trim();
    
    if(!cleanName){
        return null;
    }
    
    const newUser = {
        id: userId,
        name: cleanName,
        email: email,
        status:status,
        role: role
    };
    
    users.push(newUser);
    
    return newUser;
}

// ====== GET USERS =====
export function getUsers(){
    return [...users];
}
// =====  EDIT USER ====
export function editUser(id,newName,newEmail,newRole,newStatus){
    const cleanName = newName.trim();
    if(!cleanName){
        return null;
    }
    
    const user = users.find(usr => usr.id === Number(id)) ;

    if(!user) return null;

    user.name = cleanName;
    user.email = newEmail;
    user.role = newRole;
    user.status = newStatus;

    return user;
}

// ======= FILTER USERS BY ROLE AND STATUS ========

export function filterUser(role,status,userData){
    let filteredUser = [];
    const stringRole = String(role);
    const stringStatus = String(status);

    if(role === null || status === null){
        filteredUser = userData.filter(user => {
            return user.role ===stringRole || user.status === stringStatus;
        })
    }
    else {
        filteredUser = userData.filter(user => {
            return user.role === stringRole && user.status === stringStatus;
        })
    }
   return filteredUser;
}

// ===== DELETE USER ======
export function deleteUser(id){
    return users = users.filter(usr => usr.id !== id); 
}

// console.log(filterUser("editor","active",users));
