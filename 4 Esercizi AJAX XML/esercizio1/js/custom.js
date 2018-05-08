document.getElementById('click').addEventListener('click', function() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200) {
            document.getElementById('title').innerHTML = this.responseText;
        }
    };

    request.open("GET", "friuli.txt", true);
    request.send();
});