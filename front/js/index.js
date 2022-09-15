let kanapData = [];

//creation d'une promesse pour connecter à l'API
const fetchKanap = async () => {
    await fetch ("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((promise) => {
        kanapData = promise;
        console.log(kanapData);
    });
};

//fonction qui va nous permettre d'afficher les produits sur la page
const kanapDisplay = async () => {
    await fetchKanap();
}

kanapDisplay();







