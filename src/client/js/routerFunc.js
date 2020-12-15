// require fetch for api requests 
const fetch = require('node-fetch');
// global variables 
var lat,lng,imageUrl, duration;


function diffDay(date1, date2) {
    // getting time difference between two dates function
    let diffTime = Math.abs(date1 - date2);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
};

function updateUI(newData,index,userInput) {
    // function to update UI elements when the results are available from API
    let result = document.getElementById('result');
     let showResult = document.getElementById('showResult');
    // iterate over the images array and append them to document fragment
    for (let i = 0; i < imageUrl.length; i++ ) {
        var img = document.createElement('img');
        img.setAttribute('src', imageUrl[i]);
        img.setAttribute('alt', `image${i}`);
        showResult.appendChild(img);
      
       
    } ;
    
    
    // insert result HTML
    result.innerHTML = `<h1>${userInput.to.value} Trip on: ${userInput.departing.value}</h1></br>
<strong>Duration</strong>:${duration} days </br>
<strong>End Date</strong>: ${userInput.return.value}</br>
<strong>Going to</strong>: ${userInput.to.value}</br>
<strong>Weather</strong>: ${newData.data[index].weather.description}</br>
<strong>Wind Speed</strong>: ${newData.data[index].wind_spd} m/s</br>
<strong>Wind Direction</strong>: ${newData.data[index].wind_cdir_full}</br>
<strong>temperature In Celcius</strong>: ${newData.data[index].temp}</br>
<strong>Relative humidity</strong>: ${newData.data[index].rh}%</br>
<strong>Sea level pressure</strong>: ${newData.data[index].slp}(mb)</br>`;


};

const routes = {

    
     apiFetch(userInput,geonamesUser ,weatherbitKey  ,pixabayKey) {
    let geonames = `http://api.geonames.org/searchJSON?q=${userInput.to.value}&maxRows=10&username=${geonamesUser}`;
    let pixabay = `https://pixabay.com/api/?key=${pixabayKey}&q=${userInput.to.value}`;
   
        // first we fetch the pixabay api to get latitude and longitude of the city
    fetch(pixabay)
    .then(res =>{return !res.ok ? new Error(res.statusText):res.json();})
    .then(data => {
        imageUrl = new Array();
        // we will get the  image url from the given array in the json response 
        
        console.log(data);
        if (data.hits.length != 0){
            for (let i = 0; i < data.totalHits && i< 11 ; i++) { 
                // to insure that we have less than the total hits
                imageUrl.push(data.hits[i].webformatURL);
            }
         }else {
                for (let i = 0;i<10;i++) {
                    imageUrl.push(`https://source.unsplash.com/random/200x20${i}`);
                }
            }
        
        
        return fetch(geonames); 
    })
    .then(res =>{
        return !res.ok ? new Error(res.statusText):res.json();
    })
    .then(data => {
        // now we have access to pixabay response so we store what we need in a variable to fetch the next api using it 
        lng = data.geonames[0].lng;
        lat = data.geonames[0].lat;
            // didn't define variables to make them accessible withing the object methods 
            
            // here we calculate the time difference between the current date and the departing date, if the time difference is grater than 7 days then we need a future forecast which is another url
            travelDate = new Date(userInput.departing.value.split('-'));
            returnDate = new Date(userInput.return.value.split('-'));
            let currentDate= new Date();
    
        if (diffDay(currentDate,travelDate) < 7) {

        var weatherbit = `http://api.weatherbit.io/v2.0/current?key=${weatherbitKey}&lat=${lat}&lon=${lng}`;
    } else {
        var weatherbit = `http://api.weatherbit.io/v2.0/forecast/daily?key=${weatherbitKey}&lat=${lat}&lon=${lng}&start_date=${userInput.departing.value}`;
       
    }
        return fetch(weatherbit);
    
    }).then(res =>{
        return !res.ok ? new Error(res.statusText):res.json();
    }).then(function(data)  {
            
        // now we have  access to weatherbit response in order to update the html with the given data
        duration = diffDay(travelDate,returnDate);

            let index = data.data.length-1;

            updateUI(data,index,userInput);
           
    }).catch(error => console.log(error));

    },

};



module.exports = routes;
