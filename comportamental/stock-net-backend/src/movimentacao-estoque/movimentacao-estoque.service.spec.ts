import { Test, TestingModule } from '@nestjs/testing';
import { MovimentacaoEstoqueService } from './movimentacao-estoque.service';

describe('MovimentacaoEstoqueService', () => {
  let service: MovimentacaoEstoqueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovimentacaoEstoqueService],
    }).compile();

    service = module.get<MovimentacaoEstoqueService>(MovimentacaoEstoqueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
