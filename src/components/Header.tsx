/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */

import { useCurrentLesson } from "../zustand-store"

export function Header() {

  const { currentLesson, curretModule } = useCurrentLesson()

  if (!currentLesson || !curretModule) {
    return null
  }
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{currentLesson.title}</h1>

      <span className="text-sm text-zinc-400">Modulo: "{curretModule.title}"</span>
    </div>
  )
}
