var apiKey = "1f88b2c3a74f2926fb9c1669db0783b0";
var searchBoxList = document.getElementById("searchBoxList");
var results = document.getElementById("results");
var listOfNames = [];
var listOfImages = [];

function searchCharacters() {
    var name = document.getElementById("searchBox").value;
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            searchBoxList.innerHTML = "";
            results.innerHTML = "";
            var json = JSON.parse(this.responseText);

            for(var i=0; i<json.data.results.length; i++) {
                listOfNames[i] = json.data.results[i].name;
                listOfImages[i] = json.data.results[i].thumbnail.path+".jpg";
            }

            for(var i=0; i<json.data.results.length; i++) {
                var option = document.createElement('option');
                option.value = listOfNames[i];
                searchBoxList.appendChild(option);

                var divMain = document.createElement('div');
                divMain.style.float = "left";

                var name = document.createElement('div');
                name.innerHTML = listOfNames[i];

                var img = document.createElement('img');
                img.src = listOfImages[i];

                divMain.appendChild(img);
                divMain.appendChild(name);
                results.appendChild(divMain);
            }
        }
    };

    xhttp.open("GET", "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith="+name+"&limit=12&apikey="+apiKey, true);
    xhttp.send();
}