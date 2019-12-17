function get_github_project(subject, my_div_add) {
    $.get('/github/access_token', function (access_token) {
        $.ajax({
            url: 'https://api.github.com/users/' + subject + '/repos',
            type: 'GET',
            async: false,
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (data_repos) {
                name_project = "";
                i = 0;
                d = new Date();
                id_time = d.getTime();
                while (i < data_repos.length && i < 5) {
                    name_project += '<p><a href="' + data_repos[i].html_url + '" target="_blank">' + data_repos[i].html_url + '</a></p>'
                    i += 1;
                }
                $(my_div_add).before('<div class="wrap-login100 margin-container" id="id_' + id_time + '"><button style="padding-left: 10px" type="button" class="close" title="Delete" onclick="delete_widget(\'id_' + id_time + '\')" aria-label="Close"><span title="Delete" aria-hidden="true" class="white-text">×</span></button><button class="close" type="button" data-toggle="modal" data-target="#modalSettings" onclick="display_good_modal_settings(\'github_widget\',\'' + id_time + '\')"><i class="fas fa-cog" style="margin-top: -2px;font-size: 14px;vertical-align: middle;"></i></button><p style="margin-bottom: 20px; color: #9478ff;">Github - Repositories \'' + subject + '\'</p>' + name_project + '</div>');
                nbr = nbr + 1;
                var Cookie = {
                    name: "wdg_" + nbr,
                    type: "github_project",
                    value: subject,
                    idTime: id_time
                }
                $.get('/cookieset', Cookie, function (data) {}, "JSON");
            }
        })
    });
}