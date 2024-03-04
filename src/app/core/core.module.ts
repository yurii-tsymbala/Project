import { ModuleWithProviders, NgModule } from '@angular/core'

import { AccessibilityContextDirective } from 'src/app/core/directives/accessibility-context.directive'
import { HttpCodeDirective } from 'src/app/core/directives/http-code.directive'
import { BuiltinApidProvider } from 'src/app/core/interceptors/builtin-api.interceptor'
import { DividesSplitPipe } from 'src/app/core/pipes/divides-split.pipe'
import { MemoizePipe } from 'src/app/core/pipes/memoize.pipe'
import { SafePipe } from 'src/app/core/pipes/safe.pipe'
import { YoutubeCodePipe } from 'src/app/core/pipes/youtube-code.pipe'

@NgModule({
  declarations: [SafePipe, DividesSplitPipe, YoutubeCodePipe, MemoizePipe, HttpCodeDirective, AccessibilityContextDirective],
  imports: [],
  exports: [SafePipe, DividesSplitPipe, YoutubeCodePipe, MemoizePipe, HttpCodeDirective, AccessibilityContextDirective],
  providers: [BuiltinApidProvider],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return <ModuleWithProviders<CoreModule>>{
      ngModule: CoreModule,
      providers: [BuiltinApidProvider],
    }
  }
}
