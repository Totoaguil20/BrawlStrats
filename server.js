const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjMzMDg3ZmRhLWQ5ZTEtNDE5YS04YzRjLTViZjA4ZDhkNTdlMiIsImlhdCI6MTcxNjk5MzQzNywic3ViIjoiZGV2ZWxvcGVyLzE3YjU4YzljLTcxOTktMTk5ZS1lZWU0LTAwOGMwNWI3NzE5OSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMjAxLjIzNS4xMjEuNzYiXSwidHlwZSI6ImNsaWVudCJ9XX0.3kGN3BxtwOb4WOagRvrpkTOhRIWDhr8ovhrG_IaK7KMUPGZAxnGlwSXCPaeMhlh8mFLnOTgIi_sckafLiXS-xQ';
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    }
  }
}));

app.use(express.json());

// Endpoint para obtener información del jugador
app.post('/playerInfo', async (req, res) => {
  try {
    // Obtener el parámetro playerTag de la solicitud POST
    const playerTag = req.body.playerTag;

    // Realizar una solicitud GET a la API de Brawl Stars para obtener información del jugador
    const response = await axios.get(`https://api.brawlstars.com/v1/players/%23${playerTag}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    // Extraer los datos relevantes del jugador
    const playerData = {
      playerIcon: response.data.icon,
      playerName: response.data.name,
      playerTrophies: response.data.trophies,
      playerHighTrophies: response.data.highestTrophies,
      playerSoloWins: response.data.soloVictories,
      playerDuoVictories: response.data.duoVictories,
      player3v3Wins: response.data["3vs3Victories"],
      playerClub: response.data.club
      // Agrega otros campos si son necesarios    
    };


    // Enviar los datos del jugador al cliente
    res.json(playerData);
  } catch (error) {
    console.error('Error en la solicitud a la API de Brawl Stars:', error);
    // Enviar un mensaje de error al cliente en caso de que falle la solicitud
    res.status(500).send('Error interno del servidor al obtener información del jugador');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
