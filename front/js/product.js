    // redirigons la page des produits à chaque produit respectif avec l'ID
    const produit = (window.location.href).searchParams.get("id"); // recupéré l'Id via le lien URL 
        console.log(produit);


    //affichage du produit selectionné grace à l'ID
    let produitData = [];

    const fetchProduit = async () => {
        await fetch (`http://localhost:3000/api/products/${produit}`)
            .then((response) => response.json())
            .then((promise) => {
            console.log(promise);       
            })
        };

    const produitDisplay = async() => {
        await fetchProduit();

        document.getElementById("items").innerHTML = productData.map(
            (product) => `
            <div id="items${product._id}" class="items">
                    <article>
                        <img src="${product.imageUrl}" alt="image du canapé ${product.name}"/>
                        <h1>${product.name}</h1>
                        <p>${product.price}</p>
                        <p>${product.description}</p>
                    </article>
            </div>
            `,
        );
    };

    produitDisplay();

