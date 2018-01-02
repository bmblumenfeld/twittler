$(document).ready(function(){
  var feed = $(".feed");
  var feedContainer = $(".feed-container");
  feed.html('');
//sets up tweets to be on the page when loaded
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var tweetFrame = 
    $('<div class="tweet-container">' +
      '<header class = "tweet-header">' +
       '<h4 class = "tweet-user">' + tweet.user+ ' ' +'</h4>' +
         '<p class = "tweet-handle">@' + tweet.user + ' '+ '</p>' +
         '<p class = "tweet-date">' + getDate() + '</p>' + 
      '</header>' +
      '<div class = tweet-message>' +
      tweet.message +
      '</div>' +
    '</div>');
    tweetFrame.appendTo(feed);
    index -= 1;
  }
  //function to time-stamp with current date/time
  function getDate () {
    var myDate = new Date();
    var month=new Array();
    month[0]="Jan";
    month[1]="Feb";
    month[2]="Mar";
    month[3]="Apr";
    month[4]="May";
    month[5]="Jun";
    month[6]="Jul";
    month[7]="Aug";
    month[8]="Sep";
    month[9]="Oct";
    month[10]="Nov";
    month[11]="Dec";
    var hours = myDate.getHours();
    var minutes = myDate.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ampm;
    return month[myDate.getMonth()] + " "+  myDate.getDate()+  "-" + strTime
  }
  //function that generates random tweets 
  function addToFeed (user, message, time) {
    var tweetMessage = message;
    var tweetUser = user
    var tweetFrame = 
    $('<div class="tweet-container">' +
      '<header class = "tweet-header">' +
       '<h4 class = "tweet-user">' + tweetUser+' '+ '</h4>' +
         '<p class = "tweet-handle">@' + tweetUser +''+ '</p>' +
         '<p class = "tweet-date">' + time +''+ '</p>' + 
      '</header>' +
      '<div class = tweet-message>' +
      tweetMessage +
      '</div>' +
    '</div>')
    tweetFrame.prependTo(feed).fadeIn('slow');
  }
  //funciton to add each randomly generated tweet to feed and to collect the tweets in streems.home array
  var addToData = function(){
    var tweet = {};
    tweet.user = randomElement(users);
    tweet.message = randomMessage();
    tweet.created_at = getDate();
    addTweet(tweet);
    addToFeed(tweet.user,tweet.message,tweet.created_at)
  };
  //function to generate random execution time to add random tweets to feed
  function generateRaondomTime (){
    return Math.floor(Math.random()*(5000+1)+2000);
  }
  //Adds tweets to feed at randomly genertated intervals 
  setInterval(function (){addToData()},generateRaondomTime())
  //Allows tweets to be added to feed with input
  var writeTweet = function(message){
    var tweet = {};
    tweet.user = streams.visitor.name;
    tweet.message = message;
    tweet.created_at = getDate();
    addWrittenTweet(tweet);
    addWrittenFeed(tweet.user,tweet.message,tweet.created_at)
  };
  //adds written texts to feed
    function addWrittenFeed (user, message, time) {
      var tweetMessage = message;
      var tweetUser = user
      var tweetFrame = 
      $('<div class="tweet-container">' +
        '<header class = "tweet-header">' +
         '<h4 class = "visitor-tweet-user">' + tweetUser+' '+ '</h4>' +
           '<p class = "tweet-handle">@' + tweetUser +''+ '</p>' +
           '<p class = "tweet-date">' + time +''+ '</p>' + 
        '</header>' +
        '<div class = tweet-message>' +
        tweetMessage +
        '</div>' +
      '</div>')
      tweetFrame.prependTo(feed).fadeIn('slow');
    }
  // makes it possible to view profiles!
  $(".feed").on('click',".tweet-user",function (){  
    feed.hide();
    var clickedUser = $(this).text().trim() + '' 
    streams.users[clickedUser].forEach(function (element, index){
      var userFeed = 
        $('<div class="user-tweet-container">' +
           '<header class = "user-tweet-header">' +
            '<h4 class = "user-tweet-user">' + element['user']+ ' ' +'</h4>' +
              '<p class = "user-tweet-handle">@' + element['user'] + ' '+ '</p>' +
              '<p class = "user-tweet-date">' + element['created_at'] + '</p>' + 
           '</header>' +
           '<div class = "user-tweet-message">' +
           element['message'] +
           '</div>' +
         '</div>')
      userFeed.appendTo(feedContainer).fadeIn('slow');
    })
  })
  //makes it possible to view visitor profile
  $(".feed").on('click',".visitor-tweet-user",function (){  
    feed.hide();
    var clickedUser = $(this).text().trim() + '' 
    streams.visitor[clickedUser].forEach(function (element, index){
      var userFeed = 
        $('<div class="user-tweet-container">' +
           '<header class = "user-tweet-header">' +
            '<h4 class = "user-tweet-user">' + element['user']+ ' ' +'</h4>' +
              '<p class = "user-tweet-handle">@' + element['user'] + ' '+ '</p>' +
              '<p class = "user-tweet-date">' + element['created_at'] + '</p>' + 
           '</header>' +
           '<div class = "user-tweet-message">' +
           element['message'] +
           '</div>' +
         '</div>')
      userFeed.appendTo(feedContainer).fadeIn('slow');
    })
  })
  //mousevent highlighting user
  $('.feed').on('mouseenter','.tweet-user',function(){
    $(this).addClass('toggle') 	
  })
  $('.feed').on('mouseleave','.tweet-user',function(){
    $(this).removeClass('toggle')   	  	
  })
  //mousevent highlighting visitor
  $('.feed').on('mouseenter','.visitor-tweet-user',function(){
    $(this).addClass('toggle') 	
  })
  $('.feed').on('mouseleave','.visitor-tweet-user',function(){
    $(this).removeClass('toggle')   	  	
  })
  //mouseevent highlight trending
  $('.hashtag').on('mouseenter',function(){
    $(this).addClass('toggle') 	
  })
  $('.hashtag').on('mouseleave',function(){
    $(this).removeClass('toggle')   	  	
  })
  //event to highlight suggestions
  $('.who-item').on('mouseenter',function(){
    $(this).addClass('toggle') 	
  })
  $('.who-item').on('mouseleave',function(){
    $(this).removeClass('toggle')   	  	
  })
  //Navigating back to home feed!
  $('.nav-home').on('click',function (){
    $('.user-tweet-container').remove();
    feed.show();
  })
  //mouse event to highlight home 
  $('.nav-home').on('mouseenter',function(){
    $(this).addClass('toggle') 	
  })
  $('.nav-home').on('mouseleave',function(){
    $(this).removeClass('toggle')   	  	
  })
  //button toggle
  $('button').on('mouseenter',function(){
    $(this).addClass('button-toggle') 	
  })
  $('button').on('mouseleave',function(){
    $(this).removeClass('button-toggle')   	  	
  })
  //tweet when button is pressed
  $('button').on('click',function (){
    writeTweet($('#tweet-input').val()+'')	
  })
  //enter button triggering event 
  $("#tweet-input").keyup(function() {
      if (event.keyCode === 13) {
          $(".add-tweet-button").click();
      }
  });

})



 


