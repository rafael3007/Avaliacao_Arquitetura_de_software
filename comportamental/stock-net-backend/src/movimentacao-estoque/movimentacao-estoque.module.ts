import { Module } from '@nestjs/common';
import { MovimentacaoEstoqueService } from './movimentacao-estoque.service';
import { MovimentacaoEstoqueController } from './movimentacao-estoque.controller';

@Module({
  providers: [MovimentacaoEstoqueService],
  controllers: [MovimentacaoEstoqueController]
})
export class MovimentacaoEstoqueModule {}
