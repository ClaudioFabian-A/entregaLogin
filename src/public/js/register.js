

const  form = document.getElementById('registerForm');


form.addEventListener("submit",async e=>{
    e.preventDefault();

const data= new FormData(form);
const obj= {};
data.forEach(( value, key)=>obj[key]= value);
const response = await fetch('/api/session/register',{
    method:'POST',
    body:JSON.stringify(obj),
    headers:{"Content-Type":'application/json'}})

const result = await response.json();
    // window.location.replace("/login");


})