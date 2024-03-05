import { Component } from '@angular/core';

@Component({
  selector: 'app-home-projects',
  templateUrl: './home-projects.component.html',
  styleUrls: ['./home-projects.component.scss'],
})
export class HomeProjectsComponent {
  projects: Project[] = this.generatePRojects();

  formattedIndex(index: number): string {
    let realIndex = index + 1;
    return (realIndex + 1 < 10 ? '0' : '') + realIndex;
  }

  private generatePRojects(): Project[] {
    return [
      new Project('Старт', ['Ліквідація ДАБІ', 'Створення Сервісної служби']),
      new Project('Березень - Травень 2020', [
        'Перехідний період',
        'Мораторій на інспекційний держконтроль',
      ]),
      new Project('Червень 2020', ['Створення ДІМ', 'Запуск нового реєстру']),
      new Project('Вересень 2020', [
        'Державне агентство з питань технічного регулювання у містобудуванні',
      ]),
      new Project('Січень 2021', ['Запровадження страхування']),
    ];
  }
}

class Project {
  constructor(public date: string, public tasks: string[]) {}
}
