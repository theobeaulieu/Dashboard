function weather_city(city_name, my_div_add) {
    d = new Date();
    id_time = d.getTime();
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=';
    var url_end = '&units=imperial&appid=271d1234d3f497eed5b1d80a07b3fcd1';
    var data_return;
    $.ajax({
        url: url + city_name + url_end,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var weather = {
                city: city_name,
                temperature: Math.round(((data.main.temp) - 32) * 5 / 9),
                description: data.weather[0].description,
                icon: data.weather[0].icon
            }
            data_return = weather;
            $(my_div_add).before('<div class="wrap-login100 margin-container" id="id_' + id_time + '"><button style="padding-left: 10px;" type="button" class="close" title="Delete" onclick="delete_widget(\'id_' + id_time + '\')" aria-label="Close"><span aria-hidden="true" class="white-text" title="Delete">×</span></button><button class="close" type="button" data-toggle="modal" data-target="#modalSettings" onclick="display_good_modal_settings(\'weather_widget\',\'' + id_time + '\')"><i class="fas fa-cog" style="margin-top: -2px;font-size: 14px;vertical-align: middle;"></i></button><p style="margin-bottom: 20px; color: #9478ff;">Weather - City</p><p id="name_converter" style="margin-bottom: 10px; text-align: center;">' + city_name + '</p><img src="http://openweathermap.org/img/w/' + weather.icon + '.png" style="margin-left: 41%;"><p style="margin-bottom: 10px; text-align: center;">' + weather.temperature + '°C' + '</p><p style="text-align: center;">' + weather.description + '</p></div>')
            nbr = nbr + 1
            var Cookie = {
                name: "wdg_" + nbr,
                type: "weather_city",
                value: city_name,
                idTime: id_time
            }
            $.get('/cookieset', Cookie, function (data) {}, "JSON");
        }
    })
}