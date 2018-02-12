var users = [{name: "Лекс Лютер", avatar: "luter", floor: 2},{name: "Томас Андерсон", avatar: "anderson", floor: 1},{name: "Дарт Вейдер", avatar: "vader", floor: 1},{name: "Кларк Кент", avatar: "kent", floor: 3},{name: "Джон Уик", avatar: "wick", floor: 1},{name: "Рик Декард", avatar: "deckard", floor: 2},{name: "Питер Блад", avatar: "blood", floor: 3},{name: "Ретт Батлер", avatar: "butler", floor: 3}];


$(document).ready(function() {

    for (var index = 0; index < users.length; index++) {
        var dropdownItem = $(".dropdown__item user-"+users[index].avatar);
        var cellListItem = $(".cell-list__user user-"+users[index].avatar);

        console.log(dropdownItem);
        console.log(cellListItem);

/*        $( dropdownItem ).click(function(){
            $( cellListItem ).addClass('show');
        });*/

        $( dropdownItem ).on( "click", function() {
            $( cellListItem ).addClass('show');
        });


    }

    //$("#radioset").buttonset();
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
        {   showOn: "both",
            buttonImage: "img/calendar.svg",
            buttonImageOnly: true,
            buttonText: "Select date",
            showOtherMonths: true,
            selectOtherMonths: true},
        $.datepicker.regional["ru"],
        { dateFormat: "d MM, y"}

    );

    $(".input__field_date").datepicker(dateOptions);

    $( function() {
        $( ".radio__input" ).checkboxradio({
            icon: false,
        });
    } );


    //Dropdown block
    //$(".dropdown__select").selectmenu();



/*    $( function() {
        $.widget( "custom.iconselectmenu", $.ui.selectmenu, {
            _renderItem: function( ul, item ) {
                var li = $( "<li>" ),
                    wrapper = $( "<div>", { text: item.label } );

                if ( item.disabled ) {
                    li.addClass( "ui-state-disabled" );
                }

                $( "<span>", {
                    style: item.element.attr( "data-style" ),
                    "class": "ui-icon user__avatar " + item.element.attr( "data-class" )
                })
                    .appendTo( wrapper );

                return li.append( wrapper ).appendTo( ul );
            }
        });

        $( ".dropdown__select" )
            .iconselectmenu()
            .iconselectmenu( "menuWidget")
            .addClass( "ui-menu-icons" );
    } );*/


// Click actions
    $(".radio__label").click(
        function () {
            $(this).addClass("test");
        },
        function () {
            $(this).removeClass("test");
        }
    );

    var userAvatars = $('li [class*="user__avatar_"]');

    if ($(window).width() < 426) {
        userAvatars.each(function( ) {
            var userAvatarsMobile = $( this ).attr('class') + '_image_big';
            return $( this ).addClass(userAvatarsMobile);
        });
    }
    else {
        userAvatars.each(function( ) {
            var userAvatarsMobile = $( this ).attr('class');
            return $( this ).addClass(userAvatarsMobile);
        });
    }

    var startTime = $('#begin').val();
    var endTime = $('#end').val();

    $('.radio__text strong').text(startTime + ' - ' + endTime);

    $('.input__field_time').on('input', function() {
        var startTime = $('#begin').val();
        var endTime = $('#end').val();
        $('.radio__text strong').text(startTime + ' - ' + endTime);
    });
});


//----------События клика----------

$(".dropdown").click(function(){
    $(".dropdown__items").toggle();
});


$( ".input__clear" ).click(function(){
    var parent = $( ".input__clear" ).parent('.input');
    parent.children('.input__field').val('');
});

$( ".radio__clear" ).click(function(){
    $( ".radio__clear" ).parent('.ui-state-active').removeClass('ui-checkboxradio-checked ui-state-active');
});

$( ".radio__label" ).click(
    function(){
        $( "radio__label" ).addClass('ui-checkboxradio-checked ui-state-active');
    });
