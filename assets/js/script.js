let opt = [];

function flip(e) {
    let card = e.currentTarget; 

    if(opt.length >= 2) {
        console.log('Nao pode fazer nada');
    } else {
        opt.push(card.getAttribute('data-card'));
        card.classList.add('rotate-card');

        if(opt[0] == opt[1]) {
            console.log('Os dois sao iguais');
        } else {
            // console.log('Os dois sao diferentes');
        }
    }
}
function generateCards() {
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
generateCards();