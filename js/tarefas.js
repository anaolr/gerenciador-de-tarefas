import { tarefas,STATUS,PRIORIDADE} from "./dados.js";
import { salvarLocalStorage } from "./localStorage.js";


// ADICIONAR
export function adicionarTarefa(nome, prioridade) {
  const nomeNormalizado = nome.trim().toLowerCase();

  if (nomeNormalizado === "") {
    return {
      sucesso: false,
      erro: "vazio",
    };
  }

  if(comparacao(nomeNormalizado)){
    return{
      sucesso: false,
      erro: "duplicado",
    };
    }
  
  const novaTarefa = {
    id: Date.now(),
    nome: nomeNormalizado,
    status: STATUS.PENDENTE,
    prioridade: prioridade,
  };

  tarefas.push(novaTarefa);
  salvarLocalStorage();

  return {
    sucesso: true,
    tarefa: novaTarefa,
  };
}

// EXCLUIR
export function excluindoTarefa(id) {
  const filtradas = tarefas.filter(tarefa => {
    return tarefa.id !== id;
  });

  tarefas.length = 0;
  tarefas.push(...filtradas);
  salvarLocalStorage();
}


// CONCLUIR
export function concluindoTarefa(id) {
  const tarefa = tarefas.find((tarefa) => tarefa.id === id);
  if (tarefa) {
    tarefa.status = STATUS.CONCLUIDO;
  }
  salvarLocalStorage();
}

// EDITAR
export function editarTarefa(id, novoNome, novaPrioridade) {
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return { sucesso: false };

  const nomeNormalizado = novoNome.trim().toLowerCase();

  if (nomeNormalizado === "") {
    return { sucesso: false, erro: "vazio" };
  }

  if (comparacao(nomeNormalizado, id)) {
    return { sucesso: false, erro: "duplicado" };
  }

  const nomeIgual = tarefa.nome === nomeNormalizado;
  const prioridadeIgual = tarefa.prioridade === novaPrioridade;

  if (nomeIgual && prioridadeIgual) {
    return { sucesso: false, erro: "sem-alteracao" };
  }

  tarefa.nome = nomeNormalizado;
  tarefa.prioridade = novaPrioridade;
  salvarLocalStorage();
  return { sucesso: true };
}

  
// DUPLICIDADE
export function comparacao(nome,idAtual = null ) {
  return tarefas.some(
    (item) => item.nome.trim().toLowerCase() === nome.trim().toLowerCase() && item.id !== idAtual
  );
}

// DESFAZER CONCLUIR
export function desfazerConcluir(id) {
  const tarefa = tarefas.find((tarefa) => tarefa.id === id);
  if (tarefa) {
    tarefa.status = STATUS.PENDENTE;
  }
  salvarLocalStorage();
}

// ORDENANDO TAREFAS
export function ordernarTarefas(tarefas) {
  tarefas.sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === STATUS.PENDENTE ? -1 : 1;
    }

    if (a.status === STATUS.PENDENTE) {
      const ordemPrioridade = {
        [PRIORIDADE.ALTA]: 1,
        [PRIORIDADE.MEDIA]: 2,
        [PRIORIDADE.BAIXA]: 3,
      };

      return ordemPrioridade[a.prioridade] - ordemPrioridade[b.prioridade];
    }

    return 0;
  });
}

// FILTRAR TAREFAS
export function filtrarPendentes() {
  const tarefasPendentes = tarefas.filter(
    (tarefa) => tarefa.status === STATUS.PENDENTE,
  );
  return tarefasPendentes
}

export function filtrarConcluidas() {
  const tarefasConcluidas = tarefas.filter(
    (tarefa) => tarefa.status === STATUS.CONCLUIDO,
  );
  return tarefasConcluidas;
}


// CONTADOR DE TAREFAS
export function contador(tarefasPendentes,tarefasConcluidas) {
  const quantidadePendentes = tarefasPendentes.length;
  const quantidadeConcluidas = tarefasConcluidas.length;
  const quantidadeTotal = tarefas.length;
  return {quantidadePendentes,quantidadeConcluidas,quantidadeTotal};
}
