var PROJECT_ID = 'katte-145613';

var registerUserToServer = function(name, registrationId) {
    console.log('name: ' + name + ', gcm registrationId: ' + registrationId);
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.name == null) {
            return;
        }
        if (window.localStorage.getItem('registrationId')) {
            return
        }
        chrome.gcm.register([PROJECT_ID], function(registrationId) {
            registerUserToServer(request.name, registrationId);
        });
    }
);

chrome.gcm.onMessage.addListener(function(message) {
    chrome.notifications.create('', {
        title: message.data.title,
        message: message.data.message,
        type: 'basic',
        iconUrl: 'icon.png'
    }, function(id) {
    });
});
