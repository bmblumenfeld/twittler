$(document).ready(function(){
  var feed = $('#feed');
  feed.html('');

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo(feed);
    index -= 1;
  }
  var body = $('body')

  function addToFeed (user, message, time) {
    var tweetMessage = message;
    var tweetUser = user
    var $message = $('<div></div>');
    $message.text('@'+ tweetUser +": "+ tweetMessage + "\n" + time)
    $message.prependTo(feed);
  }

  var addToData = function(){
  var tweet = {};
  tweet.user = randomElement(users);
  tweet.message = randomMessage();
  tweet.created_at = new Date();
  addTweet(tweet);
  addToFeed(tweet.user,tweet.message,tweet.created_at)
};

function generateRaondomTime (){
  return Math.floor(Math.random()*(5000+1)+2000);
}
setInterval(function (){addToData()},generateRaondomTime())

// setInterval(function(){randomMessage().appendTo(body)})
 
});  

