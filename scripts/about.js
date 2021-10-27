let getlocalS = JSON.parse(localStorage.getItem("Bing-store"))

let getid = getlocalS[getlocalS.length-1]

async function ShowDetailofMovie() {
    let res = await fetch(`https://api.themoviedb.org/3/movie/${getid}?&api_key=953076d46292d5b9b918b65d89cc9419`)

    let data = await res.json()
    appendDetailOfmovie(data)
}

ShowDetailofMovie()
let about_container = document.getElementById("about-container")
function appendDetailOfmovie(detail) {

    let div = document.createElement("div")
    div.setAttribute("class" , "about-textdiv")

    let Title = document.createElement("h2")
    Title.innerText = detail.title

    let YG = document.createElement("p")
    YG.innerText = detail.release_date + " | " + detail.genres[0].name + ", " + detail.genres[1].name

    let ImdbRate = document.createElement("p")
    ImdbRate.innerText ="IMDB Rating : "  + detail.vote_average

    let overview = document.createElement("p")
    overview.innerText = detail.overview

    
    const formatString = (currentIndex, maxIndex) => {
        return (currentIndex == maxIndex -1) ? '' : ', '
    }

    let stars = document.createElement("p")

    fetch(`https://api.themoviedb.org/3/movie/${getid}/credits?api_key=953076d46292d5b9b918b65d89cc9419`)

    .then((res) => {
        return res.json()
    })
    .then((data) => {
        for(let i = 0; i < 5; i++) {
        stars.innerText += data.cast[i].name + formatString(i,5)
        }
    })
    .catch((err) => {
        console.log("err:" ,err)
    })
    
    let posters = document.createElement("img")
    posters.src = `https://image.tmdb.org/t/p/original${detail.backdrop_path}`
    if(posters.src == null) {
        posters.src = `https://image.tmdb.org/t/p/original${detail.poster_path}`
    }

    div.append(posters,YG,overview,stars,ImdbRate)
    about_container.append(div)
}