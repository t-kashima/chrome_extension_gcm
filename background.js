var PROJECT_ID = '814287454709';
var displayNotificationId = 0;

var registerUserToServer = function(name, registrationId) {
    console.log('name: ' + name + ', gcm registrationId: ' + registrationId);
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.name == null) {
            sendResponse({response_code: 400});
            return;
        }
        if (window.localStorage.getItem('registrationId')) {
            sendResponse({response_code: 400});
            return
        }
        sendResponse({response_code: 201});
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
        iconUrl: 'icon.png',
        buttons: [{
            title: "Yes",
            iconUrl: 'icon.png'
        }, {
            title: "No",
            iconUrl: 'icon.png'
        }]
    }, function(id) {
        displayNotificationId = id;
    });
});

chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex) {
    if (displayNotificationId == notificationId) {
        console.log(buttonIndex);
    }
    chrome.notifications.clear(notificationId);
});
