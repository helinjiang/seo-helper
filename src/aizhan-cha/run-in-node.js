const fs = require('fs');
const db = require('./db');
var count = 0;

console.log('主进程开启');

function capture(successCallback) {
    count++;

    const spawn = require('child_process').spawn;
    const ls = spawn(/^win/.test(process.platform) ? 'casperjs.cmd' : 'casperjs', ['./now-qq-com.js']);

    ls.stdout.on('data', function (data) {
        console.log('data', data.toString());

        successCallback(data.toString());
    });

    ls.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });

    ls.on('close', function (code) {
        if (code == 1) {
            console.log('child process异常结束');
        }
    });

}

capture(function (dataStr) {

    fs.writeFile('message.txt', dataStr, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

    try {
        let dataJSON = JSON.parse(dataStr);
        db.saveSeo(dataJSON);
    } catch (e) {

    }
});