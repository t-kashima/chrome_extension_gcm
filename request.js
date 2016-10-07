var request = require('request');

request.post({
    url     : "https://fcm.googleapis.com/fcm/send",
    headers : {
        'Content-Type': 'application/json',
        Authorization: "key=" + process.env.FIREBASE_SERVER_KEY
    },
    json: true,
    body    : {
        data: {
            title: "hello",
            message: "world"
        },
        to: process.env.FIREBASE_REGISTRATION_ID
    }
}, function(err, response, body){
    console.log(body);
});
