let users = [];
let userId = 1;

// ============ FUNCTION CREATE & ADD USER ========
export function createUser(name,email,role){
    const cleanName = name.trim();

    if(!cleanName){
        return null;
    }

    const newUser = {
        id: userId++,
        name: cleanName,
        email: email,
        role: role
    };

    users.push(newUser);

    return newUser;
}

// ====== GET USERS =====
export function getUsers(){
    return [...users];
}