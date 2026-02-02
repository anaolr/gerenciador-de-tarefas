# Gerenciador de Tarefas

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black)
![HTML](https://img.shields.io/badge/HTML-5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-3-1572B6?logo=css3&logoColor=white)
![Status](https://img.shields.io/badge/Status-Concluído-2ECC71)
![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-181717?logo=github)

Gerenciador de tarefas desenvolvido em **JavaScript puro**, com foco em **organização do código**, **separação de responsabilidades** e **persistência de dados**, simulando a estrutura de uma aplicação front-end real.

🔗 **Deploy:**  
https://anaolr.github.io/gerenciador-de-tarefas/

---

## Preview do Projeto

| Tela inicial | Editando tarefa | Filtro de tarefas |
|-------------|-----------------|------------------|
| ![](./screenshots/tela-inicial.png) | ![](./screenshots/editar-tarefa.png) | ![](./screenshots/filtro-pendentes.png) |

---

## Funcionalidades

- Adicionar novas tarefas com nível de prioridade (alta, média e baixa)
- Editar tarefas existentes
- Excluir tarefas
- Marcar e desmarcar tarefas como concluídas
- Filtrar tarefas por status (todas, pendentes e concluídas)
- Ordenar tarefas por nível de prioridade
- Validação de erros (campo vazio e tarefas duplicadas)
- Contador de tarefas totais, concluídas e pendentes
- Persistência de dados utilizando LocalStorage
- Organização do código utilizando módulos ES6

---

## Estrutura do projeto

O projeto foi estruturado utilizando **módulos ES6**, separando claramente responsabilidades para facilitar **manutenção**, **leitura** e **escalabilidade** do código.

📁 **gerenciador-de-tarefas**  
├── index.html → Estrutura da aplicação  
├── style.css → Estilização da interface  

📁 **js**  
├── dados.js → Estado central da aplicação (lista de tarefas, status e prioridades)  
├── localStorage.js → Persistência dos dados no navegador  
├── ui.js → Manipulação do DOM e renderização da interface  
├── tarefas.js → Regras de negócio (criação, edição, exclusão e conclusão de tarefas)  
├── main.js → Ponto de entrada da aplicação e inicialização do fluxo  

---

## Tecnologias Utilizadas

- **HTML5** → Estruturação semântica da aplicação  
- **CSS3** → Estilização da interface e responsividade básica  
- **JavaScript (ES6+)** → Lógica da aplicação, manipulação do DOM e controle de estado  
- **Módulos ES6** → Organização e separação de responsabilidades  
- **LocalStorage** → Persistência de dados no navegador  

---

## Aprendizados

Durante o desenvolvimento deste projeto, consolidei conceitos fundamentais de **JavaScript moderno**, indo além da simples manipulação do DOM.

Aprendi a estruturar uma aplicação front-end utilizando **módulos ES6**, separando responsabilidades entre **estado**, **regras de negócio**, **interface** e **persistência**, o que resultou em um código mais legível e sustentável.

Também aprofundei meu entendimento sobre **controle de estado**, mantendo uma fonte única de dados sincronizada com a interface e o LocalStorage, garantindo consistência entre as ações do usuário e a renderização.

Além disso, implementei **validações** para tratar diferentes fluxos da aplicação, como impedir tarefas vazias ou duplicadas, e pratiquei a construção de uma aplicação completa, desde a interação do usuário até a atualização visual final.

---

## Como acessar o projeto

A aplicação está disponível online via GitHub Pages:  
 https://anaolr.github.io/gerenciador-de-tarefas/

---

Projeto desenvolvido com foco em **consolidar JavaScript puro**, **organização de código** e **lógica de aplicações front-end**, como preparação para oportunidades de estágio.
