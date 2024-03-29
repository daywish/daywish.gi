var results;
var map;

window.onload = function() {
    result = document.getElementById('result');

    // Устанавливаем некоторые параметры карты. В данном примере
    // устанавливаются начальный уровень масштабирования и тип карты.
    // Информацию о других параметрах см. в документации по Google Maps.
    var myOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Создаем карту, используя установленные выше параметры
    map = new google.maps.Map(document.getElementById("mapSurface"), myOptions);

    // Пытаемся определить местоположение пользователя
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            geolocationSuccess, geolocationFailure);

        result.innerHTML = "Поиск завершен";
    }
    else {
        result.innerHTML = "Ваш браузер не поддерживает геолокацию";
        goToDefaultLocation();
    }
}
function geolocationSuccess(position) {
    // Преобразуем местоположение в объект LatLng
    var location = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

    // Отображаем эту точку на карте
    map.setCenter(location);
}
function geolocationSuccess(position) {

    // Создаем всплывающее информационное окно и устанавливаем
    // его текст и положение на карте.
    var infowindow = new google.maps.InfoWindow();
    infowindow.setContent("Вы находитесь где-то в этом районе.");
    infowindow.setPosition(location);

    // Отображаем всплывающее окно
    infowindow.open(map);

    results.innerHTML = "Местоположение отмечено на карте.";
}
function geolocationFailure(positionError) {
    goToDefaultLocation();
}
navigator.geolocation.getCurrentPosition(
    function(position) {
        alert('Последний раз вас засекали здесь: ' +
            position.coords.latitude + ", " + position.coords.longitude);
    }
);
function goToDefaultLocation() {
    // Примерные координаты центра Москвы
    var moscow = new google.maps.LatLng(55.753878,37.649275);
    map.setCenter(moscow);
}
navigator.geolocation.watchPosition(
    geolocationSuccess, geolocationFailure);
// Сохраняем элемент в котором страница отображает результат
var result;

window.onload = function() {
    result = document.getElementById('result');

    // Если функциональность геолокации доступна,
    // пытаемся определить координаты посетителя
    if (navigator.geolocation) {
        // Передаем две функции
        navigator.geolocation.getCurrentPosition(
            geolocationSuccess, geolocationFailure);

        // Выводим результат
        result.innerHTML = "Поиск начался";
    }
    else {
        // Выводим результат
        result.innerHTML = "Ваш браузер не поддерживает геолокацию";
    }
}

function geolocationSuccess(position) {
    result.innerHTML = "Последний раз вас засекали здесь: " +
        position.coords.latitude + ", " + position.coords.longitude;
}
if (position.coords.accuracy > 10000) {
    alert('Посетитель может быть где угодно на карте');
}
function geolocationFailure(positionError) {
    if(positionError === 1) {
        result.innerHTML = "Вы решили не предоставлять данные о своем местоположении, " +
            "но это не проблема. Мы больше не будем запрашивать их у вас.";
    }
    else if(positionError === 2) {
        result.innerHTML = "Проблемы с сетью или нельзя связаться со службой определения " +
            "местоположения по каким-либо другим причинам.";
    }
    else if(positionError === 3) {
        result.innerHTML = "He удалось определить местоположение "
            + "в течение установленного времени. ";

    }
    else {
        result.innerHTML = "Загадочная ошибка.";
    }
}
navigator.geolocation.getCurrentPosition(
    geolocationSuccess, geolocationFailure, {enableHighAccuracy: true});
navigator.geolocation.getCurrentPosition(
    geolocationSuccess, geolocationFailure,
    {enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000});