function recuperationProduit() {

    let lien = "http://localhost:3000/api/teddies/5be9c8541c9d440000665243"

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

        console.log(teddy)

        const container = document.getElementById("resultat")

        // Création des élléments
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
        h4.innerHTML = teddy.price / 100 + ' €'
        img.src = teddy.imageUrl
        button.innerHTML = 'Ajouté'
        input.type = "number"
        input.name = "q2"
        input.value = "1"
        select.name = "couleur"

        // A décomposé pour chaque couleur forEach ?
        select.appendChild(option)
        option.value = "couleur"
        option.innerText = teddy.colors
        p.innerText = teddy.description
        
        // Ajout des classes et id
        div.className = "col-10 col-lg-7"
        select.className = "deroulant"
        img.className = "img-produit"
        button.id = "ajouter"
        input.id = "number"
        select.id = "color"
        p2.id = "error"
        // fonction qui s'occupe du rendu créant une boucle pour s'occuper des élléement html

        console.log(teddy._id)

        const ajouter = document.getElementById('ajouter');
        ajouter.addEventListener('click', onClique);

        console.log("clique charger !")




        // ??? Pourquoi ?

        /*lesCouleur = teddy.color.array

        lesCouleur.forEach( colorTeddy => {
            option.innerText = colorTeddy
        });*/
    })
}

function onClique() {
    // Mise en place des variable
    const inputNumber = document.getElementById('number');
    let number = parseInt(inputNumber.value);
    const selectColor = document.getElementById('color');
    const color = selectColor.innerText;
    const p = document.getElementById("error");
    const name = document.getElementById("name");
    
    console.log("clique fait!")
    console.log(parseInt(inputNumber.value))

    // Vérification que ce soit bien un nombre
    if(Number.isInteger(number) === true && number > 0) {

        // cookies ? .json ? post ? localstorage ?
        // Cookies.set ('teddy._id', number)

        console.log(number + " produit " + color + " ajouté")

        p.innerText = number + " " + name + " de couleur " + color + " mis au panier.";

    }else{
        p.innerText = "Erreur : Veuiller rentrer un nombre entier"
    }    
}

recuperationProduit();
