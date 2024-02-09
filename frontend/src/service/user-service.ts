import { DrivUser, ModelUser } from "Model/model"
import { storeUsers } from "../model/model"

const USER_URL = "/api/drivus/users"

async function loadUsers() {
    const response = await fetch(USER_URL)
    const users: DrivUser[] = await response.json()
    const model: ModelUser = {
        drivUsers: users
    }
    console.log("users loaded", users)
    storeUsers.next(model)
}

export function getUserData() {
    var url = "http://localhost:4200/api/drivus/getUser"
    var user = localStorage.getItem("username")

    const jsonData = JSON.stringify(user);
    console.log(jsonData)

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        })
            .then(response => {
                // Handle die Antwort hier
                //loadRides()
                console.log("gehd")
            })
            .catch(error => {
                // Handle Fehler hier
                console.log("Hat nd funktioniert zum Ändern")
            });
}

export { loadUsers }