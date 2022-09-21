    // redirigons la page des produits à chaque produit respectif avec l'ID
    let productData = [];
    
    const product1 = window.location.search.substring(1);
    //console.log(product);

    let api_url = "http://localhost:3000/api/products/"+product1;

    const fetchProduct = async () => {
        await fetch (api_url)
        .then((response) => response.json())
        .then((promise) => {
            productData = promise;
            console.log(productData);
        });
    };

    const productDisplay = async() => {
        await fetchProduct();
        document.getElementsByClassName("item")[0].innerHTML = 
        '<a href="./product.html'+productData['_id']
        +'"><article><img width="200px" src="'
        +productData['imageUrl']+'" alt="image du canapé"/><h1>' +productData['name']+'</h1><p>'
        +productData['description'] +'</p><p>'+productData['price']+'</p></article></a></div>';
    };

    productDisplay();


