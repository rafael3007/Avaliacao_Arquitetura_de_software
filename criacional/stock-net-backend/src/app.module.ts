import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Material } from "./materials/entities/material.entity";
import { MovimentacaoEstoque } from "./movimentacao-estoque/entities/movimentacao-estoque.entities";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: ":memory:",
      entities: [Material, MovimentacaoEstoque],
      synchronize: true, // Cria automaticamente as tabelas no banco de dados (apenas para desenvolvimento)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
