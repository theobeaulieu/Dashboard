function connect_google() {
    console.log("Google request");
}

function get_google(input, my_div_add) {
    var access_token;
    $.get('/google/access_token', function (access) {
        access_token = access;
        $.get('/google/user_id', function (user_id) {
            $.ajax({
                url: 'https://www.googleapis.com/gmail/v1/users/' + user_id + '/messages',
                type: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (data) {
                    list_google = "";
                    i = 0;
                    d = new Date();
                    id_time = d.getTime();
                    while (i < data.messages.length && i < input) {
                        $.ajax({
                            url: 'https://www.googleapis.com/gmail/v1/users/' + user_id + '/messages/' + data.messages[i].id,
                            type: 'GET',
                            async: false,
                            headers: {
                                'Authorization': 'Bearer ' + access_token
                            },
                            success: function (message_info) {
                                date = "";
                                from = "";
                                subject = "";
                                j = 0;
                                while (j < message_info.payload.headers.length) {
                                    if (message_info.payload.headers[j].name == "Date") {
                                        date = message_info.payload.headers[j].value.split('+')
                                    }
                                    if (message_info.payload.headers[j].name == "From") {
                                        from = message_info.payload.headers[j].value.split('<')
                                    }
                                    if (message_info.payload.headers[j].name == "Subject") {
                                        subject = message_info.payload.headers[j].value
                                    }
                                    j += 1
                                }
                                list_google += '<p style="text-align: left; font-size:11px">' + date[0] + '</p>'
                                list_google += '<p style="text-align: center;">' + subject + '</p>'
                                list_google += '<p style="text-align: left; padding-bottom: 10px; font-size:11px">From: ' + from[0] + '</p>'
                            }
                        });
                        i += 1
                    }
                    $(my_div_add).before('<div class="wrap-login100 margin-container" id="id_' + id_time + '"><button style="padding-left: 10px" type="button" class="close" title="Delete" onclick="delete_widget(\'id_' + id_time + '\')" aria-label="Close"><span title="Delete" aria-hidden="true" class="white-text">×</span></button><button class="close" type="button" data-toggle="modal" data-target="#modalSettings" onclick="display_good_modal_settings(\'google_widget\',\'' + id_time + '\')"><i class="fas fa-cog" style="margin-top: -2px;font-size: 14px;vertical-align: middle;"></i></button><p style="margin-bottom: 20px; color: #9478ff;">Google - Emails list</p>' + list_google + '</div>');
                    nbr = nbr + 1;
                    var Cookie = {
                        name: "wdg_" + nbr,
                        type: "google_widget",
                        value: input,
                        idTime: id_time
                    }
                    $.get('/cookieset', Cookie, function (data) {}, "JSON");
                }
            })
        });
    });

}