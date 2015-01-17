/*
 * Twitthelp - Twitter helper extension - v 1.0
 * Copyright (c) 2013 - Arpad Szucs (WhiteX)
 * popup.js - Handles the interaction with the popup
 * Library that helps to manage the communication between the Chrome.PageAction Popup and Background Page
 * @class popupController
 */

$( document ).ready(function() {

  //console.log('jQuery version from popup script: ' + $().jquery);

  //Triggering actions
  $('.start-button').on('click', function() {
    //activating the stop button
    $('.stop-button').removeAttr('disabled');
    clickHandler('start');
  });
  $('.stop-button').on('click', function() {
    clickHandler('stop');
  });


  //ui controller
  function clickHandler (button) {
    //statsHandler();
    chrome.tabs.getSelected(null, function(tab) {
      var popupPort = chrome.tabs.connect(tab.id, {name: "controlPopup"});
      if (button == 'start') {
        popupPort.postMessage({whichButtonWasClicked: "start-button"});
      } else if (button == 'stop') {
        popupPort.postMessage({whichButtonWasClicked: "stop-button"});
      }
      popupPort.onMessage.addListener(function(msg) {
        if (msg.wantToInsertScript == "yes") {
        }
      });
    });
  };

  //stats
  // function statsHandler () {
  //   var clicks = 0,
  //       $counter = $('.counter span');

  //   chrome.runtime.onConnect.addListener(function(statsPort) {
  //     statsPort.onMessage.addListener(function(msg) {
  //       clicks = msg.nrOfClicks;
  //       console.log(clicks);
  //       $counter.text(clicks);
  //     });
  //   });
  // };

});
