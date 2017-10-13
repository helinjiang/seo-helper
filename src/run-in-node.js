var count = 0;
console.log('主进程开启');

var startTime = new Date().getTime();

/*
启动casperjs读取单个url
*/
function capture(url) {
    count++;
    var spawn = require('child_process').spawn;
    // var   ls = spawn('npm', ['--version']);

    // const ls = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['-v']);
    // const ls = spawn(/^win/.test(process.platform) ? 'casperjs.cmd' : 'casperjs', ['./so-search-rank.js']);
    const ls = spawn(/^win/.test(process.platform) ? 'casperjs.cmd' : 'casperjs', ['./aizhan-cha/now-qq-com.js']);

    ls.stdout.on('data', function (data) {
        console.log('data', data.toString());
    });

    ls.stderr.on('data', function (data) {
        console.log('stderr: ' + data);

    });

    ls.on('close', function (code) {
        if (code == 1) {
            console.log('child process异常结束。目标：' + url);
        }

    });

}

capture();