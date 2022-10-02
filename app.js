//select DOM elements
const quote = document.querySelector(".quote");
const image = document.querySelector(".image");
const form = document.querySelector("#myForm");
const dateInput = document.querySelector("#date");
const title = document.querySelector(".title");
const writeDate = document.querySelector(".writeDate");
const surpriseButton = document.querySelector(".surprise");

//array for tracking searches
let dates = [];

const addDate = (e) => {
  /*SELECTING DATES WITH THE HTML INPUT FORM
  GIVES THE ENTRY FROM THE DAY PRIOR
  NOT SURE WHY THAT IS
  */
  e.preventDefault();
  console.log(dateInput.value);
  //current date search entry as object
  let date = {
    id: Date.now(),
    content: dateInput.value,
  };
  // push curr date obj to dates
  dates.push(date);
  form.reset();
  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=20rAsiKpg1mQjVMJKVdCDRa0GRWk1qapVLrf6SAH&date=${date.content}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => updateDom(data));
};

form.addEventListener("submit", addDate);


function randYear(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randMonth(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randDay(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const surpriseDate = (e) => {
  e.preventDefault();
  /*generate random date
    ISSUE WITH THE DATES --- for the DAYS, not all months have the same # of days in them, so I've shortened 
    the random day generator to only have a scope of 1-28 (accounting for the shortest possible month). 
    Leaving it as is for now, I may come back later on to remove this limitation

    also, APOD started mid-summer of 2016, meaning if you want to randomly access ALL of the archive
    you'd have to account for that. As well as extending the upper limit the current day's photo (max year I applied here is 2021)
  */
  var yearRandomString = randYear(1997, 2021).toString();
  var monthRandomString = randMonth(1, 12).toString();
  var dayRandomString = randDay(1, 28).toString();
  if (monthRandomString.length === 1) {
    var monthRandomString = "0" + monthRandomString;
  }
  if (dayRandomString.length === 1) {
    var dayRandomString = "0" + dayRandomString;
  }
  var randInput = `${yearRandomString}-${monthRandomString}-${dayRandomString}`;
  let date = {
    id: Date.now(),
    content: randInput,
  };
  dates.push(date);
  form.reset();
  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=20rAsiKpg1mQjVMJKVdCDRa0GRWk1qapVLrf6SAH&date=${randInput}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => updateDom(data));
};
surpriseButton.addEventListener("click", surpriseDate);

function updateDom(data) {
  image.src = data.url;
  quote.textContent = data.explanation;
  title.textContent = data.title;
  console.log(new Date(data.date));
  new Date(data.date);
  writeDate.textContent = new Date(data.date).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
function nasaLog() {
  fetch(
    "https://api.nasa.gov/planetary/apod?api_key=20rAsiKpg1mQjVMJKVdCDRa0GRWk1qapVLrf6SAH&date=2010-01-01"
  )
    .then((response) => {
      console.log(response.json());
    })

    .then((data) => (image.src = data.url));
}
