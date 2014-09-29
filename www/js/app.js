/**
* Created with IntelliJ IDEA.
* User: erez
* Date: 2/22/13
* Time: 9:27 PM
* To change this template use File | Settings | File Templates.
*/
var Debug_mode = false;
if(Debug_mode){
    var CurrentSessionUser = {
        "IdUser":65,
        "FirstName": "Admin",
        "LastName": "None",
        "Password": "azxsdxadc",
        "Email": "mail@gmail.com",
        "Address": "בני אפריים 222 , תל אביב",
        "StartTime": "2014-08-30T20:55:12",
        "Phone": "051-2345678"
    };  
}else{
    var CurrentSessionUser = {};  
} 

//var base_url = "https://api.github.com/users/erez-il/repos";
var register_api = "http://moshavit.somee.com/api/register/";
var login_api = "http://moshavit.somee.com/api/login/";
var set_msg_api = "http://moshavit.somee.com/api/msg/";
var get_all_msg = "http://moshavit.somee.com/api/msgs/";
var get_all_users = "http://moshavit.somee.com/api/user/";

var loading_it = function(op){
    if($('#container-head1').val()===undefined){
        $('body').append('<div id="container-head1" style="display: none;" ><div class="contener_box" style="position: relative;margin-left: auto;margin-right: auto; " id="loadin_it">    <div class="box">      <i><img src="img/logo.png" style="max-height: 100px; max-width: 100px;display: block;    margin-left: auto;    margin-right: auto;" ></i>    </div></div></div>');
    }
    //op = show || hide
    switch (op) {
        case "show":
            $('#container-head1').css("display", "block");
            break;
        case "hide":
            $('#container-head1').css("display", "none");
            break;
    }
};

var clean_main_container = function () {
    $('#container').empty();
};
var clean_body = function () {
    $('body').empty();
};

var add_containers_to_body = function () {
    $('body').append('<div id="container-head"  ></div>');
    $('body').append('<div id="container-head1" style="display: none;" ><div class="contener_box" style="position: relative;margin-left: auto;margin-right: auto; " id="loadin_it">    <div class="box">      <i><img src="img/logo.png" style="max-height: 100px; max-width: 100px;display: block;    margin-left: auto;    margin-right: auto;" ></i>    </div></div></div>');
    $('body').append('<div id="container"></div>');
};

var main_screen = function(){
    clean_body();
    add_containers_to_body();
    static_TemplateHBS('desktop_menu', 'container-head');
    static_TemplateHBS("phone_menu", 'container');
    setTimeout(function(){$('#sessionUsername').text('שלום '+CurrentSessionUser.FirstName)},1000);
};

var getTemplateHBS = function (templateName, callback) {
    $.get("templatesDirectory/" + templateName + ".hbs", function (data) {
        var template = Handlebars.compile(data);
        if (Debug_mode) console.log("Compiled " + templateName + " template.");
        callback(template);
    });
};
var dynamic_TemplateHBS = function (name, container ,t) {
    loading_it("show");
    getTemplateHBS(name, function (template) {
        sleep(1000);
        switch (name) {
            case "users":
                if(t!==''){
                    data=[];
                    data.push(getByID(Users,'IdUser',t));
                    console.log(data);
                }
                else
                    data=Users;
                break;
            case "carpull":
                if(t!=='') {
                    data=[];
                    data.push(getByID(CarPull,'IdMessage',t));
                }
                else
                    data=CarPull;
                break;
            case "babysitter":
                if(t!==''){
                    data=[];
                    data.push(getByID(BabySitter,'IdMessage',t));
                }
                else
                    data=BabySitter;
                break;
            case "messages":
                if(t!==''){
                    data=[];
                    data.push(getByID(BulletinBoard,'IdMessage',t));
                }
                else
                    data=BulletinBoard;
                break;
            case "survey":  
                if(t!==''){
                    data=[];
                    data.push(getByID(Survey,'IdSurvey',t));
                }
                else                   
                    data=Survey;
                break;
            case "user_profile":
                if(t!=='')
                    data=getByID(Users,'IdUser',t);
                else
                    data=CurrentSessionUser;
                break;
        }
        if (Debug_mode) console.log("Got data by api: ", data);
        var templateWithData = template(data);
        container = '#'+container;
        loading_it("hide"); 
        $(container).append(templateWithData);
    });

};
var static_TemplateHBS = function (templateName,container) {
    loading_it("show");
    $.get("templatesDirectory/" + templateName + ".hbs", function (data) {
        var template = Handlebars.compile(data);
        if(container!=='body')container='#'+container;
        loading_it("hide");
        $(container).append(template);
        if (Debug_mode) console.log("Compiled " + templateName + " template.");
    });
};

var getPicture=function(){
    navigator.camera.getPicture(function(){}, function(){});
}

var vibrate=function(ml){
    navigator.notification.vibrate(ml);
}
var beep_it=function(times){navigator.notification.beep(times);}

var alert_moshavit=function(msg,title,btn){
    //btn="yes,No";
    navigator.notification.alert(
        msg,
        function(){},
        title,
        btn
    );
}

var confirm_moshavit_exit=function(msg,title,btns){navigator.notification.confirm(msg,confirm_moshavit_exit_callback,title,btns);}
var confirm_moshavit_exit_callback=function(op){if (op == 1){navigator.app.exitApp();}}

var getByID=function(arr,key, value) {

    var result = [];
    arr.forEach(function(o){if (o[key] == value) result.push(o);} );
    return result? result[0] : null; // or undefined

}


var post_api=function(api_route,params){
    //$.post("http://moshavit.somee.com/api/"+"login", {Email:"admin",Password:"admin"}, function(data) {});
    var data={};
    var url="http://moshavit.somee.com/api/"+api_route;
    $.post(url, params, function(data) {

        // Display the selected image on send complete
        alert(data);

    });
}
var put_api=function(api_route,params){
    //$.put("http://moshavit.somee.com/api/"+"login", {Email:"admin",Password:"admin"}, function(data) {});
    var data={};
    var url="http://moshavit.somee.com/api/"+api_route;
    $.post(url, params, function(data) {

        // Display the selected image on send complete
        alert(data);

    });
}

var base64Matcher = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$");
Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        "t": Math.round(lvalue / Users.length * 10000)/100,
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": Math.round(lvalue / rvalue * 10000)/100,
        "%": lvalue % rvalue
    }[operator];
});
Handlebars.registerHelper("fixDate", function(date) {
    //get 2014-09-25T21:56:00.13 and return 21:56:00 25/09/2014
    dateHHII = date.split("T");
    dateYYMMDD = dateHHII[0];
    dateHHII = dateHHII[1].split(".");
    dateYYMMDD = dateYYMMDD.split("-");

    return dateHHII[0]+" "+dateYYMMDD[2]+"/"+dateYYMMDD[1]+"/"+dateYYMMDD[0];
});
Handlebars.registerHelper('base64', function(text) {
    if (base64Matcher.test(text) & text.length > 150) { 
        text="<img style='width:100px;height:100px;' src='data:image/jpeg;base64," + text + "'/>";
        return new Handlebars.SafeString(text);
    } else {
        return text;
    }
});

