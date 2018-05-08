document.getElementById('click1').addEventListener('click', function() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200) {
            var response = this.responseXML;
            var JSONresponse = xmlToJson(response);
            document.getElementById('name').innerHTML = response
                .getElementsByTagName('user')[0]
                .getElementsByTagName('results')[0]
                .getElementsByTagName('name')[0]
                .getElementsByTagName('first')[0]
                .innerHTML;
            document.getElementById('surname').innerHTML = response
                .getElementsByTagName('user')[0]
                .getElementsByTagName('results')[0]
                .getElementsByTagName('name')[0]
                .getElementsByTagName('last')[0]
                .innerHTML;
            document.getElementById('gender').innerHTML = response
                .getElementsByTagName('user')[0]
                .getElementsByTagName('results')[0]
                .getElementsByTagName('gender')[0]
                .innerHTML;
            document.getElementById('email').innerHTML = response
                .getElementsByTagName('user')[0]
                .getElementsByTagName('results')[0]
                .getElementsByTagName('email')[0]
                .innerHTML;
            document.getElementById('username').innerHTML = response
                .getElementsByTagName('user')[0]
                .getElementsByTagName('results')[0]
                .getElementsByTagName('login')[0]
                .getElementsByTagName('username')[0]
                .innerHTML;
            document.getElementById('password').innerHTML = response
                .getElementsByTagName('user')[0]
                .getElementsByTagName('results')[0]
                .getElementsByTagName('login')[0]
                .getElementsByTagName('password')[0]
                .innerHTML;
            document.getElementById('photo').setAttribute('src', response
                .getElementsByTagName('user')[0]
                .getElementsByTagName('results')[0]
                .getElementsByTagName('picture')[0]
                .getElementsByTagName('large')[0]
                .innerHTML);
        }
    };

    request.open("GET", "https://randomuser.me/api/?format=xml", true);
    request.send();
});

document.getElementById('click2').addEventListener('click', function() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200) {
            var response = this.responseText;
            var JSONresponse = JSON.parse(response);
            document.getElementById('name').innerHTML = JSONresponse.results[0].name.first;
            document.getElementById('surname').innerHTML = JSONresponse.results[0].name.last;
            document.getElementById('gender').innerHTML = JSONresponse.results[0].gender;
            document.getElementById('email').innerHTML = JSONresponse.results[0].email;
            document.getElementById('username').innerHTML = JSONresponse.results[0].login.username;
            document.getElementById('password').innerHTML = JSONresponse.results[0].login.password;
            document.getElementById('photo').setAttribute('src', JSONresponse.results[0].picture.large);
        }
    };

    request.open("GET", "https://randomuser.me/api/?format=json", true);
    request.send();
});

// Changes XML to JSON
function xmlToJson(xml) {

    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for(var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof(obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
};