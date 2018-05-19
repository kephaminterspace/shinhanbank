var utils = {};
utils.buildFormData = function (model, source) {
    var data = {};
    for (var k in source) {
        data[model + '[' + k + ']'] = source[k];
    }
    return data;
};

utils.getKeyword = function (str) {
    str = str.trim();
    str = utils.removeDiacritical(str);
    str = utils.removeSpecialChar(str);
    str = utils.stripMultiSpace(str);
    return str.toLowerCase();
};

utils.createAlias = function (str) {
    str = str.trim();
    str = utils.removeDiacritical(str);
    str = utils.removeSpecialChar(str);
    str = utils.stripMultiSpace(str);
    str = str.replace(/\s/g, '-');
    return str.toLowerCase();
};

utils.removeDiacritical = function (str) {
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');
    str = str.replace(/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/g, 'A');
    str = str.replace(/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/g, 'E');
    str = str.replace(/(Ì|Í|Ị|Ỉ|Ĩ)/g, 'I');
    str = str.replace(/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/g, 'O');
    str = str.replace(/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/g, 'U');
    str = str.replace(/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/g, 'Y');
    str = str.replace(/(Đ)/g, 'D');
    return str;
};

utils.removeSpecialChar = function (str) {
    return str.replace(/[^A-Za-z0-9\-\s]/g, '');
};

utils.stripMultiSpace = function (str) {
    return str.replace(/\s+/g, ' ');
};

utils.formatMoney = function(number) {
    var number = number.replaceAll(",", "");
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

utils.getFormData = function($data){
    var indexed_array = {};

    $.map($data, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
};

utils.makeRand = function($number) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < $number; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};