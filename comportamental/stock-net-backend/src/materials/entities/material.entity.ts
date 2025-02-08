import { MovimentacaoEstoque } from "src/movimentacao-estoque/entities/movimentacao-estoque.entities";
import { Entity } from "typeorm";

@Entity()
export class Material {
  constructor(
    public descricao: string,
    public quantidade: number,
    public unidadeMedida: string
  ) {}

  exibirInfo(): void {
    console.log(
      `Material: ${this.descricao}, Quantidade: ${this.quantidade}, Unidade: ${this.unidadeMedida}`
    );
  }
}
