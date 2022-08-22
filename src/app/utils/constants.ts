enum PagesEnum {
  Events = 0,
  Login = 1,
  DashboardEvents = 2,
  DashboardUsers = 3,
}

enum CategoriesEnum {
  Todos = '',
  Festas_Shows = 'Festas e Shows',
  Congressos_Palestras = 'Congressos e Palestras',
  Cursos_Workshops = 'Cursos e Workshops',
  Esportes = 'Esportes',
  Arte_Cinema_Lazer = 'Arte, Cinema e Lazer'
}

enum DatesEnum {
  Todos = '',
  Hoje = 'Hoje',
  Amanha = 'Amanhã',
  Esta_Semana = 'Esta semana',
  Fim_Semana = 'Este fim de semana',
  Prox_Semana = 'Próxima semana',
  Este_Mes = 'Este mês'
}

export {
  PagesEnum,
  CategoriesEnum,
  DatesEnum,
}
