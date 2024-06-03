
let anchorTag = document.querySelectorAll('nav ul li a');

anchorTag.forEach((anchor) => {
    anchor.addEventListener('click', updateSectionContent);
});

// Function to update the content of the section
function updateSectionContent(event) {
    event.preventDefault(); // Prevent the default link behavior
    
    // Get the clicked link's ID
    let linkId = event.target.id;


    fetch(`pages/${linkId}.html`)
        .then(response => response.text())
        .then(html => {
            // Update the section's content with the fetched HTML
            if(linkId == 'partecipanti') {
                fetch('data/participants.json')
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('data').innerHTML = '';
                        const participantsList = document.getElementById('data');
                        data.participants.forEach(participant => {
                            const li = document.createElement('li');
                            li.textContent = participant.name;
                            participantsList.appendChild(li);
                        });
                    })
                    .catch(error => console.error('Errore nel caricamento dei dati:', error));
            } else {
                document.getElementById('data').innerHTML = html;
            }
            
        })
        .catch(error => console.error('Error fetching content:', error));
    
    

}
