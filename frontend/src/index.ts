import {getPage, getSorted, loadRides, getFakeRides, getCount} from "./service/ride-service"
import { loadUsers } from "./service/user-service"
import "./components/ride-table-component"
import "./components/users-option-component"
import "./components/login-field-component"
import Keycloak from 'keycloak-js'

//window.addEventListener("DOMContentLoaded", () => loaded())

async function loaded() {
    getPage(1, 7)
    loadUsers()
    getFakeRides()
    getCount()
}

async function load(){
    console.log("ich bin im index.ts") 
    const keycloak = new Keycloak({
        url: 'https://drivus.sytes.net',
        realm: 'drivus',
        clientId: 'frontend'
    });
    try {
        const authenticated = await keycloak.init({enableLogging:true});
        console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);

        if (!authenticated) {
          await keycloak.login()
          localStorage.token = keycloak.token
        } else {
            console.log("Keycloak login done", keycloak.token)
            localStorage.token = keycloak.token
        } 
        console.log('keycloaktoken = ',keycloak.token)
    } catch (error) {
        console.error('Failed to initialize adapter:', error);
        
    }
}
load()
//https://drivus.sytes.net