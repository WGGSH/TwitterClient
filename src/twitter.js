// const twitter = require('twitter');
// var client;

// var stream = client.stream('user', function (stream) {
//   stream.on('data', function (tweet) {
//     console.log(tweet);
//     document.getElementById('timeline').insertAdjacentHTML(
//       'beforebegin', '<div>\n@' + tweet.user.screen_name + '\n' + tweet.text + '\n</div > ');
//   })
//   stream.on('error', function (e) {
//     console.log(e);
//     document.getElementById('timeline').insertAdjacentHTML('afterend', '<div>Error!</div>');
//   })
// })

var tweetIDList = new Array();

timelineLoad = function () {
  const params = { count: 50 };
  client.get('statuses/home_timeline', params, function (error, tweets, response) {
    if (!error) {
      // console.log(tweets);
      let size = tweets.length;
      for (let i = size - 1; i >= 0;i--) {
        // まだTLに表示できていないツイートか確認する
        let isNewTweet = true;
        for (let id of tweetIDList) {
          if (id === tweets[i].id_str) {
            isNewTweet = false;
            break;
          }
        }
        // console.log(isNewTweet);
        if (isNewTweet) {
          tweetGenerate(tweets[i]);
        }
      }
    } else {
      console.log(error);
    }
  })
}

var tweetGenerate = function (tweet) {
  let html = '';
  html += '<div class="tweet">';
  html += tweet.user.name + '(';
  html += '<a href = "http://twitter.com/' + tweet.user.screen_name + '">';
  html += '@' + tweet.user.screen_name + '</a>)  ';
  html += tweet.created_at + '\n';
  html += tweet.text;
  html += '</div>'

  document.getElementById('timeline').insertAdjacentHTML(
    'afterbegin', html);

  tweetIDList.push(tweet.id_str);
}

timelineLoad();
setInterval('timelineLoad()', 30000);
