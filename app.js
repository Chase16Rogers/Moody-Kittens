let affectionLevel = 5
let catCardElem = document.getElementById("drawCats")
let catCardElem2 = document.getElementById("drawCats2")
let kittens = []
let formName = {}


function addKitten(event) {
  event.preventDefault()
  formName = kittens.find(kitt => kitt.name == event.target.catName.value)
  if (!formName) {
    formName = {
      id: generateId(),
      name: event.target.catName.value,
      mood: "tolerant",
      affection: affectionLevel,
    }
    kittens.push(formName)
      saveKittens()
  } else {
    throw new Error("You can't have the same cat more than once!"),
    window.alert("You can't have the same cat more than once!")
}
  event.target.reset()
  loadKittens()
  drawKittens()
  drawDeleteCats()
}

function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))

}

function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  if (kittensData) {
    kittens = kittensData
  }
}

function drawKittens() {
    let kittenTemplate = ""
    kittens.forEach(kitten => {
      kittenTemplate += `
      <div class=" d-flex mt-3 m-2" >
  <div class="card-dark w-cat ">
<img id="catImg" src="https://robohash.org/${kitten.name}?set=set4">
    <div class="text-white fancy-font bold p-2">
    <div id="catNameD">Name: ${kitten.name}</div>
    <div id="catMoodD">Mood: ${kitten.mood} </div>
    <div id="catAffectionD">Affection: ${kitten.affection}</div>
      <div id="catBtns" class="text-center">
      <button class="btn-cancel" onClick="pet('${kitten.id}')">PET</button>
      <span>
      <button class="" onClick="catnip('${kitten.id}')">CATNIP</button>
      </span>
      <button class="hidden" onLoad="setKittenMood('${kitten.id}')"</button>
      </div>
    </div>
  </div>
</div>
      `
    })
  catCardElem.innerHTML = kittenTemplate
  }

  function findKittenById(id) {
    return kittens.findIndex(k => k.id === id)
  }

function pet(id) {
  let petMood = Math.random()
  let petIndex = kittens.findIndex(ktn => ktn.id == id)
  if (petMood > .7) { kittens[petIndex].affection++ } else { kittens[petIndex].affection--}
  setKittenMood(petIndex)
  saveKittens()
  loadKittens()
  }

function catnip(id) {
  let catnipIndex = kittens.findIndex(cktn => cktn.id == id)
  kittens[catnipIndex].affection = 5
  setKittenMood(catnipIndex)
  saveKittens()
  loadKittens()
  drawKittens()
  }

function setKittenMood(num) {
  let xv = (num)
  if (kittens[(num)].affection <= 0) {
    kittens[(num)].mood = "gone";
    catCardElem.classList.add("gone")
    catCardElem.classList.remove("angry")
    catCardElem.classList.remove("tolerant")
    catCardElem.classList.remove("happy")
  }
  else if (kittens[(num)].affection <= 3) {
    kittens[(num)].mood = "angry";
    catCardElem.classList.remove("gone")
    catCardElem.classList.add("angry")
    catCardElem.classList.remove("tolerant")
    catCardElem.classList.remove("happy")
  }
  else if (kittens[(num)].affection <= 5) {
    kittens[(num)].mood = "tolerant";
    catCardElem.classList.remove("gone")
    catCardElem.classList.remove("angry")
    catCardElem.classList.add("tolerant")
    catCardElem.classList.remove("happy")
  }
  else if (kittens[(num)].affection > 6) {
    kittens[(num)].mood = "happy";
    catCardElem.classList.remove("gone")
    catCardElem.classList.remove("angry")
    catCardElem.classList.remove("tolerant")
    catCardElem.classList.add("happy")
  }
  saveKittens()
  loadKittens()
  drawKittens()
  }

function getStarted() {
    document.getElementById("welcome").classList.add("hidden")
    catCardElem2.classList.remove("hidden")
    drawKittens()
    drawDeleteCats()
}

function hideStart() {
  let numbOCats = numberOfCats()
  if (numbOCats > 0) {
    document.getElementById("welcome").classList.add("hidden")
    catCardElem2.classList.remove("hidden")
  }
}

function numberOfCats() {
  loadKittens()
  let x = 0
  for (let i = 0; i < kittens.length; i++){
    x++
  }
  return (x)
}

function drawDeleteCats() {
  let numOCats = numberOfCats()
  if (numOCats <= 0) {
    document.getElementById("deleteCatBtn").classList.add("hidden")
  } else {
    document.getElementById("catNumber").innerHTML = numOCats
  }
}

function goHome() {
  document.getElementById("welcome").classList.remove("hidden")
  catCardElem2.classList.add("hidden")
  numberOfCats()
  loadKittens()
  drawDeleteCats()
}

function clearCats() {
  kittens = []
  saveKittens()
  loadKittens()
  drawKittens()
  drawDeleteCats()
}

  function generateId() {
    return (
      Math.floor(Math.random() * 10000000) +
      "-" +
      Math.floor(Math.random() * 10000000)
    );
}

loadKittens()
drawKittens()
drawDeleteCats()
hideStart()
