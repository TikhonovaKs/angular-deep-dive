import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  output,
  Output,
  viewChild,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent implements OnInit, AfterViewInit {
  // устаревший подход
  // @ViewChild('form') formEl? : ElementRef<HTMLFormElement>
  enteredTitle = '';
  enteredText = '';

  // новый подход с сигналом
  private formEl = viewChild.required<ElementRef<HTMLFormElement>>('form');

  add = output<{ title: string; text: string }>();

  ngOnInit(): void {
    console.log('On Init');
    console.log(this.formEl().nativeElement);
  }

  ngAfterViewInit(): void {
    console.log('After View Init');
    console.log(this.formEl().nativeElement);
  }

  onSubmit() {
    this.add.emit({ title: this.enteredTitle, text: this.enteredText });
    // устаревший подход
    // this.formEl?.nativeElement.reset(); // добавили nativeElement, так как здесь "ElementRef<HTMLFormElement>" форма будет обернута в ElementRef

    // // новый подход с сигналом
    // this.formEl().nativeElement.reset(); // добавили nativeElement, так как здесь "ElementRef<HTMLFormElement>" форма будет обернута в ElementRef

    this.enteredText = '';
    this.enteredTitle = '';
  }
}
