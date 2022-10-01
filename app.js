//select DOM elements
const quote = document.querySelector(".quote");
const image = document.querySelector(".image");
const form = document.querySelector("#myForm");
const dateInput = document.querySelector("#date");

//array for tracking searches
let dates  = []

//function to add dates from HTML input
const addDate = (e) => {
    e.preventDefault();
    console.log("add date ran");
    let date = {
      id: Date.now(),
      content: dateInput.value,
    };
    dates.push(date);
    //form.reset();
  };

form.addEventListener("submit", addDate);
