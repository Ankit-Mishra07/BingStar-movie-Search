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

    about_container.innerHTML = null

    let div = document.createElement("div")
    div.setAttribute("class" , "about-textdiv")

    let Title = document.createElement("h2")
    Title.innerText = detail.title

    let YG = document.createElement("p")
    YG.innerText = detail.release_date.split("-")[0] + " | " + detail.genres[0].name + ", " + detail.genres[1].name

    let ImdbRate = document.createElement("p")
    ImdbRate.innerText ="IMDB Rating : "  + detail.vote_average

    let overview = document.createElement("p")
    overview.innerText = detail.overview.substring(0, 200) + '...';

    
    const formatString = (currentIndex, maxIndex) => {
        return (currentIndex == maxIndex -1) ? '' : ', '
    }

    let stars = document.createElement("span")

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

    let staring = document.createElement("span")
    staring.innerText = "Starring : " 

    div.append(Title,YG,overview,staring,stars,ImdbRate)
    about_container.append(posters,div)
}


async function GetCastImages() {

        let res = await fetch(`https://api.themoviedb.org/3/movie/${getid}/credits?api_key=953076d46292d5b9b918b65d89cc9419`)

        let data = await res.json()
        appendCastImages(data.cast)
}
GetCastImages()
let cast_box = document.getElementById("cast-imagesdiv")
function appendCastImages(castData) {

    cast_box.innerHTML = null
    castData.forEach(({name,profile_path}) => {

        if(profile_path == null) {
            return
        }

        let div = document.createElement("div")
        div.setAttribute("class" , "img-name")

        let pic = document.createElement("img")
        pic.src = `https://image.tmdb.org/t/p/w500${profile_path}`
        
        let cast_nm = document.createElement("p") 
        cast_nm.innerText = name

        div.append(pic,cast_nm)
        cast_box.append(div)
    })
}


async function VideoClips(getid) {

    let res = await fetch(`https://api.themoviedb.org/3/movie/${getid}/videos?&api_key=953076d46292d5b9b918b65d89cc9419`)
    let data = await res.json()

    let trailerContainer = document.getElementById("video-clips-box")

    let maxClip = (data.results.length > 4) ? 4 : data.results.length

    for(let i = 0; i < maxClip; i++) {
        trailerContainer.innerHTML += `
        <iframe src="https://youtube.com/embed/${data.results[i].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    }
}

VideoClips(getid)




//recomdations

async function Recommendations(getid) {

    let res = await fetch(`https://api.themoviedb.org/3/movie/${getid}/recommendations?&api_key=953076d46292d5b9b918b65d89cc9419`)

    let data = await res.json()

    console.log("data:",data)

    let container = document.getElementById("recommended")
    let img_url = "https://image.tmdb.org/t/p/w500"
    for(let i = 0; i < 16; i++) {
        if(data.results[i].backdrop_path == null) {
            i++
        }
        container.innerHTML += `
        <div class="Recmovie" onclick="Recomaddtolocal(${data.results[i].id})">
            <img src="${img_url}${data.results[i].backdrop_path}" alt="">
            <p class="Recmovie-title">${data.results[i].title}</p>
            </div>`
    }    
}

Recommendations(getid)


function Recomaddtolocal(Rid) {

    let RgetLocal = JSON.parse(localStorage.getItem("Bing-store"))

    RgetLocal.push(Rid)

    localStorage.setItem("Bing-store" , JSON.stringify(RgetLocal))


    setTimeout(() => {

        window.location.href = "about.html"

    },1500)
}