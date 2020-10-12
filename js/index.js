document.addEventListener("DOMContentLoaded", () => {
    monsterCount()
    fetchMonsters()
    prevPage()
    nextPage()
})

let page = 1
let upperLimit 


function monsterCount() {
     fetch('http://localhost:3000/monsters/')
    .then( res => res.json())
    .then( monsters => {
        upperLimit = Math.ceil(monsters.length/50)
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




