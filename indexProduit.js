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
const h1 = document.createElement("h1")
const prix = document.createElement("p")
const p = document.createElement("p")
const p2 = document.createElement("p")
const select = document.createElement("select")
const option = document.createElement("option")
const input = document.createElement("input")
const button = document.createElement("button")

let repetition = false;

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
            return res.json();
        }else{
            redirection();
        }
    })

    .then(function(teddy) {

        // Hyérarchie
        container.appendChild(div)
        div.appendChild(img)
        div.appendChild(span)
        span.appendChild(h1)
        span.appendChild(prix)
        span.appendChild(p)
        span.appendChild(p2)
        span.appendChild(select)
        span.appendChild(input)
        span.appendChild(button)

        h1.innerHTML = teddy.name
        prix.innerHTML = teddy.price / 100 + ' €'

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
        prix.className = "prix"
        h1.id = "titre-h1-produit"
        button.id = "ajouter"
        input.id = "number"
        select.id = "color"
        p2.id = "error"

        const ajouter = document.getElementById('ajouter');
        ajouter.addEventListener('click',() => onClique(teddy));

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

function onClique(teddy) {
    console.log(teddy);
    
    // Mise en place des variable
    const inputNumber = document.getElementById('number');
    let number = parseInt(inputNumber.value);
    const selectColor = document.getElementById('color');
    const color = selectColor.value;
    const p = document.getElementById("error");
    const nomProduit = document.getElementById("name");
    const name = teddy.name;

    repetition = false;
    
    console.log("clique fait!")
    console.log(parseInt(inputNumber.value))

    // Vérification que ce soit bien un nombre
    if(Number.isInteger(number) === true && number > 0) {

        console.log(number + " produit " + color + " ajouté")

        p.innerText = number + " " + name + " de couleur " + color + " mis au panier.";

        let keyRepetition = "produit" + id + color;

        let panierJSON = {
            superClef: keyRepetition,
            _id: id,
            nombre: number,
            couleur: color,
            nom: name
        }

        if (localStorage.getItem("numberProduit") == null){

            let numberProduit = 0;

            localStorage.setItem("numberProduit", JSON.stringify(numberProduit));
        }

        numberProduit = localStorage.getItem("numberProduit");
        numberProduit = JSON.parse(numberProduit)

        for (let i = 0; i <= numberProduit; i++){
            let objet = localStorage.getItem(i);
            objet = JSON.parse(objet)
            console.log(i)
            
            if (objet != null){

                console.log(objet.superClef)

                if (objet.superClef === keyRepetition){

                    repetition = true;
    
                    let panierJSON = {
                        superClef: keyRepetition,
                        _id: id,
                        nombre: number + objet.nombre,
                        couleur: color,
                        nom: name
                    }
    
                    localStorage.setItem(numberProduit, JSON.stringify(panierJSON));
        
                } 
            }
        }

        if (repetition == false) {

            console.log("on y est !")
            numberProduit = localStorage.getItem("numberProduit");
    
            numberProduit ++;

            localStorage.setItem("numberProduit", JSON.stringify(numberProduit));
            localStorage.setItem(numberProduit, JSON.stringify(panierJSON));
        }

    }else{
        p.innerHTML = "Erreur : Veuiller rentrer un nombre entier positif"
    }    
}

function redirection (){
    document.location.href="index.html"; 
}

recuperationProduit();
