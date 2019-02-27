document.addEventListener("DOMContentLoaded", init)

function init(){
  getTrainers()
}

function getTrainers(){
  fetch(`http://localhost:3000/trainers`)
    .then(res => res.json())
    .then(trainer => trainer.forEach(renderTrainers))
}

function renderTrainers(t){
  const main = document.querySelector("main")
  const div = document.createElement("div")
  const p = document.createElement("p")
  const button = document.createElement("button")
  const ul = document.createElement("ul")
  
    
  t.pokemons.forEach((p) => {
//    debugger
    const li = document.createElement("li")
    const btn = document.createElement("button")
    
    li.innerText = `${p.nickname} (${p.species})`
    btn.innerText = "Release"
    btn.className = "release"
    
    li.appendChild(btn)
    ul.appendChild(li)
    })
  
  div.className = "card"
  p.innerText = t.name
  button.innerText = "Add Pokemon"
  
  div.append(p, button, ul)
  
  main.append(div)
  
  button.addEventListener("click", (e) => {
    e.preventDefault()
    addPokemon(t, ul)
  })
  
}

function addPokemon(t, ul) {
  fetch(`http://localhost:3000/pokemons`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({trainer_id: t.id})
  })
  .then(res => res.json())
  .then((p) => {renderPokemon(p, ul)})
}



function renderPokemon(p, ul) {
  
  const li = document.createElement("li")
  const btn = document.createElement("button")
    
  li.innerText = `${p.nickname} (${p.species})`
  btn.innerText = "Release"
  btn.className = "release"
    
  li.appendChild(btn)
  ul.appendChild(li)
}