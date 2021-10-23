import {navbar} from "./component/navbar.js"

    let nav = document.getElementById("nav")
    nav.innerHTML = navbar()


    let showmovie = document.getElementById("showmovie")

    let timerId;

    let body = document.querySelector("body")
    body.addEventListener("click" , hide_showmovie)

    function hide_showmovie() {
        showmovie.style.display = "none"
    }

    // for search input

    let search_movies = document.getElementById("search_movies")

    search_movies.addEventListener("input" , debounce)

    
    async function showSearchResult(movie_name) {
            let res = await fetch(`http://www.omdbapi.com/?apikey=2b79427&s=${movie_name}`)
            let data = await res.json()
            return data.Search
    }

    function appendSearched(searched_result) {
        
    
    searched_result.forEach(({Title,imdbID,Poster,Year}) => {
       
    let div = document.createElement("div")
    div.setAttribute("class" , "result")
  
    let poster = document.createElement("img")
    poster.src = Poster

    let title = document.createElement("p")
    title.setAttribute("class" , "title")
    title.innerText = Title


    div.onclick = function() {
        addtodetail(imdbID)
    }
    

    let year = document.createElement("p")
    year.textContent = Year

    let yt = document.createElement("div")
    yt.setAttribute("class" , "yt")

    yt.append(title,year)

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

        window.location.href = "index.html"

    }