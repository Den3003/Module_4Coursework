'use strict';

(() => {
  const countBalls = {
    player: 5,
    bot: 5,
  };

  const start = () => {
    const marbles = {...countBalls};
    const figures = ['камень', 'ножницы', 'бумага'];

    const getRandomIntInclusive = (min, max) => {
      const minCeiled = Math.ceil(min);
      const maxFloored = Math.floor(max);

      return Math.floor(Math.random() *
        (maxFloored - minCeiled + 1) + minCeiled);
    };

    const getNumber = (marbles, number) =>
      (marbles < number ? marbles : number);

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

    const findResultArray = (userEnter) => figures.find(item =>
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

      let userNumber = +userEnterBalls.trim();

      if (isNaN(userNumber) || userNumber > marbles.player || userNumber <= 0) {
        alert(`Введите число больше нуля, но не больше ${marbles.player}`);
        return userPlay();
      }

      const resultComputerChoice = getComputerChoiceOddEven(marbles);

      if (getResultNumberOddEven(userNumber) === resultComputerChoice) {
        userNumber = getNumber(marbles.player, userNumber);
        marbles.player -= userNumber;
        marbles.bot += userNumber;
        alert(`Бот забирает у вас шариков: ${userNumber} \n` +
        `Бот решил что вы загадали ${resultComputerChoice} кол-во шариков\n` +
        `Общее кол-во шариков: \n У вас шариков: ${marbles.player}\n` +
        `У бота шариков: ${marbles.bot}`);
      } else {
        userNumber = getNumber(marbles.bot, userNumber);
        marbles.bot -= userNumber;
        marbles.player += userNumber;
        alert(`Вы забираете у бота шариков: ${userNumber} \n` +
          `Бот решил что вы загадали ${resultComputerChoice} кол-во шариков\n` +
          `Общее кол-во шариков: \n У вас шариков: ${marbles.player}\n` +
          `У бота шариков: ${marbles.bot}`);
      }

      getResultWin(marbles, computerPlay);
    };

    const computerPlay = () => {
      let computerBalls = getRandomIntInclusive(1, marbles.bot);
      console.log('computerBalls: ', computerBalls);
      const computerResultOddEven = getResultNumberOddEven(computerBalls);
      const userEnterGuess = confirm('Бот загадал число,' +
        ' попробуйте угадать чётное или нечётное\n' +
        `"Ok" - чётное\n"Отмена" - нечётное`) ? 'чётное' : 'нечётное';
      console.log('userEnterGuess: ', userEnterGuess);

      if (userEnterGuess === computerResultOddEven) {
        computerBalls = getNumber(marbles.bot, computerBalls);
        marbles.bot -= computerBalls;
        marbles.player += computerBalls;
        alert(`Вы забираете у бота шариков: ${computerBalls} \n` +
          `Общее кол-во шариков: \n У вас шариков: ${marbles.player}\n` +
          `У бота шариков: ${marbles.bot}`);
      } else {
        computerBalls = getNumber(marbles.player, computerBalls);
        marbles.player -= computerBalls;
        marbles.bot += computerBalls;
        alert(`Бот забирает у вас шариков: ${computerBalls} \n` +
          `Общее кол-во шариков: \n У вас шариков: ${marbles.player}\n` +
          `У бота шариков: ${marbles.bot}`);
      }

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

    if (userEnter.trim() === '' || !findResultArray(userEnter)) {
      return start();
    }

    const computerChoice = figures[getRandomIntInclusive(0,
        figures.length - 1)];
    console.log('computerChoice: ', computerChoice);
    const userChoice = findResultArray(userEnter);
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
