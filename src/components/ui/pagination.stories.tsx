import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

function BrandPagination({ firstPage = false }: { firstPage?: boolean }) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem><PaginationPrevious disabled={firstPage} /></PaginationItem>
        <PaginationItem><PaginationLink isActive={firstPage}>1</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink isActive={!firstPage}>2</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink>3</PaginationLink></PaginationItem>
        <PaginationItem><PaginationEllipsis /></PaginationItem>
        <PaginationItem><PaginationNext /></PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

const meta = {
  title: "Navigation/Pagination",
  component: BrandPagination,
  tags: ["stable"],
} satisfies Meta<typeof BrandPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const FirstPage: Story = { args: { firstPage: true } };
