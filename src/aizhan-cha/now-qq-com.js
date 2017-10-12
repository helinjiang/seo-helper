var utils = require('utils');

var resultInfo = {};

var casper = require('casper').create({
    waitTimeout: 10 * 1000,
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

        // 收录变化等信息
        obj.listIndexChange = NOW_UTIL.getListIndexChange();

        // 收录数目
        obj.listSiteRecord = NOW_UTIL.getListSiteRecord();

        // 来路关键词
        obj.pcFromKeys = NOW_UTIL.getListPcFromKeys();

        // META 关键词
        obj.listMetaKeys = NOW_UTIL.getListMetaKeys();

        return obj;
    });

    resultInfo.data = result;
});

casper.then(function () {
    // 点击全部更新
    this.click('#webpage_keywords_update a');
});

casper.wait(5000, function () {
    this.echo('I\'ve waited for a second.');

    // 截个图片看看
    this.captureSelector('../tmp/3.png', '#webpage_keywords');

    // 解析页面的内容
    var result = this.evaluate(function (arr) {
        return NOW_UTIL.setListMetaKeysRank(arr);
    }, resultInfo.data.listMetaKeys || []);

    if (result && result.length) {
        resultInfo.data.listMetaKeys = result;
    }

});

casper.run(function () {
    utils.dump(resultInfo);

    this.exit();
});

