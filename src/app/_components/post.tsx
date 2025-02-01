"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getPosts } from "@/lib/api"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Eye, Loader2, ThumbsDown, ThumbsUp } from "lucide-react"
import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"

export const Post = () => {
  const { ref, inView } = useInView()

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.skip >= lastPage.total) {
        return undefined
      }
      return lastPage.skip + lastPage.limit
    },
  })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <div className='flex flex-col items-center gap-4'>
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.posts.map((post) => (
            <Card key={post.id} className='w-full md:w-96'>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{post.body}</p>
              </CardContent>
              <CardFooter className='flex items-center gap-4'>
                <div className='flex items-center gap-2'>
                  <ThumbsUp size={16} />
                  {post.reactions.likes}
                </div>
                <div className='flex items-center gap-2'>
                  <ThumbsDown size={16} />
                  {post.reactions.dislikes}
                </div>
                <div className='flex items-center gap-2'>
                  <Eye size={16} />
                  {post.views}
                </div>
              </CardFooter>
            </Card>
          ))}
        </React.Fragment>
      ))}
      {isLoading && (
        <React.Fragment>
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className='w-full md:w-96'>
              <CardHeader>
                <CardTitle>
                  <Skeleton className='w-20 h-5' />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className='w-full h-5' />
              </CardContent>
              <CardFooter className='flex items-center gap-4'>
                <Skeleton className='w-40 h-5' />
              </CardFooter>
            </Card>
          ))}
        </React.Fragment>
      )}
      {!isLoading && isFetching && <Loader2 className='animate-spin' />}
      {!isLoading && !isFetching && hasNextPage && <div ref={ref} />}
    </div>
  )
}
