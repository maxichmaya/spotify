(function() {
    var nextUrl;
    var results = $(".allResults");
    var extraResultsInfo = $(".extraResultsInfo");
    var showMoreButton = $(".showMoreButton");
    $(".showMoreButton").hide();

    $(".submit-btn").on("click", function() {
        var userInput = $('input[name="user-input"]').val();
        var albumOrArtist = $(".artist-or-album").val();
        var url = "https://elegant-croissant.glitch.me/spotify";

        $.ajax({
            url: url,
            data: {
                query: userInput,
                type: albumOrArtist
            },
            success: function(data) {
                console.log("data", data);
                var resultsHtml = "";

                data = data.artists || data.albums;
                console.log(data.items);
                if (data.next) {
                    $(".showMoreButton").show();
                } else {
                    $(".showMoreButton").hide();
                }

                if (data.items.length) {
                    extraResultsInfo.html("Results for ... " + userInput); //moram tagirati novu element
                } else {
                    extraResultsInfo.html(
                        "Sorry, no results :( Try something else"
                    );
                    return;
                }

                for (var i = 0; i < data.items.length; i++) {
                    if (data.items[i].images[0]) {
                        resultsHtml +=
                            '<div><img src="' +
                            data.items[i].images[0].url +
                            '"></div>';
                    } else {
                        resultsHtml += '<div><img src="noPhoto2.jpeg"></div>';
                    }
                    resultsHtml +=
                        '<div class="singleResult">' +
                        data.items[i].name +
                        "</div>";
                }

                $(".allResults").html(resultsHtml);

                nextUrl =
                    data.next &&
                    data.next.replace("http://api.spotify.com/v1/search", url);
            } //end ajax su
            //this runs when I get a response from API/proxy
        });
        $(".showMoreButton").on("click", function(e) {
            // WRITE A CLICK HANDLER FOR ONLY ONCE!
            $.ajax({
                url: nextUrl,
                data: {
                    query: userInput,
                    type: albumOrArtist
                },
                success: function(data) {
                    console.log("nextUrl:", nextUrl);
                    var resultsHtml = "";

                    data = data.artists || data.albums;
                    console.log(data.items);
                    if (data.next) {
                        $(".showMoreButton").show();
                    } else {
                        $(".showMoreButton").hide();
                    }

                    for (var i = 0; i < data.items.length; i++) {
                        if (data.items[i].images[0]) {
                            resultsHtml +=
                                '<div><img src="' +
                                data.items[i].images[0].url +
                                '"></div>';
                        } else {
                            resultsHtml +=
                                '<div><img src="noPhoto2.jpeg"></div>';
                        }
                        resultsHtml +=
                            "<a href='" +
                            data.items[i].external_urls.spotify +
                            "'><p>" +
                            data.items[i].name +
                            "</p></a></div></div>";
                    }
                    console.log(data.items[i].name);

                    resultsHtml +=
                        '<div class="singleResult">' +
                        data.items[i].name +
                        "</div>";
                }
                // $(".allResults").html(resultsHtml);
            });
            console.log("hello");
        });
    });
})();
