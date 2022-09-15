let productData = [];

//creation d'une promesse pour connecter à l'API
const fetchProduct = async () => {
    await fetch ("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((promise) => {
        productData = promise;
        console.log(productData);
    });
};

//fonction qui va nous permettre d'afficher les produits sur la page
const productDisplay = async () => {
    await fetchProduct();

    document.getElementById("items").innerHTML = productData.map(
        (product) => `
        <div id="items${product._id}" class="items article">
        <h3 class="items article h3">${product.name}</h3>
        <img class="items article img" src="${product.imageUrl}" alt="image du canapé ${product.name}"/>
        <p class="items article p">${product.description}</p>

        </div>
        `,
    );
};

productDisplay();







