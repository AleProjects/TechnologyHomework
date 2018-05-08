var tmpHistory = "", cronology = "", last = "";

function isNumberKey(evt) {
    var code = evt.keyCode;

    if (code === 99 || code === 67) { // c or C
        tmpHistory = "";
        document.getElementById("screen").value = 0;
    } else if (code >= 48 && code <= 57) { // A number
        tmpHistory += "" + (code - 48);
        cronology += "" + (code - 48);

        if(last < 48 || last > 57) {
            document.getElementById("screen").value = "";
        }

        last = code;

        return true;
    } else if (code === 13 || code === 61) { // Enter or equals
        if(last === 43 || last === 45)
            cronology += 0;
        if(last === 42 || last === 47)
            cronology += 1;
        document.getElementById("screen").value = eval(cronology).toFixed();

        cronology = "";
        tmpHistory = "";
        last = code;
    } else if (code === 43) { // Plus
        if(cronology === "")
            cronology = document.getElementById("screen").value;

        if(last !== 43)
            cronology += "+";
        tmpHistory = "";
        last = code;
    } else if (code === 45) { // Minus
        if(cronology === "")
            cronology = document.getElementById("screen").value;

        if(last !== 45)
            cronology += "-";
        tmpHistory = "";
        last = code;
    } else if (code === 42) { // Multiplication
        if(cronology === "")
            cronology = document.getElementById("screen").value;

        if(last !== 42)
            cronology += "*";
        tmpHistory = "";
        last = code;
    } else if (code === 47) { // Division
        if(cronology === "")
            cronology = document.getElementById("screen").value;

        if(last !== 47)
            cronology += "/";
        tmpHistory = "";
        last = code;
    }

    return false;
}

document.onkeypress = function(e) {
    if (e.target.tagName !== "INPUT") {
        var screen = document.getElementById('screen'), code = e.keyCode;

        var ev = new e.constructor(e.type, e);
        screen.dispatchEvent(ev);

        if(code >= 48 && code <= 57)
            screen.value = screen.value + "" + e.key;
    }
};

Array.from(document.getElementById('keyboard').getElementsByClassName('key')).forEach(function(el) {
    el.addEventListener('click', function(e) {
        e.preventDefault();

        var screen = document.getElementById('screen'),
            key = el.getAttribute('data-value'),
            code = el.getAttribute('data-value').charCodeAt(0),
            ev = new e.constructor('keypress', e);

        ev.key = key;
        ev.keyCode = code;
        screen.dispatchEvent(ev);

        if(code >= 48 && code <= 57)
            screen.value = screen.value + "" + key;
    });
});