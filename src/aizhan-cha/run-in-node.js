const db = require('./db');

var dataAppend = '';

console.log('主进程开启');

function capture() {
    const spawn = require('child_process').spawn;
    const ls = spawn(/^win/.test(process.platform) ? 'casperjs.cmd' : 'casperjs', ['./now-qq-com.js']);

    ls.stdout.on('data', function (data) {
        console.log('stdout: ' + data);

        dataAppend += data.toString();
    });

    ls.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });

    ls.on('close', function (code) {
        console.log('======close======', code);

        if (code === 1) {
            console.log('child process异常结束');
        } else {
            try {
                let dataJSON = JSON.parse(dataAppend);

                db.saveSeo(dataJSON);
            } catch (e) {
                console.error(e);
            }
        }
    });

}

capture();