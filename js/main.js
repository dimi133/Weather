const apiKey = '431d86ccde904508bf6184535240601'

// const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=London`;

// fetch(query).then((resp) => {
//     return resp.json()
// }).then((data) => {
//     console.log(data)
// });


const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');
const header = document.querySelector('.header');

function removeCard() {
    const prevCard = document.querySelector('.card');
    if(prevCard) prevCard.remove();
}


    
    async function getWeather(city){
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data
    }
            // console.log(data.location.name);
            // console.log(data.location.country);
            // console.log(data.current.temp_c);
            // console.log(data.current.condition.text);

    form.onsubmit = async function (e) {
    e.preventDefault();
    let city = input.value.trim();
    const data = await getWeather(city)   
            if(data.error) {
                removeCard();
                const html = `<div class="card">${data.error.message}</div>`;
                header.insertAdjacentHTML('afterend', html);
            }else{
                const html = `<div class="card">
                                    <div class="cardCity">
                                        ${data.location.name}
                                        <span>${data.location.country}</span>
                                    </div>
                                    <div class="weather">
                                        <div class="value">
                                            ${data.current.temp_c}<sup>&degc</sup>
                                        </div>
                                        <img src="${data.current.condition.icon}" alt="weather">
                                    </div>
                                    <div class="description">
                                        ${data.current.condition.text}
                                    </div>
                                    </div>`

                removeCard()
                header.insertAdjacentHTML('afterend', html);
            }
            e.target.reset();
        };