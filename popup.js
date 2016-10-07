var inputName = document.querySelector("#input_name");
var buttonRegister = document.querySelector("#button_register");
var loading = document.querySelector("#loading");

var showLoading = function() {
    $(inputName).hide();
    $(buttonRegister).hide();
    $(loading).show();
}

var dismissLoading = function() {
    $(inputName).show();
    $(buttonRegister).show();
    $(loading).hide();
}

var registerUser = function(name) {
    chrome.runtime.sendMessage({
        name: name
    }, function(response) {
        console.log(response);
        dismissLoading();
        if (response.response_code == 201) {
            console.log("success");
        } else {
            console.log("failure");
        }
    });
}

buttonRegister.addEventListener('click', function(event) {
    showLoading();
    registerUser(inputName.value);
});
