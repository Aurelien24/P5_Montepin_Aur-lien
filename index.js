function recuperationProduit() {
    fetch("http://localhost:3000/api/teddies", {
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

    .then(function(teddies) {

        console.log(teddies)

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

            h3.innerHTML = teddy.name
            h4.innerHTML = teddy.price / 100 + ' €'
            img.src = teddy.imageUrl
            a.href = produit

            //* Ajout des classes
            div.className = "col-8 col-lg-3 flex"
            img.className = "img-recherche"

            console.log(teddy._id)
        });
    })
}

recuperationProduit();