import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificacaoService {
  private observers: ((message: string) => void)[] = [];

  adicionarObserver(observer: (message: string) => void) {
    this.observers.push(observer);
  }

  notificar(message: string) {
    this.observers.forEach((observer) => observer(message));
  }
}
