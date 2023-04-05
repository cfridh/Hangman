const startGameBtn = document.querySelector("#startGameBtn");
const ordet = document.getElementById('ord');
const felbokstav = document.getElementById('felbokstav');
const spelaigen = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const information = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

// knapparna
const letterButtons = document.querySelectorAll('#letterButtons');


// kropps delarna
const kroppen = document.querySelectorAll('.gubbe');

// orden som finns i spelet
const words = ['sommar', 'soffa', 'vinter', 'programmering'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctbokstav = [];
const wrongbokstav = [];

//ClickEvent Startar spelet
startGameBtn.addEventListener("click", onStartGame);

//StartGame callback function
function onStartGame() {
    visaord();
}

// tar fram tomma rader som användaren kan gissa ordet med
function visaord() {
    ordet.innerHTML = `
    ${selectedWord
            .split('')
            .map(
                bokstaver => `
          <span class="bokstav">
            ${correctbokstav.includes(bokstaver) ? bokstaver : ''}
          </span>
        `
            )
            .join('')}
  `;

    const innerWord = ordet.innerText.replace(/\n/g, '');

    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Grattis! du vann!';
        popup.style.display = 'flex';
    }
}

// visar felbokstäver funktion
function updatefelbokstav() {
    // Visar fel bokstäver
    felbokstav.innerHTML = `
    ${wrongbokstav.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongbokstav.map(bokstaver => `<span>${bokstaver}</span>`)}
  `;

    // Kropps delar
    kroppen.forEach((part, index) => {
        const errors = wrongbokstav.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // Tittar om man förlorar
    if (wrongbokstav.length === kroppen.length) {
        finalMessage.innerText = 'Du förlora. Testa igen!';
        popup.style.display = 'flex';
    }
}

// visar meddelande
function showinformation() {
    information.classList.add('show');

    setTimeout(() => {
        information.classList.remove('show');
    }, 2500);
}

// Lyssnar av användaren använder tangetbordet
window.addEventListener('keydown', e => {

    if (e.key.match(/[a-z]/i) || e.key == "å" || e.key == "ä" || e.key == "ö") {
        const bokstaver = e.key;

        if (selectedWord.includes(bokstaver)) {
            if (!correctbokstav.includes(bokstaver)) {
                correctbokstav.push(bokstaver);

                visaord();
            } else {
                showinformation();
            }
        } else {
            if (!wrongbokstav.includes(bokstaver)) {
                wrongbokstav.push(bokstaver);

                updatefelbokstav();
            } else {
                showinformation();
            }
        }
    }
});

// Börja om spelet
spelaigen.addEventListener('click', () => {
    correctbokstav.splice(0);
    wrongbokstav.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    visaord();

    updatefelbokstav();

    popup.style.display = 'none';
});


