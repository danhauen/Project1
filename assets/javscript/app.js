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

var challenge = "";

$(".list-group-item-action").click( function (){
    return challenge = $(this).html();

});

console.log(challenge)



$("#btn-challenge").click( function (){

    var heroSpd = heroes.statSpd;
    var heroStr = heroes.statStr;
    var heroInt = heroes.statInt;
    var heroPow = heroes.statPow;
    var heroCom = heroes.statCom;

    var heroChallenge = challenge;

    runChallenge(heroChallenge, heroSpd, heroStr, heroInt, heroPow, heroCom);
    
    console.log(runChallenge());
            

});
        
        

    
    


function runChallenge (heroChallenge, heroSpd, heroStr, heroInt, heroPow, heroCom){



    if (heroChallenge === "Strength") {

        console.log("strength check hit");

        var strength = heroStr

        indexOfMax(strength);

        function indexOfMax(strength) {
            if (strength.length === 0) {
                return -1;
            }
        
            var max = strength[0];
            var maxIndex = 0;
        
            for (var i = 1; i < strength.length; i++) {
                if (strength[i] > max) {
                    maxIndex = i;
                    max = strength[i];
                }
            }
        
            return maxIndex;
        }

        if (maxIndex === 0){
            return 0
        }
        
        else {
            return 1
        }


        

    }
    else if (heroChallenge === "Speed") {

        console.log("speed check hit");
        var speed = heroSpd;

        indexOfMax(speed);

        function indexOfMax(speed) {
            if (speed.length === 0) {
                return -1;
            }
        
            var max = speed[0];
            var maxIndex = 0;
        
            for (var i = 1; i < speed.length; i++) {
                if (speed[i] > max) {
                    maxIndex = i;
                    max = speed[i];
                }
            }
        
            return maxIndex;
        }

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
        $(".card-text").html("Percentage of combatibility: " + response.percentage + "%");
        $(".card-text2").html(response.result);
    }).catch(function(error){
        console.log(error);
        console.log(settings.url);
    })

});
