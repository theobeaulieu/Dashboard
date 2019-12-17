function connect_facebook() {
    console.log("Facebook request");
}

function facebook_get_friends(nb_event, my_div_add) {
    $.get('/facebook/access_token', function (access_token) {
        $.ajax({
            url: 'https://graph.facebook.com/v5.0/me?fields=id%2Cevents&access_token=' + access_token,
            type: 'GET',
            async: false,
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (data_events) {
                event_list = "";
                i = 0;
                d = new Date();
                id_time = d.getTime();
                while (i < data_events.events.data.length && i < nb_event) {
                    date_time = data_events.events.data[i].start_time.split('T')
                    start_hour = date_time[1].split('+')
                    event_list += '<p><span>' + date_time[0] + '</span><span style="float: right">' + start_hour[0] + '</span></p>'
                    event_list += '<p style="text-align: center;"><a href="https://www.facebook.com/events/' + data_events.events.data[i].id + '" target="_blank">' + data_events.events.data[i].name + '</a></p>'
                    event_list += '<p style="text-align: center; padding-bottom: 15px; font-size: 10px;">' + data_events.events.data[i].place.name + '</p>'
                    i += 1
                }
                $(my_div_add).before('<div class="wrap-login100 margin-container" id="id_' + id_time + '"><button style="padding-left: 10px" type="button" class="close" title="Delete" onclick="delete_widget(\'id_' + id_time + '\')" aria-label="Close"><span title="Delete" aria-hidden="true" class="white-text">×</span></button><button class="close" type="button" data-toggle="modal" data-target="#modalSettings" onclick="display_good_modal_settings(\'facebook_widget\',\'' + id_time + '\')"><i class="fas fa-cog" style="margin-top: -2px;font-size: 14px;vertical-align: middle;"></i></button><p style="margin-bottom: 20px; color: #9478ff;">Facebook - Events list</p>' + event_list + '</div>');
                nbr = nbr + 1;
                var Cookie = {
                    name: "wdg_" + nbr,
                    type: "facebook_event",
                    value: nb_event,
                    idTime: id_time
                }
                $.get('/cookieset', Cookie, function (data) {}, "JSON");
            }
        })
    });
}