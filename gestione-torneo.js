document.addEventListener('DOMContentLoaded', function() {
    // Mostra/nascondi regolamento
    const regolamentoToggle = document.getElementById('regolamento-toggle');
    const regolamento = document.getElementById('regolamento');
  
    if (regolamentoToggle && regolamento) {
      regolamentoToggle.addEventListener('click', function() {
        if (regolamento.style.display === 'none' || !regolamento.style.display) {
          regolamento.style.display = 'block';
          regolamentoToggle.innerText = 'Nascondi Regolamento';
        } else {
          regolamento.style.display = 'none';
          regolamentoToggle.innerText = 'Mostra Regolamento';
        }
      });
    }
  
    // Simulazione di aggiornamento del calendario
    const aggiornaCalendarioButton = document.getElementById('aggiorna-calendario');
    const calendarioContent = document.getElementById('calendario-content');
  
    if (aggiornaCalendarioButton && calendarioContent) {
      aggiornaCalendarioButton.addEventListener('click', function() {
        // Simuliamo un aggiornamento del calendario
        calendarioContent.innerHTML = '<p>Calendario aggiornato con successo!</p>';
      });
    }
  });

  /*function calcolaDifferenzaGame() {
    var gironeTable = document.getElementById("girone1-table");
    var rows = gironeTable.getElementsByTagName("tr");
  
    // Loop attraverso le righe (tranne l'intestazione)
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      var cells = row.getElementsByTagName("td");
  
      // Resetta i valori dei game vinti, dei game persi e della differenza
      var gameVinti = 0;
      var gamePersi = 0;
  
      // Ottieni i nomi dei giocatori dalla prima colonna della tabella degli incontri
      var playerName = cells[0].textContent;
  
      // Trova i risultati per il giocatore corrente nella tabella degli incontri
      var incontriTable = document.getElementById("incontri-table");
      var incontriRows = incontriTable.getElementsByTagName("tr");
  
      for (var j = 0; j < incontriRows.length; j++) {
        var incontriCells = incontriRows[j].getElementsByTagName("td");
        var incontro = incontriCells[0].textContent;
        var risultato = incontriCells[1].textContent;
  
        // Se l'incontro coinvolge il giocatore corrente
        if (incontro.includes(playerName)) {
          var risultati = risultato.split("-");
          gameVinti += parseInt(risultati[0]);
          gamePersi += parseInt(risultati[1]);
        }
      }
  
      // Calcola la differenza dei game
      var differenzaGame = gameVinti - gamePersi;
  
      // Aggiorna i valori delle celle nella prima tabella
      cells[1].textContent = gameVinti;
      cells[2].textContent = gamePersi;
      cells[3].textContent = differenzaGame;
    }
  }
*/

document.addEventListener("DOMContentLoaded", function() {
  calcolaDifferenzaGame();
  
  // Trova la tabella degli incontri
  var incontriTable = document.getElementById("incontri-table");
  var risultatiInputs = incontriTable.querySelectorAll("tbody input");

  // Aggiungi un ascoltatore degli eventi sugli input
  risultatiInputs.forEach(function(input) {
    input.addEventListener("change", function() {
      // Ricalcola la differenza dei game
      calcolaDifferenzaGame();
    });
  });
});

// Funzione per calcolare la differenza dei game e aggiornare la prima tabella
function calcolaDifferenzaGame() {
  var gironeTable = document.getElementById("girone1-table");
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
    console.log("Nome del giocatore:", playerName);

    // Trova la tabella degli incontri
    var incontriTable = document.getElementById("incontri-table");

    // Controlla se la tabella degli incontri è definita
    if (!incontriTable) {
      console.log("Tabella degli incontri non trovata");
      continue;
    }

    var incontriRows = incontriTable.getElementsByTagName("tr");
    var gameVinti = 0;
    var gamePersi = 0;

    for (var j = 0; j < incontriRows.length; j++) {
      var incontriCells = incontriRows[j].getElementsByTagName("td");
      var incontroCell = incontriCells[0];
      var risultatoCell = incontriCells[1];

      // Controlla se il nome del giocatore e il risultato sono definiti
      if (!incontroCell || !risultatoCell) {
        console.log("Celle dei risultati non trovate per il giocatore:", playerName);
        continue;
      }

      var incontro = incontroCell.textContent;
      var risultato = risultatoCell.textContent;

      // Divide l'incontro in due parti: il nome dei due giocatori e il risultato
      var [player1Name, player2Name] = incontro.split(" vs ");
      var [player1Result, player2Result] = risultato.split("-");

      // Controlla se il giocatore è coinvolto nell'incontro
      if (player1Name.trim().toLowerCase() === playerName) {
        // Aggiorna i totali in base al risultato dell'incontro
        gameVinti += parseInt(player1Result) || 0;
        gamePersi += parseInt(player2Result) || 0;
      } else if (player2Name.trim().toLowerCase() === playerName) {
        // Aggiorna i totali in base al risultato dell'incontro
        gameVinti += parseInt(player2Result) || 0;
        gamePersi += parseInt(player1Result) || 0;
      }
    }

    var differenzaGame = gameVinti - gamePersi;
    console.log("Game vinti:", gameVinti);
    console.log("Game persi:", gamePersi);
    console.log("Differenza game:", differenzaGame);

    // Aggiorna i valori delle celle nella prima tabella
    if (cells[1]) cells[1].textContent = gameVinti;
    if (cells[2]) cells[2].textContent = gamePersi;
    if (cells[3]) cells[3].textContent = differenzaGame;
  }
}