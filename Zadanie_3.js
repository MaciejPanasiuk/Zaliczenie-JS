// 2. EXAM Write a program that will solve simple sudoku (not only the example below!)
// Start
//first we make a example board
//then we look for an empty spot, this should be zero or null since it wont be included in the puzzle, some placeholder thing
//we pick a number that must be valid for 3 conditions/functions
//number cant be already in a row
//number cant be already in a column
//cant be in the 3x3 square
const AvaiableNumbers=[1,2,3,4,5,6,7,8,9]//possible numbers to choose from, we can use it
const NoValue=0;

const exampleBoard=[//9x9 matrix of numbers as values
    [7,0,4,8,0,0,3,0,1],
    [8,2,0,5,0,0,0,4,0],
    [0,0,9,4,3,0,5,0,0],
    [3,1,0,0,0,0,8,0,7],
    [0,8,0,0,0,0,0,1,0],
    [9,0,7,0,0,0,0,3,2],
    [0,0,6,0,1,5,4,0,0],
    [0,7,0,0,0,9,0,6,5],
    [5,0,8,0,0,2,1,0,3]
]
const boardexampletwo = [
    [0, 5, 1, 3, 6, 2, 7, 0, 0],
    [0, 4, 0, 0, 5, 8, 0, 0, 0],
    [0, 0, 0, 4, 0, 0, 0, 2, 5],
    [0, 8, 0, 0, 0, 0, 9, 0, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [7, 0, 5, 0, 0, 0, 0, 8, 0],
    [1, 2, 0, 0, 0, 9, 0, 0, 0],
    [0, 0, 0, 2, 8, 0, 0, 6, 0],
    [0, 0, 8, 5, 3, 4, 2, 9, 0]
];

let stringBoard =`051362700040058000000400025080000903000000000705000080120009000000280060008534290`;
const NumsAsStringsBoard=[
    [`7`,`0`,`4`,`8`,`0`,`0`,`3`,`0`,`1`],
    [`8`,`2`,`0`,`5`,`0`,`0`,`0`,`4`,`0`],
    [`0`,`0`,`9`,`4`,`3`,`0`,`5`,`0`,`0`],
    [`3`,`1`,`0`,`0`,`0`,`0`,`8`,`0`,`7`],
    [`0`,`8`,`0`,`0`,`0`,`0`,`0`,`1`,`0`],
    [`9`,`0`,`7`,`0`,`0`,`0`,`0`,`3`,`2`],
    [`0`,`0`,`6`,`0`,`1`,`5`,`4`,`0`,`0`],
    [`0`,`7`,`0`,`0`,`0`,`9`,`0`,`6`,`5`],
    [`5`,`0`,`8`,`0`,`0`,`2`,`1`,`0`,`3`],
]
//but what if input is a string or has string values? function below
function StringtoNumMatrix(BoardtoSudokify){
    if(typeof BoardtoSudokify===`string`&& BoardtoSudokify.length===81){
        let tempArr=[];
        BoardtoSudokify=Array.from(BoardtoSudokify);
        BoardtoSudokify=BoardtoSudokify.map((currval)=>+currval)
        for(i=0;i<9;i++){
            tempArr[i]=[];
            for(j=0;j<9;j++){
                tempArr[i].push(BoardtoSudokify[j+i*9]);
            }
        }
        BoardtoSudokify=tempArr;
    return BoardtoSudokify;
    }
    else if(Array.isArray(BoardtoSudokify) && typeof BoardtoSudokify[0][0]===`string` && BoardtoSudokify.length===9 && BoardtoSudokify[0].length===9){
        for(k=0;k<9;k++){
            tempArr=BoardtoSudokify[k].map((currval)=>+currval)
            BoardtoSudokify[k]=tempArr;}
            return BoardtoSudokify;
    }
    else{
    return BoardtoSudokify;
    }
}
//checking if our value is in the column
function checkColumns(inputBoard,column,inputnumber){//column=current column, nums=numbers we are trying to find from 1-9
    for(i=0;i<inputBoard[column].length;i++){
        if(inputBoard[i][column]===inputnumber){
            return false//if found duplicate=false
        }
    }
    return true;
}
function checkRows(inputBoard,row,inputnumber){
    for(j=0;j<inputBoard[row].length;j++){
        if(inputBoard[row][j]===inputnumber){
            return false
        }
    }
    return true;
}
function checkGrid(inputBoard,row,column,inputnumber){
    let UpperMostRow=Math.floor(row/3)*3
    let UpperMosColumn=Math.floor(column/3)*3
    for(i=0;i<3;i++){
        for(j=0;j<3;j++){
        if(inputBoard[UpperMostRow+i][UpperMosColumn+j]===inputnumber){
            return false
            }
        }
    }
    return true;
}
function isNumbervalid(inputBoard,row,column,inputnumber){
    if(
    checkColumns(inputBoard,column,inputnumber) &&
    checkRows(inputBoard,row,inputnumber) &&
    checkGrid(inputBoard,row,column,inputnumber)){
        return true;
    }
    return false;        
}
function CurrentEmptySpotIndex(inputBoard){
    for(r=0;r<9;r++){
        for(c=0;c<9;c++){
            if(inputBoard[r][c]===NoValue){
                return [r,c];
                }
            }
        }
        return [-1,-1];
}
function solveSudoku(inputBoard){

    let CurrentEmptySpot=CurrentEmptySpotIndex(inputBoard);
    let row=CurrentEmptySpot[0];
    let column=CurrentEmptySpot[1];
    //base case,when we have our result
    if (row=== -1){
        return inputBoard;
    }
    //recursive part
    for(let index=0; index<9; index++){
        if (isNumbervalid(inputBoard,row,column,AvaiableNumbers[index])){
            inputBoard[row][column] = AvaiableNumbers[index];
            solveSudoku(inputBoard);
        }
    }
    //backtracking 
    let NextEmptySpot=CurrentEmptySpotIndex(inputBoard)
    if(NextEmptySpot[0] !== -1){//this will check if we ran out of fitting numbers( but still have empty spaces) 
        inputBoard[row][column]=0;//if so, put 0 on our last spot, that way we backtrack and try a different value for the now empty spot
    }
    return inputBoard;

}
StringtoNumMatrix(exampleBoard);
solveSudoku(exampleBoard);
StringtoNumMatrix(boardexampletwo);
solveSudoku(boardexampletwo);
stringBoard=StringtoNumMatrix(stringBoard);
solveSudoku(stringBoard);
StringtoNumMatrix(NumsAsStringsBoard);
solveSudoku(NumsAsStringsBoard);
console.log(exampleBoard);
console.log(boardexampletwo);
console.log(stringBoard);
console.log(NumsAsStringsBoard);
console.log(`boardexample`)



