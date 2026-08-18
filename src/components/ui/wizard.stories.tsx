import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { Button } from "./button";
import { Wizard, type WizardStep } from "./wizard";

const steps: WizardStep[] = [
  {
    id: "reign",
    title: "Choose a reign",
    description: "Choose when this visual expression belongs.",
    component: <p className="type-body-md">Louchi is the latest RaidGuild reign.</p>,
  },
  {
    id: "practice",
    title: "Define the practice",
    description: "Choose where and for what the practice specializes.",
    component: (
      <p className="type-body-md">
        A practice can look distinct while drawing on the shared builder pool.
      </p>
    ),
  },
  {
    id: "provenance",
    title: "Confirm provenance",
    description: "Preserve the relationship to the Guild.",
    component: (
      <p className="type-body-md">
        A RaidGuild practice, operating through RaidGuild LLC.
      </p>
    ),
  },
];

function BrandSetupWizard({
  showProgress = true,
  showSummary = true,
}: {
  showProgress?: boolean;
  showSummary?: boolean;
}) {
  const [complete, setComplete] = useState(false);

  return (
    <div className="max-w-3xl">
      <Wizard
        steps={steps}
        showProgress={showProgress}
        showSummary={showSummary}
        onComplete={() => setComplete(true)}
      />
      <p aria-live="polite" className="mt-4 type-code-sm text-muted-foreground">
        {complete ? "Brand setup complete" : "Brand setup in progress"}
      </p>
    </div>
  );
}

function ValidatedWizard() {
  const [approved, setApproved] = useState(false);
  const [validationChecks, setValidationChecks] = useState(0);
  const validatedSteps: WizardStep[] = [
    {
      id: "review",
      title: "Review provenance",
      component: (
        <Button variant="secondary" onClick={() => setApproved(true)}>
          Approve provenance
        </Button>
      ),
      validation: () => {
        setValidationChecks((count) => count + 1);
        return approved;
      },
    },
    {
      id: "publish",
      title: "Publish guidance",
      component: <p className="type-body-md">The guidance is ready to publish.</p>,
    },
  ];

  return (
    <div className="max-w-3xl">
      <Wizard steps={validatedSteps} showSummary />
      <p aria-live="polite" className="mt-4 type-code-sm text-muted-foreground">
        Validation checks: {validationChecks}
      </p>
    </div>
  );
}

const meta = {
  title: "Experimental/Wizard",
  component: BrandSetupWizard,
  tags: ["experimental"],
  parameters: { a11y: { test: "todo" } },
} satisfies Meta<typeof BrandSetupWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutSummary: Story = {
  args: { showSummary: false },
};

export const WithoutProgress: Story = {
  args: { showProgress: false },
};

export const Interaction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "Choose a reign" }),
    ).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Next" }));
    await expect(
      canvas.getByRole("heading", { name: "Define the practice" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("listitem", { current: "step" }),
    ).toHaveTextContent("Define the practice");

    await userEvent.click(canvas.getByRole("button", { name: "Previous" }));
    await expect(
      canvas.getByRole("heading", { name: "Choose a reign" }),
    ).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Next" }));
    await userEvent.click(canvas.getByRole("button", { name: "Next" }));
    await expect(
      canvas.getByRole("heading", { name: "Confirm provenance" }),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Complete" }));
    await expect(canvas.getByText("Brand setup complete")).toBeVisible();
  },
};

export const Validation: Story = {
  render: () => <ValidatedWizard />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Next" }));
    await expect(
      canvas.getByRole("heading", { name: "Review provenance" }),
    ).toBeVisible();
    await expect(canvas.getByText("Validation checks: 1")).toBeVisible();

    await userEvent.click(
      canvas.getByRole("button", { name: "Approve provenance" }),
    );
    await userEvent.click(canvas.getByRole("button", { name: "Next" }));
    await expect(
      canvas.getByRole("heading", { name: "Publish guidance" }),
    ).toBeVisible();
    await expect(canvas.getByText("Validation checks: 2")).toBeVisible();
  },
};
