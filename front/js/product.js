// redirigons la page des produits à chaque produit respectif avec l'ID
let productId = new URL(window.location.href).searchParams.get("id");//recupéré l'ID via le lien URL
console.log(productId);

//affichage du produit selectionné grace à l'ID

let getProduct = async () => {
    await fetch ("http://localhost:3000/api/products"+productId)
    .then((response) => response.json()) // formater la reponse en Json
    .then ((product) => {
        productId = product;
        console.log(productId);
    });
};

getProduct();