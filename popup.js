var registerUser = function(name) {
    chrome.runtime.sendMessage({
        name: name
    }, function(response) {
    });
}

var inputName = document.querySelector("#input_name");
var buttonRegister = document.querySelector("#button_register");
buttonRegister.addEventListener('click', function(event) {
    registerUser(inputName.value);
});
