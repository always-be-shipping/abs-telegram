"use client";

import { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { loadFromLocalStorage, saveToLocalStorage } from "@/lib/local-storage";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type SubmitFormProps = {
  serverAction: (state: string, formData: FormData) => Promise<string>;
};

type SavedInput = {
  [name: string]: {
    chatIds: string;
  };
};

export default function SubmitForm({ serverAction }: SubmitFormProps) {
  // to show pending state and response message
  const [state, action, pending] = useActionState(serverAction, "");

  // show lists from local storage
  const [lists, setLists] = useState<SavedInput>(() =>
    loadFromLocalStorage("savedInput"),
  );

  // form items
  const [apiKey, setApiKey] = useState("");
  const [chatIds, setChatIds] = useState("");
  const [message, setMessage] = useState("");

  // for saving distribution lists
  const [listName, setListName] = useState("");

  function save() {
    const newLists = { ...lists };
    newLists[listName] = { chatIds };

    setLists(newLists);
    saveToLocalStorage("savedInput", newLists);
  }

  function load(listName: string) {
    const saved = lists[listName];

    if (saved?.chatIds) {
      setChatIds(saved.chatIds);
    }
  }

  return (
    <>
      <form action={action}>
        <Label className="block text-lg" htmlFor="apiKey">
          API Key
        </Label>
        <Input
          name="apiKey"
          type="password"
          placeholder="123456789"
          className="bg-background"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">Not saved anywhere.</p>
        <Label className="block text-lg mt-4" htmlFor="chatIds">
          Chat IDs
        </Label>
        <Textarea
          name="chatIds"
          placeholder="123,456,789"
          className="bg-background"
          value={chatIds}
          onChange={(e) => setChatIds(e.target.value)}
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">Markdown supported.</p>
        <Input type="file" name="file" />
        <div className="flex space-x-2 mt-4">
          <Button
            type="submit"
            variant="cta"
            disabled={pending}
            className="flex-1"
          >
            {pending ? "Sending..." : "Send"}
          </Button>
        </div>
        <div className="flex justify-center space-x-2 mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" type="button">
                Save List
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Name your Distribution List</DialogTitle>
              </DialogHeader>
              <div className="py-2 flex flex-col space-y-2">
                <Label htmlFor="listName">List Name</Label>
                <Input
                  name="listName"
                  type="text"
                  onChange={(e) => setListName(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Only saved to this device.
                </p>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={() => save()}>Save List</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" type="button">
                Load List
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Distribution Lists</DialogTitle>
              </DialogHeader>
              {Object.keys(lists).map((listName: string) => (
                <DialogClose key={listName} asChild>
                  <Button onClick={() => load(listName)}>{listName}</Button>
                </DialogClose>
              ))}
            </DialogContent>
          </Dialog>
        </div>
      </form>

      {state && <div className="text-center text-green-500 mt-4">{state}</div>}
    </>
  );
}
