let urlSearchParams = new URLSearchParams(document.location.search)

let code = urlSearchParams.get("code")

function miseEnPlace () {
    console.log(code);
    let container = document.getElementById("code")
    console.log(container)

    container.innerHTML = "Votre numéro de commande est : " + code;

}

miseEnPlace();