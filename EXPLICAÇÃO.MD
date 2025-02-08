# Stock Net - Implementação de Padrões de Projeto

Este projeto demonstra a aplicação de três padrões de projeto no contexto de um sistema de gerenciamento de estoque:

- **N-Camadas** (Padrão Arquitetural)
- **Factory Method** (Padrão Criacional)
- **Observer** (Padrão Comportamental)

Cada padrão foi implementado separadamente para exemplificar sua utilização.

---

## 1. N-Camadas (Padrão Arquitetural)

### **Explicação**

A arquitetura **N-Camadas** divide a aplicação em múltiplas camadas lógicas, garantindo separação de responsabilidades. As camadas típicas incluem:

- **Camada de Apresentação** (Front-end) - Interface com o usuário.
- **Camada de Negócios** (Back-end) - Processamento das regras de negócio.
- **Camada de Dados** (Banco de Dados) - Armazena e gerencia os dados.

Essa arquitetura melhora a escalabilidade, manutenibilidade e modularidade do sistema.

### **Como foi aplicado**

No **Stock Net**, utilizamos a arquitetura **N-Camadas** separando as responsabilidades em:

- **Controllers**: Gerenciam as requisições HTTP.
- **Services**: Contêm a lógica de negócios.
- **Repositories**: Lidam com o banco de dados.

#### **Exemplo de Implementação**

```typescript
// materials.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialsService.create(createMaterialDto);
  }

  @Get()
  findAll() {
    return this.materialsService.findAll();
  }
}
```

```typescript
// materials.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './entities/material.entity';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
  ) {}

  async create(material: Material): Promise<Material> {
    return this.materialRepository.save(material);
  }

  async findAll(): Promise<Material[]> {
    return this.materialRepository.find();
  }
}
```

### **Benefícios da Arquitetura N-Camadas**

✅ Melhor organização do código. ✅ Maior facilidade na manutenção e escalabilidade. ✅ Permite substituição ou atualização de camadas individuais sem afetar o restante do sistema.

---

## 2. Factory Method (Padrão Criacional)

### **Explicação**

O **Factory Method** é um padrão criacional que define uma interface para criar objetos, mas permite que as subclasses alterem o tipo de objetos que serão criados. Ele melhora a manutenção do código ao centralizar a lógica de criação de objetos.

### **Como foi aplicado**

No contexto do sistema **Stock Net**, criamos uma **fábrica de materiais** para centralizar a lógica de criação de objetos `Material`.

#### **Implementação**

```typescript
// material.factory.ts
import { Material } from './material.entity';

export abstract class MaterialFactory {
  abstract criarMaterial(
    descricao: string,
    quantidade: number,
    unidadeMedida: string
  ): Material;
}

export class MaterialConcretoFactory extends MaterialFactory {
  criarMaterial(
    descricao: string,
    quantidade: number,
    unidadeMedida: string
  ): Material {
    return new Material(descricao, quantidade, unidadeMedida);
  }
}
```

#### **Uso da Factory**

```typescript
// main.ts
import { MaterialConcretoFactory } from './material.factory';

const factory = new MaterialConcretoFactory();
const caboRede = factory.criarMaterial('Cabo de Rede', 100, 'metros');
console.log(caboRede);
```

### **Benefícios do Factory Method**

✅ Centraliza a criação de objetos em um só lugar.\
✅ Facilita a manutenção e expansão do sistema.\
✅ Permite a criação de diferentes tipos de materiais sem modificar a lógica existente.

---

## 3. Observer (Padrão Comportamental)

### **Explicação**

O **Observer** é um padrão comportamental que define uma dependência **1-para-muitos** entre objetos. Quando um objeto muda de estado, todos os seus observadores são notificados automaticamente.

### **Como foi aplicado**

No sistema **Stock Net**, usamos o **Observer** para notificar automaticamente os usuários quando houver uma movimentação de estoque.

#### **Implementação**

```typescript
// notificacao.service.ts
export class NotificacaoService {
  private observers: ((message: string) => void)[] = [];

  adicionarObserver(observer: (message: string) => void) {
    this.observers.push(observer);
  }

  notificar(message: string) {
    this.observers.forEach((observer) => observer(message));
  }
}
```

#### **Uso do Observer**

```typescript
// main.ts
import { NotificacaoService } from './notificacao.service';
import { MovimentacaoEstoqueService } from './movimentacao.service';

const notificacaoService = new NotificacaoService();
const movimentacaoService = new MovimentacaoEstoqueService(notificacaoService);

notificacaoService.adicionarObserver((mensagem) => {
  console.log(`📢 Usuário recebeu notificação: ${mensagem}`);
});

notificacaoService.adicionarObserver((mensagem) => {
  console.log(`📢 Administrador recebeu notificação: ${mensagem}`);
});

movimentacaoService.registrarMovimentacao('Cabo de Rede', 'saída', 10);
```

### **Benefícios do Observer**

✅ Desacopla a lógica de notificações do serviço de movimentação.\
✅ Permite adicionar novos observadores sem modificar o código existente.\
✅ Melhora a escalabilidade do sistema.

---

## 📌 Conclusão

Neste projeto, implementamos três padrões de projeto:

1. **N-Camadas**, para estruturar a aplicação de forma modular e escalável.
2. **Factory Method**, para centralizar e padronizar a criação de materiais.
3. **Observer**, para notificar automaticamente os usuários sobre movimentações no estoque.

Todos os padrões ajudam a tornar o sistema mais organizado, flexível e fácil de manter. 🚀

