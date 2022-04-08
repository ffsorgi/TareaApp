const fs = require('fs');
const file = './db/data.json';

const saveDB = ( data ) => {
    fs.writeFileSync( file, JSON.stringify(data) );
}

const readDB = ( ) => {
    if(!fs.existsSync(file)){
        return null;
    }

    const information =fs.readFileSync(file, 'utf8');
    const data = JSON.parse(information);

    return data;
}

module.exports = {
    saveDB,
    readDB
};