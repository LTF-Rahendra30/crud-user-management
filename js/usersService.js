let users = [
    {
        id: 1,
        name: "budi santoso",
        email: "budi@example.com",
        status: "active",
        role: "admin"
    },
    {
        id: 2,
        name: "sari dewi",
        email: "sari@example.com",
        status: "active",
        role: "editor"
    },
    {
        id: 3,
        name: "andi pratama",
        email: "andi@example.com",
        status: "active",
        role: "viewer"
    },
    {
        id: 4,
        name: "dewi lestari",
        email: "dewi@example.com",
        status: "inactive",
        role: "editor"
    },
    {
        id: 5,
        name: "rizky kurniawan",
        email: "rizky@example.com",
        status: "active",
        role: "viewer"
    },
    {
        id: 6,
        name: "nadia putri",
        email: "nadia@example.com",
        status: "inactive",
        role: "admin"
    },
    {
        id: 7,
        name: "fajar ramadhan",
        email: "fajar@example.com",
        status: "active",
        role: "editor"
    },
    {
        id: 8,
        name: "intan permata",
        email: "intan@example.com",
        status: "active",
        role: "viewer"
    },
    {
        id: 9,
        name: "reza maulana",
        email: "reza@example.com",
        status: "inactive",
        role: "viewer"
    },
    {
        id: 10,
        name: "putri amelia",
        email: "putri@example.com",
        status: "active",
        role: "admin"
    },
    {
        id: 11,
        name: "dimas saputra",
        email: "dimas@example.com",
        status: "inactive",
        role: "editor"
    },
    {
        id: 12,
        name: "alya safitri",
        email: "alya@example.com",
        status: "active",
        role: "viewer"
    },
    {
        id: 13,
        name: "budi jokowasanti",
        email: "budi@example.com",
        status: "active",
        role: "admin"
    },
    {
        id: 14,
        name: "budi wawok",
        email: "budi@example.com",
        status: "active",
        role: "admin"
    },
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
    return userData.filter(user => {
        const matchesRole = role === null || role === undefined || role === "" || user.role === role;
        const matchesStatus = status === null || status === undefined || status === "" || user.status === status;

        return matchesRole && matchesStatus;
    });
}
export function searchUser(username,userData){
    return userData.filter(user => {
        const users = user.name.includes(username.toLowerCase());
        return users;
    });
}
// ===== DELETE USER ======
export function deleteUser(id){
    return users = users.filter(usr => usr.id !== id); 
}

// console.log(filterUser("editor","active",users));
console.log(searchUser("Budi",users));