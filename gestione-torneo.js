document.addEventListener("DOMContentLoaded", function() {
  // Trova la tabella degli incontri
  var incontriTable = document.getElementById("incontri-table");
  if (incontriTable) {
      // Trova gli input nella tabella degli incontri
      var risultatiInputs = incontriTable.querySelectorAll("tbody input");
      // Aggiungi un listener per l'evento change a ciascun input
      risultatiInputs.forEach(function(input) {
          input.addEventListener("change", function() {
              calcolaDifferenzaGame();
          });
      });
  }

  // Chiamata iniziale per calcolare la differenza dei game e inizializzare la tabella del girone
  calcolaDifferenzaGame();

  // Ordina la tabella del girone in base alla differenza dei game
  ordinaTabellaGirone();

  // Evidenzia le prime due righe della tabella del girone
  highlightFirstTwoRows();
});

// Funzione per evidenziare le prime due righe della tabella del girone
function highlightFirstTwoRows() {
  var gironeTable = document.querySelector(".girone-table");
  if (gironeTable) {
      var rows = gironeTable.querySelectorAll("tbody tr");
      // Rimuovi la classe 'highlight' da tutte le righe
      rows.forEach(function(row) {
          row.classList.remove("highlight");
      });
      // Aggiungi la classe 'highlight' solo alle prime due righe
      for (var i = 0; i < 2 && i < rows.length; i++) {
          rows[i].classList.add("highlight");
      }
  }
}

// Funzione per calcolare la differenza dei game e aggiornare la prima tabella
function calcolaDifferenzaGame() {
  var gironeTable = document.querySelector(".girone-table");
  if (gironeTable) {
      var rows = gironeTable.getElementsByTagName("tr");
      // Loop attraverso le righe (tranne l'intestazione)
      for (var i = 1; i < rows.length; i++) {
          var row = rows[i];
          var cells = row.getElementsByTagName("td");

          // Ottieni il nome del giocatore
          var playerNameCell = cells[0];
          if (!playerNameCell) {
              console.log("Cella del nome del giocatore non trovata");
              continue;
          }
          var playerName = playerNameCell.textContent.trim().toLowerCase();

          // Trova la tabella degli incontri
          var incontriTable = document.getElementById("incontri-table");
          if (!incontriTable) {
              console.log("Tabella degli incontri non trovata");
              continue;
          }

          var incontriRows = incontriTable.getElementsByTagName("tr");
          var gameVinti = 0;
          var gamePersi = 0;

          for (var j = 0; j < incontriRows.length; j++) {
              var incontroCell = incontriRows[j].getElementsByTagName("td")[0];
              var risultatoCell = incontriRows[j].getElementsByTagName("td")[1];

              if (!incontroCell || !risultatoCell) {
                  console.log("Celle dei risultati non trovate per il giocatore:", playerName);
                  continue;
              }

              var incontro = incontroCell.textContent;
              var risultato = risultatoCell.textContent;

              var [player1Name, player2Name] = incontro.split(" vs ");
              var [player1Result, player2Result] = risultato.split("-");

              if (player1Name.trim().toLowerCase() === playerName) {
                  gameVinti += parseInt(player1Result) || 0;
                  gamePersi += parseInt(player2Result) || 0;
              } else if (player2Name.trim().toLowerCase() === playerName) {
                  gameVinti += parseInt(player2Result) || 0;
                  gamePersi += parseInt(player1Result) || 0;
              }
          }

          var differenzaGame = gameVinti - gamePersi;

          if (cells[1]) cells[1].textContent = gameVinti;
          if (cells[2]) cells[2].textContent = gamePersi;
          if (cells[3]) cells[3].textContent = differenzaGame;
      }
      highlightFirstTwoRows();
  }
}

// Funzione per ordinare la tabella del girone in base alla differenza dei game
function ordinaTabellaGirone() {
  var gironeTable = document.querySelector(".girone-table");
  if (gironeTable) {
      var rows = Array.from(gironeTable.querySelectorAll("tbody tr"));

      if (rows.length > 0) {
          rows.sort(function(rowA, rowB) {
              var diffA = parseInt(rowA.querySelector("td:nth-child(4)")?.textContent || 0);
              var diffB = parseInt(rowB.querySelector("td:nth-child(4)")?.textContent || 0);
              return diffB - diffA;
          });

          var tbody = gironeTable.querySelector("tbody");
          rows.forEach(function(row) {
              tbody.appendChild(row);
          });
      }
  }
}

// Seleziona l'elemento della barra di navigazione con la classe "dropdown"
const dropdown = document.querySelector('.dropdown');

// Seleziona il menu a tendina
const dropdownMenu = document.querySelector('.dropdown-menu');

// Aggiungi un listener per l'evento mouseover alla barra di navigazione
dropdown.addEventListener('mouseover', () => {
  // Mostra il menu a tendina
  dropdownMenu.style.display = 'block';
});

// Aggiungi un listener per l'evento mouseleave alla barra di navigazione
dropdown.addEventListener('mouseleave', () => {
  // Nascondi il menu a tendina
  dropdownMenu.style.display = 'none';
});

// Aggiungi un listener per l'evento mouseover al menu a tendina
dropdownMenu.addEventListener('mouseover', () => {
  // Mantieni il menu a tendina aperto quando il mouse è sopra di esso
  dropdownMenu.style.display = 'block';
});

// Aggiungi un listener per l'evento mouseleave al menu a tendina
dropdownMenu.addEventListener('mouseleave', () => {
  // Nascondi il menu a tendina quando il mouse esce
  dropdownMenu.style.display = 'none';
});

