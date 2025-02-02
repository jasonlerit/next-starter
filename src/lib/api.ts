export interface PostListResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
}

export const getPosts = async ({ pageParam = 0 }): Promise<PostListResponse> => {
  const limit = 20
  const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${pageParam}`)
  if (!response.ok) {
    throw new Error("Something went wrong")
  }
  return await response.json()
}
