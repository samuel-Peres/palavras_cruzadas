const crosswordData = [
    "                          ",
    "  a                       ",
    "  m                       ",
    "  p                       ",
    "  l                       ",
    "  i r                     ",
    "  t e                     ",
    "  u s                     ",
    "  d s                     ",
    " velocidade               ",
    "    n                     ",
    "    a          p          ",
    "   intensidade e          ",
    "    c       e  r          ",
    "    i       c  i     r    ",
    "    a       i comprimento ",
    "            b  d     f    ",
    "        reflexao     r    ",
    "        e   i        a    ",
    "      t f   s        c    ",
    "      i r            a    ",
    "      m a            o    ",
    "      b c                 ",
    "      r a                 ",
    "      eco                 ",
    "                          ",
];
const answers = [
    { word: "amplitude", direction: "vertical", row: 1, col: 2, number: 1 },
    { word: "ressonancia", direction: "vertical", row: 5, col: 4, number: 2 },
    { word: "velocidade", direction: "horizontal", row: 9, col: 1, number: 3 },
    { word: "periodo", direction: "vertical", row: 11, col: 16, number: 4 },
    { word: "intensidade", direction: "horizontal", row: 12, col: 3, number: 5 },
    { word: "decibeis", direction: "vertical", row: 12, col: 12, number: 6 },
    { word: "reflexao", direction: "vertical", row: 14, col: 21, number: 7 },
    { word: "comprimento", direction: "horizontal", row: 15, col: 14, number: 8 },
    { word: "reflexao", direction: "horizontal", row: 17, col: 8, number: 9 },
    { word: "timbre", direction: "vertical", row: 19, col: 6, number: 11 },
    { word: "eco", direction: "horizontal", row: 24, col: 6, number: 12 },
];

const crosswordContainer = document.getElementById("crossword");

function createCrosswordGrid() {
    crosswordData.forEach((row, rowIndex) => {
        row.split("").forEach((char, colIndex) => {
            const cell = document.createElement("div");
            cell.className = "cell";

            if (char !== " ") {
                cell.dataset.active = "true";
                const input = document.createElement("input");
                input.maxLength = 1;
                input.dataset.row = rowIndex;
                input.dataset.col = colIndex;
                cell.appendChild(input);
            }

            const clueNumber = answers.find(
                answer => answer.row === rowIndex && answer.col === colIndex
            );

            if (clueNumber) {
                const number = document.createElement("span");
                number.className = "number";
                number.textContent = clueNumber.number;
                cell.appendChild(number);
            }

            crosswordContainer.appendChild(cell);
        });
    });
}

function checkAnswers() {
    let allCorrect = true;

    answers.forEach(answer => {
        const { word, direction, row, col } = answer;
        let correct = true;

        for (let i = 0; i < word.length; i++) {
            const r = direction === "horizontal" ? row : row + i;
            const c = direction === "horizontal" ? col + i : col;
            const input = document.querySelector(`input[data-row='${r}'][data-col='${c}']`);

            if (input && input.value.toUpperCase() !== word[i]) {
                correct = false;
                allCorrect = false;
            }
        }

        if (correct) {
            for (let i = 0; i < word.length; i++) {
                const r = direction === "horizontal" ? row : row + i;
                const c = direction === "horizontal" ? col + i : col;
                const input = document.querySelector(`input[data-row='${r}'][data-col='${c}']`);
                if (input) input.style.color = "green";
            }
        }
    });

    const result = document.getElementById("result");
    result.textContent = allCorrect
        ? "Parabéns! Você acertou tudo!"
        : "Algumas respostas estão erradas. Tente novamente!";
    result.className = allCorrect ? "correct" : "";
}

// Inicializa o jogo
createCrosswordGrid();

// Adiciona o evento ao botão
document.getElementById("checkAnswers").addEventListener("click", checkAnswers);
