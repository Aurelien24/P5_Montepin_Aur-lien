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

function recuperationProduit() {
    fetch("http://localhost:3000/api/teddies", {
        method: "GET",
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        }
    })

    //* Changement de res a teddies. Test (si res -> réponse étais obligatoire) et meilleur comprension de l'api
    .then(function(teddies) {
        if (teddies.ok) {

            console.log(teddies.json());
            //* Pourquoi 200 ???
            console.log(teddies.status);

            //*    teddies.json.forEach(_id => console.log(_id));

            let container = document.getElementById("resultat")

            //* Création des élléments
            let div = document.createElement("div")
            let a = document.createElement("a")
            let img = document.createElement("img")
            let h3 = document.createElement("h3")
            let h4 = document.createElement("h4")
            

            //* Création du texte
            let Nom = document.createTextNode('name produit')
            let Prix = document.createTextNode('prix / 100 en €')

            //* Mise en place
            container.appendChild(div)
            div.appendChild(a)
            a.appendChild(img)
            a.appendChild(h3)
            a.appendChild(h4)
            h3.appendChild(Nom)
            h4.appendChild(Prix)

            //* Ajout des classes
            div.className = "col-8 col-lg-4"
        }
    })

    //*data est une variable
    .then(function(data) {
        console.log(data)
        //*fonction qui s'occupe du rendu créant une boucle pour s'occuper des élléement html
    })
}

recuperationProduit();