
async function GetTrendingForSlides() {

let res = await fetch("https://api.themoviedb.org/3/trending/all/day?api_key=953076d46292d5b9b918b65d89cc9419")
let data = await res.json()
console.log(data)
appendToSlides(data.results)
}

GetTrendingForSlides()





function appendToSlides(slides_data) {

    let count = 0;

    let slide_box = document.getElementById("slide-box")

    slide_box.innerHTML = `
    <img src="https://image.tmdb.org/t/p/original/${slides_data[slides_data.length-1].poster_path}" alt="" height="400px" width="100%">
     <div class="slide-text-box">
    <p class="slides-title">${slides_data[slides_data.length-1].title}</p>
    <p class="slides-year-genre"></p>
    <div class="slides-des">
        <marquee  direction="left" >${slides_data[slides_data.length-1].overview}</marquee>
    </div>
    <p class="staring"><span></span></p>
    </div>`
   
    
    setInterval(() => {
        
        slide_box.innerHTML = null
        let backimg = slides_data[count].backdrop_path 
        if(backimg == null) {
            backimg = slides_data[count].poster_path
        }

        let slide_title = slides_data[count].title

        if(slide_title == undefined) {
            slide_title = slides_data[count].original_title
        }
        if(slide_title == undefined) {
            slide_title = slides_data[count].original_name
        }
        let slidemovie_id = slides_data[count].id

        const formatString = (currentIndex, maxIndex) => {
            return (currentIndex == maxIndex -1) ? '' : ', '
        }

        fetch(`https://api.themoviedb.org/3/movie/${slidemovie_id}/credits?api_key=953076d46292d5b9b918b65d89cc9419`)

        .then(res => res.json())
        .then(data => {
        const cast = document.querySelector('.staring')
        for(let i = 0; i < 5; i++) {

        cast.innerText += data.cast[i].name + formatString(i,5)
        }

        if(cast.innerText == "") {
            let star = document.querySelector("star")
            star.innerHTML = null
        }

        })
        .catch((err) => {
            console.log(err)
        })

        let slide_date = slides_data[count].release_date

        if(slide_date == undefined) {
            slide_date = slides_data[count].first_air_date
        }

        let des = slides_data[count].overview
        
        slide_box.innerHTML = `
        <img src="https://image.tmdb.org/t/p/original/${backimg}" alt="" height="400px" width="100%" class="SlideShowImg">
         <div class="slide-text-box">
        <p class="slides-title">${slide_title}</p>
        <p class="slides-year-genre">${slide_date.split("-")[0]}</p>
        <div class="slides-des">
            <marquee  direction="left" >${des}</marquee>
        </div>
        <p class="staring"><span class="star">Staring : </span>Actors Actoress</p>
        </div>`
    
        count = count + 1

        if(count == slides_data.length) {
            count = 0
        }

        let SlideShowImg = document.querySelector(".SlideShowImg")

        SlideShowImg.onclick = function() {
            AddToLocalSlide(slidemovie_id)
        }

    },6000)



}

function AddToLocalSlide(slideid) {
    let getlocal = JSON.parse(localStorage.getItem("Bing-store"))

    getlocal.push(slideid)

    localStorage.setItem("Bing-store" , JSON.stringify(getlocal))

    setTimeout(() => {
        window.location.href = "about.html"
    },1500)
}