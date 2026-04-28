const questions = [
    
  // --- Primeira República ---
  { question: "A Proclamação da República foi um golpe militar liderado pelo Marechal Deodoro da Fonseca, pondo fim ao Segundo Reinado.", answer: true },
  { question: "A Proclamação da República foi um movimento popular pacífico liderado por Dom Pedro II para modernizar o país.", answer: false },
  { question: "O período inicial da República (1889-1894) é conhecido como República da Espada, pois o país foi governado por militares.", answer: true },
  { question: "A República da Espada recebeu esse nome porque o governo proibiu o uso de armas de fogo em todo o território nacional.", answer: false },

  // --- Constituição de 1891 ---
  { question: "A Constituição de 1891 estabeleceu o sistema de governo Presidencialista no Brasil.", answer: true },
  { question: "O Brasil adotou o Parlamentarismo como sistema de governo na primeira constituição republicana.", answer: false },
  { question: "A primeira constituição republicana instituiu o Voto Aberto, o que facilitava o controle dos eleitores pelas elites.", answer: true },
  { question: "A Constituição de 1891 estabeleceu o voto secreto e obrigatório para todos os brasileiros, inclusive mulheres e analfabetos.", answer: false },

  // --- Política do Café com Leite ---
  { question: "A Política do Café com Leite era o revezamento da presidência entre as oligarquias de São Paulo e Minas Gerais.", answer: true },
  { question: "A Política do Café com Leite era um acordo entre produtores de borracha do Amazonas e produtores de cacau da Bahia.", answer: false },
  { question: "A Política dos Governadores era um pacto de troca de apoio político entre o Governo Federal e os governos estaduais.", answer: true },

  // --- Coronelismo ---
  { question: "Os Coronéis eram grandes latifundiários que usavam seu poder econômico para controlar o voto da população local.", answer: true },
  { question: "Os Coronéis eram oficiais de alta patente do Exército que governavam as cidades com autorização do Imperador.", answer: false },
  { question: "O Voto de Cabresto era a prática de forçar os eleitores a votarem nos candidatos escolhidos pelo coronel.", answer: true },
  { question: "O Voto de Cabresto era um sistema eletrônico de votação criado para impedir fraudes nas eleições rurais.", answer: false },

  // --- Convênio de Taubaté ---
  { question: "O Convênio de Taubaté foi um acordo para que o governo comprasse o excedente de café para manter os preços altos.", answer: true },
  { question: "O Convênio de Taubaté foi um tratado que proibiu definitivamente a exportação de café para proteger a indústria nacional.", answer: false },

  // --- Canudos ---
  { question: "A Guerra de Canudos ocorreu no sertão baiano e foi liderada pela figura messiânica de Antônio Conselheiro.", answer: true },
  { question: "Antônio Conselheiro era um general do exército que fundou Canudos para treinar soldados para a Primeira Guerra Mundial.", answer: false },
  { question: "O arraial de Canudos foi completamente destruído pelo exército brasileiro em sua quarta expedição militar.", answer: true },

  // --- Contestado ---
  { question: "A Guerra do Contestado envolveu camponeses que perderam suas terras para a construção de uma ferrovia entre PR e SC.", answer: true },
  { question: "A Guerra do Contestado foi um conflito entre Brasil e Argentina pela posse da ilha de Fernando de Noronha.", answer: false },
  { question: "O movimento do Contestado teve caráter messiânico e foi liderado pelo monge José Maria.", answer: true },

  // --- Cangaço ---
  { question: "O Cangaço foi um fenômeno de banditismo social no Nordeste, onde grupos armados desafiavam o poder local.", answer: true },
  { question: "O Cangaço foi um grupo de dança folclórica que viajava pelo sertão para promover a paz e a cultura.", answer: false },
  { question: "Lampião foi um dos líderes mais famosos do Cangaço, agindo por décadas no sertão nordestino.", answer: true },

  // --- Revolta da Chibata ---
  { question: "A Revolta da Chibata foi liderada por João Cândido contra os castigos físicos e as más condições na Marinha.", answer: true },
  { question: "A Revolta da Chibata foi organizada pelos oficiais da elite da Marinha para exigir a volta da Monarquia.", answer: false },
  { question: "Os marinheiros revoltosos chegaram a apontar os canhões dos navios para o Rio de Janeiro exigindo o fim das torturas.", answer: true }

    // Adicione mais perguntas aqui
];

const TOTAL_QUESTIONS = 10;
let selectedQuestions = [];
let userAnswers = [];
const quizDiv = document.getElementById('quiz');

function shuffleArray(array) {
    const clone = array.slice();
    for (let i = clone.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [clone[i], clone[j]] = [clone[j], clone[i]];
    }
    return clone;
}

function pickQuestions() {
    const shuffled = shuffleArray(questions);
    return shuffled.slice(0, Math.min(TOTAL_QUESTIONS, shuffled.length));
}

function renderQuiz() {
    quizDiv.innerHTML = '';
    selectedQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            <div class="options">
                <button class="true" onclick="selectAnswer(${index}, true)">Verdadeiro</button>
                <button class="false" onclick="selectAnswer(${index}, false)">Falso</button>
            </div>
        `;
        quizDiv.appendChild(questionDiv);
    });
}

function initQuiz() {
    selectedQuestions = pickQuestions();
    userAnswers = [];
    document.getElementById('result').style.display = 'none';
    document.getElementById('review').style.display = 'none';
    renderQuiz();
}

function selectAnswer(index, answer) {
    userAnswers[index] = answer;
    const buttons = quizDiv.children[index].querySelectorAll('button');
    buttons.forEach(btn => btn.style.opacity = 0.5);
    if (answer) buttons[0].style.opacity = 1;
    else buttons[1].style.opacity = 1;
}

function submitQuiz() {
    let score = 0;
    selectedQuestions.forEach((q, index) => {
        if (userAnswers[index] === q.answer) score++;
    });
    document.getElementById('score').textContent = `Você acertou ${score} de ${selectedQuestions.length} perguntas.`;
    document.getElementById('result').style.display = 'block';
    showReview();
}

function showReview() {
    const reviewList = document.getElementById('review-list');
    reviewList.innerHTML = '';
    selectedQuestions.forEach((q, index) => {
        const item = document.createElement('div');
        item.className = 'review-item';
        const userAns = userAnswers[index] ? 'Verdadeiro' : 'Falso';
        const correctAns = q.answer ? 'Verdadeiro' : 'Falso';
        const isCorrect = userAnswers[index] === q.answer;
        item.innerHTML = `
            <p><strong>${q.question}</strong></p>
            <p>Sua resposta: ${userAns} <span class="${isCorrect ? 'correct' : 'incorrect'}">(${isCorrect ? 'Correto' : 'Incorreto'})</span></p>
            <p>Resposta correta: ${correctAns}</p>
        `;
        reviewList.appendChild(item);
    });
    document.getElementById('review').style.display = 'block';
}

window.onload = initQuiz;
