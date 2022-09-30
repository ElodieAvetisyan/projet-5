// on affiche les produits depuis le LS//

let productInStorage = JSON.parse(localStorage.getItem("basket"));
console.log('produits récupéré depuis le LS =>', productInStorage);


//*************************on récupere les produits//**************************************

const sectionProduct = document.querySelector('#cart__items');

function showProduct(){
    if (productInStorage === null || productInStorage ==0) {

        //si le panier est vide alors on l'affiche dans le DOM
        const emptyBasket = document.createElement("div");
        emptyBasket.setAttribute("class", "container-empty-basket");
        sectionProduct.appendChild(emptyBasket);

        const emptyBasketText = document.createElement("p");
        emptyBasketText.textContent = "le panier est vide";
        emptyBasket.appendChild(emptyBasketText);

    }else{ //si le panier contient un produit on l'affiche
        console.log('le panier n est plus vide');

         
    for(let i=0; i<productInStorage.length; i++){
        //on feetch le produit exact
        fetch(`http://localhost:3000/api/products/${(productInStorage[i].id)}`)
            .then ((response) => response.json())
            .then ((Product) =>{

              console.log('on récupere le produit =>', Product);

                    //affichage des produits dans le panier//

              let itemArticle = document.createElement("article");
              sectionProduct.appendChild(itemArticle);
              itemArticle.className = "cart__item";

              let itemId = document.createElement("data-id");
              itemId.setAttribute("data-id", "{product-ID}");
              itemArticle.appendChild(itemId);
             
              let itemColor = document.createElement("data-color");
              itemColor.setAttribute( "data-color","{product-color}");
              itemArticle.appendChild(itemColor);

              let newDivImg = document.createElement('div');
              newDivImg.setAttribute("class", "cart__item__img");
              itemArticle.appendChild(newDivImg);

              let showImg = document.createElement('img');
              showImg.setAttribute('src', Product.imageUrl);
              showImg.setAttribute('alt', Product.altTxt);
              newDivImg.appendChild(showImg);

              let newDivContent = document.createElement('div');
               newDivContent.setAttribute("class", "cart__item__content");
               itemArticle.appendChild(newDivContent); 

              let newDivContentDescription = document.createElement('div');
               newDivContentDescription.setAttribute("class", "cart__item__content__description" );
               newDivContent.appendChild(newDivContentDescription);

              let newParagrapheName = document.createElement('h2');
              newParagrapheName.textContent = Product.name;
              newDivContentDescription.appendChild(newParagrapheName);

              let newParagrapheColor = document.createElement('p');
               newParagrapheColor.textContent = ("Color : " + Product.colors[i]);
               newDivContentDescription.appendChild(newParagrapheColor);

              let newParagraphePrice = document.createElement('p');
               newParagraphePrice.textContent = ("Price : " + Product.price + "€");
               newDivContentDescription.appendChild(newParagraphePrice);

              let newDivSetting = document.createElement('div');
               newDivSetting.setAttribute("class", "cart__item__content__settings");
               newDivContent.appendChild(newDivSetting);


            // on ajoute les quantités et le texte 

               let newDivQuantity = document.createElement('div');
               newDivQuantity.setAttribute("class", "cart__item__content__settings__quantity");
               newDivSetting.appendChild(newDivQuantity);

               let newParagrapheQuantity = document.createElement('p');
               newParagrapheQuantity.textContent = "Qté : ";
               newDivQuantity.appendChild(newParagrapheQuantity);
               
            //on ajoute les input

              let newInput = document.createElement('input');
              newInput.setAttribute("type", "number");
              newInput.setAttribute("class", "itemQuantity");
              newInput.setAttribute("name", "itemQuantity");
              newInput.setAttribute("min", "1");
              newInput.setAttribute("max","100");
              newInput.setAttribute("value", `${productInStorage[i].quantity}`);
              newDivQuantity.appendChild(newInput);

            //supprimer un produit
              let newDivDelete = document.createElement('div');
              newDivDelete.setAttribute("class", "cart__item__content__settings__delete");
              newDivSetting.appendChild(newDivDelete);

              let newParagrapheDelete = document.createElement('p');
              newParagrapheDelete.setAttribute("class", "deleteItem");
              newDivDelete.appendChild(newParagrapheDelete);
              newParagrapheDelete.textContent= "supprimer";

             addDeleteEventListener (newParagrapheDelete, productInStorage[i]);

            });
          
               
        }
    }
}

showProduct();


//***************fonction pour changer la quantité************************************************//

let basket =[];
let quantity_error = document.createElement("span");

function changeInput() {
    
  let input_qty = document.querySelectorAll(".cart__item");
  input_qty.forEach((input_qty) => {
    input_qty.addEventListener("change", (e) => {

      let article = input_qty.closest("article");
      let data_id = article.getAttribute("data-id");
      let data_color = article.getAttribute("data-color");

      for (let i = 0; i < productInStorage.length; i++) {
        if (productInStorage[i].id === data_id && productInStorage[i].color === data_color) {
          if (e.target.value > 100) {
            e.target.value = 100;
            productInStorage[i].quantity = 100;
            localStorage.setItem("basket", JSON.stringify(basket));
          } else if (e.target.value < 1) {
            e.target.value = 1;
            productInStorage[i].quantity = 1;
            localStorage.setItem("basket", JSON.stringify(basket));
          } else {
            productInStorage[i].quantity = parseInt(e.target.value);
            localStorage.setItem("basket", JSON.stringify(basket));
          }
        }
      }
    });
  });
}

changeInput();

//*****************************fonction pour supprimer le produit du panier et du LS*****************************//
function addDeleteEventListener (newParagrapheDelete, curentProduct)
{

    newParagrapheDelete.addEventListener("click", (event) => 
    {
        event.preventDefault();
        console.log(event);

        //on selectionne l'id du produit à supprimer
        let idDeleteItem = curentProduct.id;
        let colorDeleteItem = curentProduct.colors;
        console.log(idDeleteItem);
        console.log(colorDeleteItem);

        //je filtre les elements à garder et ce ou le click supprimer à été fait
        productInStorage = productInStorage.filter(el => el.id !== idDeleteItem || el.colors !== colorDeleteItem)
        localStorage.setItem('basket', JSON.stringify(productInStorage));

        // je supprime le produit du DOM
        event.target.closest('article').remove();
        alert("le produit à bien été supprimer du panier !");
        showProduct();
        showFinalPrice();

    });
 };



//******************************************AFFICHAGE DU PRIX TOTAL*************************************************//
    
  let totalPrice = 0;


  function showFinalPrice()
  {
    for(let i=0; i<productInStorage.length; i++)
    {

                totalPrice += productInStorage[i].quantity * productInStorage[i].price;
                console.log("prix = " + totalPrice);
                
                let totalPriceItem = document.querySelector("#totalPrice");
                totalPriceItem.textContent = totalPrice;
                console.log('total', productInStorage[i].quantity * productInStorage[i].price);


         console.log('Nombre de produits dans le LS :  ', productInStorage.length);

    }
  };

  showFinalPrice();
