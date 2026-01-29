import { pegarLocalStorage } from "./localStorage.js";

export let tarefas = [];

export const STATUS = {
  CONCLUIDO: "concluido",
  PENDENTE: "pendente",
};

export const PRIORIDADE = {
  ALTA: "alta",
  MEDIA: "media",
  BAIXA: "baixa",
};

pegarLocalStorage();
