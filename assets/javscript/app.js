$("#button-addon1").on("click", function () {
    console.log("clicked");
    var userSearch = $("#userInputLeft").val().trim();
    var superHero = userSearch;

    var queryURL = "https://superheroapi.com/api/10213837355721301/search/" + superHero;

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "jsonp",
        headers: { 'Access-Control-Allow-Origin': 'https://superheroapi.com/api/10213837355721301/search/' },
        crossDomain: true,
    })

        .then(function (response) {
            console.log(results.name);
            var response = results;
            console.log(response);
            $("#name1").text(results.name);
        })

});

