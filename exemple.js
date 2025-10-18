function Etudiant(prenom, nom) {
  this.prenom = prenom;
  this.nom = nom;
}

let e1 = new Etudiant("nidhal", "jelassi");
e1.age = 40;
let e2 = new Etudiant("Beha eddine", "fatnassi");
delete e2.nom;

console.log(e1, e2);