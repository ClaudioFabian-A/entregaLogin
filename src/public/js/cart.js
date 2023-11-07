window.onload = function () {

    itemsCarts();
    let cartValue = document.getElementsByClassName("CartValue");
    for (let i = 0; i < cartValue; index++) {
        let idProd = cartValue[i].id;
        let price = document.getElementById(`p${idProd}`);
        let quantity = document.getElementById(`q${idProd}`);
        cartValue[i].innerHTML = Number(price.innerHTML) * Number(quantity.innerHTML);
    }
};
 
let counter = 0;
let quantityCarts = document.getElementById("iAn");

async function itemsCarts(){
    let user = await JSON.parse(sessionStorage.getItem("cart"));
    let idCart = "";
    if (user){
        idCart = await user;
        let idCartParams = await fetch(`/api/carts/${idCart}`,{method:"get",headers:{"Content-Type":"application/json"},});
    
    let arts = await idCartParams.json();
    let artsList = await arts[0].products;
    counter = artsList.length;
    }else{
        idCart =window.location.pathname.split("/")[2];
        let idCartParams= await fetch(`/api/carts/${idCart}`,{method:'get',headers:{"content-Type":"application/json"}});
        let arts= await idCartParams.json();
        let artsList= await arts[0].products;
        counter = artsList.length;
    }
    cartValue.innerHTML= counter;
}