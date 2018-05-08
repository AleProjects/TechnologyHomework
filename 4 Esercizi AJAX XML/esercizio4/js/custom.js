var data = {
    correct: 0,
    questionsDone: 1,
    questionToDo: 4,
    correctAnswer: -1
};

document.getElementById('start').addEventListener('click', function() {
    document.getElementById('body').classList.add('d-none');
    document.getElementById('question').classList.remove('d-none');
    newQuestion();
});
[].forEach.call(document.getElementById('question').getElementsByTagName('button'), function (el) {
    el.addEventListener('click', function() {
        if(this.getAttribute('data-answer')*1===data.correctAnswer*1)
            data.correct+=1;

        if(data.questionsDone < data.questionToDo) {
            newQuestion();
        }
        else {
            document.getElementById('question').classList.add('d-none');
            document.getElementById('end').classList.remove('d-none');
            document.getElementById('correct_answers').innerHTML = data.correct;
            document.getElementById('done_answers').innerHTML = data.questionsDone;
        }
        data.questionsDone++;
    });
});

function newQuestion() {
    var request = new XMLHttpRequest(), name;

    document.getElementById('loading').classList.remove('d-none');
    document.getElementById('question').classList.add('d-none');

    data.correctAnswer = Math.floor(Math.random()*4);

    request.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200) {
            var response = JSON.parse(this.responseText);
            var buttons = document.getElementById('question').getElementsByTagName('button');
            name = response.results[0].name;
            buttons[0].innerHTML = name.title + ' '  + name.first + ' '  + name.last;
            name = response.results[1].name;
            buttons[1].innerHTML = name.title + ' '  + name.first + ' '  + name.last;
            name = response.results[2].name;
            buttons[2].innerHTML = name.title + ' '  + name.first + ' '  + name.last;
            name = response.results[3].name;
            buttons[3].innerHTML = name.title + ' ' + name.first + ' '  + name.last;

            document.getElementById('image').setAttribute('src', response.results[data.correctAnswer].picture.large);
            document.getElementById('loading').classList.add('d-none');
            document.getElementById('question').classList.remove('d-none');
        }
    };

    request.open("GET", "https://randomuser.me/api/?results=4", true);
    request.send();
}