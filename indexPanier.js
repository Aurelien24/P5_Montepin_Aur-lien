const tableau = document.getElementById("panier")

numberProduit = localStorage.getItem("numberProduit");
numberProfuit = JSON.parse(numberProduit)

function recuperationPanier() {

    if (numberProfuit == null){
        
        panierVide();

    } else {
        for (let i = 1; i <= numberProfuit; i++){

            console.log(i)

            verificationEtPrix(i);
        }
    }

    const vider = document.getElementById('videPanier');
    vider.addEventListener('click',() => supprimerPanier());

    document.querySelector('form').addEventListener('submit',(e) => validePanier(e));
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

    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })

    .then(function(produit) {
        generationTableau(produit, panier);
    })
}

let prixTotal = 0;
let j = 0;

toutProduit = [];
    
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

        // Le prix vient du fetch pour évité toute erreur de ce coté la
        td4.textContent = produit.price / 100 + " €"
        td5.textContent = produit.price * panier.nombre / 100 + " €"

        prixTotal = prixTotal + (produit.price * panier.nombre) / 100
        console.log(prixTotal)

        /* Méthode qui serais mieux
        objet = [produit._id, panier.nom, panier.nombre, panier.couleur, produit.price]

        toutProduit.push(objet);*/

        // Ne fonctionne pas si ont donne toute les donnée a l'API
        objet = produit._id;
        toutProduit.push(objet);

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

function validePanier(e){
    
    // coupe les comportements part défaut (aide a empécher le sulignement, clique droit...)
    e.preventDefault();

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

    valideRegExp(v1, v2, v3, v4, v5, v6);
}

function valideRegExp(v1, v2, v3, v4, v5, v6) {

    let nom = ""
    let tel = ""
    let mail = ""
    let adresse = ""
    let ville = ""
    let codePostal = ""

    let error = false

    // nom
    if(/^[A-Z]/.test(v1) && /[a-z]$/.test(v1) && v1.length <= 50){

        console.log("c'est bon!")

    } else { 
        console.log("a refaire !")
        console.log(RegExp)

        nom = ' nom';
        error = true;
    }

    //let regexPhone = "^((\\+)|(00)|(\\*)|())[0-9]{3,14}((\\#)|())$"
    // téléphone -> accepte + ou un chiffre
    if(/^(\+|[0-9])([0-9]*)([0-9]$)/.test(v2) && v2.length <= 16){

        console.log("c'est bon!")
    
    } else { 
        console.log("a refaire !")
        console.log(RegExp)

        tel = " téléphone";
        error = true;
    }

    // mail
    if(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v3) && v3.length <= 50){
       
        console.log("c'est bon!")

    } else { 
        console.log("a refaire !")
        console.log(RegExp)

        mail = " email";
        error = true;
    }

    // adresse
    if(v4.length <= 200){

        console.log("c'est bon!")

    } else { 
        console.log("a refaire !")
        console.log(RegExp)

        adresse = " adresse";
        error = true;
    }

    // ville
    if(/^[A-Z]/.test(v5) && v5.length <= 163){

        console.log("c'est bon!")

    } else { 
        console.log("a refaire !")
        console.log(RegExp)

        ville = " ville";
        error = true;
    }

    // code postal
    if(v6.length <= 50){
        
        console.log("c'est bon!")

    } else { 
        console.log("a refaire !")
        console.log(RegExp)

        codePostal = " code postal";
        error = true;
    }

    if(error == true){

        alert("Merci de remplir corectement la ou les informations suivante :"  + nom + tel + mail + adresse + ville + codePostal + " Le nom et la ville doivent débuté part une majuscule. Les espaces ne son pas accepter dans le numéro de téléphone");
        
    } else {

        //Envoyer a l'API pour récupérer un N° de commande
        
       let mesInfo = {
            firstName: v1,
            lastName: v2,
            address: v3,
            city: v4,
            email: v5
        }

        let MonJSONaEnvoyer = {
            contact : mesInfo,
            products : toutProduit
        };

        console.log(MonJSONaEnvoyer);
        
        fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
        },
            body : JSON.stringify(MonJSONaEnvoyer)
        })

        .then (function(info) {
            alert("Nous vous remercion de votre commande " + v1)

            return info.json();
        })

        .then (function(data) {
            console.log(data)

            // data.code est bidon
            let code = data.orderId
            let valeur = prixTotal * 100
            document.location.href="rendu.html?code=" + code + "&valeur=" + valeur; 
        })
    }
}

recuperationPanier()