var sleep=function(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

var update_data = function(api){
    switch (api) {
        case "users":
            $.get("http://moshavit.somee.com/api/user/", function (data) { Users=data;});
            break;
        case "carpull":
            $.get("http://moshavit.somee.com/api/BabySitter/", function (data) { BabySitter=data; });
            break;
        case "babysitter":
            $.get("http://moshavit.somee.com/api/carpull/", function (data) { CarPull=data; });
            break;
        case "bulletinboard":
            $.get("http://moshavit.somee.com/api/bulletinboard/", function (data) { BulletinBoard=data; }); 
            break;
        case "survey":
            $.get("http://moshavit.somee.com/api/Survey/", function (data) { Survey=data; });
            break;
    }
}

//start server on the webapp folder
//python -m SimpleHTTPServer 8000
$(document).ready(function () {
    if(CurrentSessionUser.IdUser===undefined){
        static_TemplateHBS("login",'body');
        $("#email").focus();   
    }
    else{
        if(Debug_mode){
            loading_it("show");
            main_screen();
            //        $.get("http://moshavit.somee.com/api/u1ser/", function (data) { Users=data;main_screen(); }); 
            //        $.get("http://moshavit.somee.com/api/BabySitter/", function (data) { BabySitter=data; }); 
            //        $.get("http://moshavit.somee.com/api/carpull/", function (data) { CarPull=data; }); 
            //        $.get("http://moshavit.somee.com/api/bulletinboard/", function (data) { BulletinBoard=data; }); 
            //        $.get("http://moshavit.somee.com/api/Survey/", function (data) { Survey=data; }); 
        }


        //will load all data from server and then will load the menu items
        else{
            loading_it("show");
            $.get("http://moshavit.somee.com/api/user/", function (data) { 
                Users=data;  
                $.get("http://moshavit.somee.com/api/BabySitter/", function (data) { 
                    BabySitter=data; 
                    $.get("http://moshavit.somee.com/api/carpull/", function (data) { 
                        CarPull=data; 
                        $.get("http://moshavit.somee.com/api/bulletinboard/", function (data) { 
                            BulletinBoard=data; 
                            $.get("http://moshavit.somee.com/api/Survey/", function (data) { 
                                Survey=data;
                                main_screen(); 
                            });
                        }); 
                    });  
                });  
            });
        }
    } 
});                                          


var validateEmail = function(email){
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}



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
//	"BabySitter","CarPull","GiveAndTake","Survey"
//}
//
//BabySitter
//{
//	"IdUser":12345,
//		"Title":"kjdfkjsdhfkjsdhfkjhfkj",
//		"Content":"kjdfhksjdfhkjsdjk",
//		"Rate": 1234.234,
//		"StartTime":"yyyy-mm-dd hh:ii",
//		"EndTime":"yyyy-mm-dd hh:ii"
//}
//
//הודעות BabySitter
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
    {"IdUser": "1","FirstName": "EH","LastName": "FZ","Password": "admin","Email": "admin","Address": "kineret 20","Phone": "054-2222222","StartTime": "30/06/2014T15:55:12"},    {"IdUser": "2","FirstName": "אתי","LastName": "אהרון","Password": "user2resu","Email": "אתי2@moshavit.com","Address": "הרדוף 274","Phone": "054-2222223","StartTime": "30/06/2014T18:37:14"},    {"IdUser": "3","FirstName": "ראובן","LastName": "בר","Password": "user3resu","Email": "ראובן3@moshavit.com","Address": "פועלי ציון 10","Phone": "054-2222224","StartTime": "30/06/2014T18:48:08"},    {"IdUser": "4","FirstName": "אלכס","LastName": "כהן פדידה","Password": "user4resu","Email": "אלכס4@moshavit.com","Address": "חיים בר לב 1","Phone": "054-2222225","StartTime": "30/06/2014T19:24:48"},    {"IdUser": "5","FirstName": "חיה","LastName": "טנוס","Password": "user5resu","Email": "חיה5@moshavit.com","Address": "ת.ד. 421","Phone": "054-2222226","StartTime": "30/06/2014T22:51:40"},    {"IdUser": "6","FirstName": "רעות","LastName": "אייזנברג","Password": "user6resu","Email": "רעות6@moshavit.com","Address": "אלכסנדר ינאי 21","Phone": "054-2222227","StartTime": "30/06/2014T23:12:46"},    {"IdUser": "7","FirstName": "אברהם","LastName": "אייזנברג","Password": "user7resu","Email": "אברהם7@moshavit.com","Address": "יהושע בן נון 70","Phone": "054-2222228","StartTime": "30/06/2014T23:58:05"},
    {"IdUser": "8","FirstName": "סלבה","LastName": "שלום","Password": "user8resu","Email": "סלבה8@moshavit.com","Address": "דניה 56","Phone": "054-2222229","StartTime": "27/06/2014T11:31:33"},    {"IdUser": "9","FirstName": "ברכה","LastName": "שלום","Password": "user9resu","Email": "ברכה9@moshavit.com","Address": "סנהדרין 13","Phone": "054-2222230","StartTime": "27/06/2014T11:31:33"},    {"IdUser": "10","FirstName": "בני","LastName": "שושלב","Password": "user10resu","Email": "בני10@moshavit.com","Address": "ת.ד. 40203","Phone": "054-2222231","StartTime": "27/06/2014T11:31:33"},    {"IdUser": "11","FirstName": "ויולטה","LastName": "מיכלסון","Password": "user11resu","Email": "ויולטה11@moshavit.com","Address": "סמטת הילד 4","Phone": "054-2222232","StartTime": "01/07/2014T10:58:08"},    {"IdUser": "12","FirstName": "עמית","LastName": "שוהם","Password": "user12resu","Email": "עמית12@moshavit.com","Address": "רקנאטי 2","Phone": "054-2222233","StartTime": "01/07/2014T11:00:55"},    {"IdUser": "13","FirstName": "גולי","LastName": "גולדברג","Password": "user13resu","Email": "גולי13@moshavit.com","Address": "kineret 32","Phone": "054-2222234","StartTime": "01/07/2014T11:52:13"},    {"IdUser": "14","FirstName": "מעיין","LastName": "סוקאן","Password": "user14resu","Email": "מעיין14@moshavit.com","Address": "החלוצים 19","Phone": "054-2222235","StartTime": "01/07/2014T12:19:38"},
    {"IdUser": "15","FirstName": "מיכל","LastName": "ביסקוביץ","Password": "user15resu","Email": "מיכל15@moshavit.com","Address": "דרך אבא הלל סילבר 7","Phone": "054-2222236","StartTime": "01/07/2014T12:24:19"},    {"IdUser": "16","FirstName": "גיא","LastName": "פסי","Password": "user16resu","Email": "גיא16@moshavit.com","Address": "שוהם 11","Phone": "054-2222237","StartTime": "01/07/2014T12:27:46"},    {"IdUser": "17","FirstName": "דיאנה","LastName": "רייזמן","Password": "user17resu","Email": "דיאנה17@moshavit.com","Address": "אליעזר קפלן 84","Phone": "054-2222238","StartTime": "01/07/2014T12:37:39"},    {"IdUser": "18","FirstName": "אסתרה","LastName": "פרל","Password": "user18resu","Email": "אסתרה18@moshavit.com","Address": "אבן גבירול 63","Phone": "054-2222239","StartTime": "01/07/2014T13:38:30"},    {"IdUser": "19","FirstName": "שני","LastName": "לוי","Password": "user19resu","Email": "שני19@moshavit.com","Address": "דרך מנחם בגין 23","Phone": "054-2222240","StartTime": "01/07/2014T13:42:38"},    {"IdUser": "20","FirstName": "מרט","LastName": "בן יהודה","Password": "user20resu","Email": "מרט20@moshavit.com","Address": "סוקולוב 64","Phone": "054-2222241","StartTime": "01/07/2014T15:42:49"},    {"IdUser": "21","FirstName": "טל","LastName": "ביטון","Password": "user21resu","Email": "טל21@moshavit.com","Address": "הנשיאים 3","Phone": "054-2222242","StartTime": "01/07/2014T22:33:27"},
    {"IdUser": "22","FirstName": "בני","LastName": "נהור עובדיה","Password": "user22resu","Email": "בני22@moshavit.com","Address": "ת.ד. 8170","Phone": "054-2222243","StartTime": "01/07/2014T23:39:10"},    {"IdUser": "23","FirstName": "מיכל","LastName": "לוי","Password": "user23resu","Email": "מיכל23@moshavit.com","Address": "הגדוד העברי 29","Phone": "054-2222244","StartTime": "01/07/2014T23:50:43"},    {"IdUser": "24","FirstName": "מיכאלו","LastName": "וינטראוב","Password": "user24resu","Email": "מיכאלו24@moshavit.com","Address": "kineret 43","Phone": "054-2222245","StartTime": "02/07/2014T11:03:13"},    {"IdUser": "25","FirstName": "רעות","LastName": "פריד","Password": "user25resu","Email": "רעות25@moshavit.com","Address": "kineret 44","Phone": "054-2222246","StartTime": "02/07/2014T11:05:44"},    {"IdUser": "26","FirstName": "עפר","LastName": "פדידה","Password": "user26resu","Email": "עפר26@moshavit.com","Address": "kineret 45","Phone": "054-2222247","StartTime": "02/07/2014T14:21:15"},    {"IdUser": "27","FirstName": "שרון","LastName": "ארגוב","Password": "user27resu","Email": "שרון27@moshavit.com","Address": "פלורנטין 30","Phone": "054-2222248","StartTime": "02/07/2014T15:16:35"},    {"IdUser": "28","FirstName": "יהונתן","LastName": "מהלדה","Password": "user28resu","Email": "יהונתן28@moshavit.com","Address": "וולפסון 21","Phone": "054-2222249","StartTime": "02/07/2014T15:51:36"},
    {"IdUser": "29","FirstName": "רחל","LastName": "שפר","Password": "user29resu","Email": "רחל29@moshavit.com","Address": "רוטשילד 97","Phone": "054-2222250","StartTime": "02/07/2014T18:59:51"},    {"IdUser": "30","FirstName": "לירן","LastName": "שניר","Password": "user30resu","Email": "לירן30@moshavit.com","Address": "השקמה 22","Phone": "054-2222251","StartTime": "03/07/2014T11:30:51"},    {"IdUser": "31","FirstName": "מיכל","LastName": "זליג","Password": "user31resu","Email": "מיכל31@moshavit.com","Address": "הפטיש 1","Phone": "054-2222252","StartTime": "03/07/2014T12:07:36"},    {"IdUser": "32","FirstName": "מיכל","LastName": "ביאר","Password": "user32resu","Email": "מיכל32@moshavit.com","Address": "ת.ד. 168","Phone": "054-2222253","StartTime": "03/07/2014T13:52:49"},    {"IdUser": "33","FirstName": "אלינור","LastName": "סימה","Password": "user33resu","Email": "אלינור33@moshavit.com","Address": "גיבורי ישראל 5","Phone": "054-2222254","StartTime": "03/07/2014T18:33:31"},    {"IdUser": "34","FirstName": "מיכאל","LastName": "אתר","Password": "user34resu","Email": "מיכאל34@moshavit.com","Address": "הרצל 93","Phone": "054-2222255","StartTime": "03/07/2014T20:35:46"},    {"IdUser": "35","FirstName": "משה","LastName": "קריל","Password": "user35resu","Email": "משה35@moshavit.com","Address": "מאמר מרדכי ","Phone": "054-2222256","StartTime": "03/07/2014T21:54:43"},
    {"IdUser": "36","FirstName": "יהודה","LastName": "חי","Password": "user36resu","Email": "יהודה36@moshavit.com","Address": "ילדי טהרן 5","Phone": "054-2222257","StartTime": "04/07/2014T12:10:33"},    {"IdUser": "37","FirstName": "עמית","LastName": "קימנסקי","Password": "user37resu","Email": "עמית37@moshavit.com","Address": "רבנו חננאל 17","Phone": "054-2222258","StartTime": "04/07/2014T15:04:21"},    {"IdUser": "38","FirstName": "אלונה","LastName": "רות","Password": "user38resu","Email": "אלונה38@moshavit.com","Address": "רח 206 38","Phone": "054-2222259","StartTime": "04/07/2014T16:35:04"},    {"IdUser": "39","FirstName": "עלמה","LastName": "יחיא","Password": "user39resu","Email": "עלמה39@moshavit.com","Address": "סמילנסקי 10","Phone": "054-2222260","StartTime": "04/07/2014T18:43:40"},    {"IdUser": "40","FirstName": "אמיר","LastName": "אלגרבלי","Password": "user40resu","Email": "אמיר40@moshavit.com","Address": "אלחדיף 1","Phone": "054-2222261","StartTime": "04/07/2014T21:25:13"},    {"IdUser": "41","FirstName": "חגי","LastName": "הירשברג","Password": "user41resu","Email": "חגי41@moshavit.com","Address": "הגאונים 17","Phone": "054-2222262","StartTime": "04/07/2014T22:01:17"},    {"IdUser": "42","FirstName": "אורון","LastName": "דנינו","Password": "user42resu","Email": "אורון42@moshavit.com","Address": "היצירה 16","Phone": "054-2222263","StartTime": "05/07/2014T13:12:23"},
    {"IdUser": "43","FirstName": "פנינה","LastName": "קרטס","Password": "user43resu","Email": "פנינה43@moshavit.com","Address": "קבוץ גלויות 48","Phone": "054-2222264","StartTime": "05/07/2014T20:01:31"},    {"IdUser": "44","FirstName": "אנה","LastName": "באחורי","Password": "user44resu","Email": "אנה44@moshavit.com","Address": "הרב ריינס 20","Phone": "054-2222265","StartTime": "06/07/2014T15:48:11"},    {"IdUser": "45","FirstName": "חגית וירון","LastName": "רוגל","Password": "user45resu","Email": "חגית וירון45@moshavit.com","Address": "קבוץ גלויות 8","Phone": "054-2222266","StartTime": "07/07/2014T10:46:35"},    {"IdUser": "46","FirstName": "סהר","LastName": "קרן צורף","Password": "user46resu","Email": "סהר46@moshavit.com","Address": "הנביאים 8","Phone": "054-2222267","StartTime": "07/07/2014T17:43:29"},    {"IdUser": "47","FirstName": "stella","LastName": "שי","Password": "user47resu","Email": "stella47@moshavit.com","Address": "kineret 66","Phone": "054-2222268","StartTime": "07/07/2014T19:40:09"},    {"IdUser": "48","FirstName": "אייל","LastName": "לביא","Password": "user48resu","Email": "אייל48@moshavit.com","Address": "kineret 67","Phone": "054-2222269","StartTime": "08/07/2014T12:28:37"},    {"IdUser": "49","FirstName": "אורון","LastName": "לביא בלין","Password": "user49resu","Email": "אורון49@moshavit.com","Address": "kineret 68","Phone": "054-2222270","StartTime": "08/07/2014T14:06:05"},
    {"IdUser": "50","FirstName": "עמית","LastName": "גולן","Password": "user50resu","Email": "עמית50@moshavit.com","Address": "kineret 69","Phone": "054-2222271","StartTime": "08/07/2014T15:24:15"},    {"IdUser": "51","FirstName": "נטלי","LastName": "גולן","Password": "user51resu","Email": "נטלי51@moshavit.com","Address": "לוי משה 11","Phone": "054-2222272","StartTime": "08/07/2014T23:22:21"},    {"IdUser": "52","FirstName": "רועי","LastName": "ולד","Password": "user52resu","Email": "רועי52@moshavit.com","Address": "ת.ד. 5152","Phone": "054-2222273","StartTime": "09/07/2014T20:18:40"},    {"IdUser": "53","FirstName": "מורן","LastName": "צל","Password": "user53resu","Email": "מורן53@moshavit.com","Address": "השומר 6","Phone": "054-2222274","StartTime": "09/07/2014T21:20:44"},    {"IdUser": "54","FirstName": "חביבה","LastName": "קהן","Password": "user54resu","Email": "חביבה54@moshavit.com","Address": "ים המלח 25","Phone": "054-2222275","StartTime": "10/07/2014T00:01:47"},    {"IdUser": "55","FirstName": "קולט","LastName": "קובלנץ בן דוד","Password": "user55resu","Email": "קולט55@moshavit.com","Address": "ברשבסקי 6","Phone": "054-2222276","StartTime": "10/07/2014T10:50:01"},    {"IdUser": "56","FirstName": "איתי","LastName": "רוזן","Password": "user56resu","Email": "איתי56@moshavit.com","Address": "ת.ד. 873","Phone": "054-2222277","StartTime": "10/07/2014T13:23:56"},
    {"IdUser": "57","FirstName": "אלכס","LastName": "אבדייב","Password": "user57resu","Email": "אלכס57@moshavit.com","Address": "השדרה המרכזית 15","Phone": "054-2222278","StartTime": "10/07/2014T16:55:22"},    {"IdUser": "58","FirstName": "עידן","LastName": "כהן","Password": "user58resu","Email": "עידן58@moshavit.com","Address": "התומר 6","Phone": "054-2222279","StartTime": "10/07/2014T18:57:28"},    {"IdUser": "59","FirstName": "יפעת","LastName": "נגב","Password": "user59resu","Email": "יפעת59@moshavit.com","Address": "נורדאו 8","Phone": "054-2222280","StartTime": "10/07/2014T20:22:48"},    {"IdUser": "60","FirstName": "אלוש","LastName": "טוירמן","Password": "user60resu","Email": "אלוש60@moshavit.com","Address": "העצמאות 15","Phone": "054-2222281","StartTime": "10/07/2014T20:37:42"},    {"IdUser": "61","FirstName": "Dorothy","LastName": "חורי","Password": "user61resu","Email": "Dorothy61@moshavit.com","Address": "סול בלו 33","Phone": "054-2222282","StartTime": "13/07/2014T12:31:50"},    {"IdUser": "62","FirstName": "יניב","LastName": "פיגלש","Password": "user62resu","Email": "יניב62@moshavit.com","Address": "הורדים 31","Phone": "054-2222283","StartTime": "13/07/2014T23:37:03"},    {"IdUser": "63","FirstName": "שושי","LastName": "ברנשטיין","Password": "user63resu","Email": "שושי63@moshavit.com","Address": "התקוה 12","Phone": "054-2222284","StartTime": "14/07/2014T11:53:25"},
    {"IdUser": "64","FirstName": "יאיר","LastName": "ריבקו","Password": "user64resu","Email": "יאיר64@moshavit.com","Address": "ת.ד. 9760","Phone": "054-2222285","StartTime": "30/06/2014T15:55:12"},    {"IdUser": "65","FirstName": "ריבלין","LastName": "שאהון","Password": "user65resu","Email": "ריבלין65@moshavit.com","Address": "kineret 84","Phone": "054-2222286","StartTime": "30/06/2014T18:37:14"},    {"IdUser": "66","FirstName": "עוזי","LastName": "זיסו","Password": "user66resu","Email": "עוזי66@moshavit.com","Address": "ארנון 17","Phone": "054-2222287","StartTime": "30/06/2014T18:48:08"},    {"IdUser": "67","FirstName": "דניאל","LastName": "וקס","Password": "user67resu","Email": "דניאל67@moshavit.com","Address": "הקשת 4","Phone": "054-2222288","StartTime": "30/06/2014T19:24:48"},    {"IdUser": "68","FirstName": "ליאורה","LastName": "אלמוג","Password": "user68resu","Email": "ליאורה68@moshavit.com","Address": "הרטום 4","Phone": "054-2222289","StartTime": "30/06/2014T22:51:40"},    {"IdUser": "69","FirstName": "אתי","LastName": "נאור","Password": "user69resu","Email": "אתי69@moshavit.com","Address": "לוי משה 11","Phone": "054-2222290","StartTime": "30/06/2014T23:12:46"},    {"IdUser": "70","FirstName": "איציק","LastName": "עין גיל","Password": "user70resu","Email": "איציק70@moshavit.com","Address": "קויפמן 6","Phone": "054-2222291","StartTime": "30/06/2014T23:58:05"},
    {"IdUser": "71","FirstName": "לאון","LastName": "אוחנינה","Password": "user71resu","Email": "לאון71@moshavit.com","Address": "גד מכנס 6","Phone": "054-2222292","StartTime": "27/06/2014T11:31:33"},    {"IdUser": "72","FirstName": "מוטי","LastName": "קול","Password": "user72resu","Email": "מוטי72@moshavit.com","Address": "יהדות בריטניה 12","Phone": "054-2222293","StartTime": "27/06/2014T11:31:33"},    {"IdUser": "73","FirstName": "לימור","LastName": "קהן","Password": "user73resu","Email": "לימור73@moshavit.com","Address": "הסדנא 8","Phone": "054-2222294","StartTime": "27/06/2014T11:31:33"},    {"IdUser": "74","FirstName": "אלעד","LastName": "נחיאש","Password": "user74resu","Email": "אלעד74@moshavit.com","Address": "המלאכה 8","Phone": "054-2222295","StartTime": "01/07/2014T10:58:08"},    {"IdUser": "75","FirstName": "אורית","LastName": "בני רביעה","Password": "user75resu","Email": "אורית75@moshavit.com","Address": "בצלאל 8","Phone": "054-2222296","StartTime": "01/07/2014T11:00:55"},    {"IdUser": "76","FirstName": "נגה","LastName": "קורי","Password": "user76resu","Email": "נגה76@moshavit.com","Address": "מונטיפיורי 35","Phone": "054-2222297","StartTime": "01/07/2014T11:52:13"},    {"IdUser": "77","FirstName": "יוסי","LastName": "זהרי","Password": "user77resu","Email": "יוסי77@moshavit.com","Address": "מוזס נח ויהודה 13","Phone": "054-2222298","StartTime": "01/07/2014T12:19:38"},
    {"IdUser": "78","FirstName": "אפרים","LastName": "איזנר","Password": "user78resu","Email": "אפרים78@moshavit.com","Address": "מתתיהו 5","Phone": "054-2222299","StartTime": "01/07/2014T12:24:19"},    {"IdUser": "79","FirstName": "זוהר","LastName": "רוזן","Password": "user79resu","Email": "זוהר79@moshavit.com","Address": "עפרוני ","Phone": "054-2222300","StartTime": "01/07/2014T12:27:46"},    {"IdUser": "80","FirstName": "אולגה","LastName": "שחיטמן","Password": "user80resu","Email": "אולגה80@moshavit.com","Address": "הלימון 19","Phone": "054-2222301","StartTime": "01/07/2014T12:37:39"},    {"IdUser": "81","FirstName": "יצחק","LastName": "לביא","Password": "user81resu","Email": "יצחק81@moshavit.com","Address": "בנימין 22","Phone": "054-2222302","StartTime": "01/07/2014T13:38:30"},    {"IdUser": "82","FirstName": "מוטי","LastName": "גבע","Password": "user82resu","Email": "מוטי82@moshavit.com","Address": "ספיר יוסף 5","Phone": "054-2222303","StartTime": "01/07/2014T13:42:38"},    {"IdUser": "83","FirstName": "ירון","LastName": "בדעאן","Password": "user83resu","Email": "ירון83@moshavit.com","Address": "יוני נתניהו 5","Phone": "054-2222304","StartTime": "01/07/2014T15:42:49"},    {"IdUser": "84","FirstName": "שלומי","LastName": "שמעוני","Password": "user84resu","Email": "שלומי84@moshavit.com","Address": "יצירה 19","Phone": "054-2222305","StartTime": "01/07/2014T22:33:27"},
    {"IdUser": "85","FirstName": "דני","LastName": "קלקנר","Password": "user85resu","Email": "דני85@moshavit.com","Address": "גרשון 44","Phone": "054-2222306","StartTime": "01/07/2014T23:39:10"},    {"IdUser": "86","FirstName": "מרטין","LastName": "ספדי","Password": "user86resu","Email": "מרטין86@moshavit.com","Address": "רמבם 31","Phone": "054-2222307","StartTime": "01/07/2014T23:50:43"},    {"IdUser": "87","FirstName": "יוסי","LastName": "אלון","Password": "user87resu","Email": "יוסי87@moshavit.com","Address": "ההולנדים 2","Phone": "054-2222308","StartTime": "01/07/2014T10:58:08"},    {"IdUser": "88","FirstName": "ליאת","LastName": "כנעני","Password": "user88resu","Email": "ליאת88@moshavit.com","Address": "6","Phone": "054-2222309","StartTime": "01/07/2014T11:00:55"},    {"IdUser": "89","FirstName": "חביבה","LastName": "בן אורי","Password": "user89resu","Email": "חביבה89@moshavit.com","Address": "המרפא 8","Phone": "054-2222310","StartTime": "01/07/2014T11:52:13"},    {"IdUser": "90","FirstName": "קולט","LastName": "גלעד","Password": "user90resu","Email": "קולט90@moshavit.com","Address": "עגור 358","Phone": "054-2222311","StartTime": "01/07/2014T12:19:38"},    {"IdUser": "91","FirstName": "איתי","LastName": "רוסון","Password": "user91resu","Email": "איתי91@moshavit.com","Address": "הפלדה 7","Phone": "054-2222312","StartTime": "01/07/2014T12:24:19"},
    {"IdUser": "92","FirstName": "אלכס","LastName": "טכמן","Password": "user92resu","Email": "אלכס92@moshavit.com","Address": "גרשום 7","Phone": "054-2222313","StartTime": "01/07/2014T12:27:46"},    {"IdUser": "93","FirstName": "חביבה","LastName": "לנצאו","Password": "user93resu","Email": "חביבה93@moshavit.com","Address": "7","Phone": "054-2222314","StartTime": "01/07/2014T12:37:39"},    {"IdUser": "94","FirstName": "קולט","LastName": "אספניולי","Password": "user94resu","Email": "קולט94@moshavit.com","Address": "שפרינצק 330","Phone": "054-2222315","StartTime": "01/07/2014T13:38:30"},    {"IdUser": "95","FirstName": "איתי","LastName": "יבנה","Password": "user95resu","Email": "איתי95@moshavit.com","Address": "הברזל 34","Phone": "054-2222316","StartTime": "01/07/2014T13:42:38"},    {"IdUser": "96","FirstName": "חביבה","LastName": "אלמוג","Password": "user96resu","Email": "חביבה96@moshavit.com","Address": "התמר 10","Phone": "054-2222317","StartTime": "01/07/2014T15:42:49"},    {"IdUser": "97","FirstName": "קולט","LastName": "נאור","Password": "user97resu","Email": "קולט97@moshavit.com","Address": "שלום אש 8","Phone": "054-2222318","StartTime": "01/07/2014T22:33:27"},
    {"IdUser": "98","FirstName": "איתי","LastName": "עין גיל","Password": "user98resu","Email": "איתי98@moshavit.com","Address": "kineret 117","Phone": "054-2222319","StartTime": "01/07/2014T23:39:10"},
    {"IdUser": "99","FirstName": "אלכס","LastName": "אוחנינה","Password": "user99resu","Email": "אלכס99@moshavit.com","Address": "kineret 118","Phone": "054-2222320","StartTime": "01/07/2014T23:50:43"}
];

