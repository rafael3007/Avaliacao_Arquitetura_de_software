import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Material } from '../../materials/entities/material.entity';

@Entity()
export class MovimentacaoEstoque {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string; // 'entrada' ou 'saída'

  @Column()
  quantidade: number;

  @Column()
  data: Date;

  @ManyToOne(() => Material, (material) => material.movimentacoes)
  material: Material;
}