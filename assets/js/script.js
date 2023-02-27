let opt = [];
let moves = 0;
let win = 0;
let player = '';

document.querySelector('.btn').addEventListener('click', startGame);
function startGame(e) {
    player = document.querySelector('.input').value;
    if(player.length >= 3) {
        e.preventDefault();
        document.querySelector('.btn').innerHTML = 'Iniciando...';
        setTimeout(generateCards, 2000);
    } 
}

function flip(e) {
    let card = e.currentTarget; 
    if(opt.length >= 2) {
        console.log('Nao pode fazer nada');
    } else {
        if(card.classList.contains('rotate-card') === false) {
            opt.push(card.getAttribute('data-card'));
            card.classList.add('rotate-card');
            if(opt[0] == opt[1]) {
                cardsRight(opt[0]);
            } else {
                if(opt.length == 2) {
                    setTimeout(cardsWrong, 500);
                }  
            }
        }
    }
}
function generateCards() {
    document.querySelector('.center.start').style.display = 'none';
    document.querySelector('.center.playing').style.display = 'block';

    document.querySelector('.info-player span').innerHTML = player;
    startCron();

    const duplicate = [...cards, ...cards];
    const suffle = duplicate.sort(() => Math.random() - 0.5);
    suffle.forEach((item)=> {
        let div = document.createElement('div');
        div.classList.add('card');
        div.setAttribute('data-card', item.id);
        
        let divFaceFront = document.createElement('div');
        divFaceFront.classList.add('face','card-front');
        divFaceFront.style.backgroundImage = `url(${item.image})`;
        div.appendChild(divFaceFront);

        let divFaceBack = document.createElement('div');
        divFaceBack.classList.add('face','card-back');
        div.appendChild(divFaceBack);
        document.querySelector('.cards').appendChild(div);
        

        document.querySelectorAll('.card').forEach(card =>{
            card.addEventListener('click', flip);
        });
    });
};
function  startCron() {

    let minute = 0;
    let seconds = 0;
    let time = document.querySelector('.info-timer span');

    setInterval(() => {
        if(win  !== cards.length) {
            if(seconds === 59) {
                minute ++;
                seconds = 0;
            } else {
                seconds ++;
            }
            time.innerHTML = formatTime(minute, seconds);
        }
    }, 1000);
}
function formatTime(min, sec) {
    if(sec < 10) {
        sec = `0${sec}`;
    } else {
        sec = sec;
    }
    if(min < 10) {
        min = `0${min}`
    } else {
        min = min;
    }
    return `${min}:${sec}`;
}
function cardsRight(option) {
    document.querySelectorAll('.card').forEach(card => {
        if(card.getAttribute('data-card') == option) {
            card.classList.add('done');
            card.querySelector('.card-front').classList.add('disabled');
            opt = [];
        };
    });
    addMoves();
    win ++;
    if(win === cards.length) {
        alert(`Parabéns ${player}, você deu ${moves} movimentos!`);
    }
};
function cardsWrong() {
    document.querySelectorAll('.card.rotate-card:not(.done)').forEach(card =>{
        card.classList.remove('rotate-card');
        opt = [];
    });
    addMoves();
};
function addMoves() {
    moves ++;
    document.querySelector('.info-moves span').innerHTML = moves;
}