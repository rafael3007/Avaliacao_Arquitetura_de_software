import { Injectable } from "@nestjs/common";
import { MovimentacaoEstoque } from "./entities/movimentacao-estoque.entities";
import type { MaterialsService } from "src/materials/materials.service";
import type { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class MovimentacaoEstoqueService {
  constructor(
    @InjectRepository(MovimentacaoEstoque)
    private movimentacaoRepository: Repository<MovimentacaoEstoque>,
    private materialsService: MaterialsService
  ) {}

  async registrarMovimentacao(
    materialId: number,
    tipo: string,
    quantidade: number
  ): Promise<MovimentacaoEstoque> {
    const material = await this.materialsService.findOne({materialId});

    if (tipo === "saída" && material.quantidade < quantidade) {
      throw new Error("Quantidade insuficiente em estoque");
    }

    const movimentacao = this.movimentacaoRepository.create({
      tipo,
      quantidade,
      data: new Date(),
      material,
    });

    await this.movimentacaoRepository.save(movimentacao);

    // Atualiza a quantidade no estoque
    const novaQuantidade =
      tipo === "entrada"
        ? material.quantidade + quantidade
        : material.quantidade - quantidade;
    await this.materialsService.updateQuantidade(materialId, novaQuantidade);

    return movimentacao;
  }
}
