'use strict';

(() => {
  const countBalls = {
    player: 5,
    bot: 5,
  };

  const start = () => {
    const marbles = {...countBalls};
    const figures = ['камень', 'ножницы', 'бумага'];
    const oddEven = ['нечётное', 'чётное'];

    const getRandomIntInclusive = (min, max) => {
      const minCeiled = Math.ceil(min);
      const maxFloored = Math.floor(max);

      return Math.floor(Math.random() *
        (maxFloored - minCeiled + 1) + minCeiled);
    };

    const getResultWin = (obj, func) => {
      if (obj.player <= 0) {
        alert(`Вы проиграли. У вас кончились шарики.`);
        if (confirm('Хотите сыграть ещё ?')) {
          return start();
        } else {
          return;
        }
      }

      if (marbles.bot <= 0) {
        alert(`Вы победили!!! У бота кончились шарики.`);
        if (confirm('Хотите сыграть ещё ?')) {
          return start();
        } else {
          return;
        }
      }

      return func();
    };

    /* const winUser = () => {
      alert(`Вы победили!!! У бота кончились шарики.`);
      if (confirm('Хотите сыграть ещё ?')) {
        return start();
      } else {
        return;
      }
    };

    const winComputer = () => {
      alert(`Вы проиграли. У вас кончились шарики.`);
      if (confirm('Хотите сыграть ещё ?')) {
        return start();
      } else {
        return;
      }
    }; */

    const findResultArray = (userEnter, arr) => arr.find(item =>
      item.startsWith(userEnter.toLowerCase().trim()));

    const showMessageGameEnd = () => alert('Игра закончена');

    const getComputerChoiceOddEven = (marbles) =>
      (marbles.player === 1 ? 'нечётное' :
      Math.round(Math.random()) ? 'нечётное' : 'чётное');

    const getResultNumberOddEven = (value) =>
      (value % 2 ? 'нечётное' : 'чётное');

    const userPlay = () => {
      const userEnterBalls =
      prompt(`Загадайте число от 1 до ${marbles.player}`);

      if (userEnterBalls === null) {
        if (confirm('Вы точно хотите выйти ?')) {
          return showMessageGameEnd();
        } else {
          return userPlay();
        }
      }

      const userNumber = +userEnterBalls.trim();

      if (isNaN(userNumber) || userNumber > marbles.player || userNumber <= 0) {
        alert(`Введите число больше нуля, но не больше ${marbles.player}`);
        return userPlay();
      }

      const resultComputerChoice = getComputerChoiceOddEven(marbles);

      if (getResultNumberOddEven(userNumber) === resultComputerChoice) {
        marbles.player -= userNumber;
        marbles.bot += userNumber;
        alert(`Бот забирает у вас шариков: ${userNumber} \n` +
        `Бот решил что вы загадали ${resultComputerChoice} кол-во шариков\n` +
        `Общее кол-во шариков: \n У вас шариков: ${marbles.player}\n` +
        `У бота шариков: ${marbles.bot}`);
      } else {
        marbles.bot -= userNumber;
        marbles.player += userNumber;
        alert(`Вы забираете у бота шариков: ${userNumber} \n` +
          `Бот решил что вы загадали ${resultComputerChoice} кол-во шариков\n` +
          `Общее кол-во шариков: \n У вас шариков: ${marbles.player}\n` +
          `У бота шариков: ${marbles.bot}`);
      }

      /* if (marbles.player <= 0) {
        return winComputer();
      } else if (marbles.bot <= 0) {
        return winUser();
      } else {
        return computerPlay();
      } */

      getResultWin(marbles, computerPlay);
    };

    const computerPlay = () => {
      const computerBalls = getRandomIntInclusive(1, marbles.bot);
      console.log('computerBalls: ', computerBalls);
      const userEnterGuess = prompt('Бот загадал число,' +
        ' попробуйте угадать четное или нечётное');

      if (userEnterGuess === null) {
        if (confirm('Вы точно хотите выйти ?')) {
          return showMessageGameEnd();
        } else {
          return computerPlay();
        }
      }

      const userGuess = userEnterGuess.trim().toLowerCase();

      if (userGuess === '' || !findResultArray(userGuess, oddEven)) {
        return computerPlay();
      }

      if (userGuess === getResultNumberOddEven(computerBalls) ||
      getResultNumberOddEven(computerBalls).startsWith(userGuess)) {
        marbles.player += computerBalls;
        marbles.bot -= computerBalls;
        alert(`Вы забираете у бота шариков: ${computerBalls} \n` +
          `Общее кол-во шариков: \n У вас шариков: ${marbles.player}\n` +
          `У бота шариков: ${marbles.bot}`);
      } else {
        marbles.player -= computerBalls;
        marbles.bot += computerBalls;
        alert(`Бот забирает у вас шариков: ${computerBalls} \n` +
          `Общее кол-во шариков: \n У вас шариков: ${marbles.player}\n` +
          `У бота шариков: ${marbles.bot}`);
      }

      /* if (marbles.player <= 0) {
        return winComputer();
      } else if (marbles.bot <= 0) {
        return winUser();
      } else {
        return userPlay();
      } */

      getResultWin(marbles, userPlay);
    };

    const userEnter = prompt(`Чтобы узнать кто будет ходить первым:` +
      ` Бот или Вы.\n Сыграйте ${figures} ?`, '');

    if (userEnter === null) {
      if (confirm('Вы точно хотите выйти ?')) {
        return showMessageGameEnd();
      } else {
        return start();
      }
    }

    if (userEnter.trim() === '' || !findResultArray(userEnter, figures)) {
      return start();
    }

    const computerChoice = figures[getRandomIntInclusive(0,
        figures.length - 1)];
    console.log('computerChoice: ', computerChoice);
    const userChoice = findResultArray(userEnter, figures);
    const userIndex = figures.indexOf(userChoice);
    const computerIndex = figures.indexOf(computerChoice);

    switch (true) {
      case userChoice === computerChoice:
        alert(`Вы выбрали: ${userChoice}\n` +
          `Бот выбрал: ${computerChoice}\n` +
          `У вас ничья`);
        return start();

      case (userIndex + 1) % figures.length === computerIndex:
        alert(`Вы выбрали: ${userChoice}\n` +
          `Бот выбрал: ${computerChoice}\n` +
          `Вы выиграли! Первый ход за Вами!`);
        return userPlay();

      default:
        alert(`Вы выбрали: ${userChoice}\n` +
          `Бот выбрал: ${computerChoice}\n` +
          `Вы проиграли. Первый ход у Бота`);
        return computerPlay();
    }
  };

  window.marbles = start;
})();