var BabySitter = [
    {"IdUser": "1","IdMessage": "1","Title": "דרושה בייביסיטר","Content": "ילד בן 5","Rate": "11","StartTime": "2014-11-11T20:00:00","EndTime": "2014-11-11T20:21:00","Name": "EH FZ","Phone": "054-2222222"},    {"IdUser": "2","IdMessage": "2","Title": "דרושה בייביסיטר אחראית","Content": "לילדים בני  5 ו- 8","Rate": "12","StartTime": "2014-11-11T20:00:00","EndTime": "2014-11-12T20:22:00","Name": "אתי אהרון","Phone": "054-2222223"},    {"IdUser": "3","IdMessage": "3","Title": "דרושה בייביסיטר","Content": "לילדה בת  1","Rate": "13","StartTime": "2014-11-13T20:00:00","EndTime": "2014-11-13T20:23:00","Name": "ראובן בר","Phone": "054-2222224"},    {"IdUser": "44","IdMessage": "4","Title": "דרושה בייביסיטר","Content": "לילד בן  6","Rate": "14","StartTime": "2014-11-13T20:00:00","EndTime": "2014-11-14T20:24:00","Name": "אנה באחורי","Phone": "054-2222225"},    {"IdUser": "5","IdMessage": "5","Title": "דרושה בייביסיטר אחראית","Content": "לילדה בת  5","Rate": "15","StartTime": "2014-11-15T20:00:00","EndTime": "2014-11-15T20:25:00","Name": "חיה טנוס","Phone": "054-2222226"},    {"IdUser": "32","IdMessage": "6","Title": "דרושה בייביסיטר","Content": "לילד בן  1","Rate": "12","StartTime": "2014-11-15T20:00:00","EndTime": "2014-11-16T20:26:00","Name": "מיכל ביאר","Phone": "054-2222227"},    {"IdUser": "7","IdMessage": "7","Title": "דרושה בייביסיטר אחראית","Content": "לילדים בני  8 ו- 2","Rate": "17","StartTime": "2014-11-17T20:00:00","EndTime": "2014-11-17T20:27:00","Name": "אברהם אייזנברג","Phone": "054-2222228"},
    {"IdUser": "8","IdMessage": "8","Title": "דרושה בייביסיטר","Content": "לילדה בת  6","Rate": "18","StartTime": "2014-11-17T20:00:00","EndTime": "2014-11-18T20:28:00","Name": "סלבה שלום","Phone": "054-2222229"},    {"IdUser": "9","IdMessage": "9","Title": "דרושה בייביסיטר אחראית","Content": "לילד בן  10","Rate": "19","StartTime": "2014-11-19T20:00:00","EndTime": "2014-11-19T20:29:00","Name": "ברכה שלום","Phone": "054-2222230"},    {"IdUser": "2","IdMessage": "10","Title": "דרושה בייביסיטר","Content": "לילדה בת  1","Rate": "12","StartTime": "2014-11-19T20:00:00","EndTime": "2014-11-10T20:20:00","Name": "אתי אהרון","Phone": "054-2222231"},    {"IdUser": "3","IdMessage": "11","Title": "דרושה בייביסיטר","Content": "לילד בן  9","Rate": "13","StartTime": "2014-11-13T20:00:00","EndTime": "2014-11-11T20:21:00","Name": "ראובן בר","Phone": "054-2222232"},    {"IdUser": "5","IdMessage": "12","Title": "דרושה בייביסיטר אחראית","Content": "לילדה בת  1","Rate": "15","StartTime": "2014-11-11T20:00:00","EndTime": "2014-11-12T20:22:00","Name": "חיה טנוס","Phone": "054-2222233"},    {"IdUser": "8","IdMessage": "13","Title": "דרושה בייביסיטר אחראית","Content": "לילדים בני  9 ו- 8","Rate": "18","StartTime": "2014-11-18T20:00:00","EndTime": "2014-11-13T20:23:00","Name": "סלבה שלום","Phone": "054-2222234"},    {"IdUser": "88","IdMessage": "14","Title": "דרושה בייביסיטר","Content": "לילדה בת  8","Rate": "18","StartTime": "2014-11-13T20:00:00","EndTime": "2014-11-14T20:24:00","Name": "ליאת כנעני","Phone": "054-2222235"},
    {"IdUser": "3","IdMessage": "15","Title": "דרושה בייביסיטר אחראית","Content": "לילדה בת  4","Rate": "13","StartTime": "2014-11-13T20:00:00","EndTime": "2014-11-15T20:25:00","Name": "ראובן בר","Phone": "054-2222236"},    {"IdUser": "16","IdMessage": "16","Title": "דרושה בייביסיטר","Content": "לילד בן  2","Rate": "16","StartTime": "2014-11-15T20:00:00","EndTime": "2014-11-16T20:26:00","Name": "גיא פסי","Phone": "054-2222237"},    {"IdUser": "17","IdMessage": "17","Title": "דרושה בייביסיטר","Content": "לילדה בת  10","Rate": "17","StartTime": "2014-11-17T20:00:00","EndTime": "2014-11-17T20:27:00","Name": "דיאנה רייזמן","Phone": "054-2222238"},    {"IdUser": "23","IdMessage": "18","Title": "דרושה בייביסיטר אחראית","Content": "לילדה בת  7","Rate": "13","StartTime": "2014-11-17T20:00:00","EndTime": "2014-11-18T20:28:00","Name": "מיכל לוי","Phone": "054-2222239"},    {"IdUser": "66","IdMessage": "19","Title": "דרושה בייביסיטר","Content": "לילד בן  9","Rate": "16","StartTime": "2014-11-16T20:00:00","EndTime": "2014-11-19T20:29:00","Name": "עוזי זיסו","Phone": "054-2222240"},    {"IdUser": "54","IdMessage": "20","Title": "דרושה בייביסיטר","Content": "לילדים בני  9 ו- 9","Rate": "14","StartTime": "2014-11-19T20:00:00","EndTime": "2014-11-10T20:20:00","Name": "חביבה קהן","Phone": "054-2222241"},    {"IdUser": "45","IdMessage": "21","Title": "דרושה בייביסיטר אחראית","Content": "לילדה בת  6","Rate": "15","StartTime": "2014-11-15T20:00:00","EndTime": "2014-11-11T20:21:00","Name": "חגית וירון רוגל","Phone": "054-2222242"},
    {"IdUser": "65","IdMessage": "22","Title": "דרושה בייביסיטר אחראית","Content": "לילד בן  7","Rate": "15","StartTime": "2014-11-11T20:00:00","EndTime": "2014-11-12T20:22:00","Name": "ריבלין שאהון","Phone": "054-2222243"},    {"IdUser": "43","IdMessage": "23","Title": "דרושה בייביסיטר אחראית","Content": "לילדה בת  6","Rate": "13","StartTime": "2014-11-12T20:00:00","EndTime": "2014-11-13T20:23:00","Name": "פנינה קרטס","Phone": "054-2222244"},    {"IdUser": "34","IdMessage": "24","Title": "דרושה בייביסיטר","Content": "לילד בן  4","Rate": "14","StartTime": "2014-11-14T20:00:00","EndTime": "2014-11-14T20:24:00","Name": "מיכאל אתר","Phone": "054-2222245"},    {"IdUser": "77","IdMessage": "25","Title": "דרושה בייביסיטר","Content": "לילדים בני  3 ו- 3","Rate": "17","StartTime": "2014-11-14T20:00:00","EndTime": "2014-11-15T20:25:00","Name": "יוסי זהרי","Phone": "054-2222246"},    {"IdUser": "23","IdMessage": "26","Title": "דרושה בייביסיטר אחראית","Content": "לילדה בת  5","Rate": "13","StartTime": "2014-11-13T20:00:00","EndTime": "2014-11-16T20:26:00","Name": "מיכל לוי","Phone": "054-2222247"},    {"IdUser": "83","IdMessage": "27","Title": "דרושה בייביסיטר אחראית","Content": "לילד בן  6","Rate": "13","StartTime": "2014-11-16T20:00:00","EndTime": "2014-11-17T20:27:00","Name": "ירון בדעאן","Phone": "054-2222248"},    {"IdUser": "86","IdMessage": "28","Title": "דרושה בייביסיטר אחראית","Content": "לילדים בני  9 ו- 1","Rate": "16","StartTime": "2014-11-17T20:00:00","EndTime": "2014-11-18T20:28:00","Name": "מרטין ספדי","Phone": "054-2222249"},
    {"IdUser": "6","IdMessage": "29","Title": "דרושה בייביסיטר","Content": "לילד בן  8","Rate": "16","StartTime": "2014-11-16T20:00:00","EndTime": "2014-11-19T20:29:00","Name": "רעות אייזנברג","Phone": "054-2222250"},    {"IdUser": "16","IdMessage": "30","Title": "דרושה בייביסיטר","Content": "לילדים בני  7 ו- 6","Rate": "16","StartTime": "2014-11-19T20:00:00","EndTime": "2014-11-10T20:20:00","Name": "גיא פסי","Phone": "054-2222251"},    {"IdUser": "29","IdMessage": "31","Title": "דרושה בייביסיטר אחראית","Content": "לילדה בת  4","Rate": "19","StartTime": "2014-11-19T20:00:00","EndTime": "2014-11-11T20:21:00","Name": "רחל שפר","Phone": "054-2222252"},    {"IdUser": "41","IdMessage": "32","Title": "דרושה בייביסיטר אחראית","Content": "לילד בן  9","Rate": "11","StartTime": "2014-11-11T20:00:00","EndTime": "2014-11-12T20:22:00","Name": "חגי הירשברג","Phone": "054-2222253"},    {"IdUser": "6","IdMessage": "33","Title": "דרושה בייביסיטר אחראית","Content": "לילדה בת  5","Rate": "16","StartTime": "2014-11-12T20:00:00","EndTime": "2014-11-13T20:23:00","Name": "רעות אייזנברג","Phone": "054-2222254"}
];

