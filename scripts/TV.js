
let TVbox = document.getElementById("TV-BOX")
async function PopularTV() {

    let res = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=953076d46292d5b9b918b65d89cc9419&language=en-US&page=1`)

    let data = await res.json()

    appendTV(data.results)
}

PopularTV()

function appendTV(TVDATA) {
    TVDATA.forEach((tv) =>{

        let div = document.createElement("div")

        div.onclick = function() {
            TVaddtolocal(tv.id)
        }

        let img = document.createElement("img")

        if(tv.backdrop_path != null) {
            img.src = `https://image.tmdb.org/t/p/w500${tv.backdrop_path}`
        }else {
            img.src =`https://image.tmdb.org/t/p/w500${tv.poster_path}`
        }

        let tvtitle = document.createElement("p")
        tvtitle.setAttribute("class" , "tvtitle")
        tvtitle.innerText = tv.name

        div.append(img,tvtitle)
        TVbox.append(div)
    }) 
}

function TVaddtolocal(tvid) {
    let tvgetlocal = JSON.parse(localStorage.getItem("Bing-store"))

    tvgetlocal.push(tvid)

    localStorage.setItem("Bing-store" , JSON.stringify(tvgetlocal))

    setTimeout(() => {
        window.location.href = "about.html"
    },1500)
}