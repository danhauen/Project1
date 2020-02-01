// document ready
$(document).ready(function () {
    $("#loveBtnReload").hide();
    $("#btn-newchallenge").hide();

    $(".hero-left").addClass("animated fadeInLeftBig");
    $(".hero-right").addClass("animated fadeInRightBig");
    $(".compat-card").addClass("animated fadeInUpBig");
    $(".challenge-select").addClass("animated fadeInDownBig");
   
   
    // challenge active
    $('#list-tab a').click(function () {
        $('.active').removeClass('active');
        $(this).addClass('active');
    });

    // modal
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    })

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
        var superHero = $("#userInput" + responseIndex).val().trim().toLowerCase();
        console.log(superHero);

        var queryURL = "https://cors-anywhere.herokuapp.com/superheroapi.com/api/10213837355721301/search/" + superHero;

        $.get(queryURL, function (response) {

            console.log(response);
            for (i = 0; i < response.results.length; i++) {
                var responseLower = response.results[i].name
                console.log(responseLower.toLowerCase());
                if (superHero === responseLower.toLowerCase()) {

                    heroes.superName[responseIndex] = response.results[i].name;
                    heroes.nameResults[responseIndex] = response.results[i].biography["full-name"];
                    heroes.birthResults[responseIndex] = response.results[i].biography["place-of-birth"];
                    heroes.firstAppearResults[responseIndex] = response.results[i].biography["first-appearance"];
                    heroes.alignment[responseIndex] = response.results[i].biography.alignment;
                    heroes.image[responseIndex] = response.results[i].image.url;
                    

                    heroes.statInt[responseIndex] = parseInt(response.results[i].powerstats.intelligence);
                    heroes.statStr[responseIndex] = parseInt(response.results[i].powerstats.strength);
                    heroes.statSpd[responseIndex] = parseInt(response.results[i].powerstats.speed);
                    heroes.statDur[responseIndex] = parseInt(response.results[i].powerstats.durability);
                    heroes.statPow[responseIndex] = parseInt(response.results[i].powerstats.power);
                    heroes.statCom[responseIndex] = parseInt(response.results[i].powerstats.combat);
                    heroes.display();
                    responseIndex = -1;
                } else {
                    console.log('unable to process');
                }
            }
        });
    });

    // variables in challenge list to be called for
    var challengeList = ["Strength", "Speed", "SuperPower", "Combat", "Intelligence"]
    var challenge = -1;
    $(".list-group-item-action").click(function () {
        challenge = challengeList.indexOf($(this).html());
    });

    // function to determine winner and loser with animation
    function compareStat(stats) {
        stats = stats[0] - stats[1];
        if (stats > 0) {
            $(".hero-right").removeClass("fadeInRightBig").addClass("fadeOutRightBig");
            //$(".challenge-select").removeClass("fadeOutUpBig").addClass("fadeOutUpBig")
            $(".compat-card").removeClass("fadeInUpBig").addClass("fadeOutDownBig");
            $("#btn-reset").hide();
            
            

            $("#results-title").html("<p>" + heroes.superName[0] + " wins! </p>" );

            $("#results-body").append("<p> Strength: " + heroes.statStr[0] + "</p>" );
            $("#results-body").append("<p> Intelligence: " + heroes.statInt[0] + "</p>" );

            $("#results-body").append("<p> Speed: " + heroes.statSpd[0] + "</p>" );
            $("#results-body").append("<p> Combat Rating: " + heroes.statCom[0] + "</p>" );
            $("#results-body").append("<p> Superpower Rating: " + heroes.statPow[0] + "</p>" );
            $("#results-body").append("<p> Durability: " + heroes.statDur[0] + "</p>" );

            $("#results-modal").modal('show');


        }
        else if (stats < 0) {
            $(".hero-left").removeClass("fadeInLeftBig").addClass("fadeOutLeftBig");
            //$(".challenge-select").removeClass("fadeInDownBig").addClass("fadeOutUpBig")
            $(".compat-card").removeClass("fadeInUpBig").addClass("fadeOutDownBig");
            $("#btn-reset").hide();

            

            $("#results-title").html("<p>" + heroes.superName[1] + " wins!" );

            $("#results-body").append("<p> Strength: " + heroes.statStr[1] + "</p>" );
            $("#results-body").append("<p> Intelligence: " + heroes.statInt[1] + "</p>" );

            $("#results-body").append("<p> Speed: " + heroes.statSpd[1] + "</p>" );
            $("#results-body").append("<p> Combat Rating: " + heroes.statCom[1] + "</p>" );
            $("#results-body").append("<p> Superpower Rating: " + heroes.statPow[1] + "</p>" );
            $("#results-body").append("<p> Durability: " + heroes.statDur[1] + "</p>" );

            $("#results-modal").modal('show')
        }
        else {
            $(".hero-left").removeClass("fadeInLeftBig").addClass("fadeOutLeftBig");
            $(".hero-right").removeClass("fadeInRightBig").addClass("fadeOutRightBig");
            $(".compat-card").removeClass("fadeInUpBig").addClass("fadeOutDownBig");
            $("#btn-reset").hide();

            

            $("#results-title").append("<p> Nobody wins! </p>" );
            $("#results-body").append("<br><br>");
            $("#results-body").append("<p> It's a tie! </p>" );



            $('#results-modal').modal('show');
            console.log("tie");
            

        };
    };

    //modal focus control
    $('#results-modal').on('shown.bs.modal', function () {
        $('#results-modal').trigger('focus')
      })

    // challenge function btn in challenge list
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

    $("#btn-reset").click(function () {
        location.reload(true);
    })

    // new challenge btn
    $("#btn-newchallenge").click(function () {
        $(".fadeOutLeftBig").removeClass("fadeOutLeftBig").addClass("fadeInLeftBig");
        $(".fadeOutRightBig").removeClass("fadeOutRightBig").addClass("fadeInRightBig");
        $(".compat-card").removeClass("fadeOutDownBig").addClass("fadeInUpBig");
        $("#btn-newchallenge").hide();
        $("#btn-challenge").show();
        $("btn-reset").show();

    })

    // love calculator api
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
        // ajax call for love calculator
        $.ajax(settings).then(function (response) {
            console.log(response.percentage);
            $(".card-text").html("Percentage of combatibility: " + response.percentage + "%");
            $(".card-text2").html(response.result);
        }).catch(function (error) {
            console.log(error);
            console.log(settings.url);
        })
        // challenge selections fade up with love test
        $(".challenge-select").removeClass("fadeInDownBig").addClass("animated fadeOutUpBig")
    
    });
    // reload/reset love btn
    $("#loveBtnReload").on("click", function () {
        location.reload(true);
    });
});

$("#btn-modal-close").click( function () {
    $("results-modal").modal("hide");
    $("#results-modal").modal("dispose");

});

$("#results-modal").on('hidden.bs.modal', function (){
    $("#results-body").empty();
    $("#results-title").empty();

});