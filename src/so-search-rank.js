var links = [];

var casper = require('casper').create({
    clientScripts: ['jquery.min.js'],
    pageSettings: {
        loadImages: false,        // The WebPage instance used by Casper will
        loadPlugins: false         // use these settings
    }
});

// phantom.outputEncoding = 'gbk';//解决乱码问题

casper.start('https://www.so.com/', function () {
    // Wait for the page to be loaded
    this.waitForSelector('form[action="/s"]');
});

casper.then(function () {
    // search for 'casperjs' from google form
    this.fill('form[action="/s"]', {q: 'casperjs'}, true);
});

casper.then(function () {
    // aggregate results for the 'phantomjs' search
    // links = links.concat(this.evaluate(getLinks));

    var result = this.evaluate(function () {
        var arr = [];

        $('#main > .result .res-list').each(function () {
            var $this = $(this);
            var title = $.trim($this.find('.res-title').text());

            arr.push(title);
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
