window.onload = function () {
    populateParagraph("Gareth Of Dunbar");
}

function mouseHoverOn()
{
   var x =  document.getElementById("Link1");
   x.style.color = 'red';
}
function mouseHoverOff()
{
    var x =  document.getElementById("Link1");
    x.style.color = 'blue';
}
function callOtherPage() {
    window.location = "team.html"
}

function returnToHome()
{
    window.location = "index.html"
}

function changePage(loc) {
    window.location = loc;
}


function populateParagraph(fileName) {
    text = document.getElementById( fileName + 'Article');

    xhr = new XMLHttpRequest();
    xhr.open("GET", "Text/" + fileName + ".txt");
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4)               //the readyState if the status of the request
            text.innerHTML = xhr.responseText; // (http://www.w3schools.com/ajax/ajax_xmlhttprequest_onreadystatechange.asp)
                                               // 4 is a completed request
    }
}