import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Material } from "./entities/material.entity";
import type { Repository } from "typeorm";

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>
  ) {}

  async findAll(): Promise<Material[]> {
    return this.materialRepository.find();
  }

  async findOne({ materialId }: { materialId: number }): Promise<Material> {
    const material = await this.materialRepository.findOne({
      where: { id: materialId },
    });

    if (!material) {
      throw new Error(`Material with id ${materialId} not found.`);
    }

    return material
  }

  async updateQuantidade(id: number, quantidade: number): Promise<void> {
    await this.materialRepository.update(id, { quantidade });
  }
}
