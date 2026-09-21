document.addEventListener('DOMContentLoaded', () => {
    const pollTitle = document.getElementById('poll__title');
    const pollAnswers = document.getElementById('poll__answers');
    
    // Переменная для хранения ID текущего опроса
    let currentPollId = null;

    // Загружаем опрос при открытии страницы
    loadPoll();

    function loadPoll() {
        fetch('https://students.netoservices.ru/nestjs-backend/poll')
            .then((response) => response.json())
            .then((data) => {
                currentPollId = data.data.id;
                const question = data.data.title;
                const answers = data.data.answers;

                pollTitle.textContent = question;
                pollAnswers.innerHTML = ''; // Очищаем контейнер перед отрисовкой

                answers.forEach((answerText, index) => {
                    const button = document.createElement('button');
                    button.classList.add('poll__answer');
                    button.textContent = answerText;
                    
                    button.addEventListener('click', () => handleVote(index));
                    pollAnswers.appendChild(button);
                });
            })
            .catch((error) => {
                console.error('Ошибка при загрузке опроса:', error);
                pollTitle.textContent = 'Не удалось загрузить опрос.';
            });
    }

    async function handleVote(answerIndex) {
        // Блокируем интерфейс во время отправки запроса
        Array.from(pollAnswers.children).forEach(btn => btn.disabled = true);

        const formData = new URLSearchParams();
        formData.append('vote', currentPollId);
        formData.append('answer', answerIndex);

        try {
            const response = await fetch('https://students.netoservices.ru/nestjs-backend/poll', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            });

            if (!response.ok) {
                throw new Error(`Сервер вернул ошибку: ${response.status}`);
            }

            const resultData = await response.json();
            showResults(resultData);
            
        } catch (error) {
            alert('Произошла ошибка при отправке голоса.');
            console.error(error);
            // Разблокируем кнопки в случае ошибки сети или сервера
            Array.from(pollAnswers.children).forEach(btn => btn.disabled = false);
        }
    }

    function showResults(data) {
        // Полностью очищаем контейнер ответов
        pollAnswers.innerHTML = '';
        
        const statContainer = document.createElement('div');
        statContainer.classList.add('poll__results');

        const totalVotes = data.stat.reduce((sum, item) => sum + item.votes, 0);

        data.stat.forEach(item => {
            const percent = totalVotes > 0 ? ((item.votes / totalVotes) * 100).toFixed(1) : 0;

            const answerRow = document.createElement('div');
            answerRow.classList.add('poll__result-row');

            const label = document.createElement('span');
            label.classList.add('poll__result-label');
            label.textContent = `${item.answer} (${item.votes})`;

            const barWrapper = document.createElement('div');
            barWrapper.classList.add('poll__bar-wrapper');

            const bar = document.createElement('div');
            bar.classList.add('poll__bar');
            // Ширина полоски зависит от процента голосов
            bar.style.width = `${percent}%`;

            barWrapper.appendChild(bar);
            answerRow.appendChild(label);
            answerRow.appendChild(barWrapper);
            statContainer.appendChild(answerRow);
        });

        pollAnswers.appendChild(statContainer);
    }
});
