document.addEventListener("DOMContentLoaded", init)

function init(){
  getTrainers()
}

function getTrainers(){
  //get all trainers
  fetch(`http://localhost:3000/trainers`)
    .then(res => res.json())
    .then(trainer => trainer.forEach(renderTrainers))
}

function renderTrainers(t){
  //create elements
  const main = document.querySelector("main")
  const div = document.createElement("div")
  const p = document.createElement("p")
  const button = document.createElement("button")
  const ul = document.createElement("ul")
  
  //create elements for individual pokemon and append to parent ul
  t.pokemons.forEach((p) => renderPokemon(p, ul))  
  
  //update element class and innerText
  div.className = "card"
  p.innerText = t.name
  button.innerText = "Add Pokemon"
  
  //append elements
  div.append(p, button, ul)
  main.append(div)
  
  //add event listener
  button.addEventListener("click", (e) => {
    e.preventDefault()
    addPokemon(t, ul)
  })
  
}

function addPokemon(t, ul) {
  //generate new pokemon for trainer
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
  //add pokemon to trainer's div
  
  //create elements
  const li = document.createElement("li")
  const btn = document.createElement("button")
  
  //update innerText and class
  li.innerText = `${p.nickname} (${p.species})`
  btn.innerText = "Release"
  btn.className = "release"
  
  //append elements
  li.appendChild(btn)
  ul.appendChild(li)
  
  //add event listener
  btn.addEventListener("click", (e) => {
  e.preventDefault()
  deletePokemon(p, li)})
  
}

function deletePokemon(p, li){
  //create element
  const ul = li.parentElement
  
  //remove pokemon from tainer's ul
  ul.removeChild(li)
  
  //remove pokemon from backend
  fetch(`http://localhost:3000/pokemons/${p.id}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(console.log)
  
}







