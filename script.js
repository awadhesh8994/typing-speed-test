const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".wrapper .input-field");
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector("button");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charindex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
    const paragraph = [
        "Avoid daydreaming about the years to come.",
        "You are the most important person in your whole life.",
        "Always be true to who you are, and ignore what other people have to say about you.",
        "Only demonstrate your strength when it’s really required.",
        "Subscribe to Drop X Out"
    ];
    const randomIndex = Math.floor(Math.random() * paragraph.length);
    typingText.innerHTML = "";
    for (const char of paragraph[randomIndex]) {
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');

    document.addEventListener('keydown', () => input.focus());
    typingText.addEventListener("click", () => {
        input.focus();
    });
}

function initTyping() {
    const char = typingText.querySelectorAll('span');
    const typedchar = input.value.charAt(charindex);

    if (charindex < char.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }

        // Check if the typed character matches the current character
        if (char[charindex].innerText === typedchar) {
            char[charindex].classList.add('correct');
        } else {
            mistake++;
            char[charindex].classList.add('incorrect');
        }

        // Move to the next character
        char[charindex].classList.remove('active');
        charindex++;

        if (charindex < char.length) {
            char[charindex].classList.add('active');
        }

        // Update mistakes and CPM
        mistakes.innerText = mistake;
        cpm.innerText = charindex - mistake;
    } else {
        clearInterval(timer);
        input.value = "";
    }
}

function initTime() {
    if (timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;
        let wpmVal = Math.round(((charindex - mistake) / 5) / (maxTime - timeLeft));
        wpm.innerText = wpmVal;
    } else {
        clearInterval(timer);
    }
}

input.addEventListener("input", initTyping);
btn.addEventListener("click", reset);

function reset() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charindex = 0;
    mistake = 0;
    isTyping = false;
    time.innerText = timeLeft;
    mistakes.innerText = mistake;
    wpm.innerText = 0;
    cpm.innerText = 0;
    input.value = "";
}

loadParagraph();