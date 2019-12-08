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

  app.get('/favourites', (request, response) => {
    db.getFavourites(request, response);
  });

  app.post('/favourites',  (request, response) => {
    db.addFavourite(request, response);
  });

  app.delete('/favourites/:name',  (request, response) => {
    db.deleteFavourite(request, response);
  });

  app.get('/weather/city/:town', async (request, response) => {
    try {
      const { town } = request.params;
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${town}&APPID=${APIKey}`);
      response.json(result.data);
    } catch (e) {
      console.log(e);
      response.end();
    }
  });

  app.get('/weather/coordinates/:long&:lat', async (request, response) => {
    try {
      const { lat, long } = request.params;
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${APIKey}`);
      response.json(result.data);
    } catch (e) {
      console.log(e);
      response.end();
    }
  });
};
