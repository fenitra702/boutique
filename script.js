// ================= PANIER =================

let panier = [];


// ================= AFFICHER UNE PAGE =================

function afficherPage(nomPage) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {

        page.classList.remove("active");

    });


    const page = document.getElementById(nomPage);

    if (page) {

        page.classList.add("active");

    }


    // Actualiser le panier

    afficherPanier();

}


// ================= AJOUTER AU PANIER =================

function ajouterPanier(nom, prix) {

    panier.push({

        nom: nom,
        prix: prix

    });


    sauvegarderPanier();

    afficherPanier();


    alert(nom + " a été ajouté au panier !");

}


// ================= AFFICHER PANIER =================

function afficherPanier() {

    const liste = document.getElementById("listePanier");

    const compteur = document.getElementById("nombrePanier");

    const totalElement = document.getElementById("total");


    compteur.textContent = panier.length;


    if (panier.length === 0) {

        liste.innerHTML =
            '<p class="vide">Votre panier est vide.</p>';

        totalElement.textContent = "0";

        return;

    }


    liste.innerHTML = "";


    let total = 0;


    panier.forEach(function(produit, index) {

        total += produit.prix;


        const article = document.createElement("div");

        article.className = "article-panier";


        article.innerHTML = `

            <div>

                <strong>${produit.nom}</strong>

                <br>

                ${produit.prix.toLocaleString()} Ar

            </div>

            <button onclick="supprimerProduit(${index})">

                Supprimer

            </button>

        `;


        liste.appendChild(article);

    });


    totalElement.textContent =
        total.toLocaleString();

}


// ================= SUPPRIMER =================

function supprimerProduit(index) {

    panier.splice(index, 1);

    sauvegarderPanier();

    afficherPanier();

}


// ================= SAUVEGARDER =================

function sauvegarderPanier() {

    localStorage.setItem(
        "panierBoutique",
        JSON.stringify(panier)
    );

}


// ================= CHARGER =================

function chargerPanier() {

    const donnees =
        localStorage.getItem("panierBoutique");


    if (donnees) {

        panier = JSON.parse(donnees);

    }


    afficherPanier();

}


// ================= COMMANDER =================

function commander() {

    if (panier.length === 0) {

        alert("Votre panier est vide !");

        return;

    }


    alert(
        "Merci pour votre commande ! 🛍️"
    );

}


// ================= DEMARRAGE =================

chargerPanier();

afficherPage("accueil");
