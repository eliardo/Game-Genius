let order = [];
let clickedOrder = [];
let score = 0;


// 0 = green
// 1 vermelho
// 2 amarelo
// 3 azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');


//cria ordem aleatoria
let shuffleOrder = () =>{
    let colorOrder = Math.floor(Math.random()*4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order){
        let elementColor = createColorElement(order[i]);

        lightColor(elementColor, Number(i)+1)
    }
}

//acende proxima cor
let lightColor= (element, time) =>{
    time  = time * 500;
    setTimeout(() => {
        element.classList.add('selected')
        setTimeout(() => {
            element.classList.remove('selected')
        },200);
    }, time - 250);

   
}

//valida ordem clicada e ordem mostrada
checkOrder = () => {
    for(let i in clickedOrder){
        if(clickedOrder[i] !== order[i]){
            lose();
            break;
        }
    }

    if(clickedOrder.length === order.length){
        alert('Pontuação ' + score);
        nextLevel();
    }
}

//funcao clique do usuário
let click = (color) =>{
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

// retorna a cor
let createColorElement = (color) =>{
    if(color == 0)
        return green;
    if(color == 1)
        return red;
    if(color == 2)
        return yellow;
    if(color == 3)
        return blue;
}

// funcao para passar de nivel
let nextLevel = () => {
    score++;
    shuffleOrder();
}


let lose = () => {
    alert("Pontuação " + score + "Você perdeu")
    order = [];
    clickedOrder = [];
    playGame();
}

let playGame = () =>{
    score = 0;
    document.querySelector('.start').classList.remove('hide');
    setTimeout(() => {
        document.querySelector('.start').classList.add('hide');
        nextLevel();
    }, 1000);
}

green.onclick = () => click(0);
red.onclick = () =>  click(1);
yellow.onclick = () =>  click(2);
blue.onclick = () => click(3);

playGame();
