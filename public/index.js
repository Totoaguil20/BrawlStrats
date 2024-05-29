// Función para obtener información del jugador al hacer clic en el botón
async function getPlayerInfo() {
  try {
    const playerTagInput = document.getElementById('playerTagInput').value.replace('#', '');

    const response = await fetch('/playerInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ playerTag: playerTagInput })
    });

    if (!response.ok) {
      if (response.status === 404) {
        updatePlayerInfo({ message: 'Usuario no ha sido encontrado' });
      } else {
        throw new Error('Network response was not ok');
      }
    } else {
      const data = await response.json();
      updatePlayerInfo(data);
    }
  } catch (error) {
    updatePlayerInfo({ message: 'Usuario no ha sido encontrado' });
    console.error('Error al obtener información del jugador:', error);
  }
}

// Función para actualizar la interfaz de usuario con la información del jugador
function updatePlayerInfo(playerData) {
  const errorMessageElement = document.getElementById('errorMessage');

  if (playerData.message) {
    errorMessageElement.classList.remove('hidden');
    errorMessageElement.innerText = playerData.message;

    document.getElementById('playerName').innerText = '';
    document.getElementById('playerTrophies').innerText = '';
    document.getElementById('playerHighTrophies').innerText = '';
    document.getElementById('playerSoloWins').innerText = '';
    document.getElementById('playerDuoWins').innerText = '';
    document.getElementById('player3v3Wins').innerText = '';
    document.getElementById('playerClub').innerText = '';
  } else {
    errorMessageElement.classList.add('hidden');

    document.getElementById('playerName').innerText = playerData.playerName;
    document.getElementById('playerTrophies').innerText = playerData.playerTrophies;
    document.getElementById('playerHighTrophies').innerText = playerData.playerHighTrophies;
    document.getElementById('playerSoloWins').innerText = playerData.playerSoloWins;
    document.getElementById('playerDuoWins').innerText = playerData.playerDuoVictories;
    document.getElementById('player3v3Wins').innerText = playerData.player3v3Wins;
    document.getElementById('playerClub').innerText = playerData.playerClub ? playerData.playerClub.name : 'No pertenece a un club';
  }
}

// Esperar a que se cargue el DOM antes de asignar el evento click al botón
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('getPlayerInfoBtn').addEventListener('click', getPlayerInfo);
});
