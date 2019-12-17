function connect_outlook() {
    console.log("OutLook request");
}

var nbr = 0

function get_outlook_events(NbrEvents, my_div_add) {
    $.get('/outlook/access_token', function (access_token) {
        var start = new Date(new Date().setHours(0, 0, 0));
        var end = new Date(new Date(start).setDate(start.getDate() + 7));
        start = start.toISOString();
        end = end.toISOString();
        $.ajax({
            type: 'GET',
            async: false,
            url: 'https://outlook.office.com/api/v2.0/me/calendarview?startdatetime=' + start + '&enddatetime=' + end + '&$top=' + NbrEvents,
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (events) {
                name_event = "";
                i = 0;
                d = new Date();
                id_time = d.getTime();
                name_event += '<p> From  ' + start.substring(0, 9) + '  to  ' + end.substring(0, 9) + '  :</p>'
                name_event += '<p></p>'
                while (i < events.value.length) {
                    name_event += '<pstyle="text-align: center;>' + events.value[i].Subject + '</p>'
                    name_event += '<p>Location  :   ' + events.value[i].Location.DisplayName + '</p>'
                    name_event += '<p>Start  :   ' + (events.value[i].Start.DateTime).replace(/T/, ' ').replace(/\..+/, '') + '</p>'
                    name_event += '<p>End  :   ' + (events.value[i].End.DateTime).replace(/T/, ' ').replace(/\..+/, '') + '</p><br>'
                    i = i + 1;
                }
                $(my_div_add).before('<div class="wrap-login100 margin-container" id="id_' + id_time + '"><button type="button" class="close" title="Delete" style="padding-left:10px" onclick="delete_widget(\'id_' + id_time + '\')" aria-label="Close"><span title="Delete" aria-hidden="true" class="white-text">×</span></button><button class="close" type="button" data-toggle="modal" data-target="#modalSettings" onclick="display_good_modal_settings(\'outlook_widget\',\'' + id_time + '\')"><i class="fas fa-cog" style="margin-top: -2px;font-size: 14px;vertical-align: middle;"></i></button><p style="margin-bottom: 20px; color: #9478ff;">Outlook - Events</p>' + name_event + '</div>');
                nbr = nbr + 1;
                var Cookie = {
                    name: "wdg_" + nbr,
                    type: "outlook_widget",
                    value: NbrEvents,
                    idTime: id_time
                }
                $.get('/cookieset', Cookie, function (data) {}, "JSON");
                $.get('/cookieget', function (cookie) {
                })
            }
        })
    })
}

function get_outlook_mails(NbrMails, my_div_add, n) {
    $.get('/outlook/access_token', function (access_token) {
        var start = new Date(new Date().setHours(0, 0, 0));
        var end = new Date(new Date(start).setDate(start.getDate() + 7));
        start = start.toISOString();
        end = end.toISOString();
        $.ajax({
            type: 'GET',
            async: false,
            url: 'https://outlook.office.com/api/v2.0/me/mailfolders/inbox/messages?$select=subject,from,receivedDateTime&$top=' + NbrMails + '&$orderby=receivedDateTime%20DESC',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (mails) {
                mails_name = "";
                i = 0;
                d = new Date();
                id_time = d.getTime();
                while (i < mails.value.length) {
                    mails_name += '<pstyle="text-align: center;>' + mails.value[i].From.EmailAddress.Name + '</p>'
                    mails_name += '<pstyle="text-align: center;>' + mails.value[i].From.EmailAddress.Address + '</p>'
                    mails_name += '<p>' + (mails.value[i].ReceivedDateTime).replace(/T/, ' ').replace(/\..+/, '') + '</p>'
                    mails_name += '<p>' + mails.value[i].Subject + '</p><br>'
                    i = i + 1;
                }
                $(my_div_add).before('<div class="wrap-login100 margin-container" id="id_' + id_time + '"><button type="button" class="close" title="Delete" style="padding-left:10px" onclick="delete_widget(\'id_' + id_time + '\')" aria-label="Close"><span title="Delete" aria-hidden="true" class="white-text">×</span></button><button class="close" type="button" data-toggle="modal" data-target="#modalSettings" onclick="display_good_modal_settings(\'outlook_mails_widget\',\'' + id_time + '\')"><i class="fas fa-cog" style="margin-top: -2px;font-size: 14px;vertical-align: middle;"></i></button><p style="margin-bottom: 20px; color: #9478ff;">Outlook - Mails</p>' + mails_name + '</div>');
                nbr = nbr + 1;
                var Cookie = {
                    name: "wdg_" + nbr,
                    type: "outlook_mails_widget",
                    value: NbrMails,
                    idTime: id_time
                }
                $.get('/cookieset', Cookie, function (data) {}, "JSON");
                $.get('/cookieget', function (cookie) {
                })
            }
        })
    })
}