var CarPull = [
    {"IdUser": "1","IdMessage": "1","Title": "עבודה","Content": "טרמפ לעבודה","To": "תל אביב","From": "אשדוד","PickUp": "2014-11-11T20:00:00","ReturnTime": "2014-11-11T20:21:00","Name": "EH FZ","Phone": "054-2222222"},    {"IdUser": "2","IdMessage": "2","Title": "טרמפ לעבודה","Content": "כל בוקר","To": "ראש העין","From": "תל אביב","PickUp": "2014-11-11T20:00:00","ReturnTime": "2014-11-12T20:22:00","Name": "אתי אהרון","Phone": "054-2222223"},    {"IdUser": "3","IdMessage": "3","Title": "חד פעמי","Content": "בימי ראשון בלבד","To": "הרצליה","From": "תל אביב","PickUp": "2014-11-13T20:00:00","ReturnTime": "2014-11-13T20:23:00","Name": "ראובן בר","Phone": "054-2222224"},    {"IdUser": "44","IdMessage": "4","Title": "הסעה קבועה","Content": "ראשון,חמישי","To": "חיפה","From": "אשדוד","PickUp": "2014-11-13T20:00:00","ReturnTime": "2014-11-14T20:24:00","Name": "אנה באחורי","Phone": "054-2222225"},    {"IdUser": "5","IdMessage": "5","Title": "הסעה קבועה","Content": "כל השבוע","To": "אילת","From": "באר שבע","PickUp": "2014-11-15T20:00:00","ReturnTime": "2014-11-15T20:25:00","Name": "חיה טנוס","Phone": "054-2222226"},    {"IdUser": "26","IdMessage": "6","Title": "חד פעמי","Content": "טרמפ לעבודה","To": "תל אביב","From": "אשדוד","PickUp": "2014-11-16T20:00:00","ReturnTime": "2014-11-16T20:26:00","Name": "עפר פדידה","Phone": "054-2222227"},    {"IdUser": "31","IdMessage": "7","Title": "הסעה קבועה","Content": "כל השבוע","To": "ראש העין","From": "תל אביב","PickUp": "2014-11-16T20:00:00","ReturnTime": "2014-11-17T20:27:00","Name": "מיכל זליג","Phone": "054-2222228"},
    {"IdUser": "36","IdMessage": "8","Title": "הסעה קבועה","Content": "כל השבוע","To": "הרצליה","From": "הרצליה","PickUp": "2014-11-16T20:00:00","ReturnTime": "2014-11-18T20:28:00","Name": "יהודה חי","Phone": "054-2222229"},    {"IdUser": "41","IdMessage": "9","Title": "חד פעמי","Content": "טרמפ לעבודה","To": "חיפה","From": "הרצליה","PickUp": "2014-11-18T20:00:00","ReturnTime": "2014-11-19T20:29:00","Name": "חגי הירשברג","Phone": "054-2222230"},    {"IdUser": "46","IdMessage": "10","Title": "חד פעמי","Content": "טרמפ לעבודה","To": "הרצליה","From": "תל אביב","PickUp": "2014-11-16T20:00:00","ReturnTime": "2014-11-10T20:20:00","Name": "סהר קרן צורף","Phone": "054-2222231"},    {"IdUser": "51","IdMessage": "11","Title": "הסעה קבועה","Content": "כל השבוע","To": "תל אביב","From": "אשדוד","PickUp": "2014-11-11T20:00:00","ReturnTime": "2014-11-11T20:21:00","Name": "נטלי גולן","Phone": "054-2222232"},    {"IdUser": "56","IdMessage": "12","Title": "הסעה קבועה","Content": "ביום שלישי הקרוב","To": "תל אביב","From": "תל אביב","PickUp": "2014-11-11T20:00:00","ReturnTime": "2014-11-12T20:22:00","Name": "איתי רוזן","Phone": "054-2222233"},    {"IdUser": "45","IdMessage": "13","Title": "הסעה קבועה","Content": "שני","To": "הרצליה","From": "תל אביב","PickUp": "2014-11-15T20:00:00","ReturnTime": "2014-11-13T20:23:00","Name": "חגית וירון רוגל","Phone": "054-2222234"},    {"IdUser": "2","IdMessage": "14","Title": "טרמפ לעבודה","Content": "כל בוקר","To": "ראש העין","From": "תל אביב","PickUp": "2014-11-13T20:00:00","ReturnTime": "2014-11-14T20:24:00","Name": "אתי אהרון","Phone": "054-2222223"},
    {"IdUser": "3","IdMessage": "15","Title": "חד פעמי","Content": "בימי ראשון בלבד","To": "הרצליה","From": "תל אביב","PickUp": "2014-11-13T20:00:00","ReturnTime": "2014-11-15T20:25:00","Name": "ראובן בר","Phone": "054-2222224"},    {"IdUser": "44","IdMessage": "16","Title": "הסעה קבועה","Content": "ראשון,חמישי","To": "חיפה","From": "אשדוד","PickUp": "2014-11-15T20:00:00","ReturnTime": "2014-11-16T20:26:00","Name": "אנה באחורי","Phone": "054-2222225"},    {"IdUser": "24","IdMessage": "17","Title": "הסעה קבועה","Content": "כל השבוע","To": "אילת","From": "באר שבע","PickUp": "2014-11-14T20:00:00","ReturnTime": "2014-11-17T20:27:00","Name": "מיכאלו וינטראוב","Phone": "054-2222226"},    {"IdUser": "2","IdMessage": "18","Title": "חד פעמי","Content": "טרמפ לעבודה","To": "תל אביב","From": "אשדוד","PickUp": "2014-11-12T20:00:00","ReturnTime": "2014-11-18T20:28:00","Name": "אתי אהרון","Phone": "054-2222227"},    {"IdUser": "75","IdMessage": "19","Title": "הסעה קבועה","Content": "כל השבוע","To": "ראש העין","From": "תל אביב","PickUp": "2014-11-18T20:00:00","ReturnTime": "2014-11-19T20:29:00","Name": "אורית בני רביעה","Phone": "054-2222228"},    {"IdUser": "77","IdMessage": "20","Title": "הסעה קבועה","Content": "כל השבוע","To": "הרצליה","From": "הרצליה","PickUp": "2014-11-17T20:00:00","ReturnTime": "2014-11-10T20:20:00","Name": "יוסי זהרי","Phone": "054-2222229"},    {"IdUser": "89","IdMessage": "21","Title": "חד פעמי","Content": "טרמפ לעבודה","To": "חיפה","From": "הרצליה","PickUp": "2014-11-10T20:00:00","ReturnTime": "2014-11-11T20:21:00","Name": "חביבה בן אורי","Phone": "054-2222230"},
    {"IdUser": "99","IdMessage": "22","Title": "חד פעמי","Content": "טרמפ לעבודה","To": "הרצליה","From": "תל אביב","PickUp": "2014-11-19T20:00:00","ReturnTime": "2014-11-12T20:22:00","Name": "אלכס אוחנינה","Phone": "054-2222231"},    {"IdUser": "44","IdMessage": "23","Title": "הסעה קבועה","Content": "כל השבוע","To": "תל אביב","From": "אשדוד","PickUp": "2014-11-14T20:00:00","ReturnTime": "2014-11-13T20:23:00","Name": "אנה באחורי","Phone": "054-2222232"},    {"IdUser": "22","IdMessage": "24","Title": "הסעה קבועה","Content": "ביום שלישי הקרוב","To": "תל אביב","From": "תל אביב","PickUp": "2014-11-13T20:00:00","ReturnTime": "2014-11-14T20:24:00","Name": "בני נהור עובדיה","Phone": "054-2222233"},    {"IdUser": "7","IdMessage": "25","Title": "הסעה קבועה","Content": "שני","To": "הרצליה","From": "תל אביב","PickUp": "2014-11-17T20:00:00","ReturnTime": "2014-11-15T20:25:00","Name": "אברהם אייזנברג","Phone": "054-2222234"}
];

