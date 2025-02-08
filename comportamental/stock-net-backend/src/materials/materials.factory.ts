import { Injectable } from '@nestjs/common';
import { Material } from '../materials/entities/material.entity';

export abstract class MaterialFactory {
  abstract criarMaterial(
    descricao: string,
    quantidade: number,
    unidadeMedida: string
  ): Material;
}

@Injectable()
export class MaterialConcretoFactory extends MaterialFactory {
  criarMaterial(
    descricao: string,
    quantidade: number,
    unidadeMedida: string
  ): Material {
    const material = new Material();
    material.descricao = descricao;
    material.quantidade = quantidade;
    material.unidadeMedida = unidadeMedida;
    return material;
  }
}