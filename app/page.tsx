import { sendMessages } from "@/app/actions";
import { Send, Shield } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import SubmitForm from "@/components/client/submit-form";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-between h-full p-4 gap-6">
      {/* Header with Theme Toggle */}
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-telegram rounded-lg flex items-center justify-center">
              <Send className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-center sm:text-left">ABS Telegram</h1>
              <p className="text-center sm:text-left text-sm text-muted-foreground">
                Send messages with ease
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Main Card */}
      <Card className="bg-card w-full max-w-3xl shadow-lg border-2">
        <CardContent className="pt-6">
          <SubmitForm serverAction={sendMessages} />
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="flex items-center gap-2 text-muted-foreground text-sm sticky bottom-0 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border">
        <Shield className="h-4 w-4 text-telegram" />
        <span>No data stored or logged server side</span>
      </div>
    </div>
  );
}
