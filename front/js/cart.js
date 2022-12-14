// on affiche les produits depuis le LS//

let productInStorage = JSON.parse(localStorage.getItem("basket"));
console.log('produits récupéré depuis le LS =>', productInStorage);


//*************************on récupere les produits//**************************************

const sectionProduct = document.querySelector('#cart__items');

function showProduct(){
    if (productInStorage === null || productInStorage ==0) 
    {

        //si le panier est vide alors on l'affiche dans le DOM
        const emptyBasket = document.createElement("div");
        emptyBasket.setAttribute("class", "container-empty-basket");
        sectionProduct.appendChild(emptyBasket);

        const emptyBasketText = document.createElement("p");
        emptyBasketText.textContent = "le panier est vide";
        emptyBasket.appendChild(emptyBasketText);

    } 
    else 
    { 
        //si le panier contient un produit on l'affiche
        console.log('le panier n est plus vide');

         
        for(let i=0; i<productInStorage.length; i++)
        {
            //on feetch le produit exact
            fetch(`http://localhost:3000/api/products/${(productInStorage[i].id)}`)
                .then ((response) => response.json())
                .then ((Product) =>
                {

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

                    addChangeEventListener(newInput, productInStorage[i]);

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


//***************fonction pour changer la quantité et rectifier le prix total ************************************************//

let basket =[];
let quantity_error = document.createElement("span");

function addChangeEventListener(newInput, curentProduct)
{

    let idChangeItem = curentProduct.id;
    let colorChangeItem = curentProduct.color;
    console.log(idChangeItem);
    console.log(colorChangeItem);

    
    newInput.addEventListener("change", (e) => 
    {
        if (e.target.value > 100)
        {
            e.target.value = 100;
            curentProduct.quantity = 100;
            localStorage.setItem("basket", JSON.stringify(productInStorage));
       } 
       else if (e.target.value < 1) 
       {
            e.target.value = 1;
            curentProduct.quantity = 1;
            localStorage.setItem("basket", JSON.stringify(productInStorage));
       } 
       else
       {
            curentProduct.quantity = parseInt(e.target.value);
            localStorage.setItem("basket", JSON.stringify(productInStorage));
       }
            
       showFinalPrice();
    });

};



//*****************************fonction pour supprimer le produit du panier et du LS*****************************//
function addDeleteEventListener (newParagrapheDelete, curentProduct)
{

    newParagrapheDelete.addEventListener("click", (event) => 
    {
        event.preventDefault();
        console.log(event);
        console.log(curentProduct);
        //on selectionne l'id du produit à supprimer
        let idDeleteItem = curentProduct.id;
        let colorDeleteItem = curentProduct.color;
        console.log(idDeleteItem);
        console.log(colorDeleteItem);

        //je filtre les elements à garder et ce ou le click supprimer à été fait
        productInStorage = productInStorage.filter(el => el.id !== idDeleteItem || el.color !== colorDeleteItem)
        localStorage.setItem('basket', JSON.stringify(productInStorage));

        // je supprime le produit du DOM
        event.target.closest('article').remove();
        alert("le produit à bien été supprimer du panier !");
        showFinalPrice();



    });
 };



//******************************************AFFICHAGE DU PRIX TOTAL*************************************************//
    
  function showFinalPrice()
  {
        let totalPrice = 0;
        let totalPriceItem = document.querySelector("#totalPrice");

        if( productInStorage.length > 0)
        {
            for(let i=0; i<productInStorage.length; i++)
            {
                totalPrice += productInStorage[i].quantity * productInStorage[i].price;
                console.log("prix = " + totalPrice);

                totalPriceItem.textContent = totalPrice;
                console.log('total', productInStorage[i].quantity * productInStorage[i].price);
    
                console.log('Nombre de produits dans le LS :  ', productInStorage.length);
            }
        }
        else
        {
            totalPriceItem.textContent = "0";

        }
  };
  showFinalPrice();

  /////////////////////////////////////////////////////////////////////////////////////////////////////

     // Gestion du formulaire et de l'envoie vers la page confirmation//

    // Formulaire querySelector
    let first_name = document.querySelector("#firstName");
    let last_name = document.querySelector("#lastName");
    let address = document.querySelector("#address");
    let city = document.querySelector("#city");
    let e_mail = document.querySelector("#email");
    let btn_order = document.querySelector("#order");

    // Formulaire Error querySelector
    let first_name_error = document.querySelector("#firstNameErrorMsg");
    first_name_error.style.color = "red";

    let last_name_error = document.querySelector("#lastNameErrorMsg");
    last_name_error.style.color = "red";

    let address_error = document.querySelector("#addressErrorMsg");
    address_error.style.color = "red";

    let city_error = document.querySelector("#cityErrorMsg");
    city_error.style.color = "red";

    let e_mail_error = document.querySelector("#emailErrorMsg");
    e_mail_error.style.color = "red";

    // Champs demandés pour le POST
    let contact = 
    {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        email: "",
    };

    // Event au click
btn_order.addEventListener("click", (e) => 
{
        e.preventDefault();

    // Création d'une classe pour fabriquer l'objet dans lequel iront les values du formulaire
        class Form 
        {
            constructor() 
            {
            this.firstName = first_name.value;
            this.lastName = last_name.value;
            this.address = address.value;
            this.city = city.value;
            this.email = e_mail.value;
            }
        }
    // Appel de l'instance de classe Formulaire pour créer l'objet FORM_VALUE
    const FORM_VALUE = new Form();

    // Const regEx pour le formulaire
    const REG_EX_LAST_FIRST_NAME = (value) => 
    {
        return /^[A-Za-z]{2,38}$/.test(value);
    };
    const REG_EX_CITY = (value) => 
    {
        return /^[A-Za-zéèàïêç\-\s]{1,50}\s+[0-9]{5}$/.test(value);
    };
    const REG_EX_ADDRESS = (value) => 
    {
        return /^[0-9]{1,5}\s+[A-Za-zéèàïêç\-\s]{2,50}$/.test(value);
    };
    const REG_EX_E_MAIL = (value) => 
    {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
    };

  // Control de la validité name
  function firstNameControl() 
    {
        let name_form = FORM_VALUE.firstName;
        if (REG_EX_LAST_FIRST_NAME(name_form)) 
        {
        first_name_error.innerHTML = "";
        return true;
        } 
        else 
        {
        first_name_error.innerHTML =
            "Le prénom doit avoir 3 lettres minimum et pas de caractères spéciaux ou chiffres";
        return false;
        }
    }

    // Control de la validité lastName
    function lastNameControl() 
    {
        let last_name_form = FORM_VALUE.lastName;
        if (REG_EX_LAST_FIRST_NAME(last_name_form)) 
        {
            last_name_error.innerHTML = "";
            return true;
        } 
        else 
        {
            last_name_error.innerHTML =
            "Le nom doit avoir 3 lettres minimum et pas de caractères spéciaux ou chiffres";
            return false;
        }
    }

    // Control de la validité address
    function addressControl() 
    {
        let address_form = FORM_VALUE.address;
        if (REG_EX_ADDRESS(address_form)) 
        {
            address_error.innerHTML = "";
            return true;
        } 
        else 
        {
            address_error.innerHTML =
            "Merci de renseigner votre adresse d'au maximum 50 caractères et débutant par des chiffres";
            return false;
        }
    }

  // Control de la validité city
    function cityControl() 
    {
        let city_form = FORM_VALUE.city;
        if (REG_EX_CITY(city_form)) 
        {
        city_error.innerHTML = "";
        return true;
        } 
        else 
        {
        city_error.innerHTML = `Merci de renseigner votre ville et votre code postal. Exemple : « Paris 00000 »`;
        return false;
        }
    }

    // Control de la validité email
    function emailControl() 
    {
        let email_form = FORM_VALUE.email;
        if (REG_EX_E_MAIL(email_form)) 
        {
        e_mail_error.innerHTML = "";
        return true;
        } 
        else 
        {
        e_mail_error.innerHTML =
            "E-mail non valide. Il doit contenir un @ et un point suivi d'au maximum 3 lettres";
        return false;
        }
    }

        // Vérification si la fonction return vrai ou faux
        let firstname_valid = firstNameControl(),
            lastname_valid = lastNameControl(),
            adress_valid = addressControl(),
            city_valid = cityControl(),
            email_valid = emailControl();
        if 
        (
            !firstname_valid ||
            !lastname_valid ||
            !adress_valid ||
            !city_valid ||
            !email_valid
        )
            return null;
  //-------------------------------------------------

  // Push uniquement les Id dans le tableau des produits
  let products = [];

    for (let productInStorage of products) 
    {
        products.push(productInStorage.id);
    }

  // Envoie de l'objet order vers le serveur
  fetch("http://localhost:3000/api/products/order",
    {
            method: "POST",
            headers: 
            {
            "Content-Type": "application/json",
            },
                body: JSON.stringify
                    (
                    {
                        contact: FORM_VALUE,
                        products: products,
                    }),
    })
        .then(async (response) => 
        {
            try 
            {
            const POST_ORDER = await response.json();
            let orderId = POST_ORDER.orderId;

            // Clear le localStorage
            localStorage.clear();
            window.location.assign("confirmation.html?id=" + orderId);
            } catch (e) 
            {
            console.log(e);
            }
        });
});