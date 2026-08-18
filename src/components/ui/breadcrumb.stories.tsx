import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

function BrandBreadcrumb({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="#raidguild">RaidGuild</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        {collapsed ? (
          <><BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem><BreadcrumbSeparator /></>
        ) : (
          <><BreadcrumbItem><BreadcrumbLink href="#guide">Brand Guide</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /></>
        )}
        <BreadcrumbItem><BreadcrumbPage>Architecture</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

const meta = {
  title: "Navigation/Breadcrumb",
  component: BrandBreadcrumb,
  tags: ["stable"],
} satisfies Meta<typeof BrandBreadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Collapsed: Story = { args: { collapsed: true } };
