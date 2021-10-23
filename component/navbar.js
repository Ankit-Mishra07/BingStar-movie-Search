function navbar() {

        return `                <ul id="nav-list">
        <a href="index.html"><li>Bing Star</li></a>
        <a href="TV.html"><li>TV</li></a>
        <a href="movies.html"><li>Movies</li></a>
        <a href="sports.html"><li>Sports</li></a>
        <a href="subscribe.html"><li>Bing+</li></a>
        <a href="kids.html"><li>KIDS</li></a>
    </ul>
    <div>
        <input type="text" id="search_movies" placeholder="Search">
        <a href="vip.html"><button id="SIGNUP">BingVIP</button></a>
        <a href="login.html"><button id="LOGIN" >LOGIN</button></a> <span id="user__name"></span>
        <button id="logout">Logout</button>

        <div id="showmovie">
        
        </div>

    </div>

`

}

export {navbar}