let x = document.getElementById("login-form")
let y = document.getElementById("signup-form")
let z = document.getElementById("toggle")

function Showlogin() {
    x.style.left = "50px"
    y.style.left = "450px"
    z.style.left = "0px"
}
function Showregister() {
    x.style.left = "-400px"
    y.style.left = "50px"
    z.style.left = "110px"
}



let SIGNUP = document.getElementById("SIGNUP")
SIGNUP.addEventListener("click" , signup)



function signup(event) {
    event.preventDefault()
    let msg = document.getElementById("regmsg")
    let form = document.getElementById("signup-form")

    let user_data = {
        name:form.name.value,
        email:form.email.value,
        password:form.password.value,
        username:form.username.value,
        mobile:form.mobile.value,
        description:form.description.value,
    }

    let data = JSON.stringify(user_data)

    fetch("https://masai-api-mocker.herokuapp.com/auth/register" , {

        method: "POST",
        body: data,
        headers: {
            "Content-Type" : "application/json"
        },
    })

    .then((res) => {
        return res.json()
    })
    .then((res) => {
        //console.log(res)
      

       if(res.message === "Registration failed, user already exists") {
        msg.innerText = res.message
           msg.style.color = "red"
       } else {
           msg.style.color = "green"
           msg.innerText = res.message + " " + "Please login to move forward"
       }

       setTimeout(() => {

        form.name.value = ""
        form.email.value = ""
        form.password.value = ""
        form.username.value = ""
        form.mobile.value = ""
        form.description.value = ""
        msg.innerText = ""

       },3000)
        
    })
    .catch((err) => {
        console.log(err)
    })
}


let LOGIN = document.getElementById("LOGIN")
LOGIN.addEventListener("click" , login)

function login(event) {
    event.preventDefault()

    let form = document.getElementById("login-form")
    let msg1 = document.getElementById("logmsg")
    let user_data = {
        username:form.user.value,
        password:form.pass.value,
    }

    let data_to_match = JSON.stringify(user_data)

    
    fetch("https://masai-api-mocker.herokuapp.com/auth/login" , {

        method:"POST",
        body:data_to_match,
        headers: {
            "Content-Type" : "application/json"
        },
    })

    .then((res) => {
        return res.json()
    })
    .then((res) => {
        console.log(res)

        if(res.error == true) {
            msg1.innerText = "Invalid Crendentials 🤷"
            msg1.style.color = "red"
            msg1.style.fontSize = "12px"
            form.user.value = ""
            form.pass.value = ""
            setTimeout(() => {
                msg1.innerText = ""
            },4000)

        }else {
            form.user.value = ""
            form.pass.value = ""
            fetchmydata(user_data.username, res.token)
        }

    })
    .catch((err) => {
        console.log(err)
    })
}

function fetchmydata(username, token) {

    
    fetch(`https://masai-api-mocker.herokuapp.com/user/${username}` , {

        headers: {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}` ,
        },
    })
    
    .then((res) => {

        return res.json()

        })
        .then((res) => {
            
            addmydata(res)
        })
        .catch((err) => {
        console.log("err:" , err)
        })


}

if(localStorage.getItem("Bing-login") === null) {
    localStorage.setItem("Bing-login" , JSON.stringify([]))
}

function addmydata(res) {

    let get = JSON.parse(localStorage.getItem("Bing-login"))

    get.push(res)

    let user = document.getElementById("user")
    user.value = ""

    let pass = document.getElementById("pass")
    pass.value = ""


    localStorage.setItem("Bing-login" , JSON.stringify(get))

    setTimeout(() => {
        window.location.href = "index.html"
    },1000)


}