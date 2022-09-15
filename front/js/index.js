let productData = [];

//creation d'une promesse pour connecter à l'API
const fetchProduct = async () => {
    await fetch ("http://localhost:3000/api/products")
    .then((response) => response.json())
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
        <div id="items${product._id}" class="items">
            <a>
                <article>
                    <img src="${product.imageUrl}" alt="image du canapé ${product.name}"/>
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                </article>
            </a>
        </div>
        `,
    );
};

productDisplay();







