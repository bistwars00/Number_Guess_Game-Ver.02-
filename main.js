//랜덤번호 지정
//유저가 번호를 입력한다. 그리고 go라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호가 < 유저번호 Down
//랜덤번호가 > 유저번호 UR
//Reset버튼을 누르면 게임이 리셋됨
//5번의 기회를 다쓰면 게임이 끝남(더이상 추측 불가, 버튼이 disable)
//유저가 1~100 범위 밖의 숫자를 입력하면 알려줌. 기회를 깎지 않음
//유저가 이미 입력한 숫자를 또 입력하면 알려줌. 기회를 깎지 않음


let computerNum=0; //정답 랜덤번호를 저장해둘 변수

let playButton = document.getElementById("play-button");
//document는 해당 html 자체를 의미함 
//html의 play-button이라는 id를 해당 html에서 불러오겠단 뜻 
//let playButton에 불러온 데이터를 저장하고, 변수를 선언해서, 아래에서 해당 변수를 이용해 기능을 넣어주려고 함 

let userInput = document.getElementById("user-input");
//입력받은 유저의 숫자 정보를 이용해, 정답과 비교하기 위해서 변수를 선언함

let resultArea = document.getElementById("result-area");
//결과 메세지를 출력하는 html 구역(div)에, function play의 결과 메세지를 반영하기위해 변수 선언

let resetButton = document.getElementById("reset-button");
let chances = 3;
//도전 기회수를 저장할 변수 선언 
let gameOver = false;

let chanceArea = document.getElementById("chance-area");
//남은 기회를 화면에 출력하기위해 만든 변수

let history=[];
//중복 숫자 입력시 에러 메시지 출력하기위해, 숫자 입력 히스토리 저장소의 변수 만듬



playButton.addEventListener("click", play);
// 해당 버튼에 클릭 이벤트를 발생시키고, 발생 시, play 함수가 동작함
resetButton.addEventListener("click", reset);
// 리셋 이벤트
userInput.addEventListener("focus",function(){userInput.value=""});
// 숫자 입력창에, 다시 포커스하면 입력창의 입력된 숫자 자동으로 지워짐
// function을 따로 밑에 만들지 않고, 익명의 함수로써, 바로 괄호안에 넣어줌(한번만 쓸것이기 때문에)


function pickRandomNum(){
    computerNum = Math.floor(Math.random() * 100)+1; //math.floor=소수점 버리기 
    console.log("정답", computerNum);
}



function play(){
    const userValue = userInput.value; 
    //유저가 입력한 숫자값을 대입하여, 콘솔창에서 인식할 수 있게함
    //해당 변수를 이용하여, 정답과 크기 비교를 하기위해서 만듬


    if(userValue<1 || userValue > 100){
        resultArea.textContent="1과 100사이의 숫자를 다시 입력하세요";
        return;
    }


    if(history.includes(userValue)){
        resultArea.textContent="이미 입력한 숫자입니다";
        return;

    }

    chances --; //플레이시마다 기회가 -1씩 줄어들게함
    chanceArea.textContent = `남은기회: ${chances}번`;
    //남은 기회를 출력함

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
        playButton.disabled = true; //정답 제출 버튼을 이용 못하게 만듬 
        resultArea.textContent = "실패!!!"
    }

    if(chances > 0){
        gameOver=false;
    }

    if(gameOver == false){
        playButton.disabled = false; //리셋 클릭시, 정답 제출버튼 다시 호출 가능하게 만들기위해서 설정
    }
}



function reset(){
    pickRandomNum() //랜덤 정답 숫자 함수를 자동으로 재호출
    userInput.value="" //userInput창이 깨끗하게 정리됨
    gameOver = false;
    playButton.disabled = false;
    chances=3;//도전 기회 초기화
    resultArea.textContent="RESET!!!"  
    chanceArea.textContent=`남은 기회:${chances}`;
    history=[]; //리셋 후, 기존 중복값 초기화 설정
}    
    
pickRandomNum();