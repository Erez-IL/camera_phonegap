/**
* Created with IntelliJ IDEA.
* User: erez
* Date: 2/22/13
* Time: 9:27 PM
* To change this template use File | Settings | File Templates.
*/

var CurrentSessionUser = {
    //	"FirstName": "Erfdez",
    //	"LastName": "dsfdd",
    //	"Password": "azxsdxadc",
    //	"Email": "eraadsadasez83@gmail.com",
    //	"Address": "gaftizd3 rogh",
    //	"Phone": "243424233"
};
var Debug_mode = true;
var base_url = "https://api.github.com/users/erez-il/repos";
var register_api = "http://moshavit.somee.com/api/register/";
var login_api = "http://moshavit.somee.com/api/login/";
var set_msg_api = "http://moshavit.somee.com/api/msg/";
var get_all_msg = "http://moshavit.somee.com/api/msgs/";
var get_all_users = "http://moshavit.somee.com/api/user/";


var clean_main_container = function () {
    $('#container').empty();
};
var clean_body = function () {
    $('body').empty();
};

var add_containers_to_body = function () {
    $('body').append('<div id="container-head" ></div>');
    $('body').append('<div id="container"></div>');
};


var getTemplateHBS = function (templateName, callback) {
    $.get("templatesDirectory/" + templateName + ".hbs", function (data) {
        var template = Handlebars.compile(data);
        if (Debug_mode) console.log("Compiled " + templateName + " template.");
        callback(template);
    });
};
var dynamic_TemplateHBS = function (name, api_route,container) {
    getTemplateHBS(name, function (template) {
        $.getJSON( api_route, function (data) {
            if (Debug_mode) console.log("Got data by api: ", data);
            var templateWithData = template(data);
            container = '#'+container;
            $(container).append(templateWithData);
        });
    });
};
var static_TemplateHBS = function (templateName,container) {
    $.get("templatesDirectory/" + templateName + ".hbs", function (data) {
        var template = Handlebars.compile(data);
        if(container!=='body')container='#'+container;
        $(container).append(template);
        if (Debug_mode) console.log("Compiled " + templateName + " template.");
    });
};

//var load_body = function (name, api_route) {
//    getTemplateHBS(name, function (template) {
//        $.getJSON( api_route, function (data) {
//            if (Debug_mode) console.log("Got data by api: ", data);
//            var templateWithData = template(data);
//            container = '#'+container;
//            $('body').append(templateWithData);
//        });
//    });
//};


var getPicture=function(){
    navigator.camera.getPicture(function(){}, function(){});
}

var vibrate=function(ml){
    navigator.notification.vibrate(ml);
}

var alert_moshavit=function(msg,title,btn){
    navigator.notification.alert(
        msg,
        function(){},
        title,
        btn
    );
}


var confirm_moshavit=function(msg,title,btns){
    navigator.notification.confirm(
        msg,
        confirm_callback,
        title,
        btns
    );
}

var confirm_callback=function(op){
    alert('בחרת :' + op);
    if (op == 1){
        navigator.app.exitApp();
    }
}


var post_api=function(api_route,data){
    var data={};

}
var put_api=function(api_route,data){
    var data={};

}


//var show_loader=function(){
//    TemplateHBS('loader_css','body');
//}
//var hide_loader=function(){
//    $('#loader_css').style.display = 'none'
//}



//start server on the webapp folder
//python -m SimpleHTTPServer 8000
$(document).ready(function () {
    if(CurrentSessionUser.IdUser===undefined)static_TemplateHBS("login",'body');

});

