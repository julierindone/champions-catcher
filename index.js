import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://endorsements-database-5241d-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsements")

const publishBtnEl = document.getElementById("publish-btn")
let endorsementInputEl = document.getElementById("endorsement-input")
let endorsementListEl = document.getElementById("endorsement-list")
let fromBoxEl = document.getElementById("from-box")
let toBoxEl = document.getElementById("to-box")

onValue(endorsementListInDB, function(snapshot) {
  // start with a newly empty list in the UI:
  endorsementListEl.innerHTML = null

  // snapshot is an object holding the list of items; we need to convert it to an array so we can access its content.
  let endorsementsArray = Object.entries(snapshot.val())
  
  //create list of endorsements in the UI
  for (let i = 0; i < endorsementsArray.length; i++) {
    let currentItem = endorsementsArray[i]
    rebuildEndorsementListFromDb(currentItem)
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
function rebuildEndorsementListFromDb(item) {
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
