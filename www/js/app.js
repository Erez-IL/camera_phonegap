/**
* Created with IntelliJ IDEA.
* User: Erez Finder
* Date: 11/22/13
* Time: 9:27 PM
*/
var Debug_mode = false;
if (!Debug_mode) {
    var CurrentSessionUser = {};
} else {
    var CurrentSessionUser = {
        "IdUser": 1,
        "FirstName": "Admin",
        "LastName": "None",
        "Password": "azxsdxadc",
        "Email": "mail@gmail.com",
        "Address": "בני אפריים 222 , תל אביב",
        "StartTime": "2014-08-30T20:55:12",
        "Type": "1",
        "Phone": "051-2345678"
    };
}
var Users = [];
var BabySitter = [];
var CarPull = [];
var BulletinBoard = [];
var Survey = [];
var GiveAndTake = [];

var base_url = "http://moshavit.somee.com/api/";

var loading_it = function (op) {
    if ($('#container-head1').val() === undefined) {
        $('body').append('<div id="container-head1" style="display: none;text-align: center;" ><div class="contener_box" style="position: relative;margin-left: auto;margin-right: auto; " id="loadin_it">    <div class="box">      <i><img src="img/logo.png" style="max-height: 100px; max-width: 100px;display: block;    margin-left: auto;    margin-right: auto;" ></i>    </div></div></div>');
        $('#container-head1').append('<h4 style="color: white;text-align: center;">טוען...</h4>');
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
    $('body').append('<div id="container-head1" style="display: none;text-align: center;" ><div class="contener_box" style="position: relative;margin-left: auto;margin-right: auto; " id="loadin_it">    <div class="box">      <i><img src="img/logo.png" style="max-height: 100px; max-width: 100px;display: block;    margin-left: auto;    margin-right: auto;" ></i>    </div></div></div>');
    $('#container-head1').append('<h4 style="color: white;text-align: center;">טוען...</h4>');
    $('body').append('<div id="container"></div>');
};

var main_screen = function () {
    clean_body();
    add_containers_to_body();
    static_TemplateHBS('desktop_menu', 'container-head');
    static_TemplateHBS("phone_menu", 'container');
    setTimeout(function () {
        $('#sessionUsername').text('שלום ' + CurrentSessionUser.FirstName)
        }, 1000);
};

var getTemplateHBS = function (templateName, callback) {
    $.get("templatesDirectory/" + templateName + ".hbs", function (data) {
        var template = Handlebars.compile(data);
        if (Debug_mode) console.log("Compiled " + templateName + " template.");
        callback(template);
    });
};
var dynamic_TemplateHBS = function (name, container, t) {
    loading_it("show");
    getTemplateHBS(name, function (template) {
        sleep(1000);
        switch (name) {
            case "users":
                if (t !== '') {
                    data = [];
                    data.push(getByID(Users, 'IdUser', t));
                    console.log(data);
                }
                else
                    data = Users;
                break;
            case "carpull":
                if (t !== '') {
                    data = [];
                    data.push(getByID(CarPull, 'IdMessage', t));
                }
                else
                    data = CarPull;
                break;
            case "babysitter":
                if (t !== '') {
                    data = [];
                    data.push(getByID(BabySitter, 'IdMessage', t));
                }
                else
                    data = BabySitter;
                break;
            case "messages":
                if (t !== '') {
                    data = [];
                    data.push(getByID(BulletinBoard, 'IdMessage', t));
                }
                else
                    data = BulletinBoard;
                break;
            case "survey":
                if (t !== '') {
                    data = [];
                    data.push(getByID(Survey, 'IdSurvey', t));
                }
                else
                    data = Survey;
                break;
            case "giveandtake":
                if (t !== '') {
                    data = [];
                    data.push(getByID(GiveAndTake, 'IdMessage', t));
                }
                else
                    data = GiveAndTake;
                break;
            case "user_profile":
                if (t !== '')
                    data = getByID(Users, 'IdUser', t);
                else
                    data = CurrentSessionUser;
                break;
            case "register":
                if (t !== '')
                    data = getByID(Users, 'IdUser', t);
                else
                    data = CurrentSessionUser;
                break;
            case "new_msg":
                if (t !== '')
                    data = getByID(BulletinBoard, 'IdMessage', t);
                else
                    data = CurrentSessionUser;
                break;
            case "new_giveandtake":
                if (t !== '') {
                    data = getByID(GiveAndTake, 'IdMessage', t);
                }
                else
                    data = CurrentSessionUser;
                break;
            case "new_babysitter":
                if (t !== '') {
                    data = getByID(BabySitter, 'IdMessage', t);
                }
                else
                    data = "";
                break;
            case "new_carpull":
                if (t !== '') {
                    data = getByID(CarPull, 'IdMessage', t);
                }
                else
                    data = "";
                break;
            case "invoice":
                if (t !== '') {
                    data = CurrentSessionUser;
                }
                else
                    data = CurrentSessionUser;
                break; 
            case "about_us":
                if (t !== '') {
                    data = CurrentSessionUser;
                }
                else
                    data = CurrentSessionUser;
                break;
        }
        console.log("Got data by api: ", data);
        var templateWithData = template(data);
        container = '#' + container;
        loading_it("hide");
        $(container).append(templateWithData);
        //        $('body').append("<div class='scroll-to-top' style='display: block;'>    <img src='img/ico/arrow-up.png' alt='לראש העמוד'></div>");

    });

};
var static_TemplateHBS = function (templateName, container) {
    loading_it("show");
    $.get("templatesDirectory/" + templateName + ".hbs", function (data) {
        var template = Handlebars.compile(data);
        if (container !== 'body')container = '#' + container;
        loading_it("hide");
        $(container).append(template);
        if (Debug_mode) console.log("Compiled " + templateName + " template.");
    });
};

var handleGoTop = function () {
    // Handles the go to top button at the footer
    var offset = 300;
    var duration = 500;

    $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
            $('.scroll-to-top').fadeIn(duration);
        } else {
            $('.scroll-to-top').fadeOut(duration);
        }
    });

    $('.scroll-to-top').click(function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, duration);
        return false;
    });
};

