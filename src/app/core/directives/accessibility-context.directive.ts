import { Directive } from '@angular/core'

import { ContrastMode } from 'src/app/core/interfaces/accessibility'
import { AccessibilityService } from 'src/app/core/services/accessibility.service'

@Directive({
  selector: '[appAccessibilityContext]',
  exportAs: 'accessibilityContext',
})
export class AccessibilityContextDirective {
  ContrastMode = ContrastMode
  constructor(public accessibilityService: AccessibilityService) {}
}
