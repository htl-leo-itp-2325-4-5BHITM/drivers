interface Drive {
    firstname: string
    lastname: string
}

interface Model {
    drives: Drive[]
}

const demoData: Drive[] = [
    {
        firstname: "John",
        lastname: "Dow"
    },
    {
        firstname: "Jane",
        lastname: "Roe"
    }

]
const model: Model = {
    drives: demoData
}
export { model }