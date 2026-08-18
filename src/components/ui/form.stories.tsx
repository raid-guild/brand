import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useForm } from "react-hook-form";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { z } from "zod";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RequiredFieldIndicator,
} from "./form";
import { Input } from "./input";

const applicationSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  terms: z.boolean().refine((value) => value, {
    message: "Accept the operating terms",
  }),
});

type ApplicationValues = z.infer<typeof applicationSchema>;

type GuildApplicationFormProps = {
  initialState?: "empty" | "error" | "submitting" | "completed";
};

function GuildApplicationForm({
  initialState = "empty",
}: GuildApplicationFormProps) {
  const [completed, setCompleted] = useState(initialState === "completed");
  const form = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      email: initialState === "completed" ? "archer@raidguild.org" : "",
      terms: initialState === "completed",
    },
  });

  useEffect(() => {
    if (initialState !== "error") return;
    form.setError("email", { message: "Enter a valid email" });
    form.setError("terms", { message: "Accept the operating terms" });
  }, [form, initialState]);

  if (completed) {
    return (
      <div className="max-w-md rounded-lg border border-border bg-card p-6">
        <p className="type-label text-muted-foreground">Application received</p>
        <h2 className="type-heading-sm mt-2">Ready for the next encounter.</h2>
        <p role="status" className="type-body-md mt-2 text-muted-foreground">
          We’ll follow up at {form.getValues("email")}.
        </p>
      </div>
    );
  }

  const submitting = initialState === "submitting";

  return (
    <Form {...form}>
      <form
        className="max-w-md space-y-5 rounded-lg border border-border bg-card p-6"
        onSubmit={form.handleSubmit(() => setCompleted(true))}
        noValidate
      >
        <div>
          <p className="type-label text-muted-foreground">Guild application</p>
          <h2 className="type-heading-sm mt-2">Join the next expedition.</h2>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <RequiredFieldIndicator />
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="archer@raidguild.org"
                  aria-required="true"
                  disabled={submitting}
                />
              </FormControl>
              <FormDescription>
                We’ll use this address for application updates.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex items-start gap-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-required="true"
                  disabled={submitting}
                />
              </FormControl>
              <div className="grid gap-1">
                <FormLabel>
                  Accept the operating terms <RequiredFieldIndicator />
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={submitting}>
          {submitting ? "Submitting…" : "Submit application"}
        </Button>
      </form>
    </Form>
  );
}

const meta = {
  title: "Experimental/Form",
  component: GuildApplicationForm,
  tags: ["experimental"],
  parameters: { a11y: { test: "todo" } },
} satisfies Meta<typeof GuildApplicationForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: { initialState: "error" },
};

export const Submitting: Story = {
  args: { initialState: "submitting" },
};

export const Completed: Story = {
  args: { initialState: "completed" },
};

export const Interaction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submit = canvas.getByRole("button", { name: "Submit application" });

    await userEvent.click(submit);
    await expect(await canvas.findByText("Email is required")).toBeVisible();
    await expect(
      canvas.getAllByText("Accept the operating terms")[1],
    ).toBeVisible();
    await expect(canvas.getByLabelText(/Email/)).toHaveAttribute(
      "aria-invalid",
      "true",
    );

    await userEvent.type(canvas.getByLabelText(/Email/), "archer@raidguild.org");
    await userEvent.click(canvas.getByRole("checkbox"));
    await userEvent.click(submit);

    await waitFor(() =>
      expect(canvas.getByRole("status")).toHaveTextContent(
        "We’ll follow up at archer@raidguild.org.",
      ),
    );
  },
};
