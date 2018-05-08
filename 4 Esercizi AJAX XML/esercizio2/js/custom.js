document.getElementById('click').addEventListener('click', function() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200) {
            var response = this.responseXML,
                nomeCompleto = response.getElementsByTagName('regione')[0].getElementsByTagName('nomeCompleto')[0].textContent;
            document.getElementById('title').innerHTML = nomeCompleto;
        }
    };

    request.open("GET", "friuli.xml", true);
    request.send();
});