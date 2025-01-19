const crosswordData = [
    " A                       ",
    " M                       ",
    " P                       ",
    " L                       ",
    " I R                     ",
    " T E                     ",
    " U S                     ",
    " D S                     ",
    "VELOCIDADE               ",
    "   N                     ",
    "   A          P          ",
    "  INTENSIDADE E          ",
    "   C       E  R          ",
    "   I       C  I     R    ",
    "   A       I COMPRIMENTO ",
    "           B  D     F    ",
    "       REFLEXAO     R    ",
    "       E   I        A    ",
    "     T F   S        C    ",
    "     I R            A    ",
    "     M A            O    ",
    "     B C                 ",
    "     R A                 ",
    "     ECO                 ",
];

const answers = [
    { word: "AMPLITUDE", direction: "vretical", row: 0, col: 1, number: 1 },
    { word: "RESSONANCIA", direction: "vretical", row: 4, col: 3, number: 2 },
    { word: "VELOCIDADE", direction: "horizontal", row: 8, col: 0, number: 3 },
    { word: "PERIODO", direction: "vretical", row: 10, col: 15, number: 4 },
    { word: "INTENCIDADE", direction: "horizontal", row: 11, col: 2, number: 5 },
    { word: "DECIBEIS", direction: "vretical", row: 11, col: 11, number: 6 },
    { word: "REFLEXAO", direction: "vertical", row: 13, col: 21, number: 7 },
    { word: "COMPRIMENTO", direction: "horizontal", row: 14, col: 14, number: 8 },
    { word: "RELEXAO", direction: "horizontal", row: 16, col: 8, number: 9 },
    { word: "REFLEXAO", direction: "horizontal", row: 16, col: 8, number: 9 },
    { word: "TIMBRE", direction: "vertical", row: 18, col: 6, number: 11 },
    { word: "ECO", direction: "horizontal", row: 23, col: 6, number: 12 },
    

];

const crosswordContainer = document.getElementById("crossword");

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

document.getElementById("checkAnswers").addEventListener("click", () => {
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
            document.querySelectorAll(`input[data-row='${row}'], input[data-col='${col}']`)
                .forEach(input => input.style.color = "green");
        }
    });

    const result = document.getElementById("result");
    result.textContent = allCorrect ? "Parabéns! Você acertou tudo!" : "Algumas respostas estão erradas. Tente novamente!";
    result.className = allCorrect ? "correct" : "";
});