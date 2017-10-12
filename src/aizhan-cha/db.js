const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults
db.defaults({ seo: {} })
    .write();

exports.saveSeo = function (data) {
    db.set('seo', data)
        .write();
};
