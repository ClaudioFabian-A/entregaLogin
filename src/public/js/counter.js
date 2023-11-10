let counter = 0;
let counterCart = document.getElementById("numeroCarrito")

async function itemsCarts() {
    let user = await JSON.parse(sessionStorage.getItem("counter"));
    let idCart = "";
    if (user) {
        idCart = await user;
        let idCartParams = fetch(`/api/cart/${idCart}`, { method: "get", headers: { "Content-type": "application/json", }, });
        let arts = await idCartParams.json();
        let artsList = await arts[0].products;
        counter = artsList.length;
    } else { counter = 0; }
    counterCart.innerHTML = counter;
}