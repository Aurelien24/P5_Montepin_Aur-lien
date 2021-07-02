const tableau = document.getElementById("panier")

numberProduit = localStorage.getItem("numberProduit");
numberProfuit = JSON.parse(numberProduit)

var i = 1;

function recuperationJeSaisPasQuoi() {

    console.log(localStorage.length)

    console.log(numberProfuit)
    for (i; i <= numberProfuit; i++){

        let panier = JSON.parse(localStorage.getItem(i));
        console.log(i)

        if (panier != null){

            generationTableau();
            verificationEtPrix();

        }
    }
}

let tr = "tr" + i;
let td1 = "td" + i;
let td2 = "td" + i;
let td3 = "td" + i;
let td4 = "td" + i;
let td5 = "td" + i;
let td6 = "td" + i;

function generationTableau(){

    let panier = JSON.parse(localStorage.getItem(i));



    tr = document.createElement("tr")
    td1 = document.createElement("td")
    td2 = document.createElement("td")
    td3 = document.createElement("td")
    td4 = document.createElement("td")
    td5 = document.createElement("td")
    td6 = document.createElement("td")

    tableau.appendChild(tr)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)

    td1.textContent = panier.nom
    td2.textContent = panier.couleur
    td3.textContent = panier.nombre
    td6.textContent = "Oui"

    
}

function verificationEtPrix() {

    let panier = JSON.parse(localStorage.getItem(i));
    let lien = "http://localhost:3000/api/teddies/" + panier._id

    console.log(panier._id)

    fetch(lien, {
        method: "GET",
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        }
    })

    .then(function(res) {
        if (res.ok) {
            // fait une fin de fonction
            return res.json();
        }
    })

    .then(function(produit) {
        if (produit != null){
            console.log(produit.price)
            td4.textContent = produit.price / 100 + " €"
            td5.textContent = produit.price * panier.nombre / 100 + " €"
        } else {
            td4.textContent = "0 €"
            td5.textContent = "0 €"
            td6.textContent = "Indisponible"
        }
    })
}

recuperationJeSaisPasQuoi()