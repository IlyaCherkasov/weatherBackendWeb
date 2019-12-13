const db = require('../../db');
const axios = require('axios');
const APIKey = 'e34c51f8b71bca2945c6901e59dc5b69';
module.exports = function(app) {
  app.get('/', (request, response) => {
    response.json({ info: 'Welcome to the server' })
  });

  app.get('/ping', (request, response) => {
    response.json({ info: 'pong' })
  });

  app.get('/favourites', async (request, response) => {
    try {
      response.json(await db.getFavourites());
    } catch(e) {
      response.status(424).json(e);
    } finally {
      response.end();
    }
  });

  app.post('/favourites', async (request, response) => {
    try {
      const { name } = request.body;
      response.json(await db.addFavourite(name));
    } catch(e) {
      response.status(424).json(e);
    } finally {
      response.end();
    }
  });

  app.delete('/favourites/:name', async (request, response) => {
    try {
      const name = request.params.name;
      response.json(await db.deleteFavourite(name));
    } catch(e) {
      response.code(424);
      response.json({ message: 'Something wend wrong' });
    } finally {
      response.end();
    }
  });

  app.get('/weather/city/:town', async (request, response) => {
    try {
      const { town } = request.params;
      await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${town}&APPID=${APIKey}`)
          .then(result => response.json(result.data))
          .catch(x => response.status(424).json(x));
    } finally {
      response.end();
    }
  });

  app.get('/weather/coordinates/:long&:lat', async (request, response) => {
    try {
      const { lat, long } = request.params;
      await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${APIKey}`)
          .then(result => response.json(result.data))
          .catch(x => response.status(424).json(x));
    } finally {
      response.end();
    }
  });
};
