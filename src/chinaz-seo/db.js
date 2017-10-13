const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const fse = require('fs-extra');

fse.ensureDirSync('./data');

const today = new Date();
const dateStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

const adapter = new FileSync(`./data/db-${dateStr}.json`);
const db = low(adapter);

// Set some defaults
db.defaults({
    timestamp: today.getTime(),
    dateStr: dateStr,
    seo: {}
})
    .write();

exports.saveSeo = function (data) {
    db.set('seo', data)
        .write();
};
