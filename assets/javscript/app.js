var responseIndex = -1;
var heroes = {
    superName: ["",""],
    nameResults: ["",""],
    birthResults: ["",""],
    firstAppearResults: ["",""],
    alignment: ["",""],
    image: ["",""],
    statInt:[0,0],
    statStr:[0,0],
    statSpd:[0,0],
    statDur:[0,0],
    statPow:[0,0],
    statCom:[0,0],
    display: function(){
        $("#challenger" + responseIndex).text(this.superName[responseIndex]);
        $("#name" + responseIndex).text("Name: " + this.nameResults[responseIndex]);
        $("#birthPlace" + responseIndex).text("Place of Birth: " + this.birthResults[responseIndex]);
        $("#firstAppear" + responseIndex).text("First Appearance: " + this.firstAppearResults[responseIndex]);
        $("#superImage" + responseIndex).attr("src", this.image[responseIndex]);
        $("#alignment" + responseIndex).text("Alignment: " + this.alignment[responseIndex]);
    },
};

$("button").on("click", function() {
    responseIndex = parseInt($(this).attr("id").slice(-1));
    var superHero = $("#userInput" + responseIndex).val().trim();

    var queryURL = "https://cors-anywhere.herokuapp.com/superheroapi.com/api/10213837355721301/search/" + superHero;

    // $.ajaxPrefilter(function(options) {
    //     if (options.crossDomain && jQuery.support.cors) {
    //         options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    //     }
    // });

    $.get(queryURL, function(response) {
        heroes.superName[responseIndex] = response.results[0].name;
        heroes.nameResults[responseIndex] = response.results[0].biography["full-name"];
        heroes.birthResults[responseIndex] = response.results[0].biography["place-of-birth"];
        heroes.firstAppearResults[responseIndex] = response.results[0].biography["first-appearance"];
        heroes.alignment[responseIndex] = response.results[0].biography.alignment;
        heroes.image[responseIndex] = response.results[0].image.url;
        heroes.statInt[responseIndex] = parseInt(response.results[0].powerstats.intelligence);
        heroes.statStr[responseIndex] = parseInt(response.results[0].powerstats.strength);
        heroes.statSpd[responseIndex] = parseInt(response.results[0].powerstats.speed);
        heroes.statDur[responseIndex] = parseInt(response.results[0].powerstats.durability);
        heroes.statPow[responseIndex] = parseInt(response.results[0].powerstats.power);
        heroes.statCom[responseIndex] = parseInt(response.results[0].powerstats.combat);
        heroes.display();
        console.log(heroes);
        responseIndex = -1;
    });
});

$(".list-group-item-action").click( function (){
    var challenge = $(this).html();
    console.log(challenge);

//   if (challenge === "Strength") {
//        var s1Stat = superHero1.results.powerstats.strength;
//        var s2Stat = superHero2.results.powerstats.strength;
//        compareStats(s1Stat, s2Stat);
//    }
//
//    else if (challenge === "Speed"){
//        var s1Stat = superHero1.results.powerstats.speed;
//        var s2Stat = superHero2.results.powerstats.speed;
//        compareStats(s1Stat, s2Stat);
//    }
//
//    else if (challenge === "Superpower"){
//        var s1Stat = superHero1.results.powerstats.superpower;
//        var s2Stat = superHero2.results.powerstats.superpower;
//        compareStats(s1Stat, s2Stat);
//    }
//
//    else if (challenge === "Combat"){
//        var s1Stat = superHero1.results.powerstats.combat;
//        var s2Stat = superHero2.results.powerstats.combat;
//        compareStats(s1Stat, s2Stat);
//    }

//    else if (challenge === "Intelligence"){
//        var s1Stat = superHero1.results.powerstats.intelligence;
//        var s2Stat = superHero2.results.powerstats.intelligence;
//        compareStats(s1Stat, s2Stat);
//    }
});

//console.log(compareStats())


//function compareStats() {
//    if (s1Stat > s2Stat) {
//        return winner = superHero1
//    }
//
//    else if (s1Stat < s2Stat) {//
//    return winner = superHero2
//    }
//
//    else if (s1Stat === s2Stat) {
//       return winner = draw
//    }
//}

// $("button").on("click", function() {

//     var queryURL = "api.php?action=opensearch&search=" + heroes.superName[0];

//     $.ajaxPrefilter(function(options) {
//         if (options.crossDomain && jQuery.support.cors) {
//             options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
//         }
//     });
//     $.get(queryURL, function(response) {
//         $("#moreWiki1").text(response);
//     });
// });

$("#loveBtn").on("click", function (){
    $("h6").hide();
    $("#loveBtn").hide();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://love-calculator.p.rapidapi.com/getPercentage?fname=" + heroes.nameResults[0].split(" ").join("+") + "&sname=" + heroes.nameResults[1].split(" ").join("+"),
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "love-calculator.p.rapidapi.com",
            "x-rapidapi-key": "1d09547cd7msh4a347c795eaf60bp18ec31jsn7453d2f1be9c"
        }
    }
    
    $.ajax(settings).then(function (response) {
        console.log(response.percentage);
        $(".card-text").html(response.percentage + "% combatibility");
        $(".card-text2").html(response.result);
    }).catch(function(error){
        console.log(error);
        console.log(settings.url);
    })

});

