// Pour récupérer l'id dans la génération automatique de la page
let urlSearchParams = new URLSearchParams(document.location.search)
let id = urlSearchParams.get("id")
let lien = "http://localhost:3000/api/teddies/" + id

// Identification du contenaire d'origine
const container = document.getElementById("resultat")

// Constante pour la création d'éllément
const div = document.createElement("div")
const img = document.createElement("img")
const span = document.createElement("span")
const h3 = document.createElement("h3")
const h4 = document.createElement("h4")
const p = document.createElement("p")
const p2 = document.createElement("p")
const select = document.createElement("select")
const option = document.createElement("option")
const input = document.createElement("input")
const button = document.createElement("button")

function recuperationProduit() {

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

    .then(function(teddy) {

        // Hyérarchie
        container.appendChild(div)
        div.appendChild(img)
        div.appendChild(span)
        span.appendChild(h3)
        span.appendChild(h4)
        span.appendChild(p)
        span.appendChild(p2)
        span.appendChild(select)
        span.appendChild(input)
        span.appendChild(button)

        // contenu non textuel
        h3.innerHTML = teddy.name

        // faire une fonction pour le price / 100
        h4.innerHTML = teddy.price / 100 + ' €'

        img.src = teddy.imageUrl
        button.innerHTML = 'Ajouté'
        input.type = "number"
        input.name = "q2"
        input.value = "1"
        select.name = "couleur"
        
        p.innerText = teddy.description
        
        // Ajout des classes et id
        div.className = "col-10 col-lg-7"
        select.className = "deroulant"
        img.className = "img-produit"
        button.id = "ajouter"
        input.id = "number"
        select.id = "color"
        p2.id = "error"

        const ajouter = document.getElementById('ajouter');
        ajouter.addEventListener('click', onClique);

        console.log(teddy.colors)

        let lesCouleurs = teddy.colors;

        lesCouleurs.forEach( couleur => {

            const option = document.createElement("option")
            console.log(couleur)
            select.appendChild(option)
            option.value = couleur
            option.innerText = couleur
        });
    })
}

function onClique() {
    // Mise en place des variable
    const inputNumber = document.getElementById('number');
    let number = parseInt(inputNumber.value);
    const selectColor = document.getElementById('color');

    // BIEN PENSER A PRENDRE VALUE et non InnerText
    const color = selectColor.value;
    const p = document.getElementById("error");
    const name = document.getElementById("name");
    
    console.log("clique fait!")
    console.log(parseInt(inputNumber.value))

    // Vérification que ce soit bien un nombre
    if(Number.isInteger(number) === true && number > 0) {

        console.log(number + " produit " + color + " ajouté")

        p.innerText = number + " " + name + " de couleur " + color + " mis au panier.";

        // Mise en place du JSON

        let panierJSON = {
            _id: id,
            nombre: number,
            couleur: color,
            nom: name
        }

        console.log(name);

        let myNewJSON = JSON.stringify(panierJSON, null, 2);

        console.log(myNewJSON);
        
        // Si panierJSON n'est pas égale a vrai
        if (panierJSON != null){
            console.log("il y as un panierJSON")
        }
        
        /*

        panierJSON = JSON.parse(panierJSON)
        if (panierJSON != null) {

        let panierJSON = {
            _id: id,
            nombre: number,
            couleur: color,
            nom: name
        }

        let myNewJSON = JSON.stringify(panierJSON, null, 2);

        console.log(myNewJSON);

            // PRECEDENTE TENTATIVE
        /*let panierJSON = localStorage.getItem('panier')
        panierJSON = JSON.parse(panier)

        console.log(panierJSON)

        panier.open ();
        panier.write ("bubu");
        panier.close ();
        console.log(panierJSON)
        }else{
            //si il y as déjà un JSON
            console.log("déjà un json")
        }*/

    }else{
        p.innerText = "Erreur : Veuiller rentrer un nombre entier"
    }    
}

recuperationProduit();
