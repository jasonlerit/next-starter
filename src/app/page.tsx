import { Post } from "@/app/_components/post"
import { getPosts } from "@/lib/api"
import { getQueryClient } from "@/lib/react-query"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

export default function Home() {
  const queryClient = getQueryClient()

  queryClient.prefetchInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.skip >= lastPage.total) {
        return undefined
      }
      return lastPage.skip + lastPage.limit
    },
    pages: 3,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className='container mx-auto p-4'>
        <Post />
      </main>
    </HydrationBoundary>
  )
}
