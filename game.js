// Settings
let options = document.getElementById('options')
let board = document.getElementById('game-board')

let question = document.getElementById('question')
let buttonA = document.getElementById('a')
let buttonB = document.getElementById('b')
let buttonC = document.getElementById('c')
let buttonD = document.getElementById('d')

let numQuestion
let correct
let message

function start()
{
    options.hidden = true
    board.hidden = false
    init()
}

function init()
{
    numQuestion = 0
    correct = 0
    distribute()
}

function distribute()
{
    if (numQuestion === data.length) {
        stopGame()
    }
    else {
        question.innerHTML = data[numQuestion].question
        buttonA.innerText = data[numQuestion].a
        buttonB.innerText = data[numQuestion].b
        buttonC.innerText = data[numQuestion].c
        buttonD.innerText = data[numQuestion].d
    }
    
}

function stopGame()
{
    options.hidden = false
    board.hidden = true

    if (correct === numQuestion) {
        message = "Congratz, you got it all correct!"
    }
    else {
        message = "Your score is: " + correct
    }
    alert(message)
}

document.querySelector('#a')
    .addEventListener('click', ()=>{
        if(data[numQuestion].correct === 'a') {
            correct++
        }
        numQuestion++
        distribute()
    })

document.querySelector('#b')
    .addEventListener('click', ()=>{
        if(data[numQuestion].correct === 'b') {
            correct++
        }
        numQuestion++
        distribute()
    })

document.querySelector('#c')
    .addEventListener('click', ()=>{
        if(data[numQuestion].correct === 'c') {
            correct++
        }
        numQuestion++
        distribute()
    })

document.querySelector('#d')
    .addEventListener('click', ()=>{
        if(data[numQuestion].correct === 'd') {
            correct++
        }
        numQuestion++
        distribute()
    })