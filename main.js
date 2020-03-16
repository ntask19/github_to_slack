var postChannel = "{チャンネル名}";
var url = "{webhook}";

function sendToSlack(body) {
  var data = { "channel" : postChannel, "username" : "GitHub", "text" : body, "icon_emoji" : ":github:" };
  var payload = JSON.stringify(data);
  var options = {
    "method" : "POST",
    "contentType" : "application/json",
    "payload" : payload
  };
  var response = UrlFetchApp.fetch(url, options);
}

function test() {
  sendToSlack("テスト通知確認です");
}

function getGitHubMail() {
  var searchCondition = 'is:unread from:notifications@github.com';
  var threads = GmailApp.search(searchCondition, 0, 50);

  for (var i = 0 ; i < threads.length; i++) {
    var msgs = GmailApp.getMessagesForThread(threads[i]);

    for (var j = 0; j < msgs.length; j++) {
      var msg = msgs[j];

      var brTagStripped = msg.getBody().replace(/(<br>|<br \/>)/gi, '\n');
      var stripped = brTagStripped.replace(/(<([^>]+)>)/ig,"");
      var pos = stripped.indexOf("&mdash;");
      if (pos >= 0) {
        stripped = stripped.substring(0, pos);
      }

      var postMessage = "*件名：[" + msg.getSubject() + "]* \n" + "本文" +  stripped + "https://github.com";
      Logger.log(postMessage);
      sendToSlack(postMessage);
    }

    threads[i].moveToTrash();

  }
}
