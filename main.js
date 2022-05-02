

let computerNum=0; 

let playButton = document.getElementById("play-button");

let userInput = document.getElementById("user-input");

let resultArea = document.getElementById("result-area");

let resetButton = document.getElementById("reset-button");

let chances = 3;

let gameOver = false;

let chanceArea = document.getElementById("chance-area");

let history=[];

playButton.addEventListener("click", play);

resetButton.addEventListener("click", reset);

userInput.addEventListener("focus",function(){userInput.value=""});

function pickRandomNum(){
    computerNum = Math.floor(Math.random() * 100)+1; 
    console.log("정답", computerNum);
}



function play(){
    const userValue = userInput.value; 

    if(userValue<1 || userValue > 100){
        resultArea.textContent="1과 100사이의 숫자를 다시 입력하세요";
        return;
    }


    if(history.includes(userValue)){
        resultArea.textContent="이미 입력한 숫자입니다";
        return;

    }

    chances --; 
    chanceArea.textContent = `남은기회: ${chances}번`;

    history.push(userValue);
    console.log(history);

    if(userValue < computerNum){
        resultArea.textContent = "UP!!!"
    }else if(userValue > computerNum){
        resultArea.textContent = "DOWN!!!"
    }else {
        playButton.disabled = true;
        resultArea.textContent = "정답!!!"
        
    }


    if(chances == 0){
        gameOver=true;
    }

    if(gameOver == true){
        playButton.disabled = true; 
        resultArea.textContent = "실패!!!"
    }

    if(chances > 0){
        gameOver=false;
    }

    if(gameOver == false){
        playButton.disabled = false; 
    }
}



function reset(){
    pickRandomNum() 
    userInput.value=""; 
    gameOver = false;
    playButton.disabled = false;
    chances=3;
    resultArea.textContent="RESET!!!"  
    chanceArea.textContent=`남은 기회:${chances}`;
    history=[]; 
}    
    
pickRandomNum();
