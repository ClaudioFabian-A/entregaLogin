
let items = 0;
let cartBanner = document.getElementById("cartbaner");

async function counterBanner() {
    let userCounter = await JSON.parse(sessionStorage.getItem("cart"));
    let idCart = "";
    if (userCounter) {
        idCart = await userCounter;
        let fetchCart = await fetch(`/api/carts/${idCart}`, { method: "GET", headers: { "content_Type": "application/json" }, });
        let artsCart = await fetchCart.json();
        let artsList = await artsCart[0].products;
        items = artsList.length;
    } else { items = 0; }
    cartBanner.innerHTML = items;
}

counterBanner();

async function itsCart() {
    let user = await JSON.parse(sessionStorage.getItem("cart"));
    let idCart = "";
    if (user) {
        idCart = await user;
    } else {
        let newCart = await fetch("/api/carts", { method: "post", headers: { "Content-Type": "application/json", }, });
        let artsCart = await newCart.json();
        idCart = await artsCart._id;
    }
    sessionStorage.setItem("cart", JSON.stringify(idCart));
    return idCart;
}
async function cartLink() {
    let cartLink = document.getElementById("cart");
    let idCarts = await itsCart();
    if (idCarts) {
        cartLink.link = `http://localhost:8080/cart/${await idCarts}`;

    } else {
        cartLink = "";
    }
}
cartLink();

async function artInCart(idProd) {
    let idCart = await itsCart();
    try {
        let addArt = await fetch(`api/carts/${idCart}/product/${idProd}`, { method: "post", headers: { "Content-Type": "application/json", }, });
        await counterBanner();
        await cartLink();
    } catch (error) {
        console.log(`bannerCart Q `, error);
    }
}
function addButton() {
    let addButton = document.getElementsByClassName("addButton");
    let idAddArts = null;
    for (i in addButton) {
        addButton[i].onclick = (e) => {
            idAddArts = e.target.attributes.id.nodeValues;
            artInCart(idAddArts);
        };
    }
}
addButton();