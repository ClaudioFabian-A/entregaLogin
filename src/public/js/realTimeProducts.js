const socketClient = io();



socketClient.on("prodList", (prodList) => {
    upProductList(prodList);
});



function upProductList(prodList) {
    const div = document.getElementById("container");
let prod = prodList;
let products = "";
div.innerHTML="";
prod.forEach((prodList) => {
    products +=`<div class="card" id="card${prodList.id}">
    <div>
      <img src="${prodList.thumbnail}"  alt="${prodList.title}"/>
      <h3>${prodList.title}</h3>
      <div>
        <p>${prodList.description}</p>
        <p>Categoría:${prodList.category}</p>
        <p>Código:${prodList.code}</p>
        <p>Stock:${prodList.stock}</p>
        <p>Precio: $${prodList.price}</p>
      </div >
    </div >
 </div >`;
 div.innerHTML = products;
    
});
}


const prodForm = document.getElementById("idForm");
prodForm.addEventListener("submit", (elements) => {
    elements.preventDefault();

    let title = prodForm.elements.title.value;
    let description = prodForm.elements.description.value;
    let stock = prodForm.elements.stock.value;
    let thumbnail = prodForm.elements.thumbnail.value;
    let category = prodForm.elements.category.value;
    let price = prodForm.elements.price.value;
    let code = prodForm.elements.code.value;



    socketClient.emit("updateProduct", {
        title,
        description,
        stock,
        thumbnail,
        category,
        price,
        code,

    });
    prodForm.reset();

});


document.getElementById("buttonSubmitDelete").addEventListener("click", (e) => {
    const deletePid = document.getElementById("pid");
    const deleteId = parseInt(deletePid.value);
    socketClient.emit("deleteById", deleteId);
    deletePid.value = "";


    Swal.fire({
        position: "top",
        icon: "success",
        title: "borrado",
        showConfirmButton: false,
        timer: 2000,
    });
});
// console.log('listo');


// console.log(socket);