debugger;
/**
 * @file
 * Tests for /videos page.
 */
(function() {
    casper.test.begin('Library page accessible for anon. users.', 3, function suite(test) {
        casper.start();

        casper.thenOpen('http://dev.drupalize.lan/videos', function() {
            test.assertExists('.videos-list li', 'There is at least one video listed.');
            test.assertNotVisible('.videos-list li.collection:first-of-type .series-list', 'The series list is collapsed.');
            this.click('.videos-list li.collection:first-of-type a.show-list');
            test.assertVisible('.videos-list li.collection:first-of-type .series-list', 'The series list is visible after clicking the toggle.');
        });

        casper.run();
    });
})();