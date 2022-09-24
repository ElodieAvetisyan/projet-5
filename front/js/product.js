function getParam (param){
    let queryURL = new URL(window.location.href);
    return queryURL.searchParams.get(param);
    };
    
    const urlRequest = 'http://localhost:3000/api/products';
                  
    async function showProduct(){

        const response = await fetch(urlRequest + '/' + getParam('id'));
        const data = await response.json();
    
    //insertion img
        let newImg = document.createElement('img');
        newImg.setAttribute('src', data.imageUrl);
        newImg.setAttribute('alt', data.altTxt);
        document.getElementsByClassName('item__img')[0].appendChild(newImg);
    
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

        for (let i = 0; i < colors.length; i++) {
        let color = colors[i];
        let optionColors = document.createElement('option');
        optionColors.setAttribute('value', data.colors);
        optionColors.textContent = color;
        colorsItem.appendChild(optionColors);
        };
    }
    
    showProduct();