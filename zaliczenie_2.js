// EXAM Create a solution that will tell us what poker set we have.
//  The solution is to deal us 5 cards from the standard 52 card deck at random.
//   Based on cards on our hand the program should tell us what is the best poker set.
//    Reference: https://pl.wikipedia.org/wiki/Poker#Starsze%C5%84stwo_uk%C5%82ad%C3%B3w_kart
//TODO
//1. make a object that will hold our cards, or 2 arrays whose 1st value is number and other is color
// 1.1 should have numerical values for all the types (13) DONE
// 1.2 should also hold a value of color (4) DONE
//2 make a functiomn that randomly picks 5 cards ( with repeat) DONE
//2.1 for start it should save it in an array DONE
//MIGHT NEED TO CHANGE THE THE VALS AND COLORS FROM STRINGS INTO NUMBER EQUIVALENT SO IT WOULD BE EASIER TO WORK WITH FUNCTIONS
//then we make functions for all the possible combinations in poker
//run our functions that check if they are true for our 5 cards
//if its true for multiple functions, we will compere which is better
const CardValues=[2,3,4,5,6,7,8,9,10,11,12,13,14];//11-Jack, 12-Queen, 13-King, 14-Ace
const CardColors=['Hearts','Diamonds','Clubs','Spades'];
function getRandomFromArr(Array) {
    return Math.floor(Math.random() * Array.length);
  }
function CardPicker(HowManyCards){
let result=[];
     i=0;
     while(i<HowManyCards){
     let Card=[];
    Card.push(CardValues[getRandomFromArr(CardValues)],CardColors[getRandomFromArr(CardColors)])   
    const DoesCardexists=result.findIndex(element=>element[0]===Card[0] && element[1]===Card[1])>-1; 
        if(!DoesCardexists){//for checking for doubles, only push if our hand doesnt have such card(unless we cheat)
            result.push(Card)
            i++;}
 }
 result=result.sort((a,b)=>a[0]-b[0]);//ascending order
 return result;//our hand has nested arrays-cards that hold its value[0] and color[1]
 }
function NumbersToNames(CardVal){
    if (CardVal>10 && CardVal<15){
        switch(CardVal){
        case 11:
            return 'Jack';       
        case 12:
            return 'Queen';
        case 13:
            return 'King';
        case 14:
            return 'Ace';
        }
    }
    else{
        return CardVal;
    }
}
function  DisplayHand(CurrentHand){
    for(i=0;i<CurrentHand.length;i++){
        console.log(`${NumbersToNames(CurrentHand[i][0])} of ${CurrentHand[i][1]}`)
    }
}
function RemoveCardValFromHand(CardArr,CardVal){//this solves the problem of doubling cards, and we use it a whole lot
    return CardArr.filter((ele)=>ele[0]!=CardVal);
}

function FindPairsTriplesQuadFulls(ourHand){//its easier to do it in one function cus the variables we get her are all connected
    let MutableHand=ourHand;
    let PairContainer=[];//under 0 we will hold value of the 1st pair, and under 1 value of the 2nd pair
    let ThreesContainer;
    let QuadContainer;
    for(i=0;i<MutableHand.length;i++){
       let SameCardValCont=MutableHand.filter((currentval)=>currentval[0]===MutableHand[i][0])
       if(SameCardValCont.length===2){//checking for pairs
            PairContainer.push(MutableHand[i][0]);
            MutableHand=RemoveCardValFromHand(MutableHand,MutableHand[i][0]);         
        }
    else if(SameCardValCont.length===3){//checks for triple
    ThreesContainer=MutableHand[i][0];
    MutableHand=RemoveCardValFromHand(MutableHand,ThreesContainer);
    } 
    else if(SameCardValCont.length===4){//checks for quad
        QuadContainer=MutableHand[i][0];
        MutableHand=RemoveCardValFromHand(MutableHand,MutableHand[i][0]);
       } 
 }
    if(PairContainer.length===1 && ThreesContainer==null){
        console.log(`Hand contains a pair of ${NumbersToNames(PairContainer[0])}s`);
    }
    else if(PairContainer.length===2 && ThreesContainer==null){
        console.log(`Hand contains 2 pairs of ${NumbersToNames(PairContainer[0])}s and ${NumbersToNames(PairContainer[1])}s`);
    }
    else if(PairContainer.length===0 && ThreesContainer>0){
        console.log(`Hand contains a Three of a kind of ${NumbersToNames(ThreesContainer)}s`);
         }
    else if(PairContainer.length===1 && ThreesContainer>0){
        console.log(`Hand contains a full: a pair of ${NumbersToNames(PairContainer[0])}s and Three of a kind of ${NumbersToNames(ThreesContainer)}s`);
         }
    else if(QuadContainer>0){
        console.log(`Hand contains a Quad of ${NumbersToNames(QuadContainer)}s`);
        }
    else if (PairContainer.length==0 && ThreesContainer==null && QuadContainer==null){
        ourHand=SortbyHighest(ourHand)
        console.log(`Hand doesnt have any valuable combinations.In that case the High Card wins, Current highest card in our hand is a: `+NumbersToNames(ourHand[0][0])+' of '+ourHand[0][1])
        console.log(`If other players also has it we compare our next highest.`)
        // DisplayHand(ourHand);
    }

}
function IsFlush(InputHand){//checks if all colors in our hand are the same
    let SameColor=InputHand.filter((currelement)=>currelement[1]===InputHand[0][1])
    if(SameColor.length===InputHand.length){
        return true;
    }
}
function Straight (InputHand){//checks if cards are in ascending order ( by 1)
    let NeighbouringCardsCount=0;
    for(i=1; i<InputHand.length; i++){
        if (InputHand[i][0]-InputHand[i-1][0] === 1){
        NeighbouringCardsCount++;
}}
        if (NeighbouringCardsCount==InputHand.length-1){
        return true;
    }
}
function RoyalFlush(InputHand){//conditions: between 10 and Ace, Straight, and Flush
   let HigherValues=InputHand.filter((CurrentCard)=>CurrentCard[0]>=10 && CurrentCard[0]<=14)
   if(IsFlush(InputHand) && Straight(InputHand) && HigherValues.length===InputHand.length)
   return true;
}
function SortbyHighest(InputHand){
    return InputHand.sort((a,b)=>b[0]-a[0]);
}

function HighValueResults(InputHand){
    if(IsFlush(InputHand) && !Straight(InputHand)){
        console.log(`Its a Flush of ${InputHand[0][1]}`)
    }
    else if(Straight(InputHand) && !IsFlush(InputHand)){
        console.log(`Its a Straight`)
    }
    else if(Straight(InputHand) && IsFlush(InputHand) && !RoyalFlush(InputHand)){//STRAIGHT FLUSH
        console.log(`Its a Straight Flush of ${InputHand[0][1]}`)
    }
    else if(RoyalFlush(InputHand)){//ROYAL FLUSH
        console.log(`Its a Royal Flush of ${InputHand[0][1]}`)
    }
}
console.log('We start by picking 5 cards'+'\n')
let Hand=CardPicker(5);
console.log('on our hand we currently have:'+'\n')
DisplayHand(Hand);
console.log(``)
//console.log(Hand[0],Hand[1],Hand[2],Hand[3],Hand[4]);
HighValueResults(Hand)
if(!Straight(Hand) && !IsFlush(Hand) && !RoyalFlush(Hand)){
    return FindPairsTriplesQuadFulls(Hand)
}