const db = require('../../db');
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
};
