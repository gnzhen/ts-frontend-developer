window.onload = function () {
    $(".input-text").focus(function () {
        var inputLine = $(this).parent(".input-line");
        var label = inputLine.prev(".input-label");
        inputLine.addClass("highlight");
        label.addClass("shrink-label");
        //remove error
        inputLine.removeClass("error");
        inputLine.parent().next(".input-error").text("");

    });
    $(".input-text").focusout(function () {
        var inputLine = $(this).parent(".input-line");
        var label = inputLine.prev(".input-label");
        if (inputLine.find("input").val())
            return;
        inputLine.removeClass("highlight");
        label.removeClass("shrink-label");
    });

    var pwIconOpen = "M16,12.8c3,0,5.1,1.9,6,2.9c-0.9,1.2-3,3.4-6,3.4c-2.8,0-5-2.2-6-3.4C11,14.7,13.1,12.8,16,12.8z M16,11.6c-4.8,0-7.6,4.1-7.6,4.1s3.1,4.7,7.6,4.7c4.9,0,7.6-4.7,7.6-4.7S20.9,11.6,16,11.6z M16,13.5c-1.4,0-2.5,1.2-2.5,2.5c0,1.4,1.1,2.5,2.5,2.5c1.4,0,2.5-1.1,2.5-2.5C18.5,14.6,17.4,13.4,16,13.5z"
    var pwIconClose = "M20.8,10.1l-2.1,2c-0.9-0.3-1.8-0.4-2.7-0.4c-4.8,0-7.6,4.2-7.6,4.2c0.9,1.3,2,2.4,3.3,3.3l-1.8,1.8l0.9,0.9l11-10.8L20.8,10.1z M17,13.7c-1.3-0.6-2.8,0-3.3,1.3c-0.3,0.6-0.3,1.4,0,2l-1.1,1.1c-1-0.6-1.8-1.4-2.6-2.3c0.9-1,3-2.9,6-2.9c0.6,0,1.1,0.1,1.7,0.2L17,13.7z M15.2,18.4l3.2-3.2c0.4,1.3-0.3,2.8-1.6,3.2C16.3,18.6,15.7,18.6,15.2,18.4z M23.6,15.8c0,0-2.7,4.7-7.6,4.7c-0.8,0-1.7-0.2-2.4-0.5l1-1c0.5,0.1,0.9,0.2,1.4,0.2c3,0,5.1-2.2,6-3.4c-0.7-0.7-1.4-1.4-2.3-1.9l0.9-0.9C21.8,13.7,22.8,14.7,23.6,15.8L23.6,15.8z";
    $(".icon-password").find("path").attr("d", pwIconOpen);
    $(".icon-password").click(function () {
        var icon = $(this).find("path");
        var password = $(this).parent().prev(".input-text");
        if (icon.attr("d") == pwIconOpen) {
            icon.attr("d", pwIconClose);
            password.attr("type", "text");
        }
        else {
            icon.attr("d", pwIconOpen);
            password.attr("type", "password");
        }
    });

    $("#btnSignup").click(function () {
        var missing = checkMissing();
        if (missing)
            return;
        var psMatchError = checkPwMatch();
        if (!psMatchError) {
            showSuccess();
        }
    });
}

function checkMissing() {
    var fields = ["Email", "Pw", "PwConfirmation"];
    var missing = false;
    fields.forEach(field => {
        var input = $("#input" + field);
        var inputVal = input.val();
        if (inputVal)
            return;
        missing = true;
        var inputLine = input.parent(".input-line");
        inputLine.addClass("error");
        var errorMsg = "Required field!";
        $("#error" + field).text(errorMsg);
        missin = true;
    });
    return missing;
}

function checkPwMatch() {
    var ps = $("#inputPw").val();
    var psConfirmation = $("#inputPwConfirmation").val();
    if (ps === psConfirmation)
        return false;
    $("#inputPw").val("");
    $("#inputPwConfirmation").val("");
    $("#inputPw").parent(".input-line").addClass("error");
    $("#inputPwConfirmation").parent(".input-line").addClass("error");
    var errorMsg = "Password not match!";
    $("#errorPw").text(errorMsg);
    $("#errorPwConfirmation").text(errorMsg);
    return true;
}


function showSuccess() {
    $(".info-success").fadeIn("slow");
    setTimeout(function () {
        $(".info-success").fadeOut("slow");
    }, 3000);
}
