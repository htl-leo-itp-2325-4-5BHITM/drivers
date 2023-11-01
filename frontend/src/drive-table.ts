import {model} from "./model/model"

export function render() {
    const tbody = document.querySelector("tbody")
    console.log("body is: ", tbody)
    console.log("model is", model)

    model.drives.forEach(drive => {
        const tr = document.createElement("tr")
        tbody.appendChild(tr)
        const tds = /*html */`<td>${drive.firstname}</td><td>${drive.lastname}</td><td>${drive.deppTime}</td><td>${drive.deppPlace}</td><td>${drive.arrPlace}</td><td>${drive.seetings}</td>`
        tr.innerHTML = tds
    })
}