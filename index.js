/*let produit = document.getElementsByClassName("produit");
let nom-produit = document.getElementsByClassName("nom-produit");
let price = document.getElementsByClassName("price");

let nombreDeProduit = ;*/
/* faire une boucle pour générer le code html pour chaque éllement. Prendre le nombre d'éllement suivent le nombre de la catégorie rechercher. (Donc le nombre total dans le tableau des donnés)*/

/* utilisé innerHTML pour faire le html. Passé part une fonction rendu des donner*/
/* crée le html en JS */
/* Passé part une fonction de récupération des donnéés. */
/* Evité d'avoir de longue fonction */
/* Fonction logique de formation du language */

const hebergement = "http://localhost:3000/api/"


let categorie = "teddies"

function recuperationProduit() {
    fetch("http://localhost:3000/api/teddies", {
        method: "GET",
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        }
    })

    //* Changement de res a teddies. Test (si res -> réponse étais obligatoire) et meilleur comprension de l'api
    .then(function(res) {
        if (res.ok) {
            //*fait une fin de fonction
            return res.json();
        }
    })

    //*data est une variable. Data.length ou forEach
    //*Le .then appel la fonction avec le résultat qui est envoyé. La variable prend le nom mis dans la fonction
    .then(function(teddies) {

        console.log(teddies)

        //* forEach attend en paramettre un fontion qui va prendre 1 argument. -> ressoit 1 teddies.
        //* teddies.json.forEach(_id => console.log(_id));

        teddies.forEach(teddy => {

            let produit = './produit.html?id=' + teddy._id


            let container = document.getElementById("resultat")

            //* Création des élléments
            let div = document.createElement("div")
            let a = document.createElement("a")
            let img = document.createElement("img")
            let h3 = document.createElement("h3")
            let h4 = document.createElement("h4")

            //* Hyérarchie
            container.appendChild(div)
            div.appendChild(a)
            a.appendChild(img)
            a.appendChild(h3)
            a.appendChild(h4)

            //* contenu non textuel
            h3.innerHTML = teddy.name
            h4.innerHTML = teddy.price / 100 + ' €'
            img.src = teddy.imageUrl
            a.href = produit //* mettre en requette get html

            //* Ajout des classes
            div.className = "col-8 col-lg-3 flex"
            img.className = "img-recherche"
            
            //*fonction qui s'occupe du rendu créant une boucle pour s'occuper des élléement html

            console.log(teddy._id)
        });
    })
}

recuperationProduit();