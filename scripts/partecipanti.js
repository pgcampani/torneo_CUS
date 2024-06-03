

document.addEventListener("DOMContentLoaded", function() {
    fetch('data/participants.json')
        .then(response => response.json())
        .then(data => {
            const participantsList = document.getElementById('participants-list');
            data.participants.forEach(participant => {
                const li = document.createElement('li');
                li.textContent = participant.name;
                participantsList.appendChild(li);
            });
        });
});