 /*DOM elements*/
        /* var & const*/
        const names = [
            "bambalasta",
            "minicooper",
            "mercedes",
            "hareyban",
            "mustang",
            "hummer",
            "lexus",
            "peugeot",
            "renault",
            "wolsvagen",
            "chevrolet",
            "crysler",
            "tesla",
            "infinity",
            "mistsubishi",
            "honda",
            "toyota"
        ]
        var answer = '';
        var maxWrong = 6;
        var mistakes = 0;
        let guessed = [];
        let wordStatus = null;

        /* function*/
        function randomWord() {
            answer = names[Math.floor(Math.random() * names.length)];

        };

        function generateButtons() {
            var buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => `
            <button 
                class="btn btn-lg btn-secondary m-2"
                id='` + letter + `'
                onclick="handleGuess('` + letter + `')"
            >
            ` + letter + `
            </button>
            `).join('');
            document.getElementById('keyword').innerHTML = buttonsHTML;
        }

        function handleGuess(chosenLetter) {
            console.log(chosenLetter.key)
            guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
            document.getElementById(chosenLetter).setAttribute('disabled', true);
            if (answer.indexOf(chosenLetter) >= 0) {
                guessedWord();
                checkIfGameWon();
            } else if (answer.indexOf(chosenLetter) === -1) {
                mistakes++;
                updadeMistakes();
                checkIfGameLost();
                updateHangManPicture();
            }
        }

        function updateHangManPicture() {
            document.getElementById('hangManPic').src = './hangImage/' + mistakes + '.png'
        }

        function checkIfGameWon() {
            if (wordStatus === answer) {
                 document.getElementById('keyword').innerHTML ="";
                document.querySelector('.result').innerHTML = 'bravo!'
            }
        }

        function checkIfGameLost() {
            if (mistakes === maxWrong) {
                 document.getElementById('keyword').innerHTML ="";
                document.querySelector('.lettres').innerHTML = 'the word is ' + answer;
                document.querySelector('.result').innerHTML = 'looser!!!'
            }
        }

        function reset() {
            mistakes = 0;
            guessed = [];
            document.getElementById('hangManPic').src = './hangImage/0.png';
            randomWord();
            guessedWord();
            updadeMistakes();
            generateButtons();
        }


        function updadeMistakes() {
            document.getElementById('mistakes').innerHTML = mistakes;
        }

        function guessedWord() {
            wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

            document.querySelector('.lettres').innerHTML = wordStatus;

        }
        /*/////////////////////*/
        document.getElementById('maxWrong').innerHTML = maxWrong;
        window.addEventListener("keypress", handleGuess, true)

        /*/////////////////////*/
        /*running function*/
        randomWord();
        generateButtons();
        guessedWord();