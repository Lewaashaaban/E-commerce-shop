import { collection, query, onSnapshot, addDoc, doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export const getUsers = () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef);
    onSnapshot(q, (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        });
        // console.log(users);
        return users;
    });
}

export const getUserbyId = (userId) => {
    const docRef = doc(db, "users", userId);
    getDoc(docRef).then((doc) => {
        if (doc.exists()) {
            // console.log("Document data:", doc.data());
            return doc.data();
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

export const addUser = (user) => {
    const usersRef = collection(db, "users");
    const roles = collection(db, "roles");

    var roleType = user.role;
    console.log(roleType);

    if (roleType === 'admin') {
        roleType = 1;
    } else if (roleType === 'user') {
        roleType = 2;
    }
    console.log(roleType);

    const userRole = doc(roles, roleType.toString());

    const newUser = {
        ...user,
        role: userRole,
    }

    try {
        const docRef = addDoc(usersRef, newUser);
        console.log("Document written with ID: ", docRef.id);
    }
    catch (error) {
        console.error("Error adding document: ", error);
    }
}

export const deleteUser = (userId) => {
    const docRef = doc(db, "users", userId);
    deleteDoc(docRef);
}

export const updateUser = (userId, user) => {
    const docRef = doc(db, "users", userId);
    updateDoc(docRef, user);
}

export const getRoleByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const usersRef = collection(db, "users");
        const q = query(usersRef);
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (userId === doc.data().uId) {
                    // console.log(doc.data().role._key.path.segments[6]);
                    resolve(doc.data().role._key.path.segments[6]);
                }
            });
        }, (error) => {
            console.log(error);
            reject(error);
        }
        );
    });
}

export const getFirstNameByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const usersRef = collection(db, "users");
        const q = query(usersRef);
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (userId === doc.data().uId) {
                    // console.log(doc.data().role._key.path.segments[6]);
                    resolve(doc.data().uFirstName);
                }
            });
        }, (error) => {
            console.log(error);
            reject(error);
        }
        );
    });
}

export const getFullNameByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const usersRef = collection(db, "users");
        const q = query(usersRef);
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (userId === doc.data().uId) {
                    // console.log(doc.data().role._key.path.segments[6]);
                    resolve(doc.data().uFirstName + " " + doc.data().uLastName);
                }
            });
        }, (error) => {
            console.log(error);
            reject(error);
        }
        );
    });
}
