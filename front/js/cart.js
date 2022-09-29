// on affiche les produits depuis le LS//

let productInStorage = JSON.parse(localStorage.getItem("basket"));
console.log('produits récupéré depuis le LS =>', productInStorage);

///on affiche les produits dans le selecteurs

const sectionProduct = document.querySelector('#cart__items');

//on récupere les produits//

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

            //let ProductBasket = [];


            let totalPrice = 0;

    for(let i=0; i<productInStorage.length; i++){
        //on feetch le produit exact
        fetch(`http://localhost:3000/api/products/${(productInStorage[i].id)}`)
            .then ((response) => response.json())
            .then ((promiseProduct) =>{

       console.log('on récupere le produit =>', promiseProduct);

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
              showImg.setAttribute('src', promiseProduct.imageUrl);
              showImg.setAttribute('alt', promiseProduct.altTxt);
              newDivImg.appendChild(showImg);

              let newDivContent = document.createElement('div');
               newDivContent.setAttribute("class", "cart__item__content");
               itemArticle.appendChild(newDivContent); 

              let newDivContentDescription = document.createElement('div');
               newDivContentDescription.setAttribute("class", "cart__item__content__description" );
               newDivContent.appendChild(newDivContentDescription);

              let newParagrapheName = document.createElement('h2');
              newParagrapheName.textContent = promiseProduct.name;
              newDivContentDescription.appendChild(newParagrapheName);

              let newParagrapheColor = document.createElement('p');
               newParagrapheColor.textContent = ("Color : " + promiseProduct.colors[i]);
               newDivContentDescription.appendChild(newParagrapheColor);

              let newParagraphePrice = document.createElement('p');
               newParagraphePrice.textContent = ("Price : " + promiseProduct.price + "€");
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


            
  ////AFFICHAGE DU PRIX TOTAL///


            
            totalPrice += productInStorage[i].quantity * promiseProduct.price;
            console.log("prix = " + totalPrice);
            
            let totalPriceItem = document.querySelector("#totalPrice");
            totalPriceItem.textContent = totalPrice;
            console.log('total', productInStorage[i].quantity * promiseProduct.price);
            });
            
            console.log('Nombre de produits dans le LS :  ', productInStorage.length);
          
               
        }
    }
}



showProduct();

