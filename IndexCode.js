//Window initialisation
window.onload = function () {
    populateParagraph("Gareth Of Dunbar");
}
//JS Hover function (Unused)
function mouseHoverOn()
{
   var x =  document.getElementById("Link1");
   x.style.color = 'red';
}
//JS Hover function (Unused)
function mouseHoverOff()
{
    var x =  document.getElementById("Link1");
    x.style.color = 'darkslategrey';
}
//Return to home page
function returnToHome()
{
    window.location = "index.html";
}
//Change page depending on which link was selected
function changePage(loc) {
    window.location = loc;
}

//XML implementation to read a file and populate a html page with the data
function populateParagraph(fileName) {
    let text = document.getElementById(fileName + 'Article');
    if (text) {
        xhr = new XMLHttpRequest();
        xhr.open("GET", "Text/" + fileName + ".txt");
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4)               //the readyState if the status of the request
                text.innerHTML = xhr.responseText; // (http://www.w3schools.com/ajax/ajax_xmlhttprequest_onreadystatechange.asp)
                                                   // 4 is a completed request
        }
    }
}