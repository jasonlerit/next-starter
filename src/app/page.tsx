import { getQueryClient } from "@/lib/react-query"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

export default function Home() {
  const queryClient = getQueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className='h-dvh grid place-content-center'>Hey</main>
    </HydrationBoundary>
  )
}
