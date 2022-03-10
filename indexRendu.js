let urlSearchParams = new URLSearchParams(document.location.search)

let code = urlSearchParams.get("code")
let prix = urlSearchParams.get("valeur")

function miseEnPlace () {
    console.log(code);
    let container = document.getElementById("code")
    console.log(container)

    prixCommande = prix / 100
    
    container.innerHTML = "Merci pour votre commande d'une valeur de " + prixCommande + "€. Votre numéro de commande est : " + code;

}

miseEnPlace();