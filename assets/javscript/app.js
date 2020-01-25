$("#button-addon1").on("click", function(){
    console.log("clicked");
    var userSearch = $("#userInputLeft").val().trim();
    var superHero = userSearch;
    
    var queryURL = "https://superheroapi.com/api/10213837355721301/search/" + superHero;

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function (results) {
        var results = results.powerstats;
        console.log(results);
    })
});
