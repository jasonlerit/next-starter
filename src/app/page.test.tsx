import Page from "@/app/page"
import { ReactQueryClientProvider } from "@/components/shared/react-query-client-provider"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

describe("Page", () => {
  it("should render correctly", () => {
    render(
      <ReactQueryClientProvider>
        <Page />
      </ReactQueryClientProvider>
    )
    expect(screen.getByText("Hey")).toBeDefined()
  })
})
