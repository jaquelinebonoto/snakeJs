let canvas = document.getElementById("snake")
let context = canvas.getContext("2d")
let box = 32
let snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right"

//criando valor aleatorio para inicializar comida
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, 
    y: Math.floor(Math.random() * 15 + 1) * box
}

//função para criar plano de fundo
function criarBG(){
    context.fillStyle = "lightblue"
    context.fillRect(0, 0, 16 * box, 16 * box)
}

//função para criar a cobra
function criarSnake(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "blue"
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function drawFood(){
    context.fillStyle = "red"
    context.fillRect(food.x, food.y, box, box)
}

document.addEventListener("keydown", update)

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left"
    if(event.keyCode == 38 && direction != "down") direction = "up"
    if(event.keyCode == 39 && direction != "left") direction = "right"
    if(event.keyCode == 40 && direction != "up") direction = "down"
}

function iniciarJogo(){

    //condicionais para a cobra poder atravessar a tela dp jogo
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0
    if(snake[0].x < 0 * box && direction == "left") snake[0].x = 16 * box
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0
    if(snake[0].y < 0 * box && direction == "up") snake[0].y = 16 * box

    //verificação para ver se a cabeça da cobra está colidindo com seu corpo e finalizar jogo
    for(i=1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo)
            alert("Fim de jogo")
        }
    }

    //inicializando fundo, cobra e comida
    criarBG()
    criarSnake()
    drawFood()

    //incializando posições 2d
    let snakeX = snake[0].x
    let snakeY = snake[0].y

    //fazendo ela movimentar de acordo com a direção aumenta ou diminui de acordo com o grafico a posição zero que é a cabeça
    if(direction == "right") snakeX += box
    if(direction == "left") snakeX -= box
    if(direction == "up") snakeY -= box
    if(direction == "down") snakeY += box

    //se a posição da cabeça for diferente da posição da comida, retirar a ultima posição do vetor (pop)
    //mas se a posição for igual criar nova posição para a comida 
    if(snakeX != food.x || snakeY != food.y){
        snake.pop()    
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box 
        food.y = Math.floor(Math.random() * 15 + 1) * box        
    }

    
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //criar sempre nova posição para a cabeça. unshift adiciona elemento no inicio do array
    snake.unshift(newHead)
}

let jogo = setInterval(iniciarJogo, 100)