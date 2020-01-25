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