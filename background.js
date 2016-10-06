var PROJECT_ID = 'katte-145613';

var main = function() {
    if (window.localStorage.getItem('registrationId')) {
        return
    }
    chrome.gcm.register([PROJECT_ID], function(registrationId) {
        // TODO: サーバにIDを送る
        console.log('gcm registrationId: ' + registrationId);
    });
}

chrome.runtime.onInstalled.addListener(main);
chrome.runtime.onStartup.addListener(main);

chrome.gcm.onMessage.addListener(function(message) {
    chrome.notifications.create('', {
        title: message.data.title,
        message: message.data.message,
        type: 'basic',
        iconUrl: 'icon.png'
    }, function(id) {
    });
});
