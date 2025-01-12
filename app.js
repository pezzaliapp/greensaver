 /***************************************************
 * GESTIONE NAVIGAZIONE
 ***************************************************/
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll(".section");

/**
 * Mostra la sezione corretta in base al data-section
 * e nasconde tutte le altre.
 */
function showSection(sectionId) {
  sections.forEach((section) => {
    if (section.id === sectionId) {
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  });
}

// Aggiunge listener a ogni link della navbar
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetSection = e.target.getAttribute("data-section");
    showSection(targetSection);
  });
});

/***************************************************
 * GESTIONE PUNTI (GAMIFICATION) e LOCAL STORAGE
 ***************************************************/
let userPoints = 0;

// Carica i punti da localStorage se presenti
if (localStorage.getItem("greenSaverPoints")) {
  userPoints = parseInt(localStorage.getItem("greenSaverPoints"), 10);
}
updateUserPointsDisplay();

/**
 * Aggiunge punti all'utente e aggiorna il contatore
 */
function addPoints(points) {
  userPoints += points;
  localStorage.setItem("greenSaverPoints", userPoints);
  updateUserPointsDisplay();
}

function updateUserPointsDisplay() {
  document.getElementById("user-points").textContent = `Punti: ${userPoints}`;
}

/***************************************************
 * SEZIONE HOME
 ***************************************************/
document.getElementById("start-journey").addEventListener("click", () => {
  alert("Benvenuto! Inizia subito a scoprire le nostre funzioni.");
  addPoints(5); // Ricompensa iniziale
});

/***************************************************
 * 1. Sensibilizzazione e Educazione
 ***************************************************/
const ecoTipsData = [
  "Usa una borraccia invece di bottiglie in plastica monouso.",
  "Spegni le luci e gli elettrodomestici in stand-by.",
  "Riduci il consumo di carne una volta a settimana.",
  "Compra prodotti locali e di stagione.",
  "Evita imballaggi in plastica non riciclabile."
];

document.getElementById("load-tips").addEventListener("click", () => {
  const tipsList = document.getElementById("tips-list");
  tipsList.innerHTML = "";
  
  // Carica i consigli (in un caso reale potresti fare una fetch da un server)
  ecoTipsData.forEach((tip) => {
    const li = document.createElement("li");
    li.textContent = tip;
    tipsList.appendChild(li);
  });

  // Premi l'utente con qualche punto per aver letto i consigli
  addPoints(2);
});

/***************************************************
 * 2. Calcolatore dell'Impronta Ecologica
 ***************************************************/
document.getElementById("calculator-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const transport = document.getElementById("transport").value;
  const energy = parseFloat(document.getElementById("energy").value) || 0;
  let footprint = 0;

  if (transport === "auto") footprint += 2.5;
  if (transport === "mezzi") footprint += 1.0;
  if (transport === "bici") footprint += 0.1;

  // Formula arbitraria di esempio
  footprint += energy * 0.2;

  document.getElementById("footprint-result").textContent =
    `La tua impronta ecologica stimata è di ${footprint.toFixed(2)} tonnellate di CO₂/anno.`;

  // Ricompensa l’utente perché ha calcolato la sua impronta
  addPoints(3);
});

/***************************************************
 * 3. Riduzione degli Sprechi
 ***************************************************/
document.getElementById("add-food").addEventListener("click", () => {
  const foodInput = document.getElementById("food-input");
  const foodList = document.getElementById("food-list");

  if (foodInput.value.trim()) {
    const listItem = document.createElement("li");
    listItem.textContent = foodInput.value.trim();
    foodList.appendChild(listItem);

    // Azzera il campo di input
    foodInput.value = "";
    addPoints(1); // +1 punto per ogni alimento aggiunto
  }
});

/***************************************************
 * 4. Community e Gamification
 ***************************************************/
document.getElementById("join-community").addEventListener("click", () => {
  alert("Benvenuto nella nostra community! Inizia a condividere le tue azioni green.");
  addPoints(5);
});

/***************************************************
 * 5. Supporto alle Energie Rinnovabili
 ***************************************************/
const providers = ["Energia Pulita S.p.A.", "GreenPower Italia", "EcoEnergia 360"];

document.getElementById("find-energy").addEventListener("click", () => {
  const energyList = document.getElementById("energy-providers");
  energyList.innerHTML = "";

  // In un caso reale, potresti fare una fetch su un servizio di geo-localizzazione
  providers.forEach((provider) => {
    const li = document.createElement("li");
    li.textContent = provider;
    energyList.appendChild(li);
  });

  addPoints(2);
});

/***************************************************
 * 6. Crowdfunding per Progetti Ambientali
 ***************************************************/
document.getElementById("donate").addEventListener("click", () => {
  // In un caso reale, potresti aprire un form di pagamento o reindirizzare a un servizio di crowdfunding
  alert("Grazie per il tuo supporto! Ogni donazione conta per salvare il pianeta.");
  addPoints(5);
});

/***************************************************
 * 7. Eco-mappa
 ***************************************************/
document.getElementById("load-map").addEventListener("click", () => {
  // Qui si potrebbe integrare un'API di mappe (es. Google Maps, Leaflet, OpenStreetMap)
  alert("Caricamento Eco-mappa... (Funzione demo)");
  addPoints(1);
});

/***************************************************
 * 8. Monitoraggio delle Emissioni
 ***************************************************/
document.getElementById("emission-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const carUsage = parseFloat(document.getElementById("car-usage").value) || 0;
  // Stima base: 0.21 kg di CO2 per km percorso in auto
  // Convertiamo da kg a tonnellate ( / 1000 )
  const emissions = (carUsage * 0.21) / 1000;

  document.getElementById("emission-report").textContent =
    `Le tue emissioni mensili stimate sono di ${emissions.toFixed(2)} tonnellate di CO₂.`;

  addPoints(2);
});
