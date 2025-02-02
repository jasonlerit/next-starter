import Page from "@/app/page"
import { getTestQueryClient, renderWithClient } from "@/lib/test"
import { screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

describe("Page", () => {
  it("should render correctly", async () => {
    const queryClient = getTestQueryClient()

    await queryClient.prefetchInfiniteQuery({
      queryKey: ["posts"],
      queryFn: () => {
        return {
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
              userId: 1,
            },
          ],
        }
      },
      initialPageParam: 0,
    })

    renderWithClient(queryClient, <Page />)

    expect(screen.getByText("Sample Title")).toBeDefined()
    expect(screen.getByText("Sample Body")).toBeDefined()
  })
})
