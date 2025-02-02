import { Post } from "@/app/_components/post"
import { getPosts, PostListResponse } from "@/lib/api"
import { getTestQueryClient, renderWithClient, sleep } from "@/lib/test"
import { screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

vi.mock("../../lib/api.ts")

describe("Post", () => {
  it("should render correctly", async () => {
    const queryClient = getTestQueryClient()

    const response: PostListResponse = {
      posts: [
        {
          id: 1,
          title: "Sample Title",
          body: "Sample Body",
          tags: ["Tag 1", "Tag 2", "Tag 3"],
          reactions: {
            likes: 100,
            dislikes: 0,
          },
          views: 100,
        },
      ],
      total: 0,
      limit: 0,
      skip: 0,
    }

    vi.mocked(getPosts).mockResolvedValue(response)

    renderWithClient(queryClient, <Post />)

    await sleep(100)

    expect(screen.getByText("Sample Title")).toBeDefined()
    expect(screen.getByText("Sample Body")).toBeDefined()
  })
})
