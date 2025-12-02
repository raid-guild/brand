"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RequiredFieldIndicator,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Form validation schema
const formSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(1, "Please select a role"),
  bio: z.string().optional(),
  newsletter: z.boolean(),
  terms: z.boolean().refine((val: boolean) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function FormExample() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
      role: "",
      bio: "",
      newsletter: false,
      terms: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully! Check console for data.");
  };

  return (
    <section id="form">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-heading-md">Form</h2>
        <div className="flex items-center gap-4">
          <Link
            href="#advanced-top"
            className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/ui/form.tsx"
            className="type-body-sm text-primary hover:text-primary/80 transition-colors underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code →
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/examples/FormExample.tsx"
            className="type-body-sm text-primary hover:text-primary/80 transition-colors underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Example code →
          </Link>
        </div>
      </div>
      <div className="space-y-6">
        <div className="p-6 border border-border rounded-lg bg-muted/30">
          <h3 className="type-heading-sm mb-4">Component Overview</h3>
          <p className="type-body-base text-muted-foreground mb-4">
            The Form component system is built on React Hook Form and provides a
            complete solution for building accessible, validated forms. It
            includes automatic error handling, required field indicators, and
            seamless integration with validation libraries like Zod.
          </p>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Live Example</h3>
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>User Registration Form</CardTitle>
              <CardDescription>
                Example form with required and optional fields, validation, and
                error handling.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
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
                            placeholder="user@example.com"
                          />
                        </FormControl>
                        <FormDescription>
                          Your email address will be used for account
                          notifications.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Full Name <RequiredFieldIndicator />
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="John Doe" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Role <RequiredFieldIndicator />
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="warrior">Warrior</SelectItem>
                            <SelectItem value="wizard">Wizard</SelectItem>
                            <SelectItem value="rogue">Rogue</SelectItem>
                            <SelectItem value="cleric">Cleric</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose your preferred role in the guild.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Tell us about yourself..."
                            rows={4}
                          />
                        </FormControl>
                        <FormDescription>
                          A short description about yourself. This field is
                          optional.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newsletter"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Subscribe to newsletter</FormLabel>
                          <FormDescription>
                            Receive updates about new quests and guild
                            activities. (Optional)
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Accept terms and conditions{" "}
                            <RequiredFieldIndicator />
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <Button type="submit">Submit</Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => form.reset()}
                    >
                      Reset
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Props</h3>
          <div className="space-y-4">
            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                <code className="bg-muted px-2 py-1 rounded text-sm">Form</code>
              </h4>
              <p className="type-body-base text-muted-foreground mb-2">
                <strong className="text-foreground">Type:</strong>{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  FormProvider
                </code>
                <br />
                <strong className="text-foreground">Purpose:</strong> Wraps the
                form and provides React Hook Form context to all child
                components.
              </p>
            </div>

            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                <code className="bg-muted px-2 py-1 rounded text-sm">
                  FormField
                </code>
              </h4>
              <p className="type-body-base text-muted-foreground mb-2">
                <strong className="text-foreground">Type:</strong>{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  ControllerProps
                </code>
                <br />
                <strong className="text-foreground">Purpose:</strong> Connects a
                form control to React Hook Form. Accepts all Controller props
                from react-hook-form.
              </p>
            </div>

            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                <code className="bg-muted px-2 py-1 rounded text-sm">
                  FormItem
                </code>
              </h4>
              <p className="type-body-base text-muted-foreground mb-2">
                <strong className="text-foreground">Purpose:</strong> Wrapper
                component that provides spacing and structure for form fields.
              </p>
            </div>

            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                <code className="bg-muted px-2 py-1 rounded text-sm">
                  FormLabel
                </code>
              </h4>
              <p className="type-body-base text-muted-foreground mb-2">
                <strong className="text-foreground">Purpose:</strong> Displays
                the label for a form field. Automatically shows
                &quot;(required)&quot; for fields with validation errors.
              </p>
            </div>

            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                <code className="bg-muted px-2 py-1 rounded text-sm">
                  FormControl
                </code>
              </h4>
              <p className="type-body-base text-muted-foreground mb-2">
                <strong className="text-foreground">Purpose:</strong> Wraps the
                actual input component and connects it to the form field.
                Provides accessibility attributes automatically.
              </p>
            </div>

            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                <code className="bg-muted px-2 py-1 rounded text-sm">
                  FormMessage
                </code>
              </h4>
              <p className="type-body-base text-muted-foreground mb-2">
                <strong className="text-foreground">Purpose:</strong> Displays
                validation error messages for the field. Only renders when there
                is an error.
              </p>
            </div>

            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                <code className="bg-muted px-2 py-1 rounded text-sm">
                  FormDescription
                </code>
              </h4>
              <p className="type-body-base text-muted-foreground mb-2">
                <strong className="text-foreground">Purpose:</strong> Provides
                additional context or instructions for a form field.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Setup Instructions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                1. Install Dependencies
              </h4>
              <p className="type-body-base text-muted-foreground mb-3">
                The Form component uses React Hook Form. Install it along with a
                validation resolver (we recommend Zod):
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`# React Hook Form is likely already installed
npm install react-hook-form

# Install Zod and the resolver (required for examples)
npm install zod @hookform/resolvers`}</code>
              </pre>
              <p className="type-body-sm text-muted-foreground mt-2">
                <strong>Note:</strong> This example requires{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  zod
                </code>{" "}
                and{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  @hookform/resolvers
                </code>{" "}
                to be installed. You can use other validation libraries or React
                Hook Form&apos;s built-in validation methods.
              </p>
            </div>

            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                2. Define Your Form Schema
              </h4>
              <p className="type-body-base text-muted-foreground mb-3">
                Create a validation schema using Zod (or your preferred
                validation library):
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`const formSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Required"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;`}</code>
              </pre>
            </div>

            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                3. Set Up the Form
              </h4>
              <p className="type-body-base text-muted-foreground mb-3">
                Initialize the form with useForm and your resolver:
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`const form = useForm<FormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    email: "",
    name: "",
    bio: "",
  },
});

const onSubmit = (data: FormValues) => {
  // Handle form submission
};`}</code>
              </pre>
            </div>

            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                4. Build Your Form Structure
              </h4>
              <p className="type-body-base text-muted-foreground mb-3">
                Use the Form components to build your form fields:
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Email <RequiredFieldIndicator />
          </FormLabel>
          <FormControl>
            <Input {...field} type="email" />
          </FormControl>
          <FormDescription>
            We'll never share your email.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
