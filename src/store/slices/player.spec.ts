import { describe, it, expect } from 'vitest'
import { player as reducer, play, next, PlayerState } from './player'

const exampleStateInitial: PlayerState = {
  course: {
    id: 1,
    modules: [
      {
        id: 1,
        title: 'Iniciando com React',
        lessons: [
          {
            id: 'pmXfvd6Zqg4',
            title: 'Deploy backend',
            duration: '25:52',
          },
          {
            id: 'w-DW4DhDfcw',
            title: 'Estilização do Post',
            duration: '10:05',
          },
        ],
      },
      {
        id: 2,
        title: 'Estrutura da aplicação',
        lessons: [
          {
            id: 'gE48FQXRZ_o',
            title: 'Componente: Comment',
            duration: '13:45',
          },
          { id: 'Ng_Vk4tBl0g', title: 'Responsividade', duration: '10:05' },
        ],
      },
    ],
  },
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: false,
}

describe('player slice', () => {
  it('should be able to play', () => {
    const state = reducer(exampleStateInitial, play([1, 2]))

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(2)
  })

  it('should be able to play next video automaticaly', () => {
    const state = reducer(exampleStateInitial, next())

    expect(state.currentModuleIndex).toEqual(0)
    expect(state.currentLessonIndex).toEqual(1)
  })

  it('should be able to jump to the next module automaticaly', () => {
    const state = reducer(
      { ...exampleStateInitial, currentLessonIndex: 1 },
      next(),
    )

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(0)
  })

  it('should not update the current module an lesson index if there is no next lesson available', () => {
    const state = reducer(
      { ...exampleStateInitial, currentModuleIndex: 1, currentLessonIndex: 1 },
      next(),
    )

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(1)
  })
})
