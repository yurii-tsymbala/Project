import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { CoreModule } from 'src/app/core/core.module'

import { LayoutModule } from 'src/app/shared/modules/layout/layout.module'
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { HomeRoutingModule } from 'src/app/modules/home/home-routing.module'
import { HomeHeroComponent } from 'src/app/modules/home/pages/home/home-hero/home-hero.component'
import { HomeProjectsComponent } from 'src/app/modules/home/pages/home/home-projects/home-projects.component'
import { HomeComponent } from 'src/app/modules/home/pages/home/home.component';
import { HomePresentationComponent } from './pages/home/home-presentation/home-presentation.component';
import { HomeCorruptionComponent } from './pages/home/home-corruption/home-corruption.component';
import { HomeNewsComponent } from './pages/home/home-news/home-news.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

@NgModule({
  declarations: [HomeComponent, HomeHeroComponent, HomeProjectsComponent, HomePresentationComponent, HomeCorruptionComponent, HomeNewsComponent],
  imports: [CommonModule, HomeRoutingModule, CoreModule, LayoutModule, ReactiveFormsModule, FormsModule],
  providers: [NgbModalConfig, NgbModal]
})
export class HomeModule {}
