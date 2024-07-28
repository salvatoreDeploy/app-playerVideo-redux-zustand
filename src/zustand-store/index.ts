import { create } from 'zustand'
import { api } from '../lib/axios'

interface Course {
  id: number
  modules: {
    id: number
    title: string
    lessons: {
      id: string
      title: string
      duration: string
    }[]
  }[]
}

export interface PlayerState {
  course: Course | null
  currentModuleIndex: number
  currentLessonIndex: number
  isLoading: boolean

  load: () => Promise<void>
  play: (moduleAndLessonIndex: [number, number]) => void
  next: () => void
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentLessonIndex: 0,
    currentModuleIndex: 0,
    isLoading: true,

    load: async () => {
      set({ isLoading: true })

      const response = await api.get('/courses/1')

      set({
        course: response.data,
      })

      set({ isLoading: false })
    },

    play: (moduleAndLessonIndex: [number, number]) => {
      const [moduleIndex, lessonIndex] = moduleAndLessonIndex

      set({
        currentModuleIndex: moduleIndex,
      })

      set({
        currentLessonIndex: lessonIndex,
      })
    },

    next: () => {
      const { currentLessonIndex, currentModuleIndex, course } = get()

      const nextLessonIndex = currentLessonIndex + 1
      const nextLesson =
        course?.modules[currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson) {
        set({ currentLessonIndex: nextLessonIndex })
      } else {
        const nextModuleIndex = currentModuleIndex + 1
        const nextModule = course?.modules[nextModuleIndex]

        if (nextModule) {
          set({
            currentModuleIndex: nextModuleIndex,
          })
          set({
            currentLessonIndex: 0,
          })
        }
      }
    },
  }
})

export const useCurrentLesson = () => {
  return useStore((state) => {
    const { currentModuleIndex, currentLessonIndex } = state

    const curretModule = state.course?.modules[currentModuleIndex]
    const currentLesson = curretModule?.lessons[currentLessonIndex]

    return { curretModule, currentLesson }
  })
}
