function click1() {
alert('Buongiorno gentil signore');
}

function click2() {
    document.getElementById('textarea1').value = prompt("", document.getElementById('textarea1').value);
}

function click3() {
    var total = 0, text = [];
Array.prototype.forEach.call(document.getElementById('part3').getElementsByClassName('form-check'), function(element) {
    var input = element.getElementsByTagName('input');
if(input[0] && input[0].checked) {
    total++;
    text.push(input[0].value);
}
});
alert('Total: ' + total + '; selected: ' + text.join('$'));
}

function click4() {
    var total = 0, text = [];
Array.prototype.forEach.call(document.getElementById('part4').getElementsByClassName('form-check'), function(element) {
    var input = element.getElementsByTagName('input');
if(input[0] && input[0].checked) {
    total++;
    text.push(input[0].value);
}
});
alert(text.join());
}

function click5() {
    document.getElementById('label1').value = document.getElementById('label1').value.split('').reverse().join('');
}
document.getElementById('button5').addEventListener('click', function () {
click5();
});

function click6() {
    document.getElementById('label2').classList.toggle('bg-dark');
}
document.getElementById('button6').addEventListener('click', function () {
click6();
});

document.getElementById('textarea2').addEventListener('keyup', function () {
    document.getElementById('title').innerHTML = this.value;
});
