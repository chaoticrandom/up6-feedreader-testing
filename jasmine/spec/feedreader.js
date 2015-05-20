/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
      /* This is our first test - it tests to make sure that the
       * allFeeds variable has been defined and that it is not
       * empty. Experiment with this before you get started on
       * the rest of this project. What happens when you change
       * allFeeds in app.js to be an empty array and refresh the
       * page?
      */
      it('are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* TODO: Write a test that loops through each feed
       * in the allFeeds object and ensures it has a URL defined
       * and that the URL is not empty.
      */
      it('URLs exist and are not empty', function() {
        for(var i = 0; i < allFeeds.length; i++) {
          expect(allFeeds[i].url).toBeDefined(); //all urls should be defined
          if (typeof allFeeds[i].url !== 'undefined') //if type of 'url' property is not undefined
            expect(allFeeds[i].url.length).not.toBe(0); //expect its length not to be 0
        }
      });

      /* TODO: Write a test that loops through each feed
       * in the allFeeds object and ensures it has a name defined
       * and that the name is not empty.
      */
      it('names exist and are not empty', function() {
        for(var i = 0; i < allFeeds.length; i++) {
          expect(allFeeds[i].name).toBeDefined(); //all names should be defined
          if (typeof allFeeds[i].name !== 'undefined') //if type of 'name' property is not undefined
            expect(allFeeds[i].name.length).not.toBe(0); //expect its length not to be 0
        }
      });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
      /* TODO: Write a test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
      */
      it('is hidden by default', function() {
        //<body> by default should have menu-hidden class
        expect($('body').hasClass('menu-hidden')).toBeTruthy();
      });

      /* TODO: Write a test that ensures the menu changes
      * visibility when the menu icon is clicked. This test
      * should have two expectations: does the menu display when
      * clicked and does it hide when clicked again.
      */
      it('changes visibility when the menu icon is clicked', function() {
        //remember initial state of menu visibility class
        var initialState = $('body').hasClass('menu-hidden');
        //simulate open click event on menu button
        $(".menu-icon-link").click();
        //expect visibility class to be toggled from the initial state
        expect($('body').hasClass('menu-hidden')).toBe(!initialState);
        //simulate close click event on menu button
        $(".menu-icon-link").click();
        //expect visibility class to return to initial state
        expect($('body').hasClass('menu-hidden')).toBe(initialState);
      });

      it('closes when feed is selected', function() {
        //simulate open click event on menu button
        $(".menu-icon-link").click();
        //calculate random feed number
        var randomFeed = Math.floor(Math.random() * (allFeeds.length - 0)) + 0;
        //open random feed
        $('.feed-list li a')[randomFeed].click();
        //expect menu to be hidden
        expect($('body').hasClass('menu-hidden')).toBeTruthy();
      });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
      /* TODO: Write a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test wil require
       * the use of Jasmine's beforeEach and asynchronous done() function.
      */
      beforeEach(function(done) {
        //load first feed before the test
        loadFeed(0);
        setTimeout(function() {
          done();
        }, 500);
      });

      it('have at least a single .entry element within the .feed container', function(done) {
        //expect loaded feed's content to has at least one entry
        expect($('.feed .entry').length).toBeGreaterThan(0);
        done();
      });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
      /* TODO: Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
      */

      var header = '';
      var firstEntry = '';
      var lastEntry = '';

      beforeEach(function(done) {
        //load first feed
        loadFeed(0);
        setTimeout(function() {
          done();
        }, 500);
      });

      beforeEach(function(done) {
        //save first feed's header, first and last entries
        header = $('.header-title').text();
        firstEntry = $('.entry-link').first().find('h2').text();
        lastEntry = $('.entry-link').last().find('h2').text();
        //load second feed
        loadFeed(1);
        setTimeout(function() {
          done();
        }, 500);
      });

      it('changes header when new feed is loaded', function (done) {
        //save second feed's header
        var newHeader = $('.header-title').text();
        //expect second feed's header not to be equal to first feed's header
        expect(newHeader).not.toBe(header);
        done();
      });

      it('changes content when new feed is loaded', function (done) {
        //save second feed's boundary entries
        var newFirstEntry = $('.entry-link').first().find('h2').text();
        var newLastEntry = $('.entry-link').last().find('h2').text();
        //expect them not to be equal to boundaries of the first loaded feed
        expect(newFirstEntry).not.toBe(firstEntry);
        expect(newLastEntry).not.toBe(lastEntry);
        done();
      });
    });

    //additional spec for future functionalities
    //it is excluded from the tests by default because it will fail
    xdescribe('Feed Manipulation', function() {
      //delete feed functionality test
      describe('- Delete', function() {
        var feed, feedDelete, feedElement, feedPrevious, feedBackup, pos;
        //before test run
        beforeEach(function() {
          //calculate random feed number
          feed = Math.floor(Math.random() * (allFeeds.length - 0)) + 0;
          //random feed's jquery selector
          feedElement = $('.feed-list li')[feed];
          //random feed's delete button selector
          feedDelete = '#delete-feed-' + feed;
          //backup random feed
          feedBackup = allFeeds[feed];
          //calculate previous feed's position to restore feed at its position after test is run
          if (feed > 0) {
            pos = feed - 1;
            feedPrevious = $('.feed-list li')[pos];
          }
          else {
            pos = feed + 1;
            feedPrevious = $('.feed-list li')[pos];
          }
        });

        afterEach(function() {
          //restore feed after test is run
          allFeeds[feed] = feedBackup;
          //insert feed element after/before its recent neighbor tag
          if (feed > 0) {
            $(feedElement).insertAfter($(feedPrevious));
          }
          else {
            $(feedElement).insertBefore($(feedPrevious));
          }
        });

        it('- is working', function() {
          //simulate menu open event
          $(".menu-icon-link").click();
          //simulate feed delete button click event
          $(feedDelete).click();
          var result;
          //if random feed's element exists return false
          if ($('.feed-list li')[feed]) {
            result = false;
          }
          else {
            result = true;
          }
          //expect corresponding element in the array to be undefined
          expect(allFeeds[feed]).toBeUndefined();
          //expect feed's element not to exist
          expect(result).toBeTruthy();
        });
      });

      //add feed functionality
      describe('- Add', function() {
        var testSet;
        beforeEach(function() {
          //test sets of user input
          testSet = [{
            name: '',
            url: ''
          },
          {
            name: 'Test',
            url: ''
          },
          {
            name: '',
            url: 'Test'
          },
          {
            name: 'Test',
            url: 'Test'
          }];
          //simulate menu open event
          $(".menu-icon-link").click();
          //simulate add-feed open dialog event
          $("#add-feed").click();
        });

        it('- dialog is visible', function() {
          //dialog element should exists
          expect($('#add-dialog').length).toBeGreaterThan(0);
          //dialog should be visible
          expect($('#add-dialog').hasClass('hidden')).toBeFalsy();
        });
        //if user's input is empty, dialog should return an error message
        it('- "both fields are empty" case', function() {
          $('#feed-name').val(testSet[0].name);
          $('#feed-url').val(testSet[0].url);
          //simulate feed create button click
          $('#create').click();
          //expect error-message element to exist
          expect($('#add-dialog #error-message').length).toBeGreaterThan(0);
          //expect text in error-message element
          expect($('#add-dialog #error-message').is(':empty')).toBeFalsy();
        });
        //if user's input contains empty fields, dialog should return an error message
        it('- "url field is empty" case', function() {
          $('#feed-name').val(testSet[1].name);
          $('#feed-url').val(testSet[1].url);
          $('#create').click();
          expect($('#add-dialog #error-message').length).toBeGreaterThan(0);
          expect($('#add-dialog #error-message').is(':empty')).toBeFalsy();
        });
        //if user's input contains empty fields, dialog should return an error message
        it('- "name field is empty" case', function() {
          $('#feed-name').val(testSet[2].name);
          $('#feed-url').val(testSet[2].url);
          $('#create').click();
          expect($('#add-dialog #error-message').length).toBeGreaterThan(0);
          expect($('#add-dialog #error-message').is(':empty')).toBeFalsy();
        });
        //if user's input is correct, feed should be added
        it('- new feed is successfully added', function() {
          $('#feed-name').val(testSet[3].name);
          $('#feed-url').val(testSet[3].url);
          $('#create').click();
          //expect last element's properties in allFeeds array to be equal to user's input
          expect(allFeeds[allFeeds.length-1].name).toBe(testSet[3].name);
          expect(allFeeds[allFeeds.length-1].url).toBe(testSet[3].url);
          //expect feed-list to contain new feed
          expect($('.feed-list li:contains(' + testSet[3].name + ')').length).toBeGreaterThan(0);
          //expect no errors and add-dialog to be hidden
          expect($('#add-dialog #error-message').is(':empty')).toBeTruthy();
          expect($('#add-dialog').hasClass('hidden')).toBeTruthy();
        });
      });

    });

}());
