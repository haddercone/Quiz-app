// load elements from the DOM
const backward = document.querySelector("#previous");
const forward = document.querySelector("#next");
const submit = document.querySelector("#submit");
const ele = document.getElementsByClassName('wrapper');
const btnList = document.getElementsByClassName('q-list')[0];

// some variables initialization
var index = 0;
var name = 1;
var questionNumber = 1;

// hiding backward button on loading the page
hideBackwardButton();

// calling show() functin on loading the page
show(index);

// load buttons according to number of questions
for (let b = 0; b < ele.length; b++) {
    var btn = document.createElement('button');
    btn.innerHTML = questionNumber;
    btn.setAttribute('id', 'b' + b);
    btn.setAttribute('onclick', 'navigate(this.id)');
    btn.className = 'btn-nav';
    btnList.appendChild(btn)
    questionNumber++;
}

// Hide and show buttons 
function showForwardButton() { forward.style.display = ''; }
function hideForwardButton() { forward.style.display = 'none'; }
function showBackwardButton() { backward.style.display = ''; }
function hideBackwardButton() { backward.style.display = 'none'; }

// Show the coresponding question on clicking the forward or backward button
function show(e) {
    ele[e].setAttribute('style', 'display:block');
    if (e == ele.length - 1) { hideForwardButton(); showBackwardButton(); }
    else if (e >= 1) { showForwardButton(); showBackwardButton(); }
    else { hideBackwardButton(); showForwardButton(); }
}


// calling select() functin on loading the page
select(index, name);

// -----------------select an option -------------------------------//
function select(q, n) {
    // Get items containing options
    if (ele[q].children[1].children.length == 4) {

        var item_1 = ele[q].children[1].children[0];
        var item_2 = ele[q].children[1].children[1];
        var item_3 = ele[q].children[1].children[2];
        var item_4 = ele[q].children[1].children[3];

        // Get radio button
        const choice_1 = document.getElementsByName('q' + n)[0];
        const choice_2 = document.getElementsByName('q' + n)[1];
        const choice_3 = document.getElementsByName('q' + n)[2];
        const choice_4 = document.getElementsByName('q' + n)[3];

        // fill the radio button on selecting the element
        item_1.onclick = () => { choice_1.checked = true; check(); }
        item_2.onclick = () => { choice_2.checked = true; check() }
        item_3.onclick = () => { choice_3.checked = true; check() }
        item_4.onclick = () => { choice_4.checked = true; check() }
    }
    else if (ele[q].children[1].children.length == 2) {
        var item_1 = ele[q].children[1].children[0];
        var item_2 = ele[q].children[1].children[1];
        const choice_1 = document.getElementsByName('q' + n)[0];
        const choice_2 = document.getElementsByName('q' + n)[1];
        item_1.onclick = () => { choice_1.checked = true; check(); }
        item_2.onclick = () => { choice_2.checked = true; check() }
    }
}
// ------------------------------END---------------------------------------------//
// -------------------unselect the selected option ---------------------------------//
function cancel() {
    var choice = document.getElementsByName('q' + name);
    for (item = 0; item < choice.length; item++) {
        if (choice[item].checked == true) {
            choice[item].checked = false;
            document.getElementsByClassName('btn-nav')[index].style.backgroundColor = '#ddd';
            document.getElementsByClassName('btn-nav')[index].style.color = '#000';
        }
    }
}
// ------------------------------END---------------------------------------------//
// --------set background color of the attempted question number -----------//
function check() {
    var choice = document.getElementsByName('q' + name);
    for (let j = 0; j < choice.length; j++) {
        if (choice[j].checked) {
            document.getElementsByClassName('btn-nav')[index].style.backgroundColor = '#005680';
            document.getElementsByClassName('btn-nav')[index].style.color = '#fff';
        }
    }
}
// ------------------------------END---------------------------------------------//
// ----Show question number on clicking the corresponding question number -----//
function navigate(btnId) {
    var qNumber = btnId.split('')[1]
    // console.log(qNumber);
    index = qNumber;
    name = parseInt(qNumber) + 1;
    for (var i = 0; i < ele.length; i++) {
        if (ele[i].style.display == 'block') {
            ele[i].removeAttribute('style');
        }
    }
    show(qNumber);
    select(qNumber, name);
}
// -----------------------------------END-------------------------------------//
// --------------------Forward navigation--------------------------//
function next() {
    index++;
    name++;
    select(index, name);
    if (index == ele.length - 1) { hideForwardButton(); showBackwardButton(); }

    show(index);
    ele[index - 1].removeAttribute('style');
}
// ----------------------END----------------------------------------//
// --------------------backward navigation-----------------------//
function prev() {
    index--;
    name--;
    select(index, name);
    if (index == 0) { hideBackwardButton(); showForwardButton(); }

    show(index);
    ele[index + 1].removeAttribute('style');
}
// --------------------------END----------------------------------//
//----------------- toggle navigation buttons-------------------------//
var t = setInterval(() => {
    if (window.innerWidth > 800) {
        document.getElementById('toggle').style.display = 'none';
        btnList.style.display = 'grid';
    }
    else if (window.innerWidth <= 800) {
        document.getElementById('toggle').style.display = '';
        btnList.style.display = 'none';
    }
}, 10);

function showquestionNumbers() {
    clearInterval(t);
    if (btnList.style.display == 'none') { btnList.style.display = 'inline-block'; }
    else if (btnList.style.display = 'inline-block') { btnList.style.display = 'none'; }
}
// ------------------------END-----------------------------------------//
//------------------------- Shows your score -------------------------//
function submitQuiz() {
    var answers = []
    var score = 0;
    var optElement = document.getElementsByClassName('options');
    var a = 1;

    for (var opt = 0; opt < optElement.length; opt++) {
        var rad = document.getElementsByName('q' + a);
        for (var i = 0; i < rad.length; i++) {
            if (rad[i].checked == true) {
                v = {}
                v[a] = rad[i].value
                if (rad[i].value == 'true') { score++; }
                answers.push(v);
            }
        }
        a++;
    }
    var mainScoreCon = document.getElementById("score-container");

    var scoreCon = document.getElementById('score');
    scoreCon.innerHTML = 'Your Score: ' + score + '/' + optElement.length;
    // console.log(answers);
    // console.log(score);
    mainScoreCon.style.display = 'flex';
    submit.setAttribute('disabled', 'true');
}
// ---------------------------END------------------------------------//
//------------- navigate with the help of keyboard buttons -------------//
document.addEventListener('keydown', (event) => {
    console.log(event.keyCode);

    if (index < ele.length - 1 && event.keyCode == 39) { next(); } // right arrow key
    else if (event.keyCode == 37 && index > 0) { prev(); } // left arrow key
    else if (event.keyCode == 67) { cancel(); } // C key
    else if (event.keyCode == 13) { submitQuiz(); } // enter key
});
// --------------------------END-----------------------------------------//
