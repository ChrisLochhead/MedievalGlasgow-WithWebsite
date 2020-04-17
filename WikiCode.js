//Page initialisation
window.onload = function () {
findPageContents();
}
//Return to home page
function returnToHome()
{
    window.location = "index.html"
}
//Determine which article has been selected and populate the page accordingly
function findPageContents() {
    let page = parent.document.URL.substring(parent.document.URL.indexOf('?'), parent.document.URL.length);
    populateWikiPage(page);
}
//Populate all aspects of the boiler plate wiki page with the article specific data
function populateWikiPage(p)
{
    populateHeading(p);
    populateArticleImage(p);
    populateParagraph(p);
    populateFirstSuggestion(p)
}
//Assign the first suggestion depending on the selected article to prevent suggesting the current article
function populateFirstSuggestion(fileName) {

    if (document.getElementById("FirstSuggestionImage")) {
        var brokenString = fileName.split("=");
        var firstSuggestion = "Gareth Of Dunbar"
        var possibleAnswers = ["Gareth%20Of%20Dunbar", "Dave%20O%20Summerston", "Corsa", "Gando%20the%20Grey", "Possil"];

        for (let i = 0; i < possibleAnswers.length; i++) {
            if (brokenString[1] == possibleAnswers[i]) {
                if (i == possibleAnswers.length - 1)
                    firstSuggestion = possibleAnswers[0];
                else
                    firstSuggestion = possibleAnswers[i + 1];
            }
        }

        document.getElementById("FirstSuggestionImage").src = "Images/" + firstSuggestion + ".jpg";

        var nameString = firstSuggestion.split("%20");
        var newNameString = "";
        for (let i = 0; i < nameString.length; i++)
            newNameString += nameString[i] + " ";

        firstSuggestion = newNameString;

        document.getElementById("FirstSuggestionLink").innerText = firstSuggestion;
        document.getElementById("FirstSuggestionLink").setAttribute("href", "wiki.html?myVar1=" + firstSuggestion);
    }
}
//Find and load the related image into the html file
function populateArticleImage(fileName) {
    if (document.getElementById("ArticleImage")) {
        var brokenString = fileName.split("=");
        let imageSource = "Images/" + brokenString[1] + ".jpg";
        var searchPic;
        searchPic = new Image(1200, 720);
        searchPic.src = imageSource;
        document.getElementById("ArticleImage").src = searchPic.src;
    }
}
//Find the name of the article and apply it to the html
function populateHeading(fileName) {
    let text = document.getElementById('ArticleHeading');
    if(text) {
        var brokenString = fileName.split("=");
        var nameString = brokenString[1].split("%20");
        var newNameString = "";
        for (let i = 0; i < nameString.length; i++)
            newNameString += nameString[i] + " ";

        text.innerHTML = newNameString;
    }
}
//Find and read the article content into the html file.
function populateParagraph(fileName) {

    text = document.getElementById("MainArticle");
    var brokenString = fileName.split("=");
    var name = brokenString[1];


    xhr = new XMLHttpRequest();
    xhr.open("GET", "Text/" + name + ".txt");
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {         //the readyState if the status of the request
            text.innerHTML = xhr.responseText; // (http://www.w3schools.com/ajax/ajax_xmlhttprequest_onreadystatechange.asp)
        }// 4 is a completed request
    }
}
