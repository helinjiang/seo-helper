var utils = require('utils');

var resultInfo = {};

var casper = require('casper').create({
    clientScripts: ['../jquery.min.js', './client/now-util.js'],
    pageSettings: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36',
        loadImages: false,        // The WebPage instance used by Casper will
        loadPlugins: false         // use these settings
    },
    onError: function (casper, msg, backtrace) {
        console.error('[onError]', msg);
        console.error(backtrace);
    }
});

// phantom.outputEncoding = 'gbk';//解决乱码问题

casper.start('https://www.aizhan.com/cha/now.qq.com/', function () {
    // 首先截个图
    this.capture('../tmp/1.png');
});

casper.then(function () {
    // 解析页面的内容
    var result = this.evaluate(function () {
        var obj = {};

        // 页面标题
        obj.title = $('#webpage_title').text();

        // SEO 信息
        obj.listSeoBasic = NOW_UTIL.getListSeoBasic();

        return obj;
    });

    resultInfo.data = result;
});

casper.run(function () {
    utils.dump(resultInfo);

    this.exit();
});

