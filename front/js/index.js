//j'assigne le tableau des élements à une constante
const productsList = document.getElementById("items");

//j'appelle l'API grace à fetch

fetch ("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((response) => displayProducts(response))
     

    function displayProducts(products){

        //je crée une boucle
      
        for (let i = 0; i < products.length; i++) {
      
            //on attribut le lien à chaque id
            let productLink = document.createElement("a");
            productLink.setAttribute("href",`product.html?id=${products[i]._id}`);

            //je créee la variable article et je la declare comme child de productlink
            let productArticle = document.createElement("article");

            //je crée la variable img et je la declare comme child de productArticle
            let productImg = document.createElement("img");
            productImg.setAttribute("src", products[i].imageUrl);
            productImg.setAttribute("alt", products[i].altTxt);
            productArticle.appendChild(productImg);
          

            //je crée la variable 'h3' et je le declare child de productArticle
            let productName = document.createElement("h3");
            productName.classList.add("productName");
            productName.textContent = products[i].name;
            productArticle.appendChild(productName);

            //je crée la variable description et je le declare child de productArticle
            let productDescription = document.createElement("p");
            productDescription.classList.add("productDescription");
            productDescription.textContent = products[i].description;
            productArticle.appendChild(productDescription);


            productLink.appendChild(productArticle);
            productsList.appendChild(productLink);

        }
    };



