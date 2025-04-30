"use client";

import { useActionState } from "react";

import { sendMessages } from "@/app/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [state, action, pending] = useActionState(sendMessages, "");
  return (
    <>
      <h1 className="text-center text-4xl">ABS Telegram</h1>
      <h2 className="text-center text-2xl">
        Send your Telegram messages with ease.
      </h2>
      {state && <div className="text-center text-green-500 mt-4">{state}</div>}
      <form action={action}>
        <Label className="block text-lg mt-4" htmlFor="apiKey">
          API Key
        </Label>
        <Input name="apiKey" type="text" placeholder="123456789" />
        <Label className="block text-lg mt-4" htmlFor="chatIds">
          Chat IDs
        </Label>
        <Textarea name="chatIds" placeholder="123,456,789" />
        <p className="text-sm text-muted-foreground">
          A comma separated list of Telegram Chat IDs
        </p>
        <Label className="block text-lg mt-4" htmlFor="message">
          Message
        </Label>
        <Textarea name="message" placeholder="Hey check out my cool message" />
        <Separator className="my-4" />
        <Button type="submit" disabled={pending}>
          {pending ? "Sending..." : "Send Message"}
        </Button>
      </form>
      <h3 className="text-center text-xl text-muted-foreground">
        No data stored or logged server side.
      </h3>
    </>
  );
}
