document.addEventListener('DOMContentLoaded', () => {
    const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
    const toggleMcFontButton = document.getElementById('toggle-mcfont');

    toggleDarkModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    toggleMcFontButton.addEventListener('click', () => {
        document.body.classList.toggle('mc-font');
    });

    fetchServerStatus();
    displayTeamMembers();
});

const servers = [
    { name: 'Proxy', ip: '45.142.112.11:20081' },
    { name: 'Lobby-1', ip: '45.142.112.12:20409' },
    { name: 'XP-SMP', ip: '193.187.255.41:20319' },
    { name: 'Practise-1', ip: '45.85.217.109:20017' },
    { name: 'Practise-2', ip: '45.142.112.13:20376' },
    { name: 'Practise-3', ip: '45.89.143.193:20101' },
    { name: 'Build', ip: '45.89.143.141:20231' },
    { name: 'Private SMP', ip: '193.187.255.36:20464' },
];

function fetchServerStatus() {
    const tableBody = document.querySelector('#server-status-table tbody');
    tableBody.innerHTML = '';

    servers.forEach(server => {
        fetch(`https://api.mcsrvstat.us/2/${server.ip}`)
            .then(response => response.json())
            .then(data => {
                const statusClass = data.online ? 'status-online' : data.debug.starting ? 'status-starting' : 'status-offline';
                const statusText = data.online ? 'Online' : data.debug.starting ? 'Starting' : 'Offline';

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${server.name}</td>
                    <td class="${statusClass}">${statusText}</td>
                    <td>${data.players ? `${data.players.online}/${data.players.max}` : 'N/A'}</td>
                    <td>${data.debug ? `${data.debug.ping}` : 'N/A'}</td>
                `;
                tableBody.appendChild(row);
            })
            .catch(error => {
                console.error('Fehler beim Abrufen des Serverstatus:', error);
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${server.name}</td>
                    <td class="status-offline">Offline</td>
                    <td colspan="6">Fehler beim Abrufen der Daten</td>
                `;
                tableBody.appendChild(row);
            });
    });
}

const teamMembers = [
    { gametag: 'Player1', rank: 'Admin', task: 'Server Management' },
    { gametag: 'Player2', rank: 'Moderator', task: 'Community Support' },
    // Weitere Team-Mitglieder hier hinzufügen
];

function displayTeamMembers() {
    const teamList = document.getElementById('team-list');
    teamMembers.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('team-member');
        memberDiv.innerHTML = `
            <img src="https://minotar.net/avatar/${member.gametag}/100" alt="Skin von ${member.gametag}">
            <p><strong>Gametag:</strong> ${member.gametag}</p>
            <p><strong>Rang:</strong> ${member.rank}</p>
            <p><strong>Aufgabe:</strong> ${member.task}</p>
        `;
        teamList.appendChild(memberDiv);
    });
}
