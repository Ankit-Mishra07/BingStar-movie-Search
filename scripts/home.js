const main = document.querySelector(".main")



fetch(genres_list_http + new URLSearchParams ({
    api_key: api_key

}))
.then((res) => {
    return res.json()
})
.then(data =>  {
    console.log("gen:",data)
    data.genres.forEach(item => {
        fetchMoviesListByGenres(item.id, item.name)
    })
})

const fetchMoviesListByGenres = (id, genres) => {
    fetch(movie_genres_http + new URLSearchParams({
        api_key: api_key,
        with_genres : id,
        page: Math.floor(Math.random() * 3) + 1
    }))

    .then(res => res.json())
    .then(data => {
        //console.log(data)
        makeCategoryElement(`${genres}_movies`, data.results)
    })
    .catch(err => console.log(err))
}

const makeCategoryElement = (category, data) => {
    main.innerHTML += `<div class="movie-list">

    <button class="pre-btn"><img src="https://th.bing.com/th/id/OIP.kCBpFtC95QkdE6xnwhaAUgHaFw?w=273&h=212&c=7&r=0&o=5&pid=1.7" alt=""></button>

    <h1 class="movie-category">${category.split("_").join(" ")}</h1>
    <div class="movie-container"  id="${category}">

    </div>
    <button class="nxt-btn"><img src="https://th.bing.com/th/id/OIP.kNi196qoAYTExBiXd3GvcwHaFw?w=260&h=202&c=7&r=0&o=5&pid=1.7" alt=""></button>

</div>`;
makeCards(category, data)
}

const makeCards = (id, data) => {
    const movieContainer = document.getElementById(id)
  //  console.log("data:",data)
    data.forEach((item, i) => {
        if(item.backdrop_path == null) {
            item.backdrop_path = item.poster_path;
            if(item.backdrop_path == null) {
                return
            }
        }

        movieContainer.innerHTML += ` <div class="movie">
        <img src="${img_url}${item.backdrop_path}" alt="">
        <p class="movie-title">${item.title}</p>
    </div>`;

        let local = document.querySelector(".movie") 

        local.onclick = function() {
            addtolocal(item)
        }

    if(i == data.length -1) {
        setTimeout(() => {
            setupScrolling()
        },100)
    }

    })
}

function addtolocal(cal) {
    console.log("ankit:",cal)
}
