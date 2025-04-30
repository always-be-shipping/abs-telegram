"use client";

import { useActionState } from "react";

import { sendMessages } from "@/app/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [state, action, pending] = useActionState(sendMessages, "");
  return (
    <div className="flex flex-col items-center justify-between h-full">
      <div>
        <h1 className="text-center">ABS Telegram</h1>
        <p className="text-center">Send your Telegram messages with ease.</p>
      </div>
      {state && <div className="text-center text-green-500 mt-4">{state}</div>}
      <Card className="bg-accent w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <CardContent>
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
        </CardContent>
      </Card>
      <h4 className="text-center text-muted-foreground sticky bottom-0">
        No data stored or logged server side.
      </h4>
    </div>
  );
}
