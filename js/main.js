function Main() {
    $('#main').empty();
    for (var i = 0; i < services.length; i++) {
        DrawService(services[i]);
    }

    // build form and attach events
    // event handlers
}

function OnServiceSelected(event) {
    var input = event.target || event.srcElement;
    if ($(input).attr('type') != 'checkbox') return;
    var service = $(input).parent().data('svc');
    var parent = $(input).parent().parent();
    var isChecked = $(input).is(':checked');
    if (isChecked) {
        DrawServiceOptions(service, parent);
    }
    else {
        HideServiceOptions(parent);
    }
}

function DrawService(service) {
    // Draw title
    $('#main').append(`<h3>${service.name}</h3>`);
    // Draw sub items
    for (var i = 0; i < service.types.length; i++) {
        DrawSubServices(service.types[i]);
    }
}

function DrawSubServices(service) {
    var p = $('<p></p>');
    var input = $(`<label class="service"><input type='checkbox' /> ${service.name}</label>`);
    input.data('svc', service);
    input.click(OnServiceSelected);
    p.append(input);
    $('#main').append(p);
}

function DrawServiceOptions(service, parent) {
    var div = $('<div class="options" />')
    for (var i = 0; i < service.options.length; i++) {
        DrawInput(div, service.options[i]);
    }
    $(parent).append(div);
}

function DrawInput(parent, option) {
    var div = $('<div />');
    var span = $(`<span>${option.name} </span>`);
    var type = option.type;
    var input = $(`<input type="text" />`);
    $(input).data('stype', type);
    $(div).append(span).append(input);
    $(parent).append(div);
}

function HideServiceOptions(parent) {
    $('div.options', parent).remove();
}

function Calculate() {
    var total = 0;
    var inputs = $('div.options input');
    for (var i = 0; i < inputs.length; i++) {
        var input = $(inputs[i]);
        var value = input.val();
        var type = input.data('stype');
        total += GetCostByType(value, type);
    }
    console.debug(total)
}

function GetCostByType(value, type) {
    return parseFloat(value) * type[0].price * type[0].ratio;
}

$(function(){
    Main();
});