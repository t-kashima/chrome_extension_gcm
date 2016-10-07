const PROJECT_ID = '814287454709';
const NOTIFICATION_ID = 'NOTIFICATION_ID';

var ButtonIndex = {
    OPEN: 0,
    CLOSE: 1
}

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
    chrome.notifications.clear(NOTIFICATION_ID);

    chrome.notifications.create(NOTIFICATION_ID, {
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
    });
});

chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex) {
    if (NOTIFICATION_ID == notificationId) {
        if (ButtonIndex.OPEN == buttonIndex) {
            window.open('http://google.co.jp/');
        }
        chrome.notifications.clear(notificationId);
    }
});
