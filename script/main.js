import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = 'AIzaSyCm6EZCxuOKLnO_2WBwED9n9qMwA8qRr1Y';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
let name = document.getElementById('nameInput')
let question = document.getElementById('questionInput')
let callCount = 0;
let firstJumpscare = true;
let jumpscareVideo = document.getElementById('jumpscareVideo')
let jumpscareVideoDiv = document.getElementById('jumpscareVideoDiv')
let jumpscareSound = new Audio("https://github.com/rd-varela/averno/blob/main/sound/jumpscare.mp3?raw=true")

document.getElementById('pentagram').addEventListener('click', ask)


async function ask() {
    let pText = document.getElementById('response');
    pText.textContent = "";
    const prompt = "Contestame la siguiente pregunta como si fueras un espiritu. En primera persona, en estilo paranormal y serio, sin chistes, de manera breve y misteriosa sin elementos de narracion, con un acento argentino de Buenos Aires. Sos el espiritu de " + name.value + " y la pregunta es la siguiente: " + question.value
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    pText.classList.remove('fade-in');
    void pText.offsetWidth;
    pText.classList.add('fade-in');

    function scrambleText(text) {
        let scrambledText = '';
        const chars = text.split('');

        // Shuffle the characters randomly
        while (chars.length) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            scrambledText += chars[randomIndex];
            chars.splice(randomIndex, 1);
        }

        return scrambledText;
    }

    let scrambledText = scrambleText(text);

     // Scramble the text three times
     for (let i = 0; i < 17; i++) {
        let scrambledText = scrambleText(text);
        pText.textContent = scrambledText;

        // Wait a short time before scrambling again (optional)
        await new Promise(resolve => setTimeout(resolve, 200)); // Adjust timing if needed
    }

    //pText.classList.remove('fade-in');
    //pText.textContent = text;
    pText.textContent = scrambledText;
    //void pText.offsetWidth;
    //pText.classList.add('fade-in');

    // Wait for animation to complete (1s delay as defined in CSS)
    await new Promise(resolve => setTimeout(resolve, 100));

    // After animation, set the correct text
    pText.textContent = text;

    callCount++;

    if (firstJumpscare && callCount === 3) {
        jumpscare();
        firstJumpscare = false;
    } else if (!firstJumpscare && callCount % 2 === 0 && Math.random() < 0.1) {
        jumpscare();
    }
}

/*function scrambleText(text) {
    let scrambledText = '';
    const chars = text.split('');

    // Shuffle the characters randomly
    while (chars.length) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        scrambledText += chars[randomIndex];
        chars.splice(randomIndex, 1);
    }

    return scrambledText;
}*/

function jumpscare(){
    jumpscareVideoDiv.style.display = 'flex';
    jumpscareVideoDiv.style.visibility = 'visible';
    jumpscareVideo.style.display = 'flex';
    jumpscareVideo.currentTime = 0;
    jumpscareVideo.play();
    setTimeout(() => {
        jumpscareVideo.style.display = 'none';
        jumpscareVideoDiv.style.visibility = 'hidden';
        jumpscareVideoDiv.style.display = 'none';
    }, 1000);
    jumpscareSound.play();
}