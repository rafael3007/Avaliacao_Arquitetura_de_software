import { Module } from '@nestjs/common';
import { NotificacaoService } from './notificacao.service';
import { NotificacaoController } from './notificacao.controller';

@Module({
  providers: [NotificacaoService],
  controllers: [NotificacaoController]
})
export class NotificacaoModule {}
