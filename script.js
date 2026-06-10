/* ==========================================================================
   PROJETO AGROBALANCE 2026 - CÓDIGO FONTE INTERATIVO
   Tema: Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente
   ========================================================================== */

// Variáveis globais para controle de pontuação, erros, acertos e estado do jogo
let pontos = 0;
let acertos = 0;
let erros = 0;
let respondidos = [];
let conhecimentos = [];
let perguntaAtual = null;
let temaAtual = null;

// Banco de dados contendo os textos informativos das 4 áreas da fazenda
const conteudos = {
    solar: {
        titulo: "☀ Energia Solar",
        texto: "A energia solar utiliza a luz do Sol para gerar eletricidade.<br><br><strong>Benefícios:</strong><br>✔ Fonte renovável<br>✔ Menor impacto ambiental<br>✔ Redução do uso de combustíveis fósseis",
        conquista: "☀ <strong>Energia Limpa:</strong> Você aprendeu como a energia solar reduz impactos ambientais e mitiga a queima de combustíveis fósseis."
    },
    agua: {
        titulo: "💧 Conservação da Água",
        texto: "A água é essencial para a agricultura sustentável.<br><br><strong>Práticas:</strong><br>✔ Irrigação por gotejamento<br>✔ Captação da água da chuva",
        conquista: "💧 <strong>Guardião da Água:</strong> Você compreendeu a importância de técnicas como gotejamento e captação pluvial."
    },
    arvore: {
        titulo: "🌳 Preservação Ambiental",
        texto: "A vegetação protege rios, nascentes e animais selvagens, mantendo a biodiversidade local ativa através de matas ciliares.",
        conquista: "🌳 <strong>Protetor da Natureza:</strong> Você aprendeu a importância da preservação da biodiversidade e proteção das matas ciliares."
    },
    broto: {
        titulo: "🌱 Solo Saudável",
        texto: "Um solo saudável produz mais e não agride a natureza.<br><br><strong>Práticas:</strong><br>✔ Compostagem (adubação orgânica)<br>✔ Rotação de culturas",
        conquista: "🌱 <strong>Solo Saudável:</strong> Você conheceu práticas de rotação de cultura e compostagem que mantêm a fertilidade da terra."
    }
};

// Banco de dados contendo as perguntas, alternativas de múltipla escolha e feedbacks pedagógicos
const bancoPerguntas = {
    solar: [
        { pergunta: "Qual é a principal vantagem ambiental da energia solar?", opcoes: ["Produz resíduos tóxicos", "Utiliza combustível fóssil", "Reduz a emissão de poluentes"], correta: 2, explicacao: "A energia solar reduz a emissão de gases poluentes porque não depende da queima de combustíveis fósseis." },
        { pergunta: "Por que a energia solar é considerada renovável?", opcoes: ["Porque utiliza uma fonte natural que se renova constantemente", "Porque depende do petróleo", "Porque produz combustíveis"], correta: 0, explicacao: "O Sol continuará fornecendo energia por bilhões de anos, tornando essa fonte inesgotável." }
    ],
    agua: [
        { pergunta: "Qual sistema de irrigação utiliza menos água?", opcoes: ["Gotejamento", "Inundação", "Aspersão excessiva"], correta: 0, explicacao: "O gotejamento fornece água de forma controlada diretamente às raízes, reduzindo drasticamente o desperdício." }
    ],
    arvore: [
        { pergunta: "Qual é a principal função das matas ciliares?", opcoes: ["Proteger rios e nascentes", "Aumentar a erosão", "Reduzir a biodiversidade"], correta: 0, explicacao: "As matas ciliares funcionam como cílios protetores para os rios, segurando a terra e evitando o assoreamento." }
    ],
    broto: [
        { pergunta: "A rotação de culturas ajuda a:", opcoes: ["Manter a fertilidade do solo", "Empobrecer o solo", "Aumentar erosões"], correta: 0, explicacao: "Alternar espécies plantadas evita a exaustão de nutrientes específicos e quebra o ciclo de pragas." }
    ]
};

// Função para mostrar o feedback visual (janelas pop-up) na tela do usuário
function mostrarFeedback(titulo, texto) {
    document.getElementById("tituloFeedback").innerHTML = titulo;
    document.getElementById("textoFeedback").innerHTML = texto;
    document.getElementById("feedback").style.display = "flex";
}

// Função para fechar a tela de feedback de respostas
function fecharFeedback() {
    document.getElementById("feedback").style.display = "none";
}

// Função para fechar a tela do questionário de perguntas
function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

