//MenuToggle
document.querySelector('#menuToggle').addEventListener('click', () => {
  document.querySelector(".navMenu").classList.toggle('navActive');
});

//setting Box
document.querySelector("#settingToggle").addEventListener('click', () => {
  document.querySelector(".settingBox").classList.toggle('settingBoxActive');
});

//window
window.addEventListener("scroll",() => {
  if(window.scrollY>500){
    document.querySelector("header").style.backgroundColor="#2F234B";
    document.querySelector("header").style.color = "#F74A8A";
    document.querySelector("i").style.color = "#F74A8A";
    document.querySelector("#toggleIcon").style.color = "#F74A8A";
    document.querySelector(".scrollTop").style.bottom="20px";
   
    }else{

    document.querySelector("header").style.backgroundColor = "#ffd900";
    document.querySelector(".scrollTop").style.bottom = "-100px";
  }
})

//arrowClick to zero
document.querySelector(".scrollTop").addEventListener("click", () => {
  window.scroll(
    {
      top: 100,
      left: 100,
      behavior: 'smooth'
    }
  );
})

//darkMode
const toggle = document.querySelector("#toggleBtn");

const icon = document.querySelector('#toggleIcon');

toggle.addEventListener('click',  darkModeToggle);

let darkMode =localStorage.getItem('darkMode');
if(darkMode ==='enabled'){
  darkModeOn();
}

function darkModeToggle() {
  darkMode =localStorage.getItem('darkMode');
if(darkMode==='enabled') {
   darkModeOff();
}else{
  darkModeOn();
}

}
//ondark
function darkModeOn(){
  document.body.classList.add("dark");
  darkMode =true;
  localStorage.setItem("darkMode","enabled");
  icon.className='bx bx-moon';
}
//offdark
function darkModeOff() {
document.body.classList.remove("dark");
darkMode =false;
localStorage.setItem("darkMode","disabled");
  icon.className = 'bx bx-sun';

}

let images = Array.from(document.querySelectorAll(".settingBox img"));

images.map((image) =>{
  
  image.addEventListener("click",() => {
    images.forEach((img) => {
      img.style.opacity = "1";
    });
    document.querySelector(".landingImage").src = image.src;
    image.style.opacity="0.5";

  })
})

// Fetch Movie

const url ={
  apiKey:"api_key=f1b0dc700c5788eb3c6ff31f30981996",
  baseUrl: "https://api.themoviedb.org/3/discover/movie?"
}
const imgUrl = "https://image.tmdb.org/t/p/w500/";

const popularUrl = url.baseUrl + "sort_by=popularity.desc&" + url.apiKey;

const searchUrl = "https://api.themoviedb.org/3/search/movie?" + url.apiKey;

function fetchMovie(path){
  fetch(path)
  .then(res => res.json())
  .then(data =>showMovie(data))
}
fetchMovie(popularUrl);

function showMovie(data){

  let res =data.results;
  document.querySelector(".movie-container").innerHTML = '';

  res.forEach(movie => {
    const div =document.createElement('div');
    div.className="card";

    div.innerHTML =`
    
            <div class="imgBox">
              <img src=${imgUrl+movie.poster_path} alt="" class="" />
            </div>
            <div class="details">
              <h4>${movie.original_title}</h4>
              <span>${movie.vote_average.toFixed(1)}</span>
            </div>
            <div class="overView">
              <h5>overview</h5>
              <p>
                ${movie.overview}
              </p>
              <p>Released date <strong>${movie.release_date}</strong></p>
            </div>
          
    `;
    document.querySelector('.movie-container').appendChild(div);
  })

}



//search Movie
document.querySelector("#search").addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    let val = e.target.value;

    if (val) {
      fetchMovie(searchUrl + "&query=" + val);
    }
    else {
      fetchMovie(popularUrl);
    }
  }
});