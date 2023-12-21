import { DrivUser, ModelUser } from "Model/model"
import { storeUsers } from "../model/model"

const USER_URL = "/api/users"

async function loadUsers() {
    const response = await fetch(USER_URL)
    const users: DrivUser[] = await response.json()
    const model: ModelUser = {
        drivUsers: users
    }
    console.log("users loaded", users)
    storeUsers.next(model)
}
export { loadUsers }
