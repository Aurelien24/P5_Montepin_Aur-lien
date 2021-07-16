const tableau = document.getElementById("panier")

numberProduit = localStorage.getItem("numberProduit");
numberProfuit = JSON.parse(numberProduit)



/*testJSON =  {
    _id: "5be9c8541c9d440000665243null",
    nombre: "1",
    couleur: "Black",
    nom: "Robert"
}*/

function recuperationJeSaisPasQuoi() {

    console.log(localStorage.length)

    console.log(numberProfuit)


    //localStorage.setItem(2, JSON.stringify(testJSON));

    if (numberProfuit == null){
        
        panierVide();

    } else {
        for (let i = 1; i <= numberProfuit; i++){

            let panier = JSON.parse(localStorage.getItem(i));
            console.log(i)

            verificationEtPrix(i);
        }
    }

    const vider = document.getElementById('videPanier');
    vider.addEventListener('click',() => supprimerPanier());

    const valider = document.getElementById('valider');
    valider.addEventListener('click',() => validePanier());
}

function verificationEtPrix(i) {

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
    // retun pour ne pas géré la promesse ici

    .then(function(res) {
        if (res.ok) {
            // fait une fin de fonction
            return res.json();
        }
    })

    .then(function(produit) {
    /* if (produit != null){
            console.log(produit.price)
            td4.textContent = produit.price / 100 + " €"
            td5.textContent = produit.price * panier.nombre / 100 + " €"
        } else {
            td4.textContent = "0 €"
            td5.textContent = "0 €"
            td6.textContent = "Indisponible"
        }*/

        generationTableau(produit, panier);
    })

/*

    const promise1 = new Promise((fonction si tout ce passe bien, reject) => {
        produit sérialisé(() => {
          resolve("argument a mettre");
        }, prendre la fin);
      });
      
      promise1.then((value) => {
        console.log(value);
        // expected output: "foo"
      });
      
      console.log(promise1);
      // expected output: [object Promise] */
}

let prixTotal = 0;
let j = 0;
    
function generationTableau(produit, panier){

    const tr = document.createElement("tr")
    const td1 = document.createElement("td")
    const td2 = document.createElement("td")
    const td3 = document.createElement("td")
    const td4 = document.createElement("td")
    const td5 = document.createElement("td")
    const td6 = document.createElement("td")

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

    j ++;

    if (produit != null){
        console.log(produit.price)
        td4.textContent = produit.price / 100 + " €"
        td5.textContent = produit.price * panier.nombre / 100 + " €"

        prixTotal = prixTotal + (produit.price * panier.nombre) / 100
        console.log(prixTotal)
    } else {
        td4.textContent = "0 €"
        td5.textContent = "0 €"
        td6.textContent = "Non"
    }

    if (j == numberProfuit) {
        DerniereLigne()
    }
}
   // Essayer de voir si la fonctionne dessus peut ne pas vérifier si la ligne soit la dernière
function DerniereLigne() {

    const tr = document.createElement("tr")
    const td1 = document.createElement("td")
    const td2 = document.createElement("td")
    const td3 = document.createElement("td")
    const td4 = document.createElement("td")
    const td5 = document.createElement("td")
    const td6 = document.createElement("td")

    tableau.appendChild(tr)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)

    tableau.appendChild(tr)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)

    td4.textContent = "Prix total : "
    td5.textContent = prixTotal + " €"

    tr.id = "last"
}

function supprimerPanier(){
    // retirer le nom part rapport au let numberProfuit

    for (let i = 1; i <= numberProfuit; i++){
        localStorage.removeItem(i);

        if(i == numberProfuit){
            localStorage.removeItem("numberProduit");
            numberProfuit == 0;
            panierVide();
        }
    }
}

function panierVide(){
    resultat = document.getElementById('resultat');
    resultat.innerHTML = "";

    const p = document.createElement("p")

    resultat.appendChild(p)

    p.innerText = "Votre panier est vide"
}

function validePanier(){
    let nom = document.getElementById('nom');
    let tel = document.getElementById('tel');
    let mail = document.getElementById('email');
    let adresse = document.getElementById('adresse');
    let ville = document.getElementById('ville');
    let code = document.getElementById('code')

    v1 = nom.value
    v2 = tel.value
    v3 = mail.value
    v4 = adresse.value
    v5 = ville.value
    v6 = code.value

    console.log(v1)
    console.log(v2)
    console.log(v3)
    console.log(v4)
    console.log(v5)
    console.log(v6)

    alert("Nous vous remercion de votre commande " + v1)
}

recuperationJeSaisPasQuoi()