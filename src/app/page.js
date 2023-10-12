"use client";

import { GlobalContext } from "@/context"
import { useContext } from "react"

export default function Home() {
  const { isAuthUser, user } = useContext(GlobalContext)
  console.log(isAuthUser, user)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Well Come To React NextJs</h1>
    </main>
  )
}
