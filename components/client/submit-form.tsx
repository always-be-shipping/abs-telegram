"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type SubmitFormProps = {
  serverAction: (state: string, formData: FormData) => Promise<string>;
};

export default function SubmitForm({ serverAction }: SubmitFormProps) {
  const [state, action, pending] = useActionState(serverAction, "");

  return (
    <>
      <form action={action}>
        <Label className="block text-lg mt-4" htmlFor="apiKey">
          API Key
        </Label>
        <Input
          name="apiKey"
          type="text"
          placeholder="123456789"
          className="bg-background"
        />
        <Label className="block text-lg mt-4" htmlFor="chatIds">
          Chat IDs
        </Label>
        <Textarea
          name="chatIds"
          placeholder="123,456,789"
          className="bg-background"
        />
        <p className="text-sm text-muted-foreground">
          Comma separated Telegram Chat IDs
        </p>
        <Label className="block text-lg mt-4" htmlFor="message">
          Message
        </Label>
        <Textarea
          name="message"
          placeholder="Hey check out my cool message"
          className="bg-background"
        />
        <p className="text-sm text-muted-foreground">Markdown supported.</p>
        <Button type="submit" disabled={pending} className="mt-4 w-full">
          {pending ? "Sending..." : "Send Message"}
        </Button>
      </form>

      {state && <div className="text-center text-green-500 mt-4">{state}</div>}
    </>
  );
}
