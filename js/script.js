window.addEventListener('DOMContentLoaded', function() {
    "use strict";
    //get elements & create array
    const form = document.querySelector("form");
    const numberOfPlayers = document.querySelector("#number");
    const winnerDiv = document.querySelector(".winner");
    let persons = [];

    //coin flip function
    function coinFlip() {
        return Math.round(Math.random()) < 1 ? 'Heads' : 'Tails';
    }

    //game function
    const bigGame = (e) => {
        e.preventDefault();
        let count = 0;
        if (numberOfPlayers.value && numberOfPlayers.value !== "0" && numberOfPlayers.value !== "1") {
            for (let i = 0; i < numberOfPlayers.value; i++) {
                persons[i] = {
                    name: `Persone${i + 1}`,
                    cash: 10,
                    choice: () => Math.round(Math.random()) < 1 ? 'Heads' : 'Tails'
                }
            }
            while (count++ < Infinity && persons.filter(el => el.cash > 0).length > 1) {
                for (let i = 0, j = -1; i < persons.length; i++) {
                    if (persons[i].cash > 0) {
                        if (j > -1) {
                            const party = [i, j];
                            persons[i].choice() === coinFlip() ? party.reverse() : party;
                            persons[party[0]].cash++;
                            persons[party[1]].cash--;
                            j = -1;
                        } else {
                            j = i;
                        }
                    }
                }
            }
            winnerDiv.innerHTML = `<span>Winner: ${persons[persons.findIndex((el) => el.cash > 0)].name}, balance: ${persons[persons.findIndex((el) => el.cash > 0)].cash}$, after ${count} flips</span>`;
        } else if (numberOfPlayers.value && numberOfPlayers.value == "1") {
            winnerDiv.innerHTML = `<span class="error">Error! The value must not be "1"!</span>`
        } else {
            winnerDiv.innerHTML = `<span class="error">Error! The value must not be empty, or 0!</span>`
        }
        persons = [];
    };

    form.addEventListener('submit', bigGame);
});