/**
//הרשמה
//    {
//        "FirstName": "Erez",
//      "LastName": "dsfd",
//      "Password":"2w3e4r",
//      "Email":"erez83@gmail.com",
//      "Address":"gatiz3 rogh",
//      "Phone":"9876543",
//      "IsResident": true
//
//    }
//
//כניסה
//{
//	"Email":"erez83@gmail.com",
//		"Password":"2w2w2w"
//}
//מקבל
//{
//	"Token":"as345de6rftgh",
//		"IdUser":23456
//}
//
//ספר טלפונים
//[{
//	"IdUser": 1234,
//	"FirstName": "Erez",
//"LastName": "dsfd",
//"Email":"erez83@gmail.com",
//"Address":"gatiz3 rogh",
//"Phone":"9876543",
//"IsResident": true
//},
//{
//	"IdUser": 1234,
//	"FirstName": "Erez",
//"LastName": "dsfd",
//"Email":"erez83@gmail.com",
//"Address":"gatiz3 rogh",
//"Phone":"9876543",
//"IsResident": true
//}]
//
//סוגי הודעות
//{
//	"BabySiter","CarPull","GiveAndTake","Survey"
//}
//
//BabySiter
//{
//	"IdUser":12345,
//		"Title":"kjdfkjsdhfkjsdhfkjhfkj",
//		"Content":"kjdfhksjdfhkjsdjk",
//		"Rate": 1234.234,
//		"StartTime":"yyyy-mm-dd hh:ii",
//		"EndTime":"yyyy-mm-dd hh:ii"
//}
//
//הודעות BabySiter
//
//	[{
//		"IdMessage":234,
//		"FirstName":"jhgjhgjhg",
//		"LastName": "dsfd",
//		"Email":"erez83@gmail.com",
//		"Address":"gatiz3 rogh",
//		"Phone":"9876543",
//				"Title":"kjdfkjsdhfkjsdhfkjhfkj",
//				"Content":"kjdfhksjdfhkjsdjk",
//				"Rate": 1234.234,
//				"StartTime":"yyyy-mm-dd hh:ii",
//				"EndTime":"yyyy-mm-dd hh:ii"
//	},
//		{
//				"IdMessage":234,
//				"FirstName":"jhgjhgjhg",
//				"LastName": "dsfd",
//				"Email":"erez83@gmail.com",
//				"Address":"gatiz3 rogh",
//				"Phone":"9876543",
//						"Title":"kjdfkjsdhfkjsdhfkjhfkj",
//						"Content":"kjdfhksjdfhkjsdjk",
//						"Rate": 1234.234,
//						"StartTime":"yyyy-mm-dd hh:ii",
//						"EndTime":"yyyy-mm-dd hh:ii"
//			}]
//
//
//CarPull
//{
//	"IdUser":12345,
//		"Title":"kjdfkjsdhfkjsdhfkjhfkj",
//				"Content":"kjdfhksjdfhkjsdjk",
//		"From":"rosh hahahaa",
//		"To":"telaviv",
//		"PickUp":"yyyy-mm-dd hh:ii",
//		"ReturnTime":"yyyy-mm-dd hh:ii"
//}
//
//הודעות CarPull
//
//[{
//		"FirstName":"jhgjhgjhg",
//						"LastName": "dsfd",
//						"Email":"erez83@gmail.com",
//						"Address":"gatiz3 rogh",
//						"Phone":"9876543",
//		"Title":"kjdfkjsdhfkjsdhfkjhfkj",
//						"Content":"kjdfhksjdfhkjsdjk",
//				"From":"rosh hahahaa",
//				"To":"telaviv",
//				"PickUp":"yyyy-mm-dd hh:ii",
//				"ReturnTime":"yyyy-mm-dd hh:ii"
//	},
//		{
//				"FirstName":"jhgjhgjhg",
//								"LastName": "dsfd",
//								"Email":"erez83@gmail.com",
//								"Address":"gatiz3 rogh",
//								"Phone":"9876543",
//				"Title":"kjdfkjsdhfkjsdhfkjhfkj",
//								"Content":"kjdfhksjdfhkjsdjk",
//						"From":"rosh hahahaa",
//						"To":"telaviv",
//						"PickUp":"yyyy-mm-dd hh:ii",
//						"ReturnTime":"yyyy-mm-dd hh:ii"
//			}]
//
//
//
//GiveAndTake
//{
//	"IdUser":12345,
//			"Title":"kjdfkjsdhfkjsdhfkjhfkj",
//							"Content":"kjdfhksjdfhkjsdjk",
//			"Description":"dsfsdfdfsfdsfsfds",
//			"Image1": Base64,
//			"Image2": Base64,
//			"Image3": Base64
//}
//
//הודעות GiveAndTake
//
//	[{
//		"FirstName":"jhgjhgjhg",
//								"LastName": "dsfd",
//								"Email":"erez83@gmail.com",
//								"Address":"gatiz3 rogh",
//								"Phone":"9876543",
//				"Title":"kjdfkjsdhfkjsdhfkjhfkj",
//								"Content":"kjdfhksjdfhkjsdjk",
//		"Description":"dsfsdfdfsfdsfsfds",
//					"Image1": url,
//					"Image2": url,
//					"Image3": url
//	},
//		{
//				"FirstName":"jhgjhgjhg",
//										"LastName": "dsfd",
//										"Email":"erez83@gmail.com",
//										"Address":"gatiz3 rogh",
//										"Phone":"9876543",
//						"Title":"kjdfkjsdhfkjsdhfkjhfkj",
//										"Content":"kjdfhksjdfhkjsdjk",
//				"Description":"dsfsdfdfsfdsfsfds",
//							"Image1": url,
//							"Image2": url,
//							"Image3": url
//			}]
//
//
//
//
//
//
//
































//JSON from User Detail's
var stringifyUserJSON = function () {
return JSON.stringify({
username: $('#username').val(),
firstName: $('#firstName').val(),
lastName: $('#lastName').val(),
email: $('#email').val(),
membership: $('#membership').val(),
password: $('#password').val()
})
};
//JSON from Message Detail's
var stringifyMessageJSON = function () {
return JSON.stringify({
subject: $('#subject').val(),
messageText: $('#messageText').val(),
author: {id: parseInt(CurrentSessionUser.id),
username: CurrentSessionUser.username
}});
};
var getMessageFormViewTemplate = function (messageId) {
getTemplateHBS("modelFormView", function (template) {
$.getJSON("/api/boardMessage/" + messageId, function (messages) {
console.log("Got Message:", messages);
var messageForm = template(messages);
$('body').append(messageForm);
});
});
};

//update Option to Users Table
var updateOptionOnUsersTable = function () {
$('#UserTableList tbody tr').click(function () {
var idNum = $(this).find("td.ID").text();
getTemplateHBS("updateUserForm", function (template) {
var jsonID = "/api/users/" + idNum;
$.getJSON(jsonID, function (users) {
console.log("Got users: ", users);
var updateUserForm = template(users);
$('div.userFormContainer').append(updateUserForm);
bindUserFormElements();
});
//remove the UserTableList
$('#UserTableList').remove();
});
});
};
var selectMessageOption = function () {
$('#messageTable tbody tr').click(function () {
var idNum = $(this).find("td.ID").text();
getMessageFormViewTemplate(idNum);
});
};
//restore UserTableList old style
var restoreUsersTable = function () {
//empty the userFormContainer
$('div.userFormContainer').empty();
renderUsers();

};

//restore UserTableList  new Style
var buildUsersTable = function () {
//remove the userFormModel
$('#myModal').modal('hide')
$('#myModal').remove();
renderUsersTable();
};

//restore Messages Form
var buildMessageForm = function () {
renderMessageForm();
};
var renderMessageForm = function () {
getTemplateHBS("messageForm", function (template) {
$.getJSON("/api/boardMessage", function (messages) {
console.log("Got Messages: ", messages);
var messageForm = template(messages);
$('body').append(messageForm);
selectMessageOption();
});
});
};
var renderUsers = function () {
getTemplateHBS("users", function (template) {
$.getJSON("/api/users", function (users) {
console.log("Got users: ", users);
var usersTable = template(users);
$('div.users').append(usersTable);
//update Option to Table
updateOptionOnUsersTable();
});
});
};
var renderUsersTable = function () {
renderUsers();
};
var getCurrentUserSession = function () {
$.get("/api/users/login", function (user) {
CurrentSessionUser = (typeof user !== 'undefined') ? user : {"username": "Guest"};
$('#sessionUsername').text(CurrentSessionUser["username"]);

});
};
$(document).ready(function () {
renderUsersTable();
bindUserFormElements();
renderMessageForm();
getCurrentUserSession();
$("#addUser").click(function () {
getTemplateHBS("registerUserForm", function (template) {
$('div.userFormContainer').append(template);
bindUserFormElements();
//remove the UserTableList
$('#UserTableList').remove();
});
});
//new Style of reg form
$("#addNew").click(function () {
getTemplateHBS("newRegisterForm", function (template) {
$('body').append(template);
bindUserFormElements();
//remove the UserTableList
$('#UserTableList').remove();
$('#myModal').modal('show');
});
});
//add message form
$("#addMessage").click(function () {
getTemplateHBS("addMessageForm", function (template) {
$('body').append(template);
$("#messageForm").remove();
bindUserFormElements();
//remove the UserTableList
$('#UserTableList').remove();
bindMessageFormElements();
});
});
$('#logoutButton').click(function () {logout()});
$('#loginButton').click(function () {
login(prompt("Enter Username "), prompt("Enter Password "));
});
});


***/
