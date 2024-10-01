btn1 = document.querySelector("#button1");
btn2 = document.querySelector("#button2");
body = document.querySelector("body");
h1 = document.querySelector("h1");

btn1.addEventListener("click", () => {
  generateQuote();
});
i = 0;

btn2.addEventListener("click", () => {
  i = switchTheme(i);
});

function switchTheme(i) {
  if (i === 0) {
    body.setAttribute("data-bs-theme", "light");
    btn2.innerHTML = "Switch to dark mode";
    return 1;
  } else {
    body.setAttribute("data-bs-theme", "dark");
    btn2.innerHTML = "Switch to light mode";
    return 0;
  }
}

url = "https://dummyjson.com/quotes/random";
function generateQuote() {
  fetch(url)
    .then((res) => {
      console.log(res);
      res.json().then((data) => {
        console.log(data.quote);
        h1.innerHTML = data.quote;
      });
    })
    .catch((err) => {
      console.log("error- ", err);
    });
}
