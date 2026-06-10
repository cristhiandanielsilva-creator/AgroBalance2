# 🌱 AgroBalance — Agro Forte, Futuro Sustentável

O **AgroBalance** é um jogo educativo interativo desenvolvido para o **Concurso Agrinho 2026**, na categoria de **Programação** (Rede Estadual de Ensino do Paraná). 

O projeto foi construído inteiramente do zero para responder ao tema oficial do edital: **"Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente"**. O objetivo é consciencializar os estudantes sobre como alinhar a alta produtividade agrícola com a preservação ecológica dos recursos naturais.

---

## 🎯 Objetivo do Tema Agrinho no Projeto
O jogo simula a gestão da **Fazenda Esperança**. O utilizador assume o papel de um gestor rural focado em encontrar o ponto de equilíbrio entre a economia do campo (produção) e a ecologia (preservação). 

A meta pedagógica é **ensinar através do erro**. O jogo não pune o estudante; em vez disso, exibe justificações técnicas detalhadas sempre que uma resposta incorreta é selecionada, transformando o quiz numa ferramenta de aprendizagem ativa sobre sustentabilidade.

---

## 🛠️ Tecnologias Utilizadas
Em conformidade com as exigências técnicas de desenvolvimento de software nativo do edital, o projeto não utiliza frameworks ou bibliotecas externas:

* **HTML5:** Estruturação semântica das páginas de introdução (`index.html`), instruções (`tutorial.html`) e o mapa interativo (`fazenda.html`).
* **CSS3:** Estilização baseada em variáveis de cor alinhadas à identidade visual do campo, design 100% responsivo para telemóveis e computadores, e animações interativas (`@keyframes`).
* **JavaScript (Vanilla JS):** Motor de regras do jogo, manipulação do DOM em tempo real, lógica de sorteio aleatório de perguntas e persistência de dados.

---

## ⚙️ Detalhes de Implementação e Arquitetura

### 1. Lógica das Funções JavaScript (`script.js`)
* **Sorteio Dinâmico (`abrirElemento`):** Evita a repetição e a monotonia. Cada área da fazenda possui um array de objetos com múltiplas perguntas. O algoritmo escolhe uma pergunta de forma aleatória a cada clique.
* **Feedback Pedagógico (`responder`):** Valida a resposta do utilizador. Adiciona +25 pontos por acerto (máximo de 100 pontos nas 4 áreas) e gera o pop-up de explicação técnica (Justificação Agronómica).
* **Persistência Local (`mostrarResultado`):** Grava o score final e a medalha atribuída no navegador do estudante através da API `LocalStorage`, permitindo que os dados não se percam ao atualizar a página.

### 2. Estrutura das Classes CSS (`style.css`)
* **Mapeamento Responsivo:** Os ícones interativos das áreas (`.solar`, `.agua`, `.arvore`, `.broto`) utilizam posicionamento absoluto em percentagem (`position: absolute; top: X%; left: Y%;`), garantindo que os botões fiquem no lugar correto sobre a imagem de fundo em qualquer tamanho de ecrã.
* **Feedback Visual:** Classes de hover aplicam efeitos de transição cúbica (`cubic-bezier`) e brilho (`brightness`) nos botões, melhorando a experiência do utilizador.

### 3. Organização de Pastas (Assets)
Todos os recursos visuais do projeto estão isolados e organizados de forma limpa numa pasta dedicada, garantindo caminhos (paths) funcionais e livres de erros no console do navegador:
* `img/fazenda.png` (Mapa base da propriedade)
* `img/solar.png`, `img/agua.png`, `img/arvore.png`, `img/broto.png` (Ícones interativos)

---

## 📂 Organização Interna do Repositório
```bash
├── index.html          # Tela inicial com a introdução da história da fazenda
├── tutorial.html       # Instruções de jogabilidade e tabela de medalhas
├── fazenda.html        # Interface do mapa, modais e secção de relatório expandido
├── script.js           # Lógica de programação, base de perguntas e pontuação
├── style.css           # Estilização completa, regras de design e responsividade
└── img/                # Diretorório exclusivo de mídias e imagens do projeto