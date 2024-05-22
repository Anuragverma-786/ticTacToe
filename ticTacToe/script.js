//STEP 1  SBKUCH FETCH KRLO JO CHAHIYE  LINE 2 TO 20

const boxes = document.querySelectorAll(".box");
const gameInfo= document.querySelector(".game-info");
const newGameBtn= document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions=[

    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
];

//STEP 2   EK JAGAH STORE KR LIYA THEN NEW GAME BUTTON KO HATAYA GAME INFO M TEXT CHANGE  LINE 23 TO 25 AND 33TO 37 
function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];

    boxes.forEach((box,index) => {
      box.innerText="";
      boxes[index].style.pointerEvents="All";//BOX EMPTY HO USPE ARROW NHI HAND DIKHAYE
      box.classList = `box box${index+1}`;//COLOR HAT JAYE EK GAME K BAAD

    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `CurrentPlayer - ${currentPlayer}`;

}
  initGame();

//STEP 6  MOST IMPORTANT STEP CDECIDE WINNER  HR POSITION PE JAKE CHECK KIYA IF TINO EQUAL WINNER AND GREE COLOR BHI KR DIYA
  function checkGameover(){

    let ans="";

    winningPositions.forEach((Positions) => {
      if((gameGrid[Positions[0]]!=="" || gameGrid[Positions[1]]!==""  || gameGrid[Positions[2]]!=="") &&(gameGrid[Positions[0]]===gameGrid[Positions[1]] && gameGrid[Positions[1]]===gameGrid[Positions[2]])){

        if(gameGrid[Positions[0]]==="X"){
          ans="X";
        }
        else{
          ans="O";
        }

        boxes.forEach((box) => {
          box.style.pointerEvents="none";
        })

        boxes[Positions[0]].classList.add("win");
        boxes[Positions[1]].classList.add("win");
        boxes[Positions[2]].classList.add("win");


      }
    })

    if(ans!==""){
      gameInfo.innerText= `Winner is ${ans}`;
      newGameBtn.classList.add("active"); 
      return;
    }

  //STEP 6 KA HI PART   CHECK KRO GAME TIED TO NHI
    let fillCount=0;
    
    gameGrid.forEach((index) => {
      if(index!==""){
        fillCount++;
      }
    })

    if(fillCount===9){
      gameInfo.innerText= `Game tied!!!`;
      newGameBtn.classList.add("active");
    }
  }
//STEP 5 JUST SWAP KIYA BS JISKA CHANCE USKO SHOW KIYA
  function swapTurn(){
    if(currentPlayer==="X"){
      currentPlayer="O";

    }
    else{
      currentPlayer="X";
    }

    gameInfo.innerText= `CurrentPlayer - ${currentPlayer}`;
  }
//STEP 4  CLICK KRNE PE KYA HOGA VO YHA LOGIC LAGAYA  HAR CLICK PE SWAP KIYA NAD CHECK BHI KIYA JEET TO NHI GYE LINE 97 TO 108
  function handleClick(index){

    if(gameGrid[index]===""){
      boxes[index].innerText=currentPlayer;
      gameGrid[index]= currentPlayer;
      boxes[index].style.pointerEvents = "none";

      swapTurn();
      checkGameover();
    }
  }

  //STEP 3  HAR  BOX CLICK KR SKE EVENT LISTNER LAGAYA  LINE 110  TO 118 

  boxes.forEach((box,index) => {

    box.addEventListener("click" ,() =>{
        handleClick(index);
    })
    
  });

  newGameBtn.addEventListener("click",initGame);//NEW GAME PE CLICK KRTE HI INIT KO CALL KR DE BS


  