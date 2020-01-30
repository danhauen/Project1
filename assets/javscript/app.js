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
    var queryURL = "https://superheroapi.com/api/10213837355721301/search/" + superHero;

    $.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });

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
        responseIndex = -1;
    });
});

var challengeList = ["Strength","Speed","SuperPower","Combat","Intelligence"]
var challenge = -1;
$(".list-group-item-action").click(function(){
    challenge = challengeList.indexOf($(this).html());
});

function compareStat(stats){
    stats = stats[0] - stats[1];
    if(stats > 0){
        $("#results").text(heroes.superName[0] + " wins!");
    }
    else if(stats < 0){
        $("#results").text(heroes.superName[1] + " wins!");
    }
    else{
        $("#results").text("It's a tie.");
    };
};

$("#btn-challenge").click(function(){
    switch(challenge){
        case -1:
            break;
        case 0:
            compareStat(heroes.statStr);
            break;
        case 1:
            compareStat(heroes.statSpd);
            break;
        case 2:
            compareStat(heroes.statPow);
            break;
        case 3:
            compareStat(heroes.statCom);
            break;
        case 4:
            compareStat(heroes.statInt);
            break;
    }
});