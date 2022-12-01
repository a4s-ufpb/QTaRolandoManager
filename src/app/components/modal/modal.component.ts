import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  // @Input() showModal!: boolean;

  @Input() showModal: boolean = false;

  @Input() bgColor: string = 'var(--placeholder-color)';

  @Input() icon: string = 'eva-question-mark';

  @Input() title: string = '';

  @Input() message: string = '';

  @Input() confirmText: string = 'Confirmar';

  @Input() cancelText: string = 'Cancelar';

  @Input() confirmBtn!: () => void;
  @Input() cancelBtn!: () => void;
  @Input() closeBtn!: () => void;

  constructor() { }

}
