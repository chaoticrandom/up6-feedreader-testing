#Udacity Feed Reader Testing - Project 6

# Project Overview
In this project you are given a web-based application that reads RSS feeds. The original developer of this application clearly saw the value in testing, they've already included [Jasmine](http://jasmine.github.io/) and even started writing their first test suite! Unfortunately, they decided to move on to start their own company and we're now left with an application with an incomplete test suite. That's where you come in.

#Additional tests
--  Test if menu is closed when feed is selected<br>
--  Test if header is changed when new feed is selected<br>
--  Test if feed is deleted when corresponding delete button is clicked:<br>
    Description: every feed is supposed to have corresponding delete button. When this button is clicked, the feed will be deleted. Corresponding html tags will be removed as well as allFeeds array's corresponding element will be assigned to undefined.<br>
--  Test if feed is added when add button is clicked<br>
    Description:it is supposed that user can add a new feed by pressing the button which is located somewhere in menu block. After pressing this button add-dialog appears where user can enter the name and the url of the new feed. All fields are required and spec covers test cases when user's input isn't correct. If all fields aren't empty - new feed should be created.
NOTE: Spec for new functionalities is described with <b>xdescribe</b>. This prevents Jasmine to run these tests by default and allows to check if all required tests are passed. To run this spec by default simply change xdescribe to describe.

#List of resources
1. http://jasmine.github.io
2. stackoverflow.com on various topics
3. search results from google.com
