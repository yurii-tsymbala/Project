import { animate, style, transition, trigger } from '@angular/animations'

export const toggleHeight = trigger('toggleHeight', [
  transition(':enter', [style({ height: 0 }), animate(500, style({ height: '*' }))]),
  transition(':leave', [animate(500, style({ height: 0 }))]),
])
