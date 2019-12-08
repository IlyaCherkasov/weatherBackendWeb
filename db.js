const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api',
    password: 'postgres',
    port: 5432,
});

const getFavourites = (request, response) => {
    pool.query('SELECT * FROM favourites', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const addFavourite = (request, response) => {
    const { name } = request.body;
    pool.query('INSERT INTO favourites (name) VALUES ($1)', [name], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`Favourite town added with name: ${name}`);
    });
};

const deleteFavourite = (request, response) => {
    const name = request.params.name;
    pool.query('DELETE FROM favourites WHERE name = $1', [name], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`Favourite town deleted with name: ${name}`);
    });
};

module.exports = {
    getFavourites,
    addFavourite,
    deleteFavourite,
};
