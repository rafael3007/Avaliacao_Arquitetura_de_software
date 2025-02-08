import { MovimentacaoEstoque } from "src/movimentacao-estoque/entities/movimentacao-estoque.entities";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @Column()
  quantidade: number;

  @Column()
  unidadeMedida: string;

  @OneToMany(() => MovimentacaoEstoque, (movimentacao) => movimentacao.material)
  movimentacoes: MovimentacaoEstoque[];
}
