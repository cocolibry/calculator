// это главный файл, который рисует форму калькулятора
// список услуг определен в файле config.js и содержит следующие переменные:
// - prices - содержит коллекцию цен для разных типов уборки
// - services - содержит коллекцию доступных услуг со специфичными опциями

function Main() {
    // показать калькулятор
    DrawCalculator();
    Calculate();
}

function DrawCalculator() {
    // очистить
    $('#main').empty();
    // показать все доступные услуги (services)
    for (var i = 0; i < services.length; i++) {
        DrawService(services[i]);
    }
}

function DrawService(service) {
    // Показать название группы услуги
    $('#main').append(`<h3>${service.name}</h3>`);
    // Показать доступные услуги в группе
    for (var i = 0; i < service.types.length; i++) {
        DrawSubServices(service.types[i]);
    }
}

function DrawSubServices(service) {
    // Показать услугу с возможностью выбора (чекбокс)
    var p = $('<p></p>');
    var input = $(`<label class="service"><input type='checkbox' /> ${service.name}</label>`);
    input.data('svc', service);
    input.click(OnServiceSelected);
    p.append(input);
    $('#main').append(p);
}

function OnServiceSelected(event) {
    // если выделение услуги изменилось
    var input = event.target || event.srcElement;
    if ($(input).attr('type') != 'checkbox') return;
    var service = $(input).parent().data('svc');
    var parent = $(input).parent().parent();
    var isChecked = $(input).is(':checked');
    if (isChecked) {
        // если услуга выбрана, показать доступные опции (типы уборки)
        DrawServiceOptions(service, parent);
    }
    else {
        // если услуга не выбрана, спрятать опции (типы уборки)
        HideServiceOptions(parent);
    }
    Calculate();
}

function DrawServiceOptions(service, parent) {
    var div = $('<div class="options form-inline" />')
    // показать типы уборки для конкретного сервиса
    for (var i = 0; i < service.options.length; i++) {
        DrawInput(div, service.options[i]);
    }
    $(parent).append(div);
    Calculate();
}

function DrawInput(parent, option) {
    var div = $('<div class="form-group" />');
    var span = $(`<label>${option.name}</label>`);
    var type = option.type;
    var defVal = option.default;
    var isCount = type === prices.cleaningByCount;
    var input = isCount 
        ? $(`<input type="number" value="1" class="form-control count" />`)
        : $(`<input type="number" value="1" class="form-control" />`);
    input.data('stype', type);
    input.change(Calculate);
    input.val(defVal);
    $(div).append(span).append(input);
    $(parent).append(div);
}

function HideServiceOptions(parent) {
    $('div.options', parent).remove();
}

function Calculate() {
    var total = 0;
    var options = $('div.options');

    options.each(function(){
        var inputs = $(this).find('input');
        var optionTotal = 0;
        var optionCount = 1;

        inputs.each(function(){
            var value = $(this).val();
            var type = $(this).data('stype');
            if ($(this).hasClass('count')) {
                optionCount = GetCostByType(value, type);
                console.debug('count = %o', optionCount)
            }
            else {
                optionTotal += GetCostByType(value, type);
            }
        });

        total += optionTotal * optionCount;
    });

    DrawTotalPrice(total);
}

function GetCostByType(value, type) {
    // посчитать цену по площади/количеству
    var p = GetPriceByValue(value, type)
    return parseFloat(value) * p.price * p.ratio;
}

function GetPriceByValue(value, type) {
    // взять цену для расчета учитывая диапазон min/max
    if (value <= type[0].max) return type[0];
    if (value <= type[1].max) return type[1];
    if (value > type[2].min) return type[2];
}

function DrawTotalPrice(total) {
    $('#price').text(total.toFixed(2));
}

$(function(){
    Main();
});