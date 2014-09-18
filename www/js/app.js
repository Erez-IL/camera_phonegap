/**
* Created with IntelliJ IDEA.
* User: erez
* Date: 2/22/13
* Time: 9:27 PM
* To change this template use File | Settings | File Templates.
*/

var CurrentSessionUser = {
	//  "IdUser":0,
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
        //$.getJSON( api_route, function (data) {
        //for local varibels
        switch (name) {
            case "users":
                data=Users;
                break;
            case "carpull":
                data=CarPull;
                break;
            case "babysiter":
                data=BabySiter;
                break;
            case "messages":
                data=BulletinBoard;
                break;
        }

        if (Debug_mode) console.log("Got data by api: ", data);
        var templateWithData = template(data);
        container = '#'+container;
        $(container).append(templateWithData);
        //for local varibels
        //});
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
var beep_it=function(times){navigator.notification.beep(times);}

var alert_moshavit=function(msg,title,btn){
    navigator.notification.alert(
        msg,
        function(){},
        title,
        btn
    );
}

var confirm_moshavit_exit=function(msg,title,btns){navigator.notification.confirm(msg,confirm_moshavit_exit_callback,title,btns);}
var confirm_moshavit_exit_callback=function(op){if (op == 1){navigator.app.exitApp();}}


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
	else{
		clean_body();
		add_containers_to_body();
		static_TemplateHBS('desktop_menu', 'container-head');
		static_TemplateHBS("phone_menu", 'container');
		setTimeout(function(){$('#sessionUsername').text('שלום '+CurrentSessionUser.FirstName)},3000);
	}
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




var Users =  [
    {"IdUser": "1","FirstName": "EH","LastName": "FZ","Password": "admin","Email": "admin","Address": "kineret 20","Phone": "054-2222222","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "2","FirstName": "2","LastName": "2","Password": "user2resu","Email": "22@moshavit.com","Address": "kineret 21","Phone": "054-2222223","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "3","FirstName": "2","LastName": "2","Password": "user3resu","Email": "23@moshavit.com","Address": "kineret 22","Phone": "054-2222224","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "4","FirstName": "2","LastName": "2","Password": "user4resu","Email": "24@moshavit.com","Address": "kineret 23","Phone": "054-2222225","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "5","FirstName": "2","LastName": "2","Password": "user5resu","Email": "25@moshavit.com","Address": "kineret 24","Phone": "054-2222226","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "6","FirstName": "2","LastName": "2","Password": "user6resu","Email": "26@moshavit.com","Address": "kineret 25","Phone": "054-2222227","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "7","FirstName": "2","LastName": "2","Password": "user7resu","Email": "27@moshavit.com","Address": "kineret 26","Phone": "054-2222228","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "8","FirstName": "2","LastName": "2","Password": "user8resu","Email": "28@moshavit.com","Address": "kineret 27","Phone": "054-2222229","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "9","FirstName": "2","LastName": "2","Password": "user9resu","Email": "29@moshavit.com","Address": "kineret 28","Phone": "054-2222230","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "10","FirstName": "2","LastName": "2","Password": "user10resu","Email": "210@moshavit.com","Address": "kineret 29","Phone": "054-2222231","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "11","FirstName": "2","LastName": "2","Password": "user11resu","Email": "211@moshavit.com","Address": "kineret 30","Phone": "054-2222232","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "12","FirstName": "2","LastName": "2","Password": "user12resu","Email": "212@moshavit.com","Address": "kineret 31","Phone": "054-2222233","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "13","FirstName": "2","LastName": "2","Password": "user13resu","Email": "213@moshavit.com","Address": "kineret 32","Phone": "054-2222234","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "14","FirstName": "2","LastName": "2","Password": "user14resu","Email": "214@moshavit.com","Address": "kineret 33","Phone": "054-2222235","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "15","FirstName": "2","LastName": "2","Password": "user15resu","Email": "215@moshavit.com","Address": "kineret 34","Phone": "054-2222236","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "16","FirstName": "2","LastName": "2","Password": "user16resu","Email": "216@moshavit.com","Address": "kineret 35","Phone": "054-2222237","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "17","FirstName": "2","LastName": "2","Password": "user17resu","Email": "217@moshavit.com","Address": "kineret 36","Phone": "054-2222238","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "18","FirstName": "2","LastName": "2","Password": "user18resu","Email": "218@moshavit.com","Address": "kineret 37","Phone": "054-2222239","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "19","FirstName": "2","LastName": "2","Password": "user19resu","Email": "219@moshavit.com","Address": "kineret 38","Phone": "054-2222240","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "20","FirstName": "2","LastName": "2","Password": "user20resu","Email": "220@moshavit.com","Address": "kineret 39","Phone": "054-2222241","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "21","FirstName": "2","LastName": "2","Password": "user21resu","Email": "221@moshavit.com","Address": "kineret 40","Phone": "054-2222242","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "22","FirstName": "2","LastName": "2","Password": "user22resu","Email": "222@moshavit.com","Address": "kineret 41","Phone": "054-2222243","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "23","FirstName": "2","LastName": "2","Password": "user23resu","Email": "223@moshavit.com","Address": "kineret 42","Phone": "054-2222244","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "24","FirstName": "2","LastName": "2","Password": "user24resu","Email": "224@moshavit.com","Address": "kineret 43","Phone": "054-2222245","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "25","FirstName": "2","LastName": "2","Password": "user25resu","Email": "225@moshavit.com","Address": "kineret 44","Phone": "054-2222246","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "26","FirstName": "2","LastName": "2","Password": "user26resu","Email": "226@moshavit.com","Address": "kineret 45","Phone": "054-2222247","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "27","FirstName": "2","LastName": "2","Password": "user27resu","Email": "227@moshavit.com","Address": "kineret 46","Phone": "054-2222248","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "28","FirstName": "2","LastName": "2","Password": "user28resu","Email": "228@moshavit.com","Address": "kineret 47","Phone": "054-2222249","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "29","FirstName": "2","LastName": "2","Password": "user29resu","Email": "229@moshavit.com","Address": "kineret 48","Phone": "054-2222250","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "30","FirstName": "2","LastName": "2","Password": "user30resu","Email": "230@moshavit.com","Address": "kineret 49","Phone": "054-2222251","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "31","FirstName": "2","LastName": "2","Password": "user31resu","Email": "231@moshavit.com","Address": "kineret 50","Phone": "054-2222252","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "32","FirstName": "2","LastName": "2","Password": "user32resu","Email": "232@moshavit.com","Address": "kineret 51","Phone": "054-2222253","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "33","FirstName": "2","LastName": "2","Password": "user33resu","Email": "233@moshavit.com","Address": "kineret 52","Phone": "054-2222254","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "34","FirstName": "2","LastName": "2","Password": "user34resu","Email": "234@moshavit.com","Address": "kineret 53","Phone": "054-2222255","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "35","FirstName": "2","LastName": "2","Password": "user35resu","Email": "235@moshavit.com","Address": "kineret 54","Phone": "054-2222256","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "36","FirstName": "2","LastName": "2","Password": "user36resu","Email": "236@moshavit.com","Address": "kineret 55","Phone": "054-2222257","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "37","FirstName": "2","LastName": "2","Password": "user37resu","Email": "237@moshavit.com","Address": "kineret 56","Phone": "054-2222258","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "38","FirstName": "2","LastName": "2","Password": "user38resu","Email": "238@moshavit.com","Address": "kineret 57","Phone": "054-2222259","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "39","FirstName": "2","LastName": "2","Password": "user39resu","Email": "239@moshavit.com","Address": "kineret 58","Phone": "054-2222260","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "40","FirstName": "2","LastName": "2","Password": "user40resu","Email": "240@moshavit.com","Address": "kineret 59","Phone": "054-2222261","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "41","FirstName": "2","LastName": "2","Password": "user41resu","Email": "241@moshavit.com","Address": "kineret 60","Phone": "054-2222262","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "42","FirstName": "2","LastName": "2","Password": "user42resu","Email": "242@moshavit.com","Address": "kineret 61","Phone": "054-2222263","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "43","FirstName": "2","LastName": "2","Password": "user43resu","Email": "243@moshavit.com","Address": "kineret 62","Phone": "054-2222264","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "44","FirstName": "2","LastName": "2","Password": "user44resu","Email": "244@moshavit.com","Address": "kineret 63","Phone": "054-2222265","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "45","FirstName": "2","LastName": "2","Password": "user45resu","Email": "245@moshavit.com","Address": "kineret 64","Phone": "054-2222266","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "46","FirstName": "2","LastName": "2","Password": "user46resu","Email": "246@moshavit.com","Address": "kineret 65","Phone": "054-2222267","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "47","FirstName": "2","LastName": "2","Password": "user47resu","Email": "247@moshavit.com","Address": "kineret 66","Phone": "054-2222268","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "48","FirstName": "2","LastName": "2","Password": "user48resu","Email": "248@moshavit.com","Address": "kineret 67","Phone": "054-2222269","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "49","FirstName": "2","LastName": "2","Password": "user49resu","Email": "249@moshavit.com","Address": "kineret 68","Phone": "054-2222270","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "50","FirstName": "2","LastName": "2","Password": "user50resu","Email": "250@moshavit.com","Address": "kineret 69","Phone": "054-2222271","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "51","FirstName": "2","LastName": "2","Password": "user51resu","Email": "251@moshavit.com","Address": "kineret 70","Phone": "054-2222272","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "52","FirstName": "2","LastName": "2","Password": "user52resu","Email": "252@moshavit.com","Address": "kineret 71","Phone": "054-2222273","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "53","FirstName": "2","LastName": "2","Password": "user53resu","Email": "253@moshavit.com","Address": "kineret 72","Phone": "054-2222274","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "54","FirstName": "2","LastName": "2","Password": "user54resu","Email": "254@moshavit.com","Address": "kineret 73","Phone": "054-2222275","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "55","FirstName": "2","LastName": "2","Password": "user55resu","Email": "255@moshavit.com","Address": "kineret 74","Phone": "054-2222276","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "56","FirstName": "2","LastName": "2","Password": "user56resu","Email": "256@moshavit.com","Address": "kineret 75","Phone": "054-2222277","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "57","FirstName": "2","LastName": "2","Password": "user57resu","Email": "257@moshavit.com","Address": "kineret 76","Phone": "054-2222278","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "58","FirstName": "2","LastName": "2","Password": "user58resu","Email": "258@moshavit.com","Address": "kineret 77","Phone": "054-2222279","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "59","FirstName": "2","LastName": "2","Password": "user59resu","Email": "259@moshavit.com","Address": "kineret 78","Phone": "054-2222280","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "60","FirstName": "2","LastName": "2","Password": "user60resu","Email": "260@moshavit.com","Address": "kineret 79","Phone": "054-2222281","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "61","FirstName": "2","LastName": "2","Password": "user61resu","Email": "261@moshavit.com","Address": "kineret 80","Phone": "054-2222282","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "62","FirstName": "2","LastName": "2","Password": "user62resu","Email": "262@moshavit.com","Address": "kineret 81","Phone": "054-2222283","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "63","FirstName": "2","LastName": "2","Password": "user63resu","Email": "263@moshavit.com","Address": "kineret 82","Phone": "054-2222284","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "64","FirstName": "2","LastName": "2","Password": "user64resu","Email": "264@moshavit.com","Address": "kineret 83","Phone": "054-2222285","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "65","FirstName": "2","LastName": "2","Password": "user65resu","Email": "265@moshavit.com","Address": "kineret 84","Phone": "054-2222286","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "66","FirstName": "2","LastName": "2","Password": "user66resu","Email": "266@moshavit.com","Address": "kineret 85","Phone": "054-2222287","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "67","FirstName": "2","LastName": "2","Password": "user67resu","Email": "267@moshavit.com","Address": "kineret 86","Phone": "054-2222288","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "68","FirstName": "2","LastName": "2","Password": "user68resu","Email": "268@moshavit.com","Address": "kineret 87","Phone": "054-2222289","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "69","FirstName": "2","LastName": "2","Password": "user69resu","Email": "269@moshavit.com","Address": "kineret 88","Phone": "054-2222290","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "70","FirstName": "2","LastName": "2","Password": "user70resu","Email": "270@moshavit.com","Address": "kineret 89","Phone": "054-2222291","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "71","FirstName": "2","LastName": "2","Password": "user71resu","Email": "271@moshavit.com","Address": "kineret 90","Phone": "054-2222292","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "72","FirstName": "2","LastName": "2","Password": "user72resu","Email": "272@moshavit.com","Address": "kineret 91","Phone": "054-2222293","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "73","FirstName": "2","LastName": "2","Password": "user73resu","Email": "273@moshavit.com","Address": "kineret 92","Phone": "054-2222294","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "74","FirstName": "2","LastName": "2","Password": "user74resu","Email": "274@moshavit.com","Address": "kineret 93","Phone": "054-2222295","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "75","FirstName": "2","LastName": "2","Password": "user75resu","Email": "275@moshavit.com","Address": "kineret 94","Phone": "054-2222296","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "76","FirstName": "2","LastName": "2","Password": "user76resu","Email": "276@moshavit.com","Address": "kineret 95","Phone": "054-2222297","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "77","FirstName": "2","LastName": "2","Password": "user77resu","Email": "277@moshavit.com","Address": "kineret 96","Phone": "054-2222298","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "78","FirstName": "2","LastName": "2","Password": "user78resu","Email": "278@moshavit.com","Address": "kineret 97","Phone": "054-2222299","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "79","FirstName": "2","LastName": "2","Password": "user79resu","Email": "279@moshavit.com","Address": "kineret 98","Phone": "054-2222300","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "80","FirstName": "2","LastName": "2","Password": "user80resu","Email": "280@moshavit.com","Address": "kineret 99","Phone": "054-2222301","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "81","FirstName": "2","LastName": "2","Password": "user81resu","Email": "281@moshavit.com","Address": "kineret 100","Phone": "054-2222302","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "82","FirstName": "2","LastName": "2","Password": "user82resu","Email": "282@moshavit.com","Address": "kineret 101","Phone": "054-2222303","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "83","FirstName": "2","LastName": "2","Password": "user83resu","Email": "283@moshavit.com","Address": "kineret 102","Phone": "054-2222304","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "84","FirstName": "2","LastName": "2","Password": "user84resu","Email": "284@moshavit.com","Address": "kineret 103","Phone": "054-2222305","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "85","FirstName": "2","LastName": "2","Password": "user85resu","Email": "285@moshavit.com","Address": "kineret 104","Phone": "054-2222306","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "86","FirstName": "2","LastName": "2","Password": "user86resu","Email": "286@moshavit.com","Address": "kineret 105","Phone": "054-2222307","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "87","FirstName": "2","LastName": "2","Password": "user87resu","Email": "287@moshavit.com","Address": "kineret 106","Phone": "054-2222308","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "88","FirstName": "2","LastName": "2","Password": "user88resu","Email": "288@moshavit.com","Address": "kineret 107","Phone": "054-2222309","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "89","FirstName": "2","LastName": "2","Password": "user89resu","Email": "289@moshavit.com","Address": "kineret 108","Phone": "054-2222310","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "90","FirstName": "2","LastName": "2","Password": "user90resu","Email": "290@moshavit.com","Address": "kineret 109","Phone": "054-2222311","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "91","FirstName": "2","LastName": "2","Password": "user91resu","Email": "291@moshavit.com","Address": "kineret 110","Phone": "054-2222312","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "92","FirstName": "2","LastName": "2","Password": "user92resu","Email": "292@moshavit.com","Address": "kineret 111","Phone": "054-2222313","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "93","FirstName": "2","LastName": "2","Password": "user93resu","Email": "293@moshavit.com","Address": "kineret 112","Phone": "054-2222314","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "94","FirstName": "2","LastName": "2","Password": "user94resu","Email": "294@moshavit.com","Address": "kineret 113","Phone": "054-2222315","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "95","FirstName": "2","LastName": "2","Password": "user95resu","Email": "295@moshavit.com","Address": "kineret 114","Phone": "054-2222316","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "96","FirstName": "2","LastName": "2","Password": "user96resu","Email": "296@moshavit.com","Address": "kineret 115","Phone": "054-2222317","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "97","FirstName": "2","LastName": "2","Password": "user97resu","Email": "297@moshavit.com","Address": "kineret 116","Phone": "054-2222318","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "98","FirstName": "2","LastName": "2","Password": "user98resu","Email": "298@moshavit.com","Address": "kineret 117","Phone": "054-2222319","StartTime": "2014-11-12T20:00:00"},
    {"IdUser": "99","FirstName": "2","LastName": "2","Password": "user99resu","Email": "299@moshavit.com","Address": "kineret 118","Phone": "054-2222320","StartTime": "2014-11-12T20:00:00"}
];

var BabySiter = [
    {"IdUser": "1","IdMessage": "1","Title": "babysiter 1","Content": "babysiter babysiter 1","Rate": "11","StarTime": "2014-11-11T20:00:00","EndTime": "2014-11-11T20:21:00","Name": "2 2","Phone": "054-2222222"},
    {"IdUser": "2","IdMessage": "2","Title": "babysiter 2","Content": "babysiter babysiter 2","Rate": "12","StarTime": "2014-11-11T20:00:00","EndTime": "2014-11-12T20:22:00","Name": "2 2","Phone": "054-2222223"},
    {"IdUser": "3","IdMessage": "3","Title": "babysiter 3","Content": "babysiter babysiter 3","Rate": "13","StarTime": "2014-11-13T20:00:00","EndTime": "2014-11-13T20:23:00","Name": "2 2","Phone": "054-2222224"},
    {"IdUser": "44","IdMessage": "4","Title": "babysiter 4","Content": "babysiter babysiter 4","Rate": "14","StarTime": "2014-11-13T20:00:00","EndTime": "2014-11-14T20:24:00","Name": "2 2","Phone": "054-2222225"},
    {"IdUser": "5","IdMessage": "5","Title": "babysiter 5","Content": "babysiter babysiter 5","Rate": "15","StarTime": "2014-11-15T20:00:00","EndTime": "2014-11-15T20:25:00","Name": "2 2","Phone": "054-2222226"},
    {"IdUser": "32","IdMessage": "6","Title": "babysiter 6","Content": "babysiter babysiter 6","Rate": "12","StarTime": "2014-11-15T20:00:00","EndTime": "2014-11-16T20:26:00","Name": "2 2","Phone": "054-2222227"},
    {"IdUser": "7","IdMessage": "7","Title": "babysiter 7","Content": "babysiter babysiter 7","Rate": "17","StarTime": "2014-11-17T20:00:00","EndTime": "2014-11-17T20:27:00","Name": "2 2","Phone": "054-2222228"},
    {"IdUser": "8","IdMessage": "8","Title": "babysiter 8","Content": "babysiter babysiter 8","Rate": "18","StarTime": "2014-11-17T20:00:00","EndTime": "2014-11-18T20:28:00","Name": "2 2","Phone": "054-2222229"},
    {"IdUser": "9","IdMessage": "9","Title": "babysiter 9","Content": "babysiter babysiter 9","Rate": "19","StarTime": "2014-11-19T20:00:00","EndTime": "2014-11-19T20:29:00","Name": "2 2","Phone": "054-2222230"},
    {"IdUser": "2","IdMessage": "10","Title": "babysiter 10","Content": "babysiter babysiter 10","Rate": "12","StarTime": "2014-11-19T20:00:00","EndTime": "2014-11-10T20:20:00","Name": "2 2","Phone": "054-2222231"},
    {"IdUser": "3","IdMessage": "11","Title": "babysiter 11","Content": "babysiter babysiter 11","Rate": "13","StarTime": "2014-11-13T20:00:00","EndTime": "2014-11-11T20:21:00","Name": "2 2","Phone": "054-2222232"},
    {"IdUser": "5","IdMessage": "12","Title": "babysiter 12","Content": "babysiter babysiter 12","Rate": "15","StarTime": "2014-11-11T20:00:00","EndTime": "2014-11-12T20:22:00","Name": "2 2","Phone": "054-2222233"},
    {"IdUser": "8","IdMessage": "13","Title": "babysiter 13","Content": "babysiter babysiter 13","Rate": "18","StarTime": "2014-11-18T20:00:00","EndTime": "2014-11-13T20:23:00","Name": "2 2","Phone": "054-2222234"},
    {"IdUser": "0","IdMessage": "14","Title": "babysiter 14","Content": "babysiter babysiter 14","Rate": "10","StarTime": "2014-11-13T20:00:00","EndTime": "2014-11-14T20:24:00","Name": "2 2","Phone": "054-2222235"},
    {"IdUser": "3","IdMessage": "15","Title": "babysiter 15","Content": "babysiter babysiter 15","Rate": "13","StarTime": "2014-11-13T20:00:00","EndTime": "2014-11-15T20:25:00","Name": "2 2","Phone": "054-2222236"},
    {"IdUser": "16","IdMessage": "16","Title": "babysiter 16","Content": "babysiter babysiter 16","Rate": "16","StarTime": "2014-11-15T20:00:00","EndTime": "2014-11-16T20:26:00","Name": "2 2","Phone": "054-2222237"},
    {"IdUser": "17","IdMessage": "17","Title": "babysiter 17","Content": "babysiter babysiter 17","Rate": "17","StarTime": "2014-11-17T20:00:00","EndTime": "2014-11-17T20:27:00","Name": "2 2","Phone": "054-2222238"},
    {"IdUser": "23","IdMessage": "18","Title": "babysiter 18","Content": "babysiter babysiter 18","Rate": "13","StarTime": "2014-11-17T20:00:00","EndTime": "2014-11-18T20:28:00","Name": "2 2","Phone": "054-2222239"},
    {"IdUser": "66","IdMessage": "19","Title": "babysiter 19","Content": "babysiter babysiter 19","Rate": "16","StarTime": "2014-11-16T20:00:00","EndTime": "2014-11-19T20:29:00","Name": "2 2","Phone": "054-2222240"},
    {"IdUser": "54","IdMessage": "20","Title": "babysiter 20","Content": "babysiter babysiter 20","Rate": "14","StarTime": "2014-11-19T20:00:00","EndTime": "2014-11-10T20:20:00","Name": "2 2","Phone": "054-2222241"},
    {"IdUser": "45","IdMessage": "21","Title": "babysiter 21","Content": "babysiter babysiter 21","Rate": "15","StarTime": "2014-11-15T20:00:00","EndTime": "2014-11-11T20:21:00","Name": "2 2","Phone": "054-2222242"},
    {"IdUser": "65","IdMessage": "22","Title": "babysiter 22","Content": "babysiter babysiter 22","Rate": "15","StarTime": "2014-11-11T20:00:00","EndTime": "2014-11-12T20:22:00","Name": "2 2","Phone": "054-2222243"},
    {"IdUser": "9","IdMessage": "23","Title": "babysiter 23","Content": "babysiter babysiter 23","Rate": "19","StarTime": "2014-11-19T20:00:00","EndTime": "2014-11-13T20:23:00","Name": "2 2","Phone": "054-2222244"},
    {"IdUser": "24","IdMessage": "24","Title": "babysiter 24","Content": "babysiter babysiter 24","Rate": "14","StarTime": "2014-11-13T20:00:00","EndTime": "2014-11-14T20:24:00","Name": "2 2","Phone": "054-2222245"}
];

var CarPull = [
    {"IdUser": "1","IdMessage": "1","Title": "babysiter 1","Content": "babysiter babysiter 1","To": "תל אביב","From": "אשדוד","PickUp": "2014-11-11T20:00:00","ReturnTime": "2014-11-11T20:21:00","Name": "2 2","Phone": "054-2222222"},
    {"IdUser": "2","IdMessage": "2","Title": "babysiter 2","Content": "babysiter babysiter 2","To": "ראש העין","From": "תל אביב","PickUp": "2014-11-11T20:00:00","ReturnTime": "2014-11-12T20:22:00","Name": "2 2","Phone": "054-2222223"},
    {"IdUser": "3","IdMessage": "3","Title": "babysiter 3","Content": "babysiter babysiter 3","To": "הרצליה","From": "תל אביב","PickUp": "2014-11-13T20:00:00","ReturnTime": "2014-11-13T20:23:00","Name": "2 2","Phone": "054-2222224"},
    {"IdUser": "44","IdMessage": "4","Title": "babysiter 4","Content": "babysiter babysiter 4","To": "חיפה","From": "אשדוד","PickUp": "2014-11-13T20:00:00","ReturnTime": "2014-11-14T20:24:00","Name": "2 2","Phone": "054-2222225"},
    {"IdUser": "5","IdMessage": "5","Title": "babysiter 5","Content": "babysiter babysiter 5","To": "אילת","From": "באר שבע","PickUp": "2014-11-15T20:00:00","ReturnTime": "2014-11-15T20:25:00","Name": "2 2","Phone": "054-2222226"},
    {"IdUser": "26","IdMessage": "6","Title": "babysiter 6","Content": "babysiter babysiter 6","To": "תל אביב","From": "אשדוד","PickUp": "2014-11-16T20:00:00","ReturnTime": "2014-11-16T20:26:00","Name": "2 2","Phone": "054-2222227"},
    {"IdUser": "31","IdMessage": "7","Title": "babysiter 7","Content": "babysiter babysiter 7","To": "ראש העין","From": "תל אביב","PickUp": "2014-11-16T20:00:00","ReturnTime": "2014-11-17T20:27:00","Name": "2 2","Phone": "054-2222228"},
    {"IdUser": "36","IdMessage": "8","Title": "babysiter 8","Content": "babysiter babysiter 8","To": "הרצליה","From": "הרצליה","PickUp": "2014-11-16T20:00:00","ReturnTime": "2014-11-18T20:28:00","Name": "2 2","Phone": "054-2222229"},
    {"IdUser": "41","IdMessage": "9","Title": "babysiter 9","Content": "babysiter babysiter 9","To": "חיפה","From": "הרצליה","PickUp": "2014-11-18T20:00:00","ReturnTime": "2014-11-19T20:29:00","Name": "2 2","Phone": "054-2222230"},
    {"IdUser": "46","IdMessage": "10","Title": "babysiter 10","Content": "babysiter babysiter 10","To": "הרצליה","From": "תל אביב","PickUp": "2014-11-16T20:00:00","ReturnTime": "2014-11-10T20:20:00","Name": "2 2","Phone": "054-2222231"},
    {"IdUser": "51","IdMessage": "11","Title": "babysiter 11","Content": "babysiter babysiter 11","To": "תל אביב","From": "אשדוד","PickUp": "2014-11-11T20:00:00","ReturnTime": "2014-11-11T20:21:00","Name": "2 2","Phone": "054-2222232"},
    {"IdUser": "56","IdMessage": "12","Title": "babysiter 12","Content": "babysiter babysiter 12","To": "תל אביב","From": "תל אביב","PickUp": "2014-11-11T20:00:00","ReturnTime": "2014-11-12T20:22:00","Name": "2 2","Phone": "054-2222233"},
    {"IdUser": "61","IdMessage": "13","Title": "babysiter 13","Content": "babysiter babysiter 13","To": "הרצליה","From": "תל אביב","PickUp": "2014-11-11T20:00:00","ReturnTime": "2014-11-13T20:23:00","Name": "2 2","Phone": "054-2222234"}
];

var BulletinBoard = [
    {"IdUser": "1","IdMessage": "1","Title": "babysiter 1","Content": "babysiter babysiter 1","Description": "כגגדכ","Details": "ציע","Name": "2 2","Phone": "054-2222222"},
    {"IdUser": "2","IdMessage": "2","Title": "babysiter 2","Content": "babysiter babysiter 2","Description": "כגדג","Details": "יעצע","Name": "2 2","Phone": "054-2222223"},
    {"IdUser": "3","IdMessage": "3","Title": "babysiter 3","Content": "babysiter babysiter 3","Description": "גכגדכ","Details": "ציעעצ","Name": "2 2","Phone": "054-2222224"},
    {"IdUser": "44","IdMessage": "4","Title": "babysiter 4","Content": "babysiter babysiter 4","Description": "גכדכ","Details": "צייעצ","Name": "2 2","Phone": "054-2222225"},
    {"IdUser": "5","IdMessage": "5","Title": "babysiter 5","Content": "babysiter babysiter 5","Description": "כדג","Details": "ציציעע","Name": "2 2","Phone": "054-2222226"},
    {"IdUser": "32","IdMessage": "6","Title": "babysiter 6","Content": "babysiter babysiter 6","Description": "בסה","Details": "יעימימ","Name": "2 2","Phone": "054-2222227"},
    {"IdUser": "7","IdMessage": "7","Title": "babysiter 7","Content": "babysiter babysiter 7","Description": "חא","Details": "עמעמעי","Name": "2 2","Phone": "054-2222228"},
    {"IdUser": "8","IdMessage": "8","Title": "babysiter 8","Content": "babysiter babysiter 8","Description": "חטאט","Details": "ציע","Name": "2 2","Phone": "054-2222229"},
    {"IdUser": "9","IdMessage": "9","Title": "babysiter 9","Content": "babysiter babysiter 9","Description": "חטאט","Details": "טאטא","Name": "2 2","Phone": "054-2222230"},
    {"IdUser": "2","IdMessage": "10","Title": "babysiter 10","Content": "babysiter babysiter 10","Description": "חטאט","Details": "טחאאט","Name": "2 2","Phone": "054-2222231"}
];