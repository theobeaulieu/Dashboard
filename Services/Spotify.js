function connect_spotify() {
    console.log("Spotify request");
}

function spotify_artist(numberOfPlaylist, my_div_add) {
    $.get('/spotify/access_token', function (access_token) {
        $.ajax({
            url: 'https://api.spotify.com/v1/me/playlists?limit=' + numberOfPlaylist + '&offset=0',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (data_music) {
                name_playlist = "";
                i = 0;
                d = new Date();
                id_time = d.getTime();
                while (i < data_music.items.length) {
                    name_playlist += '<p>- ' + data_music.items[i].name + ' :</p>';
                    $.ajax({
                        url: '	https://api.spotify.com/v1/playlists/' + data_music.items[i].id + '/tracks?=limit=3&offset=0',
                        type: 'GET',
                        async: false,
                        headers: {
                            'Authorization': 'Bearer ' + access_token
                        },
                        success: function (tracks_playlist) {
                            j = 0
                            while (j < tracks_playlist.items.length) {
                                name_playlist += '<p style="text-align: center;"><a href="' + tracks_playlist.items[j].track.external_urls.spotify + '" target="_blank">' + tracks_playlist.items[j].track.artists[0].name + ' - ' + tracks_playlist.items[j].track.name + '</a></p>'
                                j = j + 1
                            }
                        }
                    });
                    i = i + 1
                }
                $(my_div_add).before('<div class="wrap-login100 margin-container" id="id_' + id_time + '"><button style="padding-left: 10px" type="button" class="close" title="Delete" onclick="delete_widget(\'id_' + id_time + '\')" aria-label="Close"><span title="Delete" aria-hidden="true" class="white-text">×</span></button><button class="close" type="button" data-toggle="modal" data-target="#modalSettings" onclick="display_good_modal_settings(\'spotify_widget\',\'' + id_time + '\')"><i class="fas fa-cog" style="margin-top: -2px;font-size: 14px;vertical-align: middle;"></i></button><p style="margin-bottom: 20px; color: #9478ff;">Spotify - Playlists</p>' + name_playlist + '</div>');
                nbr = nbr + 1
                var Cookie = {
                    name: "wdg_" + nbr,
                    type: "spotify_playlist",
                    value: numberOfPlaylist,
                    idTime: id_time
                }
                $.get('/cookieset', Cookie, function (data) {}, "JSON");
            }
        });
    });
}