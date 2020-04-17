//Initialisation function to fill paragraph space with
//predetermined text depending on which article has been selected
window.onload = function () {
    populateParagraph();
}

//JS implementation of button behaviour for returning to home screen
function returnToHome()
{
    window.location = "index.html";
}

//XML function to get game design document from the file and set it to the html paragraph space
function populateParagraph() {
    let text = document.getElementById('Game Design Document');
    if (text) {
        xhr = new XMLHttpRequest();
        xhr.open("GET", "Text/Game Design Document.txt");
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4)               //the readyState if the status of the request
                text.innerHTML = xhr.responseText; // (http://www.w3schools.com/ajax/ajax_xmlhttprequest_onreadystatechange.asp)
                                                   // 4 is a completed request
        }
    }
}