//select DOM elements
const quote = document.querySelector(".quote");
const image = document.querySelector(".image");
const form = document.querySelector("#myForm");
const dateInput = document.querySelector("#date");

//array for tracking searches
let dates  = []

const addDate = (e) => {
    e.preventDefault();
    console.log("add date ran");
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
    }).then((data) => image.src = data.url)
  };

form.addEventListener("submit", addDate);

function nasaTest() {
    fetch(
      "https://api.nasa.gov/planetary/apod?api_key=20rAsiKpg1mQjVMJKVdCDRa0GRWk1qapVLrf6SAH&date=2010-01-01"
    )
      .then((response) => {
        return response.json();
      })
  
      .then((data) => (image.src = data.url));
  }
