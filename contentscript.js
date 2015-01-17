/*
 * Twitthelp - Dribbble helper extension - v 1.0
 * Copyright (c) 2014 - Arpad Szucs (WhiteX)
 * contentscript.js - Loads only on Dribbble follower & fan pages
 */

/* Real things Start here */
console.log('wtf');

chrome.runtime.onConnect.addListener(function(popupPort) {
  if (popupPort.name == "controlPopup") {
    popupPort.onMessage.addListener(function(msg) {
      if (msg.whichButtonWasClicked == "start-button") {
        popupPort.postMessage({wantToInsertScript: "yes"});
        startFollowing();
        console.log('Start button was clicked - Contentscript');
        //injectScript(startFollowing);
      } else if (msg.whichButtonWasClicked == "stop-button") {
        //injectScript(stopFollowing);
        stopFollowing();
        console.log('Start button was clicked - Contentscript');
      }
    });
  }
});

// Code injector
// function injectScript(func) {
//   var actualCode = '(' + func + ')();';
//   var script = document.createElement('script');
//   script.textContent = actualCode;
//   (document.head||document.documentElement).appendChild(script);
//   script.parentNode.removeChild(script);
// };

// Start following users - to be injected
function startFollowing() {
  delaySec = 775;
  console.log('jQuery version from content script: ' + $().jquery);
  
  function dribbbleFollow() {
    console.log('entered in follow procedure...');
    console.log(delaySec);
    $dribbblers = $('.player:not(.self):not(.prospect):not(.scout):not(.followed-by-current-user):lt(1)');

    if ($dribbblers.length ) {
      // There are matched elements
      $('body').animate({scrollTop: $dribbblers.offset().top - 100}, 300);
      $dribbblers
        .css("box-shadow","0 0 0 3px rgb(0, 184, 255)")
        .find(".follow").click();
      delaySec = Math.floor(Math.random() * 500 + 100);
      clearInterval(autoFollow);
      setInterval(dribbbleFollow, delaySec);
    } else {
      // No matched elements remained
      clearInterval(autoFollow);
      console.log('Page done!');
      // Go to next page
      if ($('.next_page').hasClass('disabled')) {
        console.log('Last page reached dude!');
        return;
      } else {
        $('.next_page').bind('click', function() {
            window.location.href = window.location.origin + $(this).attr('href');
        }).click();
      }
    }
  };
  autoFollow = setInterval(dribbbleFollow, delaySec);
};

  //Stop following users - to be injected
  function stopFollowing() {
    clearInterval(autoFollow);
    console.log('Stopped manually!');
  };


// function randomSec() {
//   return Math.floor(Math.random() * 500 + 1000);
// };