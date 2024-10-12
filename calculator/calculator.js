//Author - Prashant Jagtap
const lightTheme = "style2.css";
const darkTheme = "style.css";
const sunIcon = "SunIcon.svg";
const moonIcon = "MoonIcon.svg";
const themeIcon = document.getElementById("theme-icon");





const output = document.querySelector(".output");
const result = document.querySelector(".result");
const keys = document.querySelectorAll("button");

keys.forEach(key=>{
    key.addEventListener("click",calculate);
});

function calculate(){
    let buttonText = this.innerText;
    if(buttonText==="AC"){
        output.innerText = "";
        result.innerText = "0";
        result.style.animation = "";
        output.style.animation = "";
        return;
    }

    if(buttonText === "C"){
        output.textContent = output.textContent.substr(0,output.textContent.length-1);
        return;
    }

    if(buttonText === "="){
        result.innerText = eval(output.innerText);
        result.style.animation = "big 0.5s ease-in-out";
        output.style.animation = "small 0.5s ease-in-out";
        result.style.animationFillMode = "forwards";
        output.style.animationFillMode = "forwards";
    }

    else{
        output.textContent += buttonText;
        return;
    }

  
}

function changeTheme() {
  const theme = document.getElementById("theme");
  const currentTheme = theme.getAttribute("href");

  if (currentTheme === lightTheme) {
    theme.setAttribute("href", darkTheme);
    themeIcon.setAttribute("src", sunIcon);
    localStorage.setItem("theme", "dark");
  } else {
    theme.setAttribute("href", lightTheme);
    themeIcon.setAttribute("src", moonIcon);
    localStorage.setItem("theme", "light");
  }
}

// Check local storage and apply theme on page load
window.onload = function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    theme.setAttribute("href", darkTheme);
    themeIcon.setAttribute("src", sunIcon);
  } else {
    theme.setAttribute("href", lightTheme);
    themeIcon.setAttribute("src", moonIcon);
  }
}


  //Author - Prashant Jagtap
  

  //Author - Prashant Jagtap

  
  //Author - Prashant Jagtap