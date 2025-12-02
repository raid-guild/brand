"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Wizard, type WizardStep } from "@/components/ui/wizard";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Step 1 Schema
const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
});

// Step 2 Schema
const roleInfoSchema = z.object({
  role: z.string().min(1, "Please select a role"),
  experience: z.string().min(1, "Please select your experience level"),
  availability: z.string().min(1, "Please select your availability"),
});

// Step 3 Schema
const additionalInfoSchema = z.object({
  bio: z.string().min(10, "Bio must be at least 10 characters").optional(),
  referral: z.string().optional(),
  goals: z.string().min(1, "Please select at least one goal"),
});

type PersonalInfo = z.infer<typeof personalInfoSchema>;
type RoleInfo = z.infer<typeof roleInfoSchema>;
type AdditionalInfo = z.infer<typeof additionalInfoSchema>;

export function WizardExample() {
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  const personalForm = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  const roleForm = useForm<RoleInfo>({
    resolver: zodResolver(roleInfoSchema),
    defaultValues: {
      role: "",
      experience: "",
      availability: "",
    },
  });

  const additionalForm = useForm<AdditionalInfo>({
    resolver: zodResolver(additionalInfoSchema),
    defaultValues: {
      bio: "",
      referral: "",
      goals: "",
    },
  });

  const steps: WizardStep[] = [
    {
      id: "personal-info",
      title: "Personal Information",
      description: "Tell us about yourself",
      component: (
        <Form {...personalForm}>
          <form className="space-y-6">
            <FormField
              control={personalForm.control}
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
              control={personalForm.control}
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={personalForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                    />
                  </FormControl>
                  <FormDescription>
                    Optional: We&apos;ll only contact you via email unless you
                    provide a phone number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      ),
      validation: async () => {
        const isValid = await personalForm.trigger();
        if (isValid) {
          setFormData((prev) => ({
            ...prev,
            ...personalForm.getValues(),
          }));
        }
        return isValid;
      },
    },
    {
      id: "role-info",
      title: "Role & Experience",
      description: "Select your preferred role",
      component: (
        <Form {...roleForm}>
          <form className="space-y-6">
            <FormField
              control={roleForm.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Preferred Role <RequiredFieldIndicator />
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
                      <SelectItem value="ranger">Ranger</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={roleForm.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Experience Level <RequiredFieldIndicator />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="beginner">
                        Beginner (0-1 years)
                      </SelectItem>
                      <SelectItem value="intermediate">
                        Intermediate (2-5 years)
                      </SelectItem>
                      <SelectItem value="advanced">
                        Advanced (5+ years)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={roleForm.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Availability <RequiredFieldIndicator />
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="full-time" id="full-time" />
                        <Label htmlFor="full-time">
                          Full-time (40+ hours/week)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="part-time" id="part-time" />
                        <Label htmlFor="part-time">
                          Part-time (20-39 hours/week)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="occasional" id="occasional" />
                        <Label htmlFor="occasional">
                          Occasional (Less than 20 hours/week)
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      ),
      validation: async () => {
        const isValid = await roleForm.trigger();
        if (isValid) {
          setFormData((prev) => ({
            ...prev,
            ...roleForm.getValues(),
          }));
        }
        return isValid;
      },
    },
    {
      id: "additional-info",
      title: "Additional Information",
      description: "Tell us more about your goals",
      component: (
        <Form {...additionalForm}>
          <form className="space-y-6">
            <FormField
              control={additionalForm.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Tell us about yourself, your background, and what brings you here..."
                      rows={6}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional: Share a bit about yourself and your background.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={additionalForm.control}
              name="referral"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How did you hear about us? (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Friend, social media, etc."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={additionalForm.control}
              name="goals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    What are your goals? <RequiredFieldIndicator />
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="learn" id="learn" />
                        <Label htmlFor="learn">Learn and grow skills</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="contribute" id="contribute" />
                        <Label htmlFor="contribute">
                          Contribute to projects
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="network" id="network" />
                        <Label htmlFor="network">Network with others</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all" />
                        <Label htmlFor="all">All of the above</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      ),
      validation: async () => {
        const isValid = await additionalForm.trigger();
        if (isValid) {
          setFormData((prev) => ({
            ...prev,
            ...additionalForm.getValues(),
          }));
        }
        return isValid;
      },
    },
  ];

  const handleComplete = (data: Record<string, unknown>) => {
    console.log("Wizard completed:", { ...formData, ...data });
    alert("Wizard completed successfully! Check console for all data.");
  };

  return (
    <section id="wizard">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-heading-md">Wizard</h2>
        <div className="flex items-center gap-4">
          <Link
            href="#advanced-top"
            className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/ui/wizard.tsx"
            className="type-body-sm text-primary hover:text-primary/80 transition-colors underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code →
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/examples/WizardExample.tsx"
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
            The Wizard component provides a multi-step form experience with
            progress tracking, step validation, and navigation controls.
            It&apos;s perfect for complex forms that benefit from being broken
            into smaller, manageable steps. Each step can have its own
            validation logic and can be marked as completed when validated
            successfully.
          </p>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Live Example</h3>
          <div className="border border-border rounded-lg p-6">
            <Wizard
              steps={steps}
              onComplete={handleComplete}
              showProgress={true}
              allowBackNavigation={true}
              showSummary={true}
            />
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Props</h3>
          <div className="space-y-4">
            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                <code className="bg-muted px-2 py-1 rounded text-sm">
                  steps
                </code>
              </h4>
              <p className="type-body-base text-muted-foreground mb-2">
                <strong className="text-foreground">Type:</strong>{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  WizardStep[]
                </code>
                <br />
                <strong className="text-foreground">Required:</strong> Yes
                <br />
                <strong className="text-foreground">Purpose:</strong> Array of
                step definitions. Each step must have an id, title, and
                component.
              </p>
            </div>

            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                <code className="bg-muted px-2 py-1 rounded text-sm">
                  onComplete
                </code>
              </h4>
              <p className="type-body-base text-muted-foreground mb-2">
                <strong className="text-foreground">Type:</strong>{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  (data: Record&lt;string, unknown&gt;) =&gt; void
                </code>
                <br />
                <strong className="text-foreground">Required:</strong> No
                <br />
                <strong className="text-foreground">Purpose:</strong> Callback
                function called when the wizard is completed.
              </p>
            </div>

            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                <code className="bg-muted px-2 py-1 rounded text-sm">
                  showProgress
                </code>
              </h4>
              <p className="type-body-base text-muted-foreground mb-2">
                <strong className="text-foreground">Type:</strong>{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  boolean
                </code>
                <br />
                <strong className="text-foreground">Default:</strong>{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  true
                </code>
                <br />
                <strong className="text-foreground">Purpose:</strong> Controls
                whether to show the progress card with percentage.
              </p>
            </div>

            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                <code className="bg-muted px-2 py-1 rounded text-sm">
                  allowBackNavigation
                </code>
              </h4>
              <p className="type-body-base text-muted-foreground mb-2">
                <strong className="text-foreground">Type:</strong>{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  boolean
                </code>
                <br />
                <strong className="text-foreground">Default:</strong>{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  true
                </code>
                <br />
                <strong className="text-foreground">Purpose:</strong> Enables or
                disables the ability to navigate back to previous steps.
              </p>
            </div>

            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                <code className="bg-muted px-2 py-1 rounded text-sm">
                  showSummary
                </code>
              </h4>
              <p className="type-body-base text-muted-foreground mb-2">
                <strong className="text-foreground">Type:</strong>{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  boolean
                </code>
                <br />
                <strong className="text-foreground">Required:</strong> No
                <br />
                <strong className="text-foreground">Purpose:</strong> Displays a
                summary card showing the completion status of all steps.
              </p>
            </div>

            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                <code className="bg-muted px-2 py-1 rounded text-sm">
                  WizardStep
                </code>
              </h4>
              <p className="type-body-base text-muted-foreground mb-2">
                Each step object can have:
              </p>
              <ul className="list-disc list-inside text-body-base text-muted-foreground space-y-1 mb-2">
                <li>
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                    id
                  </code>
                  : Unique identifier for the step
                </li>
                <li>
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                    title
                  </code>
                  : Display title
                </li>
                <li>
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                    description
                  </code>
                  : Optional description text
                </li>
                <li>
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                    component
                  </code>
                  : React component to render for this step
                </li>
                <li>
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                    validation
                  </code>
                  : Optional async function that returns boolean
                </li>
                <li>
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                    onStepComplete
                  </code>
                  : Optional callback when step is completed
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Setup Instructions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                1. Define Your Steps
              </h4>
              <p className="type-body-base text-muted-foreground mb-3">
                Create an array of WizardStep objects. Each step should have an
                id, title, and component:
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`const steps: WizardStep[] = [
  {
    id: "step-1",
    title: "Personal Information",
    description: "Tell us about yourself",
    component: <YourFormComponent />,
    validation: async () => {
      // Return true if valid, false otherwise
      return true;
    },
  },
  // ... more steps
];`}</code>
              </pre>
            </div>

            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                2. Handle Validation (Optional)
              </h4>
              <p className="type-body-base text-muted-foreground mb-3">
                Add validation to each step. The validation function should
                return true if the step is valid:
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`{
  id: "step-1",
  title: "Step 1",
  component: <FormComponent />,
  validation: async () => {
    // Validate your form
    const isValid = await form.trigger();
    if (isValid) {
      // Save form data
      setFormData({ ...formData, ...form.getValues() });
    }
    return isValid;
  },
}`}</code>
              </pre>
            </div>

            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                3. Use the Wizard Component
              </h4>
              <p className="type-body-base text-muted-foreground mb-3">
                Render the Wizard with your steps and completion handler:
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`<Wizard
  steps={steps}
  onComplete={(data) => {
    console.log("Wizard completed:", data);
    // Handle completion
  }}
  showProgress={true}
  allowBackNavigation={true}
  showSummary={true}
/>`}</code>
              </pre>
            </div>

            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                4. Combine with Forms
              </h4>
              <p className="type-body-base text-muted-foreground mb-3">
                For best results, combine the Wizard with the Form component and
                React Hook Form for validation:
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`const form = useForm({
  resolver: zodResolver(schema),
});

// In your step component:
{
  id: "step-1",
  component: (
    <Form {...form}>
      <FormField ... />
    </Form>
  ),
  validation: async () => await form.trigger(),
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
