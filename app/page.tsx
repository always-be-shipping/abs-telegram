import { sendMessages } from "@/app/actions";

import { Card, CardContent } from "@/components/ui/card";
import SubmitForm from "@/components/client/submit-form";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-between h-full">
      <div>
        <h1 className="text-center">ABS Telegram</h1>
        <p className="text-center">Send your Telegram messages with ease.</p>
      </div>
      <Card className="bg-accent w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <CardContent>
          <SubmitForm serverAction={sendMessages} />
        </CardContent>
      </Card>
      <h4 className="text-center text-muted-foreground sticky bottom-0">
        No data stored or logged server side.
      </h4>
    </div>
  );
}
