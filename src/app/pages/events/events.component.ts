import { EventModel } from "src/app/models/EventModel";
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CategoriesEnum, DatesEnum } from 'src/app/utils/constants';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {

  @ViewChild('categories_option') categoriesOption!: ElementRef;
  @ViewChild('categories_toggle') categoriesToggle!: ElementRef;
  @ViewChild('categories_menu') categoriesMenu!: ElementRef;
  @ViewChild('category_seleted') categorySelectedElement!: ElementRef;

  @ViewChild('date_option') dateOption!: ElementRef;
  @ViewChild('date_toggle') dateToggle!: ElementRef;
  @ViewChild('date_menu') dateMenu!: ElementRef;
  @ViewChild('date_seleted') dateSelectedElement!: ElementRef;

  categorySelected: number = 0;
  dateSelected: number = 0;

  // events: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6];
  events: EventModel[] = Array.from(Array(30), (val, index) => ({
    id: index,
    title: index % 2 == 0 ? "Curso Preparatório" : "Título do evento",
    subtitle: index % 2 == 0 ? "ENEM 2022" : "cadastrado",
    categoryId: index % 2 == 0 ? 3 : 1,
    description: `<p><b><u>Mais Enem e Educar Transforma somam forças em Curso Preparatório para o ENEM</u></b></p>
    <br>
    <p>O cursinho é gratuito e voltado para alunos de escolas públicas e privadas que não tenham condições de custear uma preparação adequada para o Exame Nacional do Ensino Médio (ENEM). Temos como objetivo promover o aprendizado e o desenvolvimento dos alunos a partir dos conhecimentos e competências exigidos no ENEM, favorecendo o estudo e o ingresso dos mesmos em instituições de ensino superior.</p>
    <br>
    <p>Contamos com uma excelente equipe de professores dispostos a contribuir com o sucesso na prova do ENEM.</p>
    <br>
    <p>As aulas acontecerão <b>todos os sábados (08h as 12h)</b> até a data das provas, no auditório da Igreja Evangélica Batista de João Pessoa.</p>
    <br>
    <p>Para mais informações, siga @alexandreinocencios e @somosgenesis no Instagram.</p>`,
    initialDate: new Date(2022, 4, 7, 15, 0, 0, 0),
    finalDate: new Date(2022, 11, 31, 18, 0, 0, 0),
    imagePath: index % 2 == 0 ? "https://images.sympla.com.br/624754ced5cf4-lg.png" : "",
    eventModalityId: 1,
    location: index % 2 == 0 ? "Igreja Evangélica Batista de João Pessoa, João Pessoa-PB" : "Local, Estado-PB",
    phone: "blabla",
    site: "blabla",
  } as EventModel));

  currentPage: number = 1;

  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target !== this.categoriesToggle.nativeElement && e.target !== this.categoriesMenu.nativeElement) {
        if (this.categoriesOption.nativeElement.classList.contains("active")) {
          this.categoriesOption.nativeElement.classList.remove("active");
        }
      } if (e.target !== this.dateToggle.nativeElement && e.target !== this.dateMenu.nativeElement) {
        if (this.dateOption.nativeElement.classList.contains("active")) {
          this.dateOption.nativeElement.classList.remove("active");
        }
      }
    });
  }

  ngOnInit(): void {
  }

  openCategoriesFilter() {
    this.categoriesOption.nativeElement.classList.toggle("active");
  }

  getCategoriesValues(): Array<string> {
    const keys = Object.keys(CategoriesEnum);
    return keys.map(el => Object(CategoriesEnum)[el]).filter(value => value != '');
  }

  selectCategory(category: string) {
    const indexOfS = Object.values(CategoriesEnum).indexOf(category as unknown as CategoriesEnum);

    this.categorySelected = indexOfS;
    if (category == '') {
      this.categorySelectedElement.nativeElement.innerText = 'Categorias';
    } else {
      this.categorySelectedElement.nativeElement.innerText = Object.values(CategoriesEnum)[this.categorySelected];
    }
  }

  openDatesFilter() {
    this.dateOption.nativeElement.classList.toggle("active");
  }

  getDatesValues(): Array<string> {
    const keys = Object.keys(DatesEnum);
    return keys.map(el => Object(DatesEnum)[el]).filter(value => value != '');
  }

  selectDate(date: string) {
    const indexOfS = Object.values(DatesEnum).indexOf(date as unknown as DatesEnum);

    this.dateSelected = indexOfS;
    if (date == '') {
      this.dateSelectedElement.nativeElement.innerText = 'Data';
    } else {
      this.dateSelectedElement.nativeElement.innerText = Object.values(DatesEnum)[this.dateSelected];
    }
  }

}
