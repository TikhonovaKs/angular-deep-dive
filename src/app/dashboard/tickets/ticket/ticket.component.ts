import { Component, input, output, signal } from '@angular/core';
import { Ticket } from './ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  data = input.required<Ticket>();

  complite = output();

  detailVisible = signal(false);

  onToggleDetail() {
    // this.detailVisible.set(!this.detailVisible())
    this.detailVisible.update((wasVisible) => !wasVisible);
  }

  onMarkAsComplited() {
    this.complite.emit();
  }
}
