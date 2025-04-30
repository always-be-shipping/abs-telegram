import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { sendMessages } from "@/app/actions";

export default function Home() {
  return (
    <>
      <h1 className="text-center text-4xl">ABS Telegram</h1>
      <form action={sendMessages}>
        <Label className="block text-lg mt-4" htmlFor="apiKey">
          API Key
        </Label>
        <Input name="apiKey" type="text" />
        <Label className="block text-lg mt-4" htmlFor="chatIds">
          Chat IDs
        </Label>
        <Textarea name="chatIds" />
        <Label className="block text-lg mt-4" htmlFor="message">
          Message
        </Label>
        <Textarea name="message" />
        <Separator className="my-4" />
        <Button type="submit">Send Message</Button>
      </form>
    </>
  );
}
