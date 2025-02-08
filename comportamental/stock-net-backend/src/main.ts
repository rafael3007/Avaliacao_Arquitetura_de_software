import { MovimentacaoEstoqueService } from "./movimentacao-estoque/movimentacao-estoque.service";
import { NotificacaoService } from "./notificacao/notificacao.service";

// Criando a instância do serviço de notificação
const notificacaoService = new NotificacaoService();

// Criando a instância do serviço de movimentação
const movimentacaoService = new MovimentacaoEstoqueService(notificacaoService);

// Adicionando observadores
notificacaoService.adicionarObserver((mensagem) => {
  console.log(`📢 Usuário recebeu notificação: ${mensagem}`);
});

notificacaoService.adicionarObserver((mensagem) => {
  console.log(`📢 Administrador recebeu notificação: ${mensagem}`);
});

// Simulando uma movimentação de estoque
movimentacaoService.registrarMovimentacao('Cabo de Rede', 'saída', 10);