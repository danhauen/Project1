
$(document).ready(function () {
    $("#loveBtnReload").hide();
    $("#btn-newchallenge").hide();
    // $(".lds-heart").hide();

    
    


    
    $('#list-tab a').click(function(){
        $('.active').removeClass('active');
        $(this).addClass('active');
    });


    var responseIndex = -1;
    var heroes = {
        superName: ["", ""],
        nameResults: ["", ""],
        birthResults: ["", ""],
        firstAppearResults: ["", ""],
        alignment: ["", ""],
        image: ["", ""],

        statInt: [0, 0],
        statStr: [0, 0],
        statSpd: [0, 0],
        statDur: [0, 0],
        statPow: [0, 0],
        statCom: [0, 0],

        display: function () {
            $("#challenger" + responseIndex).text(this.superName[responseIndex]);
            $("#name" + responseIndex).text("Name: " + this.nameResults[responseIndex]);
            $("#birthPlace" + responseIndex).text("Place of Birth: " + this.birthResults[responseIndex]);
            $("#firstAppear" + responseIndex).text("First Appearance: " + this.firstAppearResults[responseIndex]);
            $("#superImage" + responseIndex).attr("src", this.image[responseIndex]);
            $("#alignment" + responseIndex).text("Alignment: " + this.alignment[responseIndex]);
        },
    };

    $("button").on("click", function () {
        responseIndex = parseInt($(this).attr("id").slice(-1));
        var superHero = $("#userInput" + responseIndex).val().trim();

        var queryURL = "https://cors-anywhere.herokuapp.com/superheroapi.com/api/10213837355721301/search/" + superHero;

        // $.ajaxPrefilter(function(options) {
        //     if (options.crossDomain && jQuery.support.cors) {
        //         options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        //     }
        // });

        $.get(queryURL, function (response) {
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

    var challengeList = ["Strength", "Speed", "SuperPower", "Combat", "Intelligence"]
    var challenge = -1;
    $(".list-group-item-action").click(function () {
        challenge = challengeList.indexOf($(this).html());
    });

    function compareStat(stats) {
        stats = stats[0] - stats[1];
        if (stats > 0) {
            $(".hero-right").addClass("animated fadeOutRightBig")
        }
        else if (stats < 0) {
            $(".hero-left").addClass("animated fadeOutLeftBig")
        }
        else {
            console.log("tie");
        };
    };

    $("#btn-challenge").click(function () {
        $("#btn-challenge").hide();
        $("#btn-newchallenge").show();
        switch (challenge) {
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

    $("#btn-newchallenge").click(function () {
        location.reload(true);
    })

    $("#loveBtn").on("click", function () {
        $(".compat-card-title").hide();
        $("#loveBtn").hide();
        $("#loveBtnReload").show();
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
        }).catch(function (error) {
            console.log(error);
            console.log(settings.url);
        })

        $(".challenge-select").addClass("animated fadeOutUpBig")
        // $(".lds-heart").show();
    });

    $("#loveBtnReload").on("click", function () {
        location.reload(true);
    });
});