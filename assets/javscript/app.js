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
        console.log(heroes);
        responseIndex = -1;
    });
});

$(".list-group-item-action").click( function challengeSelect (){
    var challenge = $(this).html();

    console.log(challenge);

    $("#btn-challenge").click( function challengeBtnClick (){
        var heroSpd = heroes.statSpd
        var heroStr = heroes.statStr
        var heroInt = heroes.statInt
        var heroPow = heroes.statPow
        var heroCom = heroes.statCom
    
        var heroChallenge = challengeSelect()
    
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
    
                if (maxIndex === 0){
                    return 0;
                }
                
                else {
                    return 1;
                }
    
                
                
    
            }
            else if (heroChallenge === "Intelligence") {
                var intelligence = heroInt;
    
                console.log("int check hit");
    
                indexOfMax(intelligence);
    
                function indexOfMax(intelligence) {
                    if (intelligence.length === 0) {
                        return -1;
                    }
                
                    var max = intelligence[0];
                    var maxIndex = 0;
                
                    for (var i = 1; i < intelligence.length; i++) {
                        if (intelligence[i] > max) {
                            maxIndex = i;
                            max = intelligence[i];
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
            else if (heroChallenge === "Combat") {
                var combat = heroCom;
    
                console.log("combat check hit");
    
                indexOfMax(combat)
    
                function indexOfMax(combat) {
                    if (combat.length === 0) {
                        return -1;
                    }
                
                    var max = combat[0];
                    var maxIndex = 0;
                
                    for (var i = 1; i < combat.length; i++) {
                        if (combat[i] > max) {
                            maxIndex = i;
                            max = combat[i];
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
            else if (heroChallenge === "Superpower") {
                var superpower = heroPow;
    
                console.log("pow check hit");
    
                indexOfMax(superpower);
    
                function indexOfMax(superpower) {
                    if (superpower.length === 0) {
                        return -1;
                    }
                
                    var max = superpower[0];
                    var maxIndex = 0;
                
                    for (var i = 1; i < superpower.length; i++) {
                        if (superpower[i] > max) {
                            maxIndex = i;
                            max = superpower[i];
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
            
                
    
            }
            runChallenge(heroChallenge, heroSpd, heroStr, heroInt, heroPow, heroCom);
            console.log(runChallenge());
    
        });


});





    
    







