let btnAjouter = document.getElementById("btn-add");
let btnReset = document.getElementById("btn-reset");
let inpIntitule = document.getElementById("intitule");
let inpMontant = document.getElementById("montant");
let categorie = document.getElementById("categorie");
let listeDepenses = document.getElementById("liste-dep");
let spanTotal = document.getElementById("total-dep");

const categoriesConfig = {
  alimentation: { emoji: "🍽️", label: "Alimentation", color: "success" },
  transport: { emoji: "🚗", label: "Transport", color: "primary" },
  loisirs: { emoji: "🎮", label: "Loisirs", color: "warning" },
  sante: { emoji: "⚕️", label: "Santé", color: "danger" },
  education: { emoji: "📚", label: "Éducation", color: "tertiary" },
  autres: { emoji: "📦", label: "Autres", color: "secondary" },
};

let showPasDeDepenses = true;
let total = 0;

//btnAjouter.addEventListener("click", clickHandler);
btnAjouter.addEventListener("click", () => {
  if (
    !inpIntitule.value.trim().length ||
    !inpMontant.value.length ||
    !categorie.value.length
  ) {
    showAlertError();
    return;
  }

  if (showPasDeDepenses) {
    listeDepenses.innerHTML = "";
    showPasDeDepenses = false;
  }

  let newBadge = document.createElement("ion-badge");
  newBadge.className = "category-badge";
  newBadge.color = categoriesConfig[categorie.value]["color"];
  newBadge.textContent = `${categoriesConfig[categorie.value]["emoji"]} ${categorie.value
    }`;
    let newIcon = document.createElement("ion-icon");
    newIcon.name = "close-outline";
    newIcon.color="danger";
  
  
