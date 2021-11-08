import {navbar} from "./component/navbar.js"

    let nav = document.getElementById("nav")
    nav.innerHTML = navbar()


    let showmovie = document.getElementById("showmovie")

    let timerId;

    let body = document.querySelector("body")
    body.addEventListener("click" , hide_showmovie)

    function hide_showmovie() {
        setTimeout(() => {
            showmovie.style.display = "none"
        },2000)
    }

    // for search input

    let search_movies = document.getElementById("search_movies")

    search_movies.addEventListener("input" , debounce)

    
    async function showSearchResult(movie_name) {
            let res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=953076d46292d5b9b918b65d89cc9419&query=${movie_name}`)
            let data = await res.json()
            return data.results
    }

    function appendSearched(searched_result) {
        console.log("search:", searched_result)
    
    searched_result.forEach((Sdata) => {
       
    let div = document.createElement("div")
    div.setAttribute("class" , "result")

    let Simg = Sdata.poster_path

    if(Simg === null) {
        Simg = Sdata.backdrop_path
    }
    if(Simg == null) {
        Simg = Sdata.poster_path
    }
  
    let poster = document.createElement("img")
    poster.src = `https://image.tmdb.org/t/p/w500${Simg}`

    let Stitle = Sdata.title

    if(Stitle== undefined) {
        Stitle = Sdata.original_title
    }

    let Title = document.createElement("p")
    Title.setAttribute("class" , "title")
    Title.innerText = Stitle


    div.onclick = function() {
        addtodetail(Sdata.id)
    }
    
    let Syear = Sdata.release_date

    if(Syear == undefined) {
        Syear = Sdata.first_air_date
    }

    let year = document.createElement("p")
    year.textContent = Syear.split("-")[0]

    let yt = document.createElement("div")
    yt.setAttribute("class" , "yt")

    yt.append(Title,year)

    div.append(poster,yt)

    showmovie.append(div)
        })
    }

   
    async function main() {

        let name = document.getElementById("search_movies").value
    
        let getresponse = await showSearchResult(name)

        appendSearched(getresponse)
    }

    function debounce() {

        showmovie.innerHTML = null
        showmovie.style.display = "block"
        if(timerId) {
            clearTimeout(timerId)
        }

        timerId = setTimeout(() => {

            main()

        },1000)
    }
    

    //login

    if(localStorage.getItem("Bing-login") === null) {
        localStorage.setItem("Bing-login" , JSON.stringify([]))
    }
    

    let getdata = JSON.parse(localStorage.getItem("Bing-login"))
    if(getdata.length >= 1) {
    let user__ = getdata[getdata.length-1]
    let user__name = document.getElementById("user__name")
    user__name.innerText = user__.name
    

    }

    let user__name = document.getElementById("user__name")
    if(user__name.innerText !== "") {
        let LOGINn = document.getElementById("LOGIN")
        LOGINn.style.display = "none"
    }

    user__name.addEventListener("click" , showLogout)

    let logout = document.getElementById("logout")
    logout.addEventListener("click" , log_out)

    let flag_out = true
    function showLogout() {
       
        if(flag_out) {
        logout.style.display = "block"
        flag_out = false
        } else {
            logout.style.display = "none"
            flag_out = true
        }
    }

    function log_out() {
        

        JSON.parse(localStorage.removeItem("Bing-login"))
   
        
        logout.style.display = "none"
        let LOGINn = document.getElementById("LOGIN")
        LOGINn.style.display = "block"

        setTimeout(() => {
            window.location.href = "index.html"
        }, 1500);
       

    }




    if(localStorage.getItem("Bing-store") === null) {
        localStorage.setItem("Bing-store" , JSON.stringify([]))
    }

    function addtodetail(Sdata) {
        let store = JSON.parse(localStorage.getItem("Bing-store"))

        store.push(Sdata)
         localStorage.setItem("Bing-store" , JSON.stringify(store))

         setTimeout(() => {
            window.location.href = "about.html"
        },1500)
    }
    