var BulletinBoard = [
    {"IdUser": "1","IdMessage": "1","Title": "נושא דוגמא 1","Content": "מכיל דוגמא נושא דוגמא 1  1","Description": "תאור דוגמא נושא דוגמא 1  1","Details": "פרטיי דוגמא נושא דוגמא 1 אתי אהרון  1","Name": "EH FZ","Phone": "054-2222222"},    {"IdUser": "2","IdMessage": "2","Title": "נושא דוגמא 2","Content": "מכיל דוגמא נושא דוגמא 2  2","Description": "תאור דוגמא נושא דוגמא 2  2","Details": "פרטיי דוגמא נושא דוגמא 2 ראובן בר  2","Name": "אתי אהרון","Phone": "054-2222223"},    {"IdUser": "3","IdMessage": "3","Title": "נושא דוגמא 3","Content": "מכיל דוגמא נושא דוגמא 3  3","Description": "תאור דוגמא נושא דוגמא 3  3","Details": "פרטיי דוגמא נושא דוגמא 3 דני קלקנר  3","Name": "ראובן בר","Phone": "054-2222224"},    {"IdUser": "85","IdMessage": "4","Title": "נושא דוגמא 4","Content": "מכיל דוגמא נושא דוגמא 4  4","Description": "תאור דוגמא נושא דוגמא 4  4","Details": "פרטיי דוגמא נושא דוגמא 4 זוהר רוזן  4","Name": "דני קלקנר","Phone": "054-2222225"},    {"IdUser": "79","IdMessage": "5","Title": "נושא דוגמא 5","Content": "מכיל דוגמא נושא דוגמא 5  5","Description": "תאור דוגמא נושא דוגמא 5  5","Details": "פרטיי דוגמא נושא דוגמא 5 מיכל ביאר  5","Name": "זוהר רוזן","Phone": "054-2222226"},    {"IdUser": "32","IdMessage": "6","Title": "נושא דוגמא 6","Content": "מכיל דוגמא נושא דוגמא 6  6","Description": "תאור דוגמא נושא דוגמא 6  6","Details": "פרטיי דוגמא נושא דוגמא 6 גיא פסי  6","Name": "מיכל ביאר","Phone": "054-2222227"},    {"IdUser": "16","IdMessage": "7","Title": "נושא דוגמא 7","Content": "מכיל דוגמא נושא דוגמא 7  7","Description": "תאור דוגמא נושא דוגמא 7  7","Details": "פרטיי דוגמא נושא דוגמא 7 Dorothy חורי  7","Name": "גיא פסי","Phone": "054-2222228"},
    {"IdUser": "61","IdMessage": "8","Title": "נושא דוגמא 8","Content": "מכיל דוגמא נושא דוגמא 8  8","Description": "תאור דוגמא נושא דוגמא 8  8","Details": "פרטיי דוגמא נושא דוגמא 8 ברכה שלום  8","Name": "Dorothy חורי","Phone": "054-2222229"},    {"IdUser": "9","IdMessage": "9","Title": "נושא דוגמא 9","Content": "מכיל דוגמא נושא דוגמא 9  9","Description": "תאור דוגמא נושא דוגמא 9  9","Details": "פרטיי דוגמא נושא דוגמא 9 מיכל ביסקוביץ  9","Name": "ברכה שלום","Phone": "054-2222230"},    {"IdUser": "15","IdMessage": "10","Title": "נושא דוגמא 10","Content": "מכיל דוגמא נושא דוגמא 10  10","Description": "תאור דוגמא נושא דוגמא 10  10","Details": "פרטיי דוגמא נושא דוגמא 10 אתי אהרון  10","Name": "מיכל ביסקוביץ","Phone": "054-2222231"},    {"IdUser": "2","IdMessage": "11","Title": "נושא דוגמא 11","Content": "מכיל דוגמא נושא דוגמא 11  11","Description": "תאור דוגמא נושא דוגמא 11  11","Details": "פרטיי דוגמא נושא דוגמא 11 ראובן בר  11","Name": "אתי אהרון","Phone": "054-2222223"},    {"IdUser": "3","IdMessage": "12","Title": "נושא דוגמא 12","Content": "מכיל דוגמא נושא דוגמא 12  12","Description": "תאור דוגמא נושא דוגמא 12  12","Details": "פרטיי דוגמא נושא דוגמא 12 אנה באחורי  12","Name": "ראובן בר","Phone": "054-2222224"},    {"IdUser": "44","IdMessage": "13","Title": "נושא דוגמא 13","Content": "מכיל דוגמא נושא דוגמא 13  13","Description": "תאור דוגמא נושא דוגמא 13  13","Details": "פרטיי דוגמא נושא דוגמא 13 חיה טנוס  13","Name": "אנה באחורי","Phone": "054-2222225"},    {"IdUser": "5","IdMessage": "14","Title": "נושא דוגמא 14","Content": "מכיל דוגמא נושא דוגמא 14  14","Description": "תאור דוגמא נושא דוגמא 14  14","Details": "פרטיי דוגמא נושא דוגמא 14 מיכל ביאר  14","Name": "חיה טנוס","Phone": "054-2222226"},
    {"IdUser": "32","IdMessage": "15","Title": "נושא דוגמא 15","Content": "מכיל דוגמא נושא דוגמא 15  15","Description": "תאור דוגמא נושא דוגמא 15  15","Details": "פרטיי דוגמא נושא דוגמא 15 סלבה שלום  15","Name": "מיכל ביאר","Phone": "054-2222227"},    {"IdUser": "8","IdMessage": "16","Title": "נושא דוגמא 16","Content": "מכיל דוגמא נושא דוגמא 16  16","Description": "תאור דוגמא נושא דוגמא 16  16","Details": "פרטיי דוגמא נושא דוגמא 16 חגית וירון רוגל  16","Name": "סלבה שלום","Phone": "054-2222228"},    {"IdUser": "45","IdMessage": "17","Title": "נושא דוגמא 17","Content": "מכיל דוגמא נושא דוגמא 17  17","Description": "תאור דוגמא נושא דוגמא 17  17","Details": "פרטיי דוגמא נושא דוגמא 17 חביבה קהן  17","Name": "חגית וירון רוגל","Phone": "054-2222229"},    {"IdUser": "54","IdMessage": "18","Title": "נושא דוגמא 18","Content": "מכיל דוגמא נושא דוגמא 18  18","Description": "תאור דוגמא נושא דוגמא 18  18","Details": "פרטיי דוגמא נושא דוגמא 18 אלינור סימה  18","Name": "חביבה קהן","Phone": "054-2222230"},    {"IdUser": "33","IdMessage": "19","Title": "נושא דוגמא 19","Content": "מכיל דוגמא נושא דוגמא 19  19","Description": "תאור דוגמא נושא דוגמא 19  19","Details": "פרטיי דוגמא נושא דוגמא 19 אתי אהרון  19","Name": "אלינור סימה","Phone": "054-2222231"},    {"IdUser": "2","IdMessage": "20","Title": "נושא דוגמא 20","Content": "מכיל דוגמא נושא דוגמא 20  20","Description": "תאור דוגמא נושא דוגמא 20  20","Details": "פרטיי דוגמא נושא דוגמא 20 מיכל ביאר  20","Name": "אתי אהרון","Phone": "054-2222231"},    {"IdUser": "32","IdMessage": "21","Title": "נושא דוגמא 21","Content": "מכיל דוגמא נושא דוגמא 21  21","Description": "תאור דוגמא נושא דוגמא 21  21","Details": "פרטיי דוגמא נושא דוגמא 21 חביבה אלמוג  21","Name": "מיכל ביאר","Phone": "054-2222223"},
    {"IdUser": "96","IdMessage": "22","Title": "נושא דוגמא 22","Content": "מכיל דוגמא נושא דוגמא 22  22","Description": "תאור דוגמא נושא דוגמא 22  22","Details": "פרטיי דוגמא נושא דוגמא 22 אתי נאור  22","Name": "חביבה אלמוג","Phone": "054-2222224"},    {"IdUser": "69","IdMessage": "23","Title": "נושא דוגמא 23","Content": "מכיל דוגמא נושא דוגמא 23  23","Description": "תאור דוגמא נושא דוגמא 23  23","Details": "פרטיי דוגמא נושא דוגמא 23 חיה טנוס  23","Name": "אתי נאור","Phone": "054-2222225"},    {"IdUser": "5","IdMessage": "24","Title": "נושא דוגמא 24","Content": "מכיל דוגמא נושא דוגמא 24  24","Description": "תאור דוגמא נושא דוגמא 24  24","Details": "פרטיי דוגמא נושא דוגמא 24 מיכל ביאר  24","Name": "חיה טנוס","Phone": "054-2222226"},    {"IdUser": "32","IdMessage": "25","Title": "נושא דוגמא 25","Content": "מכיל דוגמא נושא דוגמא 25  25","Description": "תאור דוגמא נושא דוגמא 25  25","Details": "פרטיי דוגמא נושא דוגמא 25   25","Name": "מיכל ביאר","Phone": "054-2222227"}
];

