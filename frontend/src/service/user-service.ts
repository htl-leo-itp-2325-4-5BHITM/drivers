import { DrivUser, ModelUser } from "Model/model"
import { storeUsers } from "../model/model"

const USER_URL = "/api/drivus/users"

async function loadUsers() {
    const response = await fetch(USER_URL)
    const users: DrivUser[] = await response.json()
    const model: ModelUser = {
        drivUsers: users
    }
    storeUsers.next(model)
}

export function getUserData() {
    var url = "http://localhost:4200/api/drivus/getUser"
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

export { loadUsers }