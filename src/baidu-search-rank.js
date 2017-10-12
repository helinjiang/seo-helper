var links = [];

var casper = require('casper').create({
    clientScripts: ['jquery.min.js'],
    pageSettings: {
        loadImages: false,        // The WebPage instance used by Casper will
        loadPlugins: false         // use these settings
    }
});

casper.start('https://www.baidu.com/', function () {
    this.waitForSelector('form[action="/s"]');
});

casper.thenEvaluate(function (term) {
    document.querySelector('input[name="wd"]').setAttribute('value', term);
    document.querySelector('form[name="f"]').submit();
}, 'CasperJS');

casper.then(function () {
    var result = this.evaluate(function () {
        var arr = [];

        $('#content_left > .c-container > h3.t').each(function () {
            arr.push($.trim($(this).text()));
        });

        return arr;
    });

    links = links.concat(result);
});

casper.run(function () {
    // echo results in some pretty fashion
    this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - '));
    this.exit();
});
