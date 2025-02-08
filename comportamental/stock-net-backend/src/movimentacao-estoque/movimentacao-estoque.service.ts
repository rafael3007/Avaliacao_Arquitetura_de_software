import { Injectable } from "@nestjs/common";
import type { NotificacaoService } from "src/notificacao/notificacao.service";

@Injectable()
export class MovimentacaoEstoqueService {
  constructor(private notificacaoService: NotificacaoService) {}

  registrarMovimentacao(
    material: string,
    tipo: string,
    quantidade: number
  ): void {
    // Lógica simulada para registrar a movimentação no estoque
    console.log(
      `Movimentação registrada: ${tipo} de ${quantidade} - ${material}`
    );

    // Notifica todos os observadores
    this.notificacaoService.notificar(
      `Alerta: ${quantidade} unidades de ${material} foram ${
        tipo === "entrada" ? "adicionadas" : "retiradas"
      } do estoque.`
    );
  }
}
