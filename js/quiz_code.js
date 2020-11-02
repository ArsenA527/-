window.onload = () => {
    let result = {},
        step = 0;

    function showQuestion(questionNumber) {
        document.querySelector('.question').innerHTML = quiz[step]['q'];
        let answer = '';
        for (let key in quiz[step]['a']) {
            answer += `<li data-v="${key}" class="answer-variant">${quiz[step]['a'][key]}</li>`;
        };

        document.querySelector('.answer').innerHTML = answer;
    }

    document.onclick = (e) => {
        e.stopPropagation();
        if (e.target.classList.contains('answer-variant') && step < quiz.length) {
            // console.log(e.target);
            if (result[e.target.dataset.v] != undefined) {
                result[e.target.dataset.v]++;
            } else {
                result[e.target.dataset.v] = 0;
            }
            step++;
            if (step == quiz.length) {
                document.querySelector('.question').remove();
                document.querySelector('.answer').remove();
                showResult();
            } else {
                showQuestion(step);
            }
        }

        if (e.target.classList.contains('reload-button')) {
            location.reload();
        }

    }

    function showResult() {
        let key = Object.keys(result).reduce((a, b) => result[a] > result[b] ? a : b),
            div = document.createElement('div'),
            img = document.createElement('img');
        img.src = '../img/' + answers[key]['image'];
        div.classList.add('result');
        img.classList.add('result-img');
        div.innerHTML = answers[key]['description'];
        document.querySelector('main').appendChild(div);
        document.querySelector('main').appendChild(img);

        let reloadButton = document.createElement('button');
        reloadButton.innerHTML = 'Пройти тест заново';
        reloadButton.classList.add('reload-button');
        document.querySelector('main').appendChild(reloadButton);
    }

    showQuestion(step);
}