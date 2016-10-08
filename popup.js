const KEY_USER_HASH = "USER_HASH"

var showLoading = function() {
    $("#register_user_layout").hide();
    $("#button_register").hide();
    $("#loading").show();
}

var dismissLoading = function() {
    $("#register_user_layout").show();
    $("#button_register").show();
    $("#loading").hide();
}

var showRegisterUserFailure = function() {
    $("#register_user_failure").show();
}

var registerUser = function(name, grade) {
    chrome.runtime.sendMessage({
        name: name,
        grade: grade
    }, function(response) {
        console.log(response);
        dismissLoading();
        if (response.response_code == 201) {
            console.log("success");
            localStorage.setItem(KEY_USER_HASH, 'user_hash');
            $("#already_register_user").show()
            $("#register_user_layout").hide();
        } else {
            dismissLoading();
            console.log("failure");
        }
    });
}

$("#button_register").click(function(event) {
    var name = $("#input_name").val();
    var grade = $("#input_grade").val();
    console.log("name: " + name + ", grade: " + grade);
    if (name.length == 0 || grade.length == 0) {
        showRegisterUserFailure();
        return
    }
    showLoading();
    registerUser(name);
});

$('#button_open_katte').click(function(event) {
    console.log('open');
    window.open('http://katte.party/');
});

var userHash = localStorage.getItem(KEY_USER_HASH)
if (userHash) {
    $("#already_register_user").show()
    $("#register_user_layout").hide();
} else {
    $("#already_register_user").hide()
    $("#register_user_layout").show();
}
