export interface Todo {
  id?: number,
  description: string,
  assigned?: string,
}

export const exampleTodos: Todo[] = [
  {
    id: 1,
    description: 'Zrobienie zakupow spozywczych',
    assigned: 'Sbk'
  },
  {
    id: 2,
    description: 'Ugotowanie barszczu, zrobienie uszek itp.',
    assigned: 'Pysiek'
  },
  {
    id: 3,
    description: 'Ogarniecie oplatka',
    assigned: 'Zombi'
  },
  {
    id: 4,
    description: 'Zbiorka pieniedzy',
    assigned: 'Gruby'
  },
]