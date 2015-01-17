/*
 * Twitthelp - Twitter helper extension - v 1.0
 * Copyright (c) 2014 - Arpad Szucs (WhiteX)
 * background.js - extension initializer - always loads
 */

var siteURL = /dribbble\.com\/.*(following|followers|fans)/igm;

function checkURL (tabId, change, tab) {
  var regExMatch = siteURL.test(tab.url);
  //console.log('Regex match: ' + regExMatch + '\nRegex match without variable: ' + siteURL.test(tab.url));
  //console.log('Tab URL: ' + tab.url + '\nTab ID: ' + tab.id + '\n');
  if (regExMatch) {
    chrome.pageAction.show(tab.id);
    console.log('Dribbble extension is available!');
  }
};

// Check for valid URL on change
chrome.tabs.onUpdated.addListener(checkURL);
