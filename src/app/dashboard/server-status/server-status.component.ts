import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})

// //implements OnInit добавляем это к классу чтобы видеть синтакс ошибки в ngOnInit (не правильно написал если)
// export class ServerStatusComponent implements OnInit, OnDestroy, AfterViewInit {
//   currentStatus: 'online' | 'offline' | 'unknown' = 'online';
//   private interval?: ReturnType<typeof setInterval>;

//   constructor() {}

//   //ngOnInit() вызывается один раз при инициализации компонента, что позволяет запустить любую начальную
//   // логику.
//   ngOnInit() {
//     console.log('on init')
//     this.interval = setInterval(() => {
//       const rnd = Math.random();

//       if (rnd < 0.5) {
//         this.currentStatus = 'online';
//       } else if (rnd < 0.9) {
//         this.currentStatus = 'offline';
//       } else {
//         this.currentStatus = 'unknown';
//       }
//     }, 5000);
//   }

//   ngAfterViewInit(): void {
//     console.log('after view init')
//   }

//   ngOnDestroy(): void {
// clearInterval(this.interval)
//   }
// }

// Современный дестрой
export class ServerStatusComponent implements OnInit, AfterViewInit {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('online') ;
  private destroyRef = inject(DestroyRef);

  constructor() {
    //эффект отслеживает состояние статуса и обновляет его
    effect(() => {
      console.log(this.currentStatus())
    })
  }

  ngOnInit() {
    console.log('on init');
    const interval = setInterval(() => {
      const rnd = Math.random();

      if (rnd < 0.5) {
        this.currentStatus.set('online');
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);

    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    });
  }

  ngAfterViewInit(): void {
    console.log('after view init');
  }
}
