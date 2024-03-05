import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { CoreModule } from 'src/app/core/core.module'

import { LayoutModule } from 'src/app/shared/modules/layout/layout.module'

import { HomeRoutingModule } from 'src/app/modules/home/home-routing.module'
import { HomeHeroComponent } from 'src/app/modules/home/pages/home/home-hero/home-hero.component'
import { HomeProjectsComponent } from 'src/app/modules/home/pages/home/home-projects/home-projects.component'
import { HomeComponent } from 'src/app/modules/home/pages/home/home.component';
import { HomePresentationComponent } from './pages/home/home-presentation/home-presentation.component'

@NgModule({
  declarations: [HomeComponent, HomeHeroComponent, HomeProjectsComponent, HomePresentationComponent],
  imports: [CommonModule, HomeRoutingModule, CoreModule, LayoutModule],
})
export class HomeModule {}
