//////////local storage////////////

let btnAddProduct = document.querySelector('#addToCart');

//on ajoute le produit au panier après le click

btnAddProduct.addEventListener('click', () => {
    
    let valueColor = document.querySelector('#colors').value; //on récupère la couleur qui à été choisit
    let valueQuantity = document.querySelector('#quantity').value;//on récupère la quantité
    let basket = []; //on crée le tableau panier
    
// creation de l'alerte si le choix est defini ou non
    if (valueColor == '') {
            alert('Merci de bien vouloir selectionné une couleur');//si la couleur n'est pas selectionné
    }else if (valueQuantity <= 0 || valueQuantity > 100) {
            alert('Merci de bien vouloir choisir une quantité entre 1 et 100');//si la quantité est mal selectionné
    }else{
        //récupération du panier s'il est present dans le local storage
        let productInStorage = JSON.parse(localStorage.getItem('basket'));

        //creation du produit choisit
        let choiceProduct = {
                id:unitArticle._id,
                name:unitArticle.name,
                color:valueColor,
                quantity: Number(valueQuantity),
        };

    if(productInStorage){
        //on controle si le produit est dans le panier pour lui ajouter la quantité
        const getProductStorage = productInStorage.find(
            (p) => 
                  p.id == choiceProduct.id && p.color == choiceProduct.color
        );

        //si le produit est deja dans le panier
    if(getProductStorage ){
        getProductStorage.quantity = 
                getProductStorage.quantity+ choiceProduct.quantity;
        localStorage.setItem(
            'basket',
            JSON.stringify(productInStorage)
        );
        alert('le panier est bien à jour');
        window.location.reload();
        return;
    }
    productInStorage.push(choiceProduct);
    localStorage.setItem('basket', JSON.stringify(productInStorage));
    //sinon
    }else   {
        productInStorage =[];
        productInStorage.push(choiceProduct);
        localStorage.setItem('basket', JSON.stringify(productInStorage));
        alert("l'article à bien été ajouté au panier!");
        window.location.reload();
            }
         }
    });