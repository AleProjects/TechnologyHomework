var values = {
    entry: 0,
    exit: 0,
    addEntry: function (value) {
        values.entry += value*1;
    },
    subEntry: function (value) {
        values.addEntry(-value);
    },
    addExit: function (value) {
        values.exit += value*1;
    },
    subExit: function (value) {
        values.addExit(-value);
    }
};

document.getElementById('transition_type_button').addEventListener('click', function(e) {
    e.preventDefault();

    var options = this.getElementsByTagName('span');
    document.getElementById('transition_type').value = hasClass(options[0], 'd-none') ? 'entry' : 'exit';

    toggleClass(options[0], 'd-none');
    toggleClass(options[1], 'd-none');
    toggleClass(this, 'btn-danger');
    toggleClass(this, 'btn-success');
});

document.getElementById('transition_value').addEventListener('change', function(e) {
    e.preventDefault();

    this.value = (this.value*1).toFixed(2);
});

document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();

    var data = new FormData(this);

    addLine(
        data.get('transition[date]'),
        data.get('transition[value]'),
        data.get('transition[reason]'),
        data.get('transition[type]'),
    );
});

function setDate(today = null) {
    if(today == null) {
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    }
    document.getElementById('transition_date').value = today;
}
setDate();

function hasClass(el, className) {
    return el.classList.contains(className);
}
function addClass(el, className) {
    el.classList.add(className);
}
function removeClass(el, className) {
    el.classList.remove(className);
}
function toggleClass(el, className) {
    el.classList.toggle(className);
}


function updateValues() {
    document.getElementById("sum-entry").innerHTML = '€ ' + values.entry.toFixed(2);
    document.getElementById("sum-exit").innerHTML = '€ ' + values.exit.toFixed(2);
    document.getElementById("sum-total").innerHTML = '€ ' + (values.entry - values.exit).toFixed(2);
}
function addLine(date, value, reason, type) {
    var table = document.getElementById('wallet');
    var row = document.createElement('tr');
    addClass(row, 'text-white');
    table.appendChild(row);

    var data = [
        date,
        value,
        reason,
        type,
        '<button type="button" class="btn btn-secondary btn-sm col">Delete</button>',
    ];

    var options = document.getElementById('transition_type_button').getElementsByTagName('span');
    if(!hasClass(options[0], 'd-none')) {
        values.addEntry(value);
        addClass(row, 'bg-success');
    }
    else {
        values.addExit(value);
        addClass(row, 'bg-danger');
    }

    updateValues();

    // TODO: do the auto - date
    var cols = [];
    data.forEach(function(value, idx) {
        var col = document.createElement('td');
        col.innerHTML = value;
        col.setAttribute('data-content', value);
        row.appendChild(col);

        cols.push(col);
    });

    cols[1].innerHTML = '€ ' + cols[1].innerHTML;

    cols[4].getElementsByTagName('button')[0].addEventListener('click', function(e) {
        e.preventDefault();

        var row = this.parentElement.parentElement;

        var value = row.getElementsByTagName('td')[1].getAttribute('data-content');
        var type = row.getElementsByTagName('td')[3].getAttribute('data-content');

        if(type === "entry")
            values.subEntry(value);
        else
            values.subExit(value);

        row.parentElement.removeChild(row);

        updateValues();
    });
}

// TODO: do the caching
function addCacheArray(key, value) {
    addCache(key, JSON.stringify(value));
}
function addCache(key, value) {

}
