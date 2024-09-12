import {
  Component,
  contentChild,
  ContentChild,
  ElementRef,
  HostBinding,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  //нужно чтобы input и textarea в другом компоненте
  //  получили стили из стилей control <ng-content select="input, textarea" />
  // получается глобальная видимость стилей
  host: {
    class: 'control',
    '(click)': 'onClick()',
  },
})
export class ControlComponent {
  // @HostBinding('class') className = 'control'
  label = input.required<string>();

  private el = inject(ElementRef); // позволяет отслеживать на каком именно элементе сработало событие

  // старая версия
  // @ContentChild('input') private control?: ElementRef<
  //   HTMLInputElement | HTMLTextAreaElement
  // >;
  // использование сигнал
  private control =
    contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  onClick() {
    console.log('clicked');
    console.log(this.el);

    // старая версия
    // console.log(this.control);
    // использование сигнал
    console.log(this.control());
  }
}
