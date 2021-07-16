// Pour récupérer l'id dans la génération automatique de la page
let urlSearchParams = new URLSearchParams(document.location.search)

// Prévoir un au cas ou si il y as pas d'ID
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

    // BIEN PENSER A PRENDRE VALUE et non InnerText et mettre let pour si ont prend 2 couleur dif l'une après l'autre
    const color = selectColor.value;
    const p = document.getElementById("error");
    const nomProduit = document.getElementById("name");
    
    // LE NOM NE PASSE PAS !!
    const name = teddy.name;

    repetition = false;
    
    console.log("clique fait!")
    console.log(parseInt(inputNumber.value))

    // Vérification que ce soit bien un nombre
    if(Number.isInteger(number) === true && number > 0) {

        console.log(number + " produit " + color + " ajouté")

        p.innerText = number + " " + name + " de couleur " + color + " mis au panier.";

        // Mise en place du JSON

        // Faire avec un tableau. Ajout d'une ligne a chaque fois
        // Récupérer le panier qui existe déja
        // LocalStorage pour sauvgarder le panier
        
        //let panierJSON = localStorage.getItem('panierJSON')
        //panierJSON = JSON.parse(panierJSON)

        /*let panierJSON = {
            _id: id,
            nombre: number,
            couleur: color,
            nom: name
        }*/

        //console.log(panierJSON);

        //let myNewJSON = JSON.stringify(panierJSON, null, 2);

        //console.log(myNewJSON);
        
        // Si panierJSON existe        

        

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
        /*else {
                
    
            numberProduit ++;

            localStorage.setItem("numberProduit", JSON.stringify(numberProduit));
            localStorage.setItem(numberProduit, JSON.stringify(panierJSON));
        }

        /* Avec plusieur localStorage mais une clef de vérification et fusion des produits

        key = "produit" + id + color;

        if (localStorage.getItem("key") != null){
            console.log("existe déjà")

            vieuJSON = JSON.parse(localStorage.getItem(key));
            console.log(vieuJSON.nombre)
            console.log(panierJSON.nombre)
            trueNumber = panierJSON.nombre + vieuJSON.nombre;
            console.log(trueNumber)

            panierJSON = {
                _id: id,
                nombre: trueNumber,
                couleur: color,
                nom: name
            }

            localStorage.setItem(key, JSON.stringify(panierJSON));

        }else{
            
            localStorage.setItem(key, JSON.stringify(panierJSON));            
        }



        /* RE-base panierJSON en talbleau Séparer tableau ? monTableau.push(a); pour y mettre
        if (localStorage.getItem("panier") != null){

        }else{
            let panier = [panierJSON];

            console.log(panier)
            localStorage.setItem("panier", JSON.stringify(panier));
            //localStorage.setItem("panier", JSON.stringify(["id", "nom", "specificiter", "nombre"][id, name, color, number]));
        }
        

        // PAS REUSSI LE JSON TABLEAU
       /* if (panierJSON != null){
            // si il existe ont ajoute le produit
            console.log("c'est if")

            // vérifier si il y as 2 fois le meme article de comander avec la meme couleur (id + couleur) ajouter nombre
        } else {
            console.log("c'est else")

            let panierJSON = {
                _id: id,
                nombre: number,
                couleur: color,
                nom: name
            }

            localStorage.setItem("1", JSON.stringify(panierJSON));

            /*panierJSON = {
                "article": [
                    {
                        "nom": nom,
                        "nombre": number,
                        "id": id,
                        "couleur": color
                    }
                ]
            };

            console.log(panierJSON)
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