// Função para abrir um elemento da fazenda e sortear uma pergunta aleatória
function abrirElemento(nome) {
    if (respondidos.includes(nome)) {
        mostrarFeedback("⚠ Área já concluída", "Você já respondeu este desafio.");
        return;
    }

    temaAtual = nome;
    const conteudo = conteudos[nome];
    const perguntas = bancoPerguntas[nome];
    perguntaAtual = perguntas[Math.floor(Math.random() * perguntas.length)];

    document.getElementById("tituloModal").innerHTML = conteudo.titulo;
    document.getElementById("textoModal").innerHTML = conteudo.texto;
    document.getElementById("perguntaModal").innerHTML = perguntaAtual.pergunta;

    let html = "";
    perguntaAtual.opcoes.forEach((opcao, index) => {
        html += `<button onclick="responder(${index})">${opcao}</button>`;
    });

    document.getElementById("respostasModal").innerHTML = html;
    document.getElementById("modal").style.display = "flex";
}

// Função para processar a resposta escolhida pelo jogador e calcular os pontos
function responder(indice) {
    respondidos.push(temaAtual);
    conhecimentos.push(conteudos[temaAtual].conquista);

    if (indice === perguntaAtual.correta) {
        pontos += 25; // Define a pontuação de 25 pontos por acerto (Total de 100 pontos nas 4 áreas)
        acertos++;
        mostrarFeedback("✅ Resposta Correta", perguntaAtual.explicacao);
    } else {
        erros++;
        mostrarFeedback("❌ Resposta Incorreta", `<strong>Resposta correta:</strong> ${perguntaAtual.opcoes[perguntaAtual.correta]}<br><br>${perguntaAtual.explicacao}`);
    }

    atualizarPainel();
    fecharModal();

    if (respondidos.length === 4) {
        setTimeout(mostrarResultado, 600);
    }
}

// Função para atualizar o painel superior de pontuação e a barra de progresso do jogo
function atualizarPainel() {
    document.getElementById("pontos").innerHTML = pontos;
    const progresso = (respondidos.length / 4) * 100;
    document.getElementById("barraProgresso").style.width = progresso + "%";
    document.getElementById("progressoTexto").innerHTML = `${respondidos.length} de 4 desafios concluídos`;
}

// Função para processar o encerramento do jogo e definir a classificação do perfil rural
function mostrarResultado() {
    let perfil = "";
    let avaliacao = "";

    if (pontos <= 25) {
        perfil = "🌱 Iniciante em Sustentabilidade";
        avaliacao = "Você está começando sua jornada de aprendizagem. Revise os conceitos para entender melhor o campo!";
    } else if (pontos <= 50) {
        perfil = "🚜 Fazendeiro Consciente";
        avaliacao = "Bom trabalho! Você demonstra noções importantes, mas balancear totalmente a fazenda exige mais atenção técnica.";
    } else if (pontos <= 75) {
        perfil = "🌾 Guardião da Fazenda";
        avaliacao = "Excelente nível! Suas escolhas protegem os ecossistemas e garantem uma ótima produtividade rural.";
    } else {
        perfil = "🏆 Mestre da Sustentabilidade";
        avaliacao = "Incrível! Desempenho perfeito. Você dominou completamente a gestão e a conservação ambiental do agronegócio.";
    }

    // Armazena temporariamente os resultados no navegador do aluno
    localStorage.setItem("agro_pontos", pontos);
    localStorage.setItem("agro_perfil", perfil);

    document.getElementById("tituloFeedback").innerHTML = "🏆 Jornada Concluída!";
    document.getElementById("textoFeedback").innerHTML = `
        <h3>${perfil}</h3>
        <p style="margin: 15px 0;">Sua pontuação final foi de <strong>${pontos} pontos</strong>.</p>
        <button onclick="verRelatorio()" style="width:100%; margin-bottom:10px;">📊 Ver Relatório Completo</button>
        <button onclick="reiniciarProjeto()" style="width:100%; background: #666;">🔄 Jogar Novamente</button>
    `;
    document.getElementById("feedback").style.display = "flex";

    document.getElementById("perfilFinal").innerHTML = `
        <div class="conquista" style="background: #E8F5E9; border-left: 6px solid #2E7D32;">
            <h3>${perfil}</h3>
            <p>${avaliacao}</p>
            <p style="margin-top:10px;"><strong>Métricas da Partida:</strong> Acertos: ${acertos} | Erros: ${erros}</p>
        </div>
    `;

    let conquistasHtml = "";
    conhecimentos.forEach(conq => {
        conquistasHtml += `<div class="conquista">${conq}</div>`;
    });
    document.getElementById("conquistas").innerHTML = conquistasHtml;
}

// Função para rolar a tela suavemente até a seção com o relatório final expandido
function verRelatorio() {
    fecharFeedback();
    const section = document.getElementById("resultadoFinal");
    section.style.display = "block";
    section.scrollIntoView({ behavior: "smooth" });
}

// Função para reiniciar o jogo, limpar o armazenamento local e recarregar a página
function reiniciarProjeto() {
    localStorage.clear();
    location.reload();
}

// Inicializa as funções do painel de progresso assim que a janela do navegador carregar completamente
document.addEventListener("DOMContentLoaded", function() {
    atualizarPainel();
});