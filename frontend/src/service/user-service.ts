import { DrivUser, ModelUser, storeUserDetails, UserDetail } from "Model/model"
import { storeUsers } from "../model/model"
import { produce } from "immer"

const USER_URL = "/api/drivus/user"

async function loadUsers() {
    /*const response = await fetch(USER_URL)
    const users: DrivUser[] = await response.json()
    const model: ModelUser = {
        drivUsers: users
    }
    storeUsers.next(model)*/
}

export async function getUserDetails() {
    const response = await fetch(`/api/drivus/user/detail`)
    const userDetails: UserDetail = await response.json()
    const nextState = produce(storeUserDetails.getValue(), model => {
        model.userDetails = userDetails
    })
    console.log(nextState);
    storeUserDetails.next(nextState)
}

export function getUserData() {
    var url = "./api/drivus/getUser"
    var user = localStorage.getItem("username")

    let data = {"username": user};
    const jsonData = JSON.stringify(data);
    console.log(jsonData)

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        })
            .then(response => {
                return response.json()
                
            })
            .then(data => {
                console.log(data);
                
                /* const users: DrivUser[] = data
                const model: ModelUser = {
                    drivUsers: users
                }
                storeUsers.next(model) */
            })
            .catch(error => {
                // Handle Fehler hier
                console.error(error)
            });
}


/*export function createNewUser(firstname, lastname, phonenumber, email, username) {
    var url = "./api/drivus/user/postUser"
    var user = localStorage.getItem("username")

    let data = {"username": user};
    const jsonData = JSON.stringify(data);
    console.log(jsonData)

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
            
            
        })
            .then(response => {
                return response.json()
                
            })
            .then(data => {
                console.log(data);
                
                 const users: DrivUser[] = data
                const model: ModelUser = {
                    drivUsers: users
                }
                storeUsers.next(model) 
            })
            .catch(error => {
                // Handle Fehler hier
                console.error(error)
            });
            console.log("jsondata: ",jsonData);
}*/

export function createNewUser(firstname, lastname, phonenumber, email, username) {
    const url = "http://localhost:4200/api/drivus/users/postUser";

    let data = {
        firstName: firstname,
        lastName: lastname,
        emailAddress: email,
        phoneNr: phonenumber,
        username: username
    };
    const jsonData = JSON.stringify(data);
    console.log("jsonData:", jsonData);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        //sessionStorage.setItem("driver_username", username);

        //console.log(sessionStorage);
        

        console.log("Received data:", data);
        const users: DrivUser[] = data;
        const model: ModelUser = { drivUsers: users };
        storeUsers.next(model);
    })
    .catch(error => {
        console.error("Error details:", error.message, error);
    });
}



// In user-service.js
/*export async function createNewUser(firstname, lastname, phonenumber, email, username) {
    try {
        const response = await fetch(`http://localhost:8080/api/drivus/users/postUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstname,
                lastName: lastname,
                emailAddress: email,
                phoneNr: phonenumber,
                username: username
            })
        });

        if (response.ok) {
            console.log("User successfully created in the backend.");
        } else {
            console.error("Failed to create user:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Error creating user:", error);
    }
}*/




export { loadUsers }