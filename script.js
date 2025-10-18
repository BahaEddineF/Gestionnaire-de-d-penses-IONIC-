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

//btnAjouter.addEventListener("click", clickHandler());
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
  newBadge.textContent = `${categoriesConfig[categorie.value]["emoji"]} ${
    categorie.value
  }`;

  let newIcon = document.createElement("ion-icon");
  newIcon.name = "close-outline";
  newIcon.color = "danger";

  let newLabel = document.createElement("ion-label");
  newLabel.textContent = `${inpIntitule.value} : ${inpMontant.value}¥`;

  let newItem = document.createElement("ion-item");
  newItem.appendChild(newBadge);
  newItem.appendChild(newLabel);
  newItem.appendChild(newIcon);

  newItem.amount = inpMontant.value;

  newIcon.addEventListener("click", () => {
    supprimerDepenses(newItem);
  });

  listeDepenses.appendChild(newItem);

  total += +inpMontant.value;
  spanTotal.textContent = `${total} ¥`;
  effacer();
});

btnReset.addEventListener("click", effacer);

function effacer() {
  inpIntitule.value = "";
  inpMontant.value = "";
  categorie.value = "";
}

async function supprimerDepenses(itemToDelete) {
  const alert = document.createElement("ion-alert");
  alert.header = "Supprimer une dépense";
  alert.message = "Que voulez-vous faire ?";
  alert.buttons = [
    {
      text: "Supprimer cette dépense",
      handler: () => {
        listeDepenses.removeChild(itemToDelete);
        total = total - itemToDelete.amount;
        spanTotal.textContent = `${total} ¥`;
      },
    },
    {
      text: "Supprimer toutes les dépenses",
      handler: () => {
        listeDepenses.innerHTML = `   <ion-item>
        <ion-badge class="category-badge" color="medium"
        >💼 Aucune dépense</ion-badge
        >
        
        <ion-label>Aucune dépense enregistrée</ion-label>
        </ion-item>`;
        total = 0;
        spanTotal.textContent = `${total} ¥`;
      },
    },
    {
      text: "Annuler",
      role: "cancel",
    },
  ];

  document.body.appendChild(alert);
  await alert.present();
}
async function showAlertError() {
  const alert = document.createElement("ion-alert");
  alert.header = "Erreur de saisie";
  alert.message = "Veuillez saisir les trois champs...";
  alert.buttons = [
    {
      text: "Ok",
      role: "cancel",
    },
  ];

  document.body.appendChild(alert);
  await alert.present();
}