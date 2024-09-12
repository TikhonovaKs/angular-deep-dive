import { Component } from '@angular/core';

@Component({
  selector: 'button[appButton]', //name of atribute. можно добавить к button [appButton], это означает что все кнопки с атрибутом appButton будут под этим контроллером
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {}
