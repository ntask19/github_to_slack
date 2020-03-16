function myFunction() {

}

function getGitHubMail() {
  var searchCondition = 'is:unread from:notifications@github.com';
  var threads = GmailApp.search(searchCondition, 0, 50);

  for (var i = 0 ; i < threads.length; i++) {
    var msgs = GmailApp.getMessagesForThread(threads[i]);

    for (var j = 0; j < msgs.length; j++) {
      Logger.log(msgs[j].getSubject());
      Logger.log(msgs[j].getBody());
    }

    threads[i].moveToTrash();
  }
}
