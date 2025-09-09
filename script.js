let colors = ["green", "red", "yellow", "blue"];
let sound = {
    green: new Audio("sounds/green.mp3"),
    red: new Audio("sounds/red.mp3"),
    yellow: new Audio("sounds/yellow.mp3"),
    blue: new Audio("sounds/blue.mp3"),
    wrong: new Audio("sounds/wrong.mp3")
};

let level = 0;
let started = false;
let pattern = [];
let playedPattern = [];

document.addEventListener("keydown", function() {
    if (!started) {
        document.querySelector("#level-title").innerHTML = "Level " + level;
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    playedPattern = [];
    level++;
    document.querySelector("#level-title").innerHTML = "Level " + level;
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    pattern.push(randomColor);
    playSound(randomColor);
    animatePress(randomColor);
}

function playSound(color) {
    sound[color].play();
}

function animatePress(color) {
    let btn = document.querySelector("#" + color);
    btn.classList.add("pressed");
    setTimeout(() => btn.classList.remove("pressed"), 100);
}


colors.forEach(color => {
    document.querySelector("#" + color).addEventListener("click", function() {
        playedPattern.push(color);
        playSound(color);
        animatePress(color);
        checkAnswer(playedPattern.length - 1);
    });
});

function checkAnswer(currentIndex) {
    if (playedPattern[currentIndex] === pattern[currentIndex]) {
        if (playedPattern.length === pattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        sound.wrong.play();
        document.querySelector("#level-title").innerHTML = "Game Over, Press Any Key to Restart";
        document.body.classList.add("game-over");
        setTimeout(() => document.body.classList.remove("game-over"), 200);
        startOver();
    }
}

function startOver() {
    level = 0;
    pattern = [];
    started = false;
}

