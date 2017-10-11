var links = [];

var casper = require('casper').create({
    clientScripts: ['jquery.min.js'],
    pageSettings: {
        loadImages: false,        // The WebPage instance used by Casper will
        loadPlugins: false         // use these settings
    }
});

casper.start('https://www.baidu.com/', function () {
    // Wait for the page to be loaded
    this.waitForSelector('form[action="/s"]');
});

casper.thenEvaluate(function(term) {
    document.querySelector('input[name="wd"]').setAttribute('value', term);
    document.querySelector('form[name="f"]').submit();
}, 'CasperJS');

// casper.then(function () {
//     // search for 'casperjs' from google form
//     this.fill('form[action="/s"]', {wd: 'casperjs'}, true);
//     // this.capture("1.png");
// });

// casper.then(function () {
//     // this.click('#su');
//     this.mouse.click("#su"); // clicks <a id="my-link">hey</a>
// });

casper.then(function () {
    this.echo('then3');
    this.capture('2.png');
    // aggregate results for the 'phantomjs' search
    // links = links.concat(this.evaluate(getLinks));

    var result = this.evaluate(function () {
        var arr = [];
        // console.log('----------')
        // this.echo('then3-------');

        // $('#content_left > .c-container').each(function () {
        //     // var $this = $(this),
        //     //     url = $this.attr('href'),
        //     //     text = $.trim($this.text());
        //     // arr.push(text + ' ' + url);
        //
        //     arr.push($(this).text());
        // });

        arr.push('hello');
        //#\31 > h3
        arr.push($('form[action="/s"]').length);
        arr.push($('#wrapper_wrapper').length);
        arr.push($('#wrapper_wrapper').text());
        arr.push('world');
        return arr;
    });

    this.echo('then3 result ' + result);

    links = links.concat(result);
});

casper.run(function () {
    // echo results in some pretty fashion
    this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - '));
    this.exit();
});