var alert_moshavit = function (msg, title, btn) {
    //btn="yes,No";
    navigator.notification.alert(
        msg,
        function () {
        },
        title,
        btn
    );
};
var confirm_moshavit_exit = function (msg, title, btns) {
    navigator.notification.confirm(msg, confirm_moshavit_exit_callback, title, btns);
};
var confirm_moshavit_exit_callback = function (op) {
    if (op == 1) {
        navigator.app.exitApp();
    }
};

var getByID = function (arr, key, value) {

    var result = [];
    arr.forEach(function (o) {
        if (o[key] == value) result.push(o);
    });
    return result ? result[0] : null; // or undefined

};

var base64Matcher = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$");
var validateEmail = function (email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};
Handlebars.registerHelper("math", function (lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        "t": Math.round(lvalue / Users.length * 10000) / 100,
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": Math.round(lvalue / rvalue * 10000) / 100,
        "%": lvalue % rvalue
    }[operator];
});
Handlebars.registerHelper("fixDate", function (date) {
    if(date===undefined) return "";
    /*
    {{fixDate 2014-09-25T21:56:00.13}}        return   21:56:00 25/09/2014
    */
    dateHHII = date.split("T");
    dateYYMMDD = dateHHII[0];
    dateHHII = dateHHII[1].split(".");
    dateYYMMDD = dateYYMMDD.split("-");

    return dateHHII[0] + " " + dateYYMMDD[2] + "/" + dateYYMMDD[1] + "/" + dateYYMMDD[0];
});
Handlebars.registerHelper("getDate", function (date) {
    if(date===undefined) return "";
    /*
    {{getDate 2014-09-25T21:56:00.13}}        return    2014-09-25
    */
    dateHHII = date.split("T");
    dateYYMMDD = dateHHII[0];

    return dateYYMMDD;
});
Handlebars.registerHelper("getTime", function (date) {
    if(date===undefined) return "";
    /*
    {{getTime 2014-09-25T21:56:00.13}}        return   21:56
    */
    dateHHII = date.split("T");
    dateHHII = dateHHII[1].split(":");

    return dateHHII[0]+":"+dateHHII[1];
});
Handlebars.registerHelper('base64', function (text) {
    //get text data and check if in base64 -> if true append into img tag and return it else return plain text
    if (base64Matcher.test(text) && text.length > 150) {
        text = "<img style='width:150px;height:150px;' src='data:image/jpeg;base64," + text + "'/>";
        return new Handlebars.SafeString(text);
    } else {
        return text;
    }
});
Handlebars.registerHelper('chr-gt', function (str, length, options) {
    /*
    {{chr-gt 'hey dude' 3}}
    // WOO! string is greater than 3
    {{else}}
    // string is not longer than 3
    {{/chr-gt}}
    */
    if (str.length > length) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
Handlebars.registerHelper('chr-lt', function (str, length, options) {
    /*
    {{chr-lt 'hey dude' 3}}
    // string is less than 3
    {{else}}
    // WOO! string is not less than 3
    {{/chr-lt}}
    */
    if (str.length < length) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
Handlebars.registerHelper('eq', function (obj1, obj2, options) {
    /*
    {{#eq val1 val2}}
    // absolute comparision was true ===
    {{else}}
    // here not so much
    {{/eq}}
    */
    if (obj1 === obj2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
Handlebars.registerHelper('truncate', function (str, length, append) {
    /*
    {{truncate 'mysuperlongemail@example.com'}} // "mysuperlon…"
    {{truncate 'mysuperlongemail@example.com' 16}} // "mysuperlongemail…"
    {{truncate 'mysuperlongemail@example.com' 16 ''}} // "mysuperlongemail"
    {{truncate 'Some sente nce with a space at truncation index.'}} // "Some sente…" - trims trailing whitespace before appending
    */
    str = str || '';
    length = length || 10;
    append = typeof append === 'undefined' ? '…' : append;

    if (str.length === length) return str;

    return str.substring(0, length).replace(/\s+$|\.+$/, '') + append;
});
Handlebars.registerHelper('memberType', function (type) {
    //get member type as int and return definition as text
    if (type == 3) return "שוכר";
    if (type == 2) return "תושב";
    if (type == 1) return "מנהל";
    return "לא מוגדר";
});
Handlebars.registerHelper('isCurrentUser', function (id) {
    //get id and check if it's CurrentSessionUser or Admin type
    if (id == CurrentSessionUser.IdUser || CurrentSessionUser.Type == 1) {
        return ""
    } else {
        return "style=display:none;"
    }
});
Handlebars.registerHelper('isAdmin', function (id) {
    //check if CurrentSessionUser is Admin type for hide/show buttens in menu
    if ( CurrentSessionUser.Type == 1) {
        return ""
    } else {
        return "display:none;"
    }
});

var sleep = function (milliseconds) {
    //plain sleep function like php sleep(1000);
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
};

var update_data = function (api) {
    //get api name and update varibles with server information
    switch (api) {
        case "users":
            $.get(base_url+"user/", function (data) { Users = data; });
            break;
        case "carpull":
            $.get(base_url+"carpull/", function (data) { CarPull = data; });
            break;
        case "babysitter":
            $.get(base_url+"BabySitter/", function (data) { BabySitter = data; });
            break;
        case "bulletinboard":
            $.get(base_url+"bulletinboard/", function (data) { BulletinBoard = data; });
            break;
        case "survey":
            $.get(base_url+"Survey/", function (data) { Survey = data; });
            break;
        case "giveandtake":
            $.get(base_url+"GiveAndTake/", function (data) { GiveAndTake = data; });
            break;
        case "all":
            $.get(base_url+"user/", function (data) { Users = data; });
            $.get(base_url+"carpull/", function (data) { CarPull = data; });
            $.get(base_url+"BabySitter/", function (data) { BabySitter = data; });
            $.get(base_url+"bulletinboard/", function (data) { BulletinBoard = data; });
            $.get(base_url+"Survey/", function (data) { Survey = data; });
            $.get(base_url+"GiveAndTake/", function (data) { GiveAndTake = data; });
            break;
    }
};

var latest_news = function () {
    //append last 5 msg from each board into bady
    var latest_Users = Users.slice(0, 5);
    var latest_BabySitter = BabySitter.slice(0, 5);
    var latest_CarPull = CarPull.slice(0, 5);
    var latest_BulletinBoard = BulletinBoard.slice(0, 5);
    var latest_Survey = Survey.slice(0, 5);
    var latest_GiveAndTake = GiveAndTake.slice(0, 5);
    var rander_it=function(template_file,title,data){
        getTemplateHBS(template_file, function (template) {
            $(container).append('<h4 class="well" style="text-align:center;">'+title+'</h4>');
            if (Debug_mode) console.log("Got data by api: ", data);
            var templateWithData = template(data);
            $(container).append(templateWithData);
            $(container).find('button').remove();
        });  
    };                             
    var container = '#container';

    loading_it("show");
    $(container).append('<h3 class="well" style="text-align:center;">עדכונים אחרונים</h4><br>');
    rander_it("users","רשימת משתמשים אחרונה",latest_Users);
    rander_it("babysitter","רשימת בייביסיטר אחרונה",latest_BabySitter);
    rander_it("carpull","רשימת קארפול אחרונה",latest_CarPull);
    rander_it("survey","רשימת סקרים אחרונה",latest_Survey);
    rander_it("messages","רשימת הודעות כלליות אחרונה",latest_BulletinBoard);
    rander_it("giveandtake","רשימת הודעות תן וקח אחרונה",latest_GiveAndTake);
    loading_it("hide");
};


$(document).ready(function () {
    if (CurrentSessionUser.IdUser === undefined) {
        static_TemplateHBS("login", 'body');
        if (getCookie("Email") === null)
            $("#email").focus();
        else
            setTimeout(function () {
                $("#email").val(getCookie("Email"));
                $("#password").focus();
                }, 1000);  //ms 2000=2sec
    }
    else {
        if (Debug_mode) {
            loading_it("show");
            main_screen();
        }

        //will load all data from server and then will load the menu items
        else {
            loading_it("show");
            $.get(base_url+"user/", function (data) { Users = data; });
            $.get(base_url+"carpull/", function (data) { CarPull = data; });
            $.get(base_url+"BabySitter/", function (data) { BabySitter = data; });
            $.get(base_url+"bulletinboard/", function (data) { BulletinBoard = data; });
            $.get(base_url+"Survey/", function (data) { Survey = data; });
            $.get(base_url+"GiveAndTake/", function (data) { GiveAndTake = data; main_screen(); });
        }
    }
});


//var getPicture = function () {
//    navigator.camera.getPicture(function () {
//        }, function () {
//    });
//};
//var vibrate = function (ml) {
//    navigator.notification.vibrate(ml);
//};
//var beep_it = function (times) {
//    navigator.notification.beep(times);
//};

