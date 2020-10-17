
let Items_model=null

function connect_db() {
    const YAML = require('yaml');
    const fs = require('fs');
    const file = fs.readFileSync('settings.yaml','utf8');
    const settings=YAML.parse(file)
    //Reading database config from settings.yaml
    const knex = require('knex')({
        client: 'mysql',
        connection: {
            host     : settings.database.host,
            user     : settings.database.username,
            password : settings.database.password,
            port     : settings.database.port,
            database : settings.database.datbase_name,
            charset  : 'utf8'
        }
    });
    const bookshelf = require('bookshelf')(knex);
    Items_model=bookshelf.model('Items',{
        tableName:'items',
    })
}

const fetch_on_text = function (text) {
    return new Promise((resolve, reject) => {
        new Items_model().where('body','LIKE', `%${text}%`).fetchAll().then(items=>{
            resolve(items.serialize());
        });
    })
}

const fetch_results = new Promise(((resolve, reject) => {
    connect_db()
    new Items_model().fetchAll().then(items=>{
        resolve(items.serialize());
    });
}))

module.exports =  {connect_db,fetch_results,fetch_on_text};
