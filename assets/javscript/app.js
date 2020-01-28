

var queryURL = "https://superheroapi.com/api.php/10213837355721301/search/batman";

$.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

$.get(
    queryURL,
    function (response) {
        console.log(response);
});

//$(".challenge-link").click( function (){
//    var challenge = $(this).html()
//    console.log (challenge)

//
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
//});

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
//}//