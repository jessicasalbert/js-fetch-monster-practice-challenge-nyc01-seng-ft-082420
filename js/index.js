document.addEventListener("DOMContentLoaded", () => {
    submitHandler()
    monsterCount()
    fetchMonsters()
    prevPage()
    nextPage()
})

let page = 1
let upperLimit 
let monsterTotal

function submitHandler() {
    let form = document.querySelector("#monster-form")
    form.addEventListener("submit", e => {
        e.preventDefault()
        let name = e.target.name.value
        let age = e.target.age.value
        let desc = e.target.description.value
        newMonster(name, age, desc)
        form.reset()
    })
}

function newMonster(name, age, desc) {
    fetch("http://localhost:3000/monsters/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: name,
            age: age,
            description: desc
        })
    })
    .then(response => response.json())
    .then(monster => {
        upperLimit = Math.ceil(monsterTotal/50)
        let pageMonsters = document.querySelectorAll(".monster").length
        const btnR = document.querySelector("#forward")
        if(pageMonsters == 50 && page == upperLimit) {
            btnR.disabled = false
        }
        monsterTotal++
        upperLimit = Math.ceil(monsterTotal/50)
        if(page == upperLimit) {
            renderMonsters([monster])
        }
    })
}

function monsterCount() {
    fetch('http://localhost:3000/monsters/')
    .then( res => res.json())
    .then( monsters => {
        monsterTotal = monsters.length
        upperLimit = Math.ceil(monsterTotal/50)
    })
}

function fetchMonsters() {
    const btnL = document.querySelector("#back")
    const btnR = document.querySelector("#forward")
    const monsters = document.querySelector("#monster-container")
    monsters.innerHTML = ``
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then( res => res.json())
    .then( monsters => {
        setUpperLimit(upperLimit)
        if (page === 1) {
            btnL.disabled = true
        }
        if (page === upperLimit) {
            btnR.disabled = true
        }
        renderMonsters(monsters)}
        )
}

function renderMonsters(array) {
    const monsters = document.querySelector("#monster-container")
    for (x of array) {
        const monsterDiv = document.createElement("div");
        monsterDiv.classList.add("monster")
        monsterDiv.innerHTML = `
        <h2>${x.name}</h2>
        <h4>${x.age}</h4>
        <p>${x.description}</p>
        `
        monsters.append(monsterDiv)
    }
}



function nextPage() {
    const btnR = document.querySelector("#forward")
    const btnL = document.querySelector("#back")
    btnR.addEventListener("click", e => {
        page++
        console.log(e.target)
        if (page !== 1) {
            btnL.disabled = false
        } else if (page === upperLimit) {
            btnR.disabled = true
        }
        fetchMonsters()
        
    })
}

function prevPage() {
    const btnL = document.querySelector("#back")
    const btnR = document.querySelector("#forward")
    btnL.addEventListener("click", e => {
        page--
        console.log(e.target)
        if (page === 1) {
            btnL.disabled = true
        } else if (page !== upperLimit) {
            btnR.disabled = false
        }
        fetchMonsters()
    })
}

function setUpperLimit(number) {
    upperLimit = number
}

//if page == 1, disable left button
//display page
//




