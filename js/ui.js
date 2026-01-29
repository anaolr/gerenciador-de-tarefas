import {
  adicionarTarefa,
  concluindoTarefa,
  contador,
  desfazerConcluir,
  editarTarefa,
  excluindoTarefa,
  ordernarTarefas,
  filtrarPendentes,
  filtrarConcluidas
} from "./tarefas.js";
import {PRIORIDADE, STATUS, tarefas } from "./dados.js";

// IMPEDIR submit
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
});


// AGENDAR MENSAGENS
const mensagem = document.querySelector("#mensagem");
function agendarMensagem(texto, tempo = 2000) {
  mensagem.textContent = texto;
  setTimeout(() => {
    mensagem.textContent = "";
  }, tempo);
}


export const input = document.querySelector("#inputTarefa");
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      botaoAdicionar.click();
    }

  });



export const prioridades = document.querySelector("#prioridades");
// ADICIONANDO TAREFAS
const botaoAdicionar = document.querySelector("#buttonAdicionar");
botaoAdicionar.addEventListener("click", () => {
  const resultado = adicionarTarefa(input.value, prioridades.value);

  if (!resultado.sucesso) {
    if (resultado.erro === "vazio") {
      agendarMensagem("Campo vazio!");
    }
    if (resultado.erro === "duplicado") {
      agendarMensagem("Essa tarefa já existe!");
    }
    return;
  }

  input.value = "";
  agendarMensagem("Tarefa adicionada!")
  renderizar(tarefas);
});


// EDITANDO TAREFA
function modoEdicao(itemLista, tarefa) {
  itemLista.innerHTML = "";

  const inputDentrodoEditar = document.createElement("input");
  inputDentrodoEditar.type = "text";
  inputDentrodoEditar.value = tarefa.nome;
  inputDentrodoEditar.classList.add("inputEditarTarefa");

  const selectEditarPrioridade = document.createElement("select");
  
  const prioridadeAlta = document.createElement("option");
  prioridadeAlta.textContent = "Alta";
  prioridadeAlta.value = "alta";
  const prioridadeMedia = document.createElement("option");
  prioridadeMedia.textContent = "Media";
  prioridadeMedia.value = "media";
  const prioridadeBaixa = document.createElement("option");
  prioridadeBaixa.textContent = "Baixa";
  prioridadeBaixa.value = "baixa";
  
  selectEditarPrioridade.appendChild(prioridadeAlta);
  selectEditarPrioridade.appendChild(prioridadeMedia);
  selectEditarPrioridade.appendChild(prioridadeBaixa);
  
  selectEditarPrioridade.value = tarefa.prioridade;

  const botaoSalvar = document.createElement("button");
  botaoSalvar.classList.add("botaoSalvar");
  botaoSalvar.textContent = "Salvar";

  const botaoCancelar = document.createElement("button");
  botaoCancelar.classList.add("botaoCancelar");
  botaoCancelar.textContent = "Cancelar";

  itemLista.appendChild(inputDentrodoEditar);
  itemLista.appendChild(selectEditarPrioridade);
  itemLista.appendChild(botaoSalvar);
  itemLista.appendChild(botaoCancelar);

  inputDentrodoEditar.focus();

  inputDentrodoEditar.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      botaoSalvar.click();
    }

    if (event.key === "Escape") {
      botaoCancelar.click();
    }
  });

  botaoSalvar.addEventListener("click", function () {
    const novoNome = inputDentrodoEditar.value.trim();
    const novaPrioridade = selectEditarPrioridade.value;

    const resultado = editarTarefa(tarefa.id, novoNome, novaPrioridade);

    if (!resultado.sucesso) {
      if (resultado.erro === "vazio") {
        agendarMensagem("Erro: campo vazio!");
      }
      if (resultado.erro === "duplicado") {
        agendarMensagem("Essa tarefa já existe!");
      }
      if (resultado.erro === "sem-alteracao") {
        agendarMensagem("O nome deve ser diferente do já existente!");
      }
      return;
    }
    agendarMensagem("Tarefa editada!");
    renderizar(tarefas);
  });

  botaoCancelar.addEventListener("click", function () {
    renderizar(tarefas);
  });
}


