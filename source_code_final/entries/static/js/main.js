

let button = document.querySelector('#ajax-button');
let dataDiv = document.querySelector('#ajax-data');
let weatherDiv = document.querySelector('#weather');

let weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Durham,North Carolina&appid=d19c164ee24a3b1be034b477d5cfd32a"

let zipForm = document.querySelector("#zip-form")









// AJAX = Asynchronous Javascript and XML
// button.addEventListener('click', (event) => {
zipForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const zipFormData = new FormData(zipForm)
    fetch('ajax/create', {
        method: "POST",
            credentials: "same-origin",
            headers: {
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest", 
                "X-CSRFToken": csrftoken,
            },
            body: zipFormData
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            dataDiv.innerText = `This is what came back from the POST request:  ${data['my_data']}`
            //             dataDiv.innerText = `You have ${data['entry_count']} entries`
        })
    })
    
    fetch(weatherURL)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data)
        weatherDiv.innerText = `The temperature is ${Math.round((data['main'].temp - 273) * 9/5 + 32)}`
    })
    
    
    
    
    window.onscroll = function() {stickTheNav()};
    
    let navbar = document.getElementById("navbar");
    
    let sticky = navbar.offsetTop;
    
    function stickTheNav() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky")
        } else {
            navbar.classList.remove("sticky");
        }
    }




    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrftoken = getCookie('csrftoken');