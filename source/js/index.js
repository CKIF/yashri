var users = [{name: "Лекс Лютер", avatar: "luter", floor: 2}, {
    name: "Томас Андерсон",
    avatar: "anderson",
    floor: 1
}, {name: "Дарт Вейдер", avatar: "vader", floor: 1}, {name: "Кларк Кент", avatar: "kent", floor: 3}, {
    name: "Джон Уик",
    avatar: "wick",
    floor: 1
}, {name: "Рик Декард", avatar: "deckard", floor: 2}, {
    name: "Питер Блад",
    avatar: "blood",
    floor: 3
}, {name: "Ретт Батлер", avatar: "butler", floor: 3}];

//Datepicker
$(document).ready(function () {

    jQuery(function ($) {
        $.datepicker.regional['ru'] = {
            closeText: 'Закрыть',
            prevText: '&#x3c;Пред',
            nextText: 'След&#x3e;',
            currentText: 'Сегодня',
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
            dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
            dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            weekHeader: 'Нед',
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        };
        $.datepicker.setDefaults($.datepicker.regional['ru']);
    });

    var dateOptions  = $.extend(
        {
            showOn: "both",
            buttonImage: "img/calendar.svg",
            buttonImageOnly: true,
            buttonText: "Выберите дату",
            showOtherMonths: true,
            selectOtherMonths: true
        },
        $.datepicker.regional["ru"],
        {dateFormat: "d MM, y"}
    );

    $(".input__field_date").datepicker(dateOptions);

    $(function () {
        $(".radio__input").checkboxradio({
            icon: false
        });
    });


//Radio
    $(".radio__label").click(
        function () {
            $(this).addClass("test");
        },
        function () {
            $(this).removeClass("test");
        }
    );

//Input to radio
    var startTime = $('#begin').val();
    var endTime = $('#end').val();

    $('.radio__text strong').text(startTime + ' - ' + endTime);

    $('.input__field_time').on('input', function () {
        var startTime = $('#begin').val();
        var endTime = $('#end').val();
        $('.radio__text strong').text(startTime + ' - ' + endTime);
    });
});


//Avatars change size on mobile

var userAvatars = $('li [class*="user__avatar_"]');

if ($(window).width() < 426) {
    userAvatars.each(function () {
        var userAvatarsMobile = $(this).attr('class') + '_image_big';
        return $(this).addClass(userAvatarsMobile);
    });
}
else {
    userAvatars.each(function () {
        var userAvatarsMobile = $(this).attr('class');
        return $(this).addClass(userAvatarsMobile);
    });
}

//Click actions

var usersClass = [];
var cellListItem = [];

for (var n = 0; n < users.length; n++) {
    usersClass.push(users[n].avatar);
    cellListItem.push($(".cell-list__user user-" + users[n].avatar));
}

$.each(usersClass, function (i, val) {
    $(".dropdown__item .user_" + val).click(function () {
        $(".cell-list__user .user_" + val).parent().addClass('show');
    });

});

$(".dropdown").click(function () {
    $(".dropdown__items").toggle();
});


$(".input__clear").click(function () {
    var parent = $(".input__clear").parent('.input');
    parent.children('.input__field').val('');
});


$(".user__clear").click(function () {
    $(this).parents('.cell-list__item').removeClass('show');
});

$(".radio__clear").click(function () {
    $(".radio__clear").parent('.ui-state-active').removeClass('ui-checkboxradio-checked ui-state-active');
});

$(".radio__label").click(
    function () {
        $("radio__label").addClass('ui-checkboxradio-checked ui-state-active');
    });