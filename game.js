var buttonColors =['red','blue','green','yellow'];

var gamePattern = [];
var userClickedPattern=[];
$("#green").attr("disabled", "disabled");

var gameHasStarted=false;

var level = 0;



$('body').keypress(()=>{
    if(!gameHasStarted){
        refreshLevelDisplay();
        nextSequence();
        gameHasStarted=true;
    }
});


$('.btn').click((e)=>{
    var userChosenColour = $(e.target).attr('id');
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  
});





function nextSequence(){

    level++;
    refreshLevelDisplay();
    var randomNumber = Math.floor(Math.random()*4);
    console.log(randomNumber);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $('#'+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    userClickedPattern=[];
    
}


function playSound(name){
    var sound = new Audio('./sounds/'+name+'.mp3');
    sound.play();
}

function animatePress(currentColour){
    var target=$('.'+currentColour);
    target.addClass('pressed');

    setTimeout(()=>{target.removeClass('pressed')},100);

}

function refreshLevelDisplay(){
    $('h1').text('Level '+level);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        if((gamePattern.length-1)===currentLevel){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
        playSound(userClickedPattern[currentLevel]);
        animatePress(userClickedPattern[currentLevel]);
        console.log('true');
    }else{

        failed();


    }

}

function failed(){
    $('body').addClass('game-over');
    setTimeout(function(){
        $('body').removeClass('game-over');
        
    },200);

    $('h1').text('Game Over, Press Any Key to Restart');
    
    playSound('wrong');
    resetGame();

}

function resetGame(){
        level=[];
        gamePattern=[];
        gameHasStarted=false;
}