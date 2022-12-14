// AFFICHAGE PAGE PRODUIT//

function getParam (param)
{
    let queryURL = new URL(window.location.href);
    return queryURL.searchParams.get(param);
};
    
    //creation d'une variable pour contenir l'API
    const urlRequest = 'http://localhost:3000/api/products';
    
    //Fonction principale qui va appeler les éléments sur la page produit
    async function showProduct()
    {

        const response = await fetch(urlRequest + '/' + getParam('id'));
        const data = await response.json();
    
    //insertion titre dans Url 
        document.title = data.name;

    //insertion img
        let itemImg = document.querySelector('.item__img');
        let newImg = document.createElement('img');
        newImg.setAttribute('src', data.imageUrl);
        newImg.setAttribute('alt', data.altTxt);
        itemImg.appendChild(newImg);
    
     // insertion du nom
        let titleH1 = document.querySelector('#title');
        titleH1.textContent = data.name;

    // Insertion du prix
        let priceItem = document.querySelector('#price');
        priceItem.textContent = data.price;

     // Insertion de la description
        let contentItem = document.querySelector('#description');
        contentItem.textContent = data.description;

    //Insertion choix couleur
        let colors = data.colors;
        let colorsItem = document.querySelector('#colors');

        for (let i = 0; i < colors.length; i++) 
        {
            let color = colors[i];
            let optionColors = document.createElement('option');
            optionColors.setAttribute('value', data.colors);
            optionColors.textContent = color;
            colorsItem.appendChild(optionColors);
        };
    }
    
    showProduct();

 //////////local storage////////////

 let btnAddProduct = document.querySelector('#addToCart');


 let basket = [] ; //on crée le tableau panier

 //on ajoute le produit au panier après le click
  btnAddProduct.addEventListener('click',  () =>
  {
 
        let valueColor = document.querySelector('#colors').selectedOptions[0].text;// on recupere la couleur choisit
        let valueQuantity = document.querySelector('#quantity').value;//on récupère la quantité
        let valuePrice = document.querySelector('#price').textContent;//on recupere le prix
     
        // creation de l'alerte si le choix est defini ou non
        if (valueColor == '') 
        {
                alert('Merci de bien vouloir selectionné une couleur');//si la couleur n'est pas selectionné
        }
        else if (valueQuantity <= 0 || valueQuantity > 100) 
        {
                alert('Merci de bien vouloir choisir une quantité entre 1 et 100');//si la quantité est mal selectionné
        }
        else
        {
            //récupération du panier s'il est present dans le local storage
            let productInStorage = JSON.parse(localStorage.getItem('basket'));

            //creation du produit choisit
            let choiceProduct = 
            {
                id:getParam('id'),
                color:valueColor,
                quantity: Number(valueQuantity),
                price: Number(valuePrice),
            };

            if(productInStorage)
            {
                //on controle si le produit est dans le panier pour lui ajouter la quantité
                const getProductStorage = productInStorage.find
                (
                    (p) => 
                    p.id == choiceProduct.id && p.color == choiceProduct.color
                );

                    //si le produit est deja dans le panier
                    if(getProductStorage )
                    {
                        getProductStorage.quantity = 
                            getProductStorage.quantity+ choiceProduct.quantity;
                        localStorage.setItem('basket',JSON.stringify(productInStorage));
                        alert('le panier est bien à jour');
                        return;
                    }
                    productInStorage.push(choiceProduct);
                    localStorage.setItem('basket', JSON.stringify(productInStorage));
                    alert("l'article à bien été ajouté au panier!");
                    //sinon
            }else   
            {
                productInStorage =[];
                productInStorage.push(choiceProduct);
                localStorage.setItem('basket', JSON.stringify(productInStorage));
                alert("l'article à bien été ajouté au panier!");
            
            }
        }
 });