function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function getRandomElement(arr) {
  // const randomIndex = Math.floor(Math.random() * arr.length);
  // return arr[randomIndex];
  arr = shuffle(arr);
  return arr.pop();
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPartnerForPerson(family, person) {
  let familyMembersCount = family.length;
  let personGender = person.gender;
  let familyCases = [];
  for (var i = 0; i < familyMembersCount; i++) {
    if (
      family[i].gender != personGender &&
      !person.parents.includes(family[i])
    ) {
      familyCases.push(family[i]);
    }
  }
  return getRandomElement(familyCases);
}

class Human {
  constructor(name, gender) {
    this.name = name;
    this.gender = gender;
    this.spouse = [];
    this.children = [];
    this.mother = null;
    this.father = null;
  }

  marry(partner) {
    this.spouse.push(partner);
    partner.spouse.push(this);
  }

  addChild(spouse, child) {
    this.children.push(child);
    spouse.children.push(child);
    child.father = this.gender === "Male"?this:spouse;
    child.mother = this.gender === "Female"?this:spouse;
  }
}

class FamilyTree {
  constructor() {
    this.members = [];
  }

  addMember(human) {
    this.members.push(human);
  }
}

let familyTree = new FamilyTree();

var girlsName = [
  "Parisa",
  "Mahsa",
  "Nazanin",
  "Mina",
  "Sarina",
  "Maryam",
  "Sara",
  "Sanaz",
  "Mahtab",
  "Mehrsa",
  "Artmis",
  "Sahar",
  "Avisa",
  "Atena",
  "Armita",
  "Elnaz",
  "Pardis",
  "Negin",
  "Afsaneh",
  "Anahita",
  "Asal",
  "Hanane",
  "Tina",
  "Saman",
  "Parmida",
  "Batol",
  "Somayeh",
  "Elahe",
  "Ghazal",
  "Fereshte",
  "Atefeh",
  "Aida",
  "Masomeh",
  "Hanieh",
  "Sakineh",
  "Mobina",
  "Sadaf",
  "Darya",
  "Donya",
  "Mohadese",
  "Yalda",
  "Vida",
  "Hengameh",
  "Zahra",
  "Fatemeh",
  "Arezo",
  "Reyhaneh",
  "Elham",
  "Yasamin",
  "Narges",
  "Leila",
  "Roya",
  "Sabah",
  "Taraneh",
  "Maede",
  "Sheyda",
  "Shahla",
  "Sepideh",
  "Samaneh",
];
var boysName = [
  "Hasan",
  "Ali",
  "Ahmad",
  "Sam",
  "Mostafa",
  "Alireza",
  "Morteza",
  "Reza",
  "Abas",
  "Hossein",
  "Amir",
  "Jafar",
  "Mahdi",
  "Behnam",
  "Behzad",
  "Behroz",
  "Behrad",
  "Matin",
  "Mohammad",
  "Sirous",
  "Asghar",
  "Akbar",
  "Mohammad Ali",
  "Mohammad Hasan",
  "Mohammad Jafar",
  "Khosro",
  "Siavash",
  "Kiarash",
  "Arash",
  "Koroush",
  "Dariush",
  "Arya",
  "Mani",
  "Abolfazl",
  "Nima",
  "Baqher",
  "Mehrdad",
  "Pendar",
  "Pedram",
  "Ehsan",
  "Karim",
  "Keyvan",
  "Pouria",
  "Poyan",
  "Saeed",
  "Hamid",
  "Ali Asghar",
  "Vahid",
  "Amir Hossein",
  "Mojtaba",
  "Ghodrat",
  "Nosrat",
  "Vali-o-allah",
  "Meysam",
  "Esmaiil",
  "Mohammad Sam",
  "Artin",
  "Ramtin",
  "Masiha",
  "Ilya",
  "Peyman",
  "Nader",
  "Kazem",
  "Ebrahim",
  "Jamshid",
  "Arsalan",
  "Kambiz",
  "Mehran",
  "Mehrab",
];
const gender = ["Male", "Female"];

function CreateHuman(_humanGender) {
  var humanGender = _humanGender ? _humanGender : getRandomElement(gender);
  var humanName = humanGender === "Male"? getRandomElement(boysName) : getRandomElement(girlsName);
  var human = new Human(humanName, humanGender);
  familyTree.addMember(human);
  return human;
}

function CreateSpouse(person) {
  var spouseGender = person.gender === "Male" ? "Female" : "Male";
  var spouse = CreateHuman(spouseGender);
  person.marry(spouse);
  return spouse;
}

function CreateChild(person, spouse) {
  var child = CreateHuman();
  person.addChild(spouse, child);
  return child;
}

function CreateFamily(person, number) {
  if (number <= 0) {
    return;
  }
  var spouse = CreateSpouse(person);
  var numberOfChildren = getRandomNumber(0, 3);
  var newNumber = number - numberOfChildren;
  
  for (var i = 0; i < numberOfChildren; i++) {
    var child = CreateChild(person, spouse);
    CreateFamily(child, newNumber);
  }
}

function CreateSpeceficFamily(){
  familyTree = new FamilyTree();
  var name = document.getElementById("name");
  var gender = document.getElementById("gender");
  var patriarch = new Human(name,gender);
  CreateFamily(patriarch,10);
  console.log(familyTree);
}

function CreateRandomFamily(){
  familyTree = new FamilyTree();
  var patriarch = CreateHuman();
  CreateFamily(patriarch, 10);
  Display();
  console.log(familyTree);
}