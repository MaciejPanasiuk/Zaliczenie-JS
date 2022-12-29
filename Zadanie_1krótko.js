//EXAM Scale riddle. With 8 balls, ex. [1,2,1,1,1,1,1,1] 
//get position of the “heavy” ball. Indexes are to be chosen at random. 
//Use weights comparison only two times.
const Balls=[1,1,1,1,2,1,1,1];
const BallsWithIndex=[]
for(const[index,element] of Balls.entries()){
    BallsWithIndex.push([index,element]);//under [0] it holds the index/key, under [1] we get the weight of the ball/value
}
function Randompick(Ballpool,howmanypicks){
    let BallsLeft=Ballpool;
    let Pickedballs=[];//balls picked will be saved in an array
    for(i=0; i<howmanypicks; i++){
    let randomnum=Math.floor(Math.random() * (Ballpool.length-i));
    Pickedballs.push(BallsLeft[randomnum]);
    BallsLeft.splice(randomnum,1);
    }
    const result=[Pickedballs,BallsLeft]//it will return an array of 2 arrays, the picked balls[0] and whats left from the given array [1]
return result;
}
function SummaryWeight(WeightingBalls){
    let result=WeightingBalls.reduce((accumulator,currentval)=>accumulator+currentval[1],0) 
    return result;
}
function SecondWeighting(arrayofBalls){
    let FirstPick=Randompick(arrayofBalls,1);
    let FirstPickedBall=FirstPick[0].flat();//we use flat so that we get rid of arr nested within arr
    let RemainingBall=FirstPick[1];
    let SecondPick=Randompick(RemainingBall,1);
    let SecondPickedBall=SecondPick[0].flat();
    RemainingBall=SecondPick[1].flat();
    if(FirstPickedBall[1]>SecondPickedBall[1]){
        console.log(`After 2 weightings, ball nr.${FirstPickedBall[0]+1} is the heavier one`)
    }
    else if(FirstPickedBall[1]<SecondPickedBall[1]){
        console.log(`After 2 weightings, ball nr.${SecondPickedBall[0]+1} is the heavier one`)
    }
    else {
        console.log(`After 2 weightings, ball nr.${RemainingBall[0]+1} is the heavier one`)
    }
}
//HERE STARTS OUR FINAL RESULT/FUNCTION INITIALISING
let FirstPick=Randompick(BallsWithIndex,3);
let FirstWeightScale = FirstPick[0];
let Rest=FirstPick[1];
let SecondPick=Randompick(Rest,3);
let SecondWeightScale = SecondPick[0];
Rest=SecondPick[1];//holds 2 balls thats left
// console.log(FirstWeightScale);
// console.log(SecondWeightScale);
// console.log(Rest[0]);
if(SummaryWeight(FirstWeightScale)===SummaryWeight(SecondWeightScale)){
    if (Rest[0][1]>Rest[1][1]){//We basicaly have only 2 balls left so the second weighting is just comparing 2 balls under index 0 and 1
        console.log(`After 2 weightings, ball nr.${Rest[0][0]+1} is the heavier one`)
    }
    else{
        console.log(`After 2 weightings, ball nr.${Rest[1][0]+1} is the heavier one`)
    }
}
else if(SummaryWeight(FirstWeightScale)>SummaryWeight(SecondWeightScale)){
    SecondWeighting(FirstWeightScale)
}
else if(SummaryWeight(FirstWeightScale)<SummaryWeight(SecondWeightScale)){
    SecondWeighting(SecondWeightScale)
}
// console.log(`a`)