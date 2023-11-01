interface Drive {
    firstname: string
    lastname: string
    deppTime: string
    deppPlace: string
    arrPlace: string
    seetings: number
}

interface Model {
    drives: Drive[]
}

const demoData: Drive[] = [
    {
        firstname: "Andrei",
        lastname: "Brehar",
        deppTime: "10:15",
        deppPlace: "Traun",
        arrPlace: "Pettenbach",
        seetings: 4
    },
    {
        firstname: "Romana",
        lastname: "Schned",
        deppTime: "05:30",
        deppPlace: "Walding",
        arrPlace: "Linz",
        seetings: 4
    },
    {
        firstname: "Tuana",
        lastname: "Sevik",
        deppTime: "07:15",
        deppPlace: "Linz",
        arrPlace: "Traun",
        seetings: 3
    },
    {
        firstname: "Janine",
        lastname: "Wenninger",
        deppTime: "15:30",
        deppPlace: "Leonding",
        arrPlace: "Linz",
        seetings: 1
    },
    {
        firstname: "Natalie",
        lastname: "Schmitzberger",
        deppTime: "20:40",
        deppPlace: "Linz",
        arrPlace: "Thening",
        seetings: 3
    },
    {
        firstname: "Robert",
        lastname: "Schmitzberger",
        deppTime: "23:40",
        deppPlace: "Linz",
        arrPlace: "Thening",
        seetings: 1
    },
    {
        firstname: "Karina",
        lastname: "Berger",
        deppTime: "02:00",
        deppPlace: "Linz",
        arrPlace: "Pettenbach",
        seetings: 4
    }

]
const model: Model = {
    drives: demoData
}
export { model }