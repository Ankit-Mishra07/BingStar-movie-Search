let get = JSON.parse(localStorage.getItem("Bing-login"))
let get_num = get[get.length-1]
let num = get_num.mobile

let your_num = document.getElementById("your-num")

if(num != "") {
your_num.innerText ="You are Logged In with"+ " " + num
}

function vip(){

    if(your_num.innerText === "") {
        window.location.href = "login.html"
    }else {
        window.location.href = "payment.html"
    }
}

