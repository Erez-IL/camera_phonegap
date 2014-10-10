
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

/*
  {{fixDate 2014-09-25T21:56:00.13}}        return   21:56:00 25/09/2014
*/
Handlebars.registerHelper("fixDate", function(date) {
    dateHHII = date.split("T");
    dateYYMMDD = dateHHII[0];
    dateHHII = dateHHII[1].split(".");
    dateYYMMDD = dateYYMMDD.split("-");

    return dateHHII[0]+" "+dateYYMMDD[2]+"/"+dateYYMMDD[1]+"/"+dateYYMMDD[0];
});
Handlebars.registerHelper('base64', function(text) {
    if (base64Matcher.test(text) & text.length > 150) { 
        text="<img style='width:150px;height:150px;' src='data:image/jpeg;base64," + text + "'/>";
        return new Handlebars.SafeString(text);
    } else {
        return text;
    }
});

/*
{{chr-gt 'hey dude' 3}}
    // WOO! string is greater than 3
{{else}}
    // string is not longer than 3
{{/chr-gt}}
*/
Handlebars.registerHelper('chr-gt', function(str, length, options) {
    if (str.length > length) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

/*
{{chr-lt 'hey dude' 3}}
    // string is less than 3
{{else}}
    // WOO! string is not less than 3
{{/chr-lt}}
*/
Handlebars.registerHelper('chr-lt', function(str, length, options) {
    if (str.length < length) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

/*
{{#eq val1 val2}}
    // absolute comparision was true ===
{{else}}
    // here not so much
{{/eq}}
*/
Handlebars.registerHelper('eq', function(obj1, obj2, options) {
    if (obj1 === obj2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
/*
{{truncate 'mysuperlongemail@example.com'}} // "mysuperlon…"
{{truncate 'mysuperlongemail@example.com' 16}} // "mysuperlongemail…"
{{truncate 'mysuperlongemail@example.com' 16 ''}} // "mysuperlongemail"
{{truncate 'Some sente nce with a space at truncation index.'}} // "Some sente…" - trims trailing whitespace before appending
*/
Handlebars.registerHelper('truncate', function(str, length, append) {
    str    = str || '';
    length = length || 10;
    append = typeof append === 'undefined' ? '…' : append;

    if (str.length === length) return str;

    return str.substring(0, length).replace(/\s+$|\.+$/, '') + append;
});



Handlebars.registerHelper('memberType', function(type) {
    if (type==3) return "שוכר";
    if (type==2) return "תושב";
    if (type==1) return "מנהל";
    return "לא מוגדר";
});
