const row = document.querySelector('.row')
const all = document.querySelector('#all')
const search = document.querySelector('#search')
const searchBox = document.querySelector('.search-wrapper')
const searchInput = document.querySelector('#searchInput')
const searchBtn = document.querySelector('#searchBtn')
const name = document.querySelector('#name')
const flag = document.querySelector('#flag')
const language = document.querySelector('#language')
const capital = document.querySelector('#capital')
const text=document.querySelector('#text')
const maps = document.querySelector('#maps')

all.addEventListener('change',() => {
    if(all.checked) {
        row.classList.remove('hidden')
        searchBox.classList.add('hidden')
    }
})
search.addEventListener('change',() => {
    if(search.checked) {
        searchBox.classList.remove('hidden')
        row.classList.add('hidden')
    }
})
const handleGetCountries = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
            data.forEach(country => {
                row.innerHTML += `
         <div class="col-4"> 
           <div class = "card">
             <img src="${country.flags.png}" class="card-img-top" alt="...">
             <div class="card-body">
               <h5 class="card-title">${country.translations.rus.official}</h5>
               <p class="card-text">${country.capital}</p>
             </div>
           </div>
         </div>
             `
            })
        })
}
handleGetCountries()



searchBtn.addEventListener('click',()=> {
    let value = searchInput.value
    //fetch(`https://restcountries.com/v3.1/name/${value}`)
        .then(res => res.json())
        .then(json=>{
            console.log(json)
            //name.innerHTML=json[0].name.common

        })
})
function searchCountry() {
    const countryName = document.getElementById("country-name").value;
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => {
            const countryInfo = data[0];
            if (countryInfo) {
                document.getElementById("country-name-result").textContent = countryInfo.name.common;
                document.getElementById("capital").textContent = countryInfo.capital[0];
                document.getElementById("currency").textContent = countryInfo.currency[0].name;
                document.getElementById("language").textContent = countryInfo.languages[Object.keys(countryInfo.languages)[0]];
                document.getElementById("flag").src = countryInfo.flags.png;
                const googleMapsLink = (`https://www.google.com/maps?q=${countryInfo.latlng[0]},${countryInfo.latlng[1]}`);
                document.getElementById("google-maps-link").href = googleMapsLink;
            } else {
                alert("Страна не найдена.");
            }
        })
        .catch(error => {
            console.error(error);
        });
}

