function recuperationProduit() {
    var lien = "http://localhost:3000/api/teddies/5be9c8541c9d440000665243"

    fetch(lien, {
        method: "GET",
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        }
    })

    .then(function(data) {
        console.log(data)
        //*fonction qui s'occupe du rendu créant une boucle pour s'occuper des élléement html
    })
}

recuperationProduit();