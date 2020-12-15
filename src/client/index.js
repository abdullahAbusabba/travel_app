// custome style sheets
import './styles/_custom.scss';
import './styles/nav.scss';
import './styles/variables.scss';
import './styles/modal.scss';

// font awesome files
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
// import javascript functions to handle api and form action
import { primaryFunction } from './js/formHandling';

const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');
let to = document.getElementById('to-city');
let from = document.getElementById('from-city');
let departingDate = document.getElementById('departing');
let returnDate = document.getElementById('return');
const dateRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
// toggle nav 
toggle.addEventListener('click', () => {
  document.body.classList.toggle('show-nav');
  console.log(toggle.className);
});

// show form modal
open.addEventListener('click', ()=>{
  modal.classList.add('show-modal');
  
});

// hide form modal
close.addEventListener('click', ()=>{
  modal.classList.remove('show-modal');
  
});
//hide modal on outside click 
window.addEventListener('click', (e)=> {
  e.target == modal ? modal.classList.remove('show-modal') : false;
});

// show input error messages
 
// primary
form.addEventListener('submit', function(e){
  e.preventDefault();
  e.stopPropagation();
  checkRequired([to,from,departingDate,returnDate]);
  
});
// show Error text in form
 function showError(input,message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
};
// show success text in form
function showSuccess(input){
  const formControl = input.parentElement;
  formControl.classList = 'form-control success';
  const small = formControl.querySelector('small');
    small.innerText = 'Valid';
};
// check required fields 
function checkRequired (inputArr) {
  inputArr.forEach(function(input){
    if (input.value.trim() === '' ) {
      showError(input,'This Field Is Required');
    } else if (input.placeholder === 'yyyy-mm-dd') {
      dateRegex.test(input.value) ? showSuccess(input): showError(input,'Invalid. Date must be YYYY-MM-DD');
    } else {
      showSuccess(input);
     primaryFunction();
      setTimeout(()=> modal.classList.remove('show-modal'), 250);
    }
  });
};

export { 
  primaryFunction
};

