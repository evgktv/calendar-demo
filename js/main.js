'use strict';

var date = new Date();
var month = date.getMonth();
var year = date.getFullYear();
var monthPrev = document.querySelector('.calendar__btn--prev');
var monthNext = document.querySelector('.calendar__btn--next');
var today = document.querySelector('.calendar__btn--today');

var months = ['Январь','Февраль','Март','Апрель', 'Май', 'Июнь','Июль', 'Август',
    'Сентябрь','Октябрь','Ноябрь', 'Декабрь'];

var monthsNote = ['Января','Февраля','Марта','Апреля', 'Мая', 'Июня','Июля', 'Августа',
    'Сентября','Октября','Ноября', 'Декабря'];

var calDay = document.querySelectorAll('.calendar__box');

document.querySelector('.months').textContent = months[month];
document.querySelector('.year').textContent = year;
addDay();

today.addEventListener('click', function (event) {
    event.preventDefault();

    month = date.getMonth();
    year = date.getFullYear();

    document.querySelector('.year').textContent = year;
    document.querySelector('.months').textContent = months[month];
    addDay();
});

monthPrev.addEventListener('click', function (event) {
    event.preventDefault();

    calDay[getLastDayWeekOfMonth(year, month) + date.getDate()].classList.remove('calendar__box--active');
    month = month - 1;

    if (month < 0) {
        month = 11;
        year = year - 1;
        document.querySelector('.year').textContent = year;
    }
    document.querySelector('.months').textContent = months[month];
    addDay();
});

monthNext.addEventListener('click', function (event) {
    event.preventDefault();

    calDay[getLastDayWeekOfMonth(year, month) + date.getDate()].classList.remove('calendar__box--active');
    month = month + 1;
    if (month > 11) {
        month = 0;
        year = year + 1;
        document.querySelector('.year').textContent = year;
    }

    document.querySelector('.months').textContent = months[month];
    addDay();

});


function getWeekDay(date) {
    var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    return days[date.getDay()];
}

function getLastDayWeekOfMonth(year, month) {
    var date = new Date(year, month, 0);
    var days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    return  date.getDay()-1;
}

function getLastDayOfMonth(year, month) {
    var date = new Date(year, month, 0);
    return date.getDate();
}

function addDay () {
    var i;
    var j = 0;

    for (i = getLastDayWeekOfMonth(year, month); i >= 0 ; i--) {
        calDay[i].style.display = 'table-cell';
        calDay[i].classList.add('calendar__box--last');


        var calDay2 = calDay[i].querySelector('.calendar__day');
        calDay2.textContent = getLastDayOfMonth(year, month) - j;
        j++;
    }

    j = 1;

    for (i = getLastDayWeekOfMonth(year, month) + 1; i <= getLastDayOfMonth(year, month + 1) + getLastDayWeekOfMonth(year, month); i++) {
        calDay[i].style.display = 'table-cell';
        calDay[i].classList.remove('calendar__box--last');


        var calDay2 = calDay[i].querySelector('.calendar__day');
        calDay2.textContent = j;
        if (j == getLastDayOfMonth(year, month + 1)) {
            i++;
            for (i; i < calDay.length; i++) {
                calDay[i].style.display = 'none';
            }
        }
        j++;
    }

    if (year == date.getFullYear() && month == date.getMonth()) {
        calDay[getLastDayWeekOfMonth(year, month) + date.getDate()].classList.add('calendar__box--active');
    }
}



// NOTE
var note = document.querySelector('.note');
var noteClose = document.querySelector('.note__form-btn--close');
var noteSave = document.querySelector('.note__form-btn--save');
var overlay = document.querySelector('.overlay');

calDay.forEach(function (calDay, i) {
    var calDayBox = document.querySelectorAll('.calendar__day');

    calDay.addEventListener("click", function (event) {
        event.preventDefault();
        
        var ff = calDay.innerHTML;

        if(calDay.classList.contains('calendar__box--last')) {
            return;
        }

        note.classList.add('note__show');
        note.classList.add('note__show-animation');
        overlay.classList.add('overlay__show');

        document.querySelector('.note__day').textContent = calDayBox[i].textContent;
        document.querySelector('.note__months').textContent = monthsNote[month];
        document.querySelector('.note__year').textContent = year;

        noteSave.addEventListener('click', function (event) {
            event.preventDefault();

            var eventNote = note.querySelector('.note__form-txt-area--event').value;

            calDay.innerHTML =  ff + '<div class="calendar__note">\n' +
                '            <span class="calendar__note-time"></span>\n' +
                '            <span class="calendar__note-event">' + eventNote + '</span>\n' +
                '            <span class="calendar__note-person"></span>\n' +
                '          </div>';
            note.classList.remove('note__show');
            note.classList.remove('note__show-animation');
            overlay.classList.remove('overlay__show');
        })

        noteClose.addEventListener('click', function () {
            note.classList.remove('note__show');
            note.classList.remove('note__show-animation');
            overlay.classList.remove('overlay__show');
        })

        window.addEventListener("keydown", function (event) {
            if (event.keyCode === 27) {
                if (note.classList.contains("note__show")) {
                    note.classList.remove("note__show");
                    overlay.classList.remove("overlay__show");
                    note.classList.remove("note__show-animation");
                }
            }
        })
    })
});




