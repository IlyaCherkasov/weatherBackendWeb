const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api',
    password: 'postgres',
    port: 5432,
});

const getFavourites = async () => {
    const result = await pool.query('SELECT * FROM favourites');
    return result.rows;
};

const addFavourite = async (name) => {
    const favs = await getFavourites();
    if (favs === null || favs.find(x => x.name === name) === undefined) {
        await pool.query('INSERT INTO favourites (name) VALUES ($1)', [name]);
        return 'added';
    } else {
        throw 'Already in db';
    }
};

const deleteFavourite = async (name) => {
    const favs = await getFavourites();
    if (favs.find(x => x.name === name) !== undefined) {
        await pool.query('DELETE FROM favourites WHERE name = $1', [name]);
        return 'deleted';
    } else {
        throw 'not in db';
    }
};

module.exports = {
    getFavourites,
    addFavourite,
    deleteFavourite,
};
