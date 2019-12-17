function add_widget(model) {
    var my_div_add = document.getElementById('add_widget_before');
    if (model == "converter") {
        cur_src = document.getElementById("currencySrc").value;
        cur_dest = document.getElementById("currencyDest").value;
        d = new Date();
        id_time = d.getTime();
        $(my_div_add).before('<div class="wrap-login100 margin-container" id="id_' + id_time + '"><button style="padding-left: 10px" type="button" class="close" title="Delete" onclick="delete_widget(\'id_' + id_time + '\')" aria-label="Close"><span title="Delete" aria-hidden="true" class="white-text">×</span></button><button class="close" type="button" data-toggle="modal" data-target="#modalSettings" onclick="display_good_modal_settings(\'money_widget\',\'' + id_time + '\')"><i class="fas fa-cog" style="margin-top: -2px;font-size: 14px;vertical-align: middle;"></i></button><p style="margin-bottom: 20px; color: #9478ff;">Money - Converter</p><p id="name_converter" style="margin-bottom: 20px; text-align: center;">' + cur_src + ' to ' + cur_dest + '</p><div class="wrap-input100 validate-input" style="margin-bottom: 20px;" ><input class="input100" type="text" id="quantity"></span></div><div class="moneyDisplay"><p id="result_' + id_time + '" style="text-align: center;"></p></div><div class="container-login100-form-btn"><div class="wrap-login100-form-btn"><div class="login100-form-bgbtn"></div><button class="login100-form-btn" value="convert" onclick="converter(\'' + cur_src + '\', \'' + cur_dest + '\', \'' + id_time + '\')">Converter</button></div></div></div>');
        nbr = nbr + 1;
        var Cookie = {
            name: "wdg_" + nbr,
            type: "converter",
            value: cur_src + "-" + cur_dest,
            idTime: id_time
        }
        $.get('/cookieset', Cookie, function (data) {}, "JSON");
    }
    if (model == "weather_city") {
        city_name = document.getElementById("city_name").value;
        d = new Date();
        id_time = d.getTime();
        weather_city(city_name, my_div_add)
    }
    if (model == "spotify_playlist") {
        numberOfPlaylist = document.getElementById("number_playlist").value
        spotify_artist(numberOfPlaylist, my_div_add)
    }
    if (model == "facebook_event") {
        nb_event = document.getElementById("number_event").value
        facebook_get_friends(nb_event, my_div_add)
    }
    if (model == "github_project") {
        subject = document.getElementById("github_project_id").value
        get_github_project(subject, my_div_add)
    }
    if (model == "google_widget") {
        input = document.getElementById("google_input").value
        get_google(input, my_div_add)
    }
    if (model == "outlook_events") {
        NbrEvents = document.getElementById("number_events").value
        get_outlook_events(NbrEvents, my_div_add)
    }
    if (model == "outlook_mails") {
        NbrMails = document.getElementById("number_mails").value
        get_outlook_mails(NbrMails, my_div_add)
    }
}