    // redirigons la page des produits à chaque produit respectif avec l'ID
    const product = window.location.search;
    console.log(product);

    //affichage du produit selectionné grace à l'ID
    let productData = [];

    const fetchProduct = async () => {
        await fetch (`http://localhost:3000/api/products/${product}`)
            .then((response) => response.json())
            .then((promise) => {
            console.log(promise);       
            })
        };

    const productDisplay = async() => {
        await fetchProduct();

        document.getElementByclass("item").innerHTML = productData.map(
            (product) => `
            <div class="item"${item}>
                    <article>
                        <img src="${item__img}}" alt="image du canapé"/>
                        <h1>${title}</h1>
                        <p>${price}</p>
                        <p>${description}</p>
                    </article>
            </div> `,
        );
    };

    productDisplay();

