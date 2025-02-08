import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Material } from "./entities/material.entity";
import type { Repository } from "typeorm";
import type { MaterialConcretoFactory } from "./materials.factory";

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,

    private materialFactory: MaterialConcretoFactory // Injetando a Factory
  ) {}

  async criarNovoMaterial(
    descricao: string,
    quantidade: number,
    unidadeMedida: string
  ): Promise<Material> {
    const novoMaterial = this.materialFactory.criarMaterial(
      descricao,
      quantidade,
      unidadeMedida
    );

    return await this.materialRepository.save(novoMaterial);
  }
}