var Survey = [
    {"IdUser": "1","IdSurvey": "1","Question": "אנג'לינה ג'ולי היפה בנשים?","Yes": "34","No": "13","Avoid": "4","StartTime": "2014-11-11T20:00:00","EndTime": "2014-11-11T20:21:00","VadName": "EH FZ","TotalVote": "51"},    {"IdUser": "2","IdSurvey": "2","Question": "מחירי הדירות יעלו או ירדו","Yes": "2","No": "13","Avoid": "7","StartTime": "2014-11-11T20:00:00","EndTime": "2014-11-12T20:22:00","VadName": "אתי אהרון","TotalVote": "22"},    {"IdUser": "3","IdSurvey": "3","Question": "המאכל הישראלי האהוב ביותר - חומוס","Yes": "24","No": "36","Avoid": "4","StartTime": "2014-11-13T20:00:00","EndTime": "2014-11-13T20:23:00","VadName": "ראובן בר","TotalVote": "64"},    {"IdUser": "44","IdSurvey": "4","Question": "מיקרוסופט - ווינדוס ענקית התוכנה בדרך למטה?","Yes": "19","No": "31","Avoid": "3","StartTime": "2014-11-13T20:00:00","EndTime": "2014-11-14T20:24:00","VadName": "אנה באחורי","TotalVote": "53"},    {"IdUser": "5","IdSurvey": "5","Question": "האם הדיוטי פרי (duty free) באמת הכי זול?","Yes": "36","No": "2","Avoid": "7","StartTime": "2014-11-15T20:00:00","EndTime": "2014-11-15T20:25:00","VadName": "חיה טנוס","TotalVote": "45"},    {"IdUser": "26","IdSurvey": "6","Question": "הבורסה תעלה או תרד?","Yes": "44","No": "29","Avoid": "7","StartTime": "2014-11-16T20:00:00","EndTime": "2014-11-16T20:26:00","VadName": "עפר פדידה","TotalVote": "80"},    {"IdUser": "31","IdSurvey": "7","Question": "האם אתם בעד או נגד מדינה פלסטינאית","Yes": "16","No": "17","Avoid": "3","StartTime": "2014-11-16T20:00:00","EndTime": "2014-11-17T20:27:00","VadName": "מיכל זליג","TotalVote": "36"},
    {"IdUser": "36","IdSurvey": "8","Question": "משקיעים בבורסה?","Yes": "47","No": "25","Avoid": "3","StartTime": "2014-11-16T20:00:00","EndTime": "2014-11-18T20:28:00","VadName": "יהודה חי","TotalVote": "75"},    {"IdUser": "41","IdSurvey": "9","Question": "מורפיקס,האם אתם משתמשים?","Yes": "17","No": "15","Avoid": "2","StartTime": "2014-11-18T20:00:00","EndTime": "2014-11-19T20:29:00","VadName": "חגי הירשברג","TotalVote": "34"},    {"IdUser": "46","IdSurvey": "10","Question": "משחקים בכסף?","Yes": "47","No": "13","Avoid": "0","StartTime": "2014-11-16T20:00:00","EndTime": "2014-11-10T20:20:00","VadName": "סהר קרן צורף","TotalVote": "60"},    {"IdUser": "51","IdSurvey": "11","Question": "מזלות,מאמינים?","Yes": "13","No": "1","Avoid": "4","StartTime": "2014-11-11T20:00:00","EndTime": "2014-11-11T20:21:00","VadName": "נטלי גולן","TotalVote": "18"},    {"IdUser": "56","IdSurvey": "12","Question": "העם אתם ילדותיים ?","Yes": "15","No": "24","Avoid": "6","StartTime": "2014-11-11T20:00:00","EndTime": "2014-11-12T20:22:00","VadName": "איתי רוזן","TotalVote": "45"},    {"IdUser": "61","IdSurvey": "13","Question": "טיסה,אתם אוהבים לטוס?","Yes": "55","No": "15","Avoid": "2","StartTime": "2014-11-11T20:00:00","EndTime": "2014-11-13T20:23:00","VadName": "Dorothy חורי","TotalVote": "72"}
];


