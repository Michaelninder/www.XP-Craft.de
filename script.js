document.addEventListener('DOMContentLoaded', () => {
    const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
    const toggleMcFontButton = document.getElementById('toggle-mcfont');

    toggleDarkModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    toggleMcFontButton.addEventListener('click', () => {
        document.body.classList.toggle('mc-font');
    });

    // Funktion zum Abrufen der Spielerzahl
    function fetchPlayerCount() {
        fetch('https://api.mcsrvstat.us/2/45.142.112.11:20081')
            .then(response => response.json())
            .then(data => {
                const playerCount = data.players.online;
                // Hier kannst du den Spielerzähler auf deiner Seite aktualisieren
                console.log(`Spieler online: ${playerCount}`);
            })
            .catch(error => console.error('Fehler beim Abrufen der Spielerzahl:', error));
    }

    fetchPlayerCount();
});
