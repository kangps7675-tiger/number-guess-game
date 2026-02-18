// 랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go라는 버튼을 누른다
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다! 라고 알려준다
// 랜덤번호가 유저가 입력한 번호보다 낮으면, 너무 높아요 라고 알려준다
// 랜덤번호가 유저가 입력한 번호보다 높으면, 너무 낮아요 라고 알려준다
// reset 버튼을 누르면 게임이 리셋된다
// 5번의 기회를 다 쓰면 게임이 끝난다 (더 이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깎지 않는다

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chancesArea = document.getElementById("chances-area");
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function(){
    userInput.value = "";
});

function pickRandomNum() {
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답", computerNum)
}

userInput.addEventListener("keydown", function (event) {
  // 눌린 키가 'Enter'인지 확인
  if (event.key === "Enter") {
    // 'Enter'라면 play 함수를 실행!
    play();
    // (선택사항) 입력창을 비워주면 다음 입력을 하기 편해요.
    userInput.value = ""; 
  }
});

function play() {
    let userValue = userInput.value;
    
    if (userValue < 1 || userValue > 100) {
        resultArea.textContent = "1과 100 사이의 숫자를 입력해주세요.";
        return;
    }

    if(history.includes(Number(userValue))) {
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.";
        return;
    }
    chances--;
    chancesArea.textContent = `남은 찬스 : ${chances}`;
    console.log("남은 기회", chances);

    console.log(userValue);
    if (userValue < computerNum) {
        resultArea.innerHTML = "UP!!!<span class='hint'>정답: ${computerNum}</span>";
        console.log("UP!!!");
    }else if (userValue > computerNum) {
        resultArea.innerHTML = "DOWN!!!<span class='hint'>정답: ${computerNum}</span>";
    }else {
        resultArea.innerHTML = "정답입니다!<span class='hint'>정답: ${computerNum}</span>";
        gameOver = true;
    }

    history.push(Number(userValue));
    console.log(history);

    if (chances < 1) {
        gameOver = true;
    }
    if (gameOver == true) {
        playButton.disabled = true;
    }
}

function reset() {
    // 입력창이 깨끗이 정리되고
    userInput.value = "";
    // 새로운 번호가 생성되고
    pickRandomNum();
    // 결과창이 초기화된다
    resultArea.textContent = "과연 결과가 뭘까??";
    // 기회 초기화
    chances = 5;
    chancesArea.textContent = `남은 찬스 : ${chances}`;
    // 게임 상태 초기화
    gameOver = false;
    // 버튼 활성화
    playButton.disabled = false;
    // 입력 기록 초기화
    history = [];
}
pickRandomNum()

