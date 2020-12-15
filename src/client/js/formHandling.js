import { return_form_data } from './form_data';
const routes = require('./routerFunc.js');
const _DATA = return_form_data();

function performAction() {
  // get input data from user
  _DATA.from.value = document.getElementById(_DATA.from.id).value;
  _DATA.to.value = document.getElementById(_DATA.to.id).value;
  _DATA.departing.value = document.getElementById(_DATA.departing.id).value;
  _DATA.return.value = document.getElementById(_DATA.return.id).value;
};

function primaryFunction() {
      console.log(_DATA);
                performAction();
                POSTDATA();
                getKeys();
              
  };


     function getKeys (url = '/get-data',data = _DATA,keys) {
    const options = {method: 'GET'};
     fetch(url, options)
     .then(res =>{return !res.ok ? new Error(res.statusText):res.json();})
     .then(keys => {
       routes.apiFetch(_DATA,keys.geonamesUser,keys.weatherbitKey,keys.pixabayKey);
     });
  };

  function POSTDATA (url = '/post-data',data = _DATA) {
    const options = {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }, // Body data type must match "Content-Type" header 
      body: JSON.stringify(data)
    };
     fetch(url, options);
 
  };

  export { primaryFunction, performAction , POSTDATA, getKeys };
