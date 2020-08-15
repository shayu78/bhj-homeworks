"use strict";

const answersList = document.querySelector('.poll__answers');

const xhr = new XMLHttpRequest();
xhr.open("GET", "https://netology-slow-rest.herokuapp.com/poll.php");
xhr.onreadystatechange = function () {
  if (xhr.readyState === xhr.DONE) {
    if (xhr.status >= 200 && xhr.status < 400) {
      try {
        const valuteInfo = JSON.parse(xhr.responseText);
        document.querySelector('.poll__title').textContent = valuteInfo.data.title;
        answersList.innerHTML = valuteInfo.data.answers.reduce((dataHTML, value) => dataHTML + getAnswerMarkup(value), '');
        document.querySelector('.poll__answers').addEventListener('click', (event) => {
          if (event.target.classList.contains('poll__answer')) {
            alert("Спасибо, ваш голос засчитан!");
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "https://netology-slow-rest.herokuapp.com/poll.php");
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function () {
              if (xhr.readyState === xhr.DONE) {
                if (xhr.status >= 200 && xhr.status < 400) {
                  try {
                    const valuteInfo = JSON.parse(xhr.responseText);
                    const totalVotes = valuteInfo.stat.reduce((total, value) => total + value.votes, 0);
                    answersList.innerHTML = valuteInfo.stat.reduce((dataHTML, value) => {
                      return dataHTML + getAnswerStatMarkup({ "answer": value.answer, "votes_percent": value.votes * 100 / totalVotes });
                    }, '');
                  } catch (exception) {
                      console.log(`Некорректный формат данных - ${exception.name} ${exception.message}`);
                      return;
                  }
                } else console.error(`Ошибка ${xhr.status}`);
              }
            };
            xhr.send(`vote=${valuteInfo.id}&answer=${valuteInfo.data.answers.findIndex((item) => item === event.target.textContent.trim())}`);
          }
        });
      } catch (exception) {
          console.log(`Некорректный формат данных - ${exception.name} ${exception.message}`);
          return;
      }
    } else console.error(`Ошибка ${xhr.status}`);
  }
};
xhr.send();

function getAnswerMarkup(text) {
  return `<button class="poll__answer">
    ${text}
  </button>`;
}

function getAnswerStatMarkup(data) {
  return `<p>
    ${data.answer}: ${Number.parseFloat(data.votes_percent).toFixed(2)}%
  </p>`;
}