// CRIAR LI
export function criarItemdaLista(tarefa) {
  const itemLista = document.createElement("li");

  const corPrioridade = document.createElement("span");
  if (tarefa.prioridade === PRIORIDADE.ALTA) {
    corPrioridade.classList.add("prioridadeAlta");
  } else if (tarefa.prioridade === PRIORIDADE.MEDIA) {
    corPrioridade.classList.add("prioridadeMedia");
  } else {
    corPrioridade.classList.add("prioridadeBaixa");
  }
  itemLista.appendChild(corPrioridade);

  const textoTarefa = document.createElement("span");
  textoTarefa.classList.add("textoTarefa");
  textoTarefa.textContent = tarefa.nome;
  itemLista.appendChild(textoTarefa);

  const status = document.createElement("p");
  status.classList.add("statusTarefa");
  status.textContent = tarefa.status;
  itemLista.appendChild(status);

  const excluir = document.createElement("button");
  excluir.classList.add("botaoExcluir");
  excluir.textContent = "Excluir";
  itemLista.appendChild(excluir);

  excluir.addEventListener("click", function () {
    excluindoTarefa(tarefa.id);
    agendarMensagem("Tarefa excluída!");
    renderizar(tarefas);
  });

  const editar = document.createElement("button");
  editar.classList.add("botaoEditar");
  editar.textContent = "Editar";
  itemLista.appendChild(editar);

  editar.addEventListener("click", () => {
    modoEdicao(itemLista, tarefa);
  });

  const concluir = document.createElement("button");
  concluir.classList.add("botaoConcluir");
  concluir.textContent = "Concluir";
  itemLista.appendChild(concluir);

  concluir.addEventListener("click", function () {
    if (tarefa.status === STATUS.PENDENTE) {
      concluindoTarefa(tarefa.id);
      agendarMensagem("Tarefa concluída!");
      renderizar(tarefas);
    } else {
      desfazerConcluir(tarefa.id);
      agendarMensagem("Tarefa reativada!")
      renderizar(tarefas);
    }
  });

  return { itemLista, textoTarefa, status, excluir, editar, concluir };
}


// TAREFA CONCLUIDAS
export function atualizarVisualConcluido(
  tarefa,
  textoTarefa,
  editar,
  excluir,
  concluir,
  status,
) {
  if (tarefa.status === STATUS.CONCLUIDO) {
    textoTarefa.classList.add("tarefaConfirmada");
    status.classList.add("statusDesabilitado");
    excluir.classList.add("botaoExcluirDesabilitado");
    editar.classList.add("botaoEditarDesabilitado");
    excluir.disabled = true;
    editar.disabled = true;
    concluir.textContent ="Desfazer"
  }
}


// RENDERIZAR
export function renderizar(algumaLista = tarefas) {
  atualizarContador();
  ordernarTarefas(algumaLista);
  const lista = document.querySelector("#listaTarefas");
  lista.innerHTML = "";
  for (let cont = 0; cont < algumaLista.length; cont++) {
    const { itemLista, textoTarefa, status, excluir, editar, concluir } =
      criarItemdaLista(algumaLista[cont]);

    atualizarVisualConcluido(
      algumaLista[cont],
      textoTarefa,
      editar,
      excluir,
      concluir,
      status,
    );

    lista.appendChild(itemLista);
  }
}


// VISUAL CONTADOR
export function atualizarContador() {
  const pendentes = document.querySelector("#pendentes");
  const concluidas = document.querySelector("#concluidas");
  const total = document.querySelector("#total");

const {
  quantidadePendentes,
  quantidadeConcluidas,
  quantidadeTotal
} = contador(
  tarefas.filter(t => t.status === STATUS.PENDENTE),
  tarefas.filter(t => t.status === STATUS.CONCLUIDO)
);

  pendentes.textContent =quantidadePendentes;
  concluidas.textContent = quantidadeConcluidas;
  total.textContent = quantidadeTotal;
}

// FILTRO
const btnPendentes = document.querySelector("#btnPendentes");
const btnConcluidas = document.querySelector("#btnConcluidas");
const btnTodas = document.querySelector("#btnTodas");

btnPendentes.addEventListener("click", () => {
  renderizar(filtrarPendentes());
});

btnConcluidas.addEventListener("click", () => {
  renderizar(filtrarConcluidas());
});

btnTodas.addEventListener("click", () => {
  renderizar(tarefas);
});
