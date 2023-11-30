import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://endorsements-database-5241d-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsements")

let endorsementInputEl = document.getElementById("endorsement-input")
const publishBtnEl = document.getElementById("publish-btn")
let endorsementListEl = document.getElementById("endorsement-list")
// is endorsementBoxEl needed? I think it's actually going to be a class.  
// let endorsementBoxEl = document.getElementById("endorsement-box")
// Challenge items; save for later
let fromBoxEl = document.getElementById("from-box")
let toBoxEl = document.getElementById("to-box")

onValue(endorsementListInDB, function(snapshot) {
  // start with a newly empty list in the UI:
  clearListInUI()

  // snapshot is an object holding thw list of items, so we need to convert it to an array so we can access its content.
  let endorsementsArray = Object.entries(snapshot.val())
  
  //create list of endorsements in the UI
  for (let i = 0; i < endorsementsArray.length; i++) {
    // console.log(`endorsementsArray[${i}] is ${(endorsementsArray[i])[1]}`)
    let currentItem = endorsementsArray[i]
    appendEndorsementToList(currentItem)
  }
})

// when publish button is clicked, push input to DB
publishBtnEl.addEventListener("click", function () {
  let endorsementInput = endorsementInputEl.value.trim()
  console.log(`endorsementInput: ${endorsementInput}`)
  push(endorsementListInDB, endorsementInput)
  clearAllInput()
})

// this rebuilds the list each time the db changes
function appendEndorsementToList(item) {
  let itemId = item[0]
  let itemValue = item[1]

  let newEl = document.createElement("li")

  newEl.textContent = `${itemValue}`
  endorsementListEl.append(newEl)

}

// clears input fields upon publishing endorsement
function clearAllInput() {
  endorsementInputEl.value = null
  fromBoxEl.value = null
  toBoxEl.value = null
}

// we need to use this before loading the list-builder; otgerwise it adds
function clearListInUI() {
  endorsementListEl.innerHTML = null
}