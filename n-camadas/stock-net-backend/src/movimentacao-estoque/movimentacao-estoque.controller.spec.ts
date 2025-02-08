import { Test, TestingModule } from '@nestjs/testing';
import { MovimentacaoEstoqueController } from './movimentacao-estoque.controller';

describe('MovimentacaoEstoqueController', () => {
  let controller: MovimentacaoEstoqueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovimentacaoEstoqueController],
    }).compile();

    controller = module.get<MovimentacaoEstoqueController>(MovimentacaoEstoqueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
