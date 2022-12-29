//EXAM Scale riddle. With 8 balls, ex. [1,2,1,1,1,1,1,1] 
//get position of the “heavy” ball. Indexes are to be chosen at random. 
//Use weights comparison only two times.
const Balls=[1,1,1,1,1,2,1,1];
const BallsWithIndex=[]//now it has also indexes!
for(const[index,element] of Balls.entries()){
    BallsWithIndex.push([index,element]);
}
function Randompick(Ballpool,howmanypicks){
    let Ballreservoir=Ballpool;
    let Pickedballs=[];
    for(i=0; i<howmanypicks; i++){
    let randomnum=Math.floor(Math.random() * (Ballpool.length-i));
    Pickedballs.push(Ballreservoir[randomnum]);
    Ballreservoir.splice(randomnum,1);
    }
    const result=[Pickedballs,Ballreservoir]//it will return an array of 2 arrays, the picked balls[0] and whats left from the given array [1]
return result;
}
function sum(WeightingBalls){
    let result=WeightingBalls.reduce((accumulator,currentval)=>accumulator+currentval[1],0) 
    return result;
}
function SecondWeighting(arrayofBalls){//operating on the array of 3 that are randomly picked and weighted, returns the result
    let FirstPick=Randompick(arrayofBalls,1);
    let FirstPickedBall=FirstPick[0].flat();//we use flat so that we get rid of arr nested within arr, otherwise indexing it will be a headache
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
let FirstPick=Randompick(BallsWithIndex,3);
let FirstThreeBalls = FirstPick[0];
let Rest=FirstPick[1];
let SecondPick=Randompick(Rest,3);
let SecondThreeBalls = SecondPick[0];
Rest=SecondPick[1];
console.log(FirstThreeBalls);
console.log(SecondThreeBalls);
console.log(Rest);
console.log(`FIRST WEIGHTING, Comparing the weight of 1st two picked groups of three balls`);
if(sum(FirstThreeBalls)===sum(SecondThreeBalls)){
    console.log('The heavier ball is not within 2 groups of 3 balls')
    console.log('SECOND WEIGHTING: Between 2 remaining balls')
    if (Rest[0][1]>Rest[1][1]){
        console.log(`FOUND:1st ball is the heavier one, original position: ${Rest[0][0]+1}`)
    }
    else{
        console.log(`FOUND:2nd ball is the heavier one, original position: ${Rest[1][0]+1}`)
    }
}
else if(sum(FirstThreeBalls)>sum(SecondThreeBalls)){
    console.log('The heavier ball is in the first picked group') 
    console.log('SECOND WEIGHTING, comparing the weight of 2 first balls in that group ')
    SecondWeighting(FirstThreeBalls)
}
else if(sum(FirstThreeBalls)<sum(SecondThreeBalls)){
    console.log('The heavier ball is in the second picked group')
    console.log('SECOND WEIGHTING, comparing the weight of 2 first balls in that group ')
    SecondWeighting(SecondThreeBalls)
}
