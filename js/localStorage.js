import { tarefas } from "./dados.js";

export function salvarLocalStorage() {
  localStorage.setItem("tarefasAdicionadas", JSON.stringify(tarefas));
}

export function pegarLocalStorage(){
    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefasAdicionadas"));
    if(tarefasSalvas){
        tarefas.length = 0;
        tarefas.push(...tarefasSalvas);
    }
}