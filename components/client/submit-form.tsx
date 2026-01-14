"use client";

import { useActionState, useState } from "react";
import {
  Key,
  Users,
  MessageSquare,
  Paperclip,
  Save,
  FolderOpen,
  Trash2,
  CheckCircle2,
  Loader2,
  X,
  Info
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // for saving distribution lists
  const [listName, setListName] = useState("");

  // Calculate counts
  const chatIdArray = chatIds
    .split(",")
    .map((id) => id.trim())
    .filter((id) => id.length > 0);
  const recipientCount = chatIdArray.length;
  const characterCount = message.length;
  const MAX_MESSAGE_LENGTH = 4096; // Telegram message limit

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

  function deleteList(listName: string) {
    const newLists = { ...lists };
    delete newLists[listName];
    setLists(newLists);
    saveToLocalStorage("savedInput", newLists);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  }

  function removeFile() {
    setSelectedFile(null);
    // Reset the file input
    const fileInput = document.querySelector<HTMLInputElement>(
      'input[type="file"]',
    );
    if (fileInput) fileInput.value = "";
  }

  return (
    <>
      <form action={action} className="space-y-6">
        {/* Authentication Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-telegram" />
            <Label className="text-lg font-semibold" htmlFor="apiKey">
              API Key
            </Label>
          </div>
          <Input
            name="apiKey"
            type="password"
            placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
            className="bg-background transition-all focus:ring-2 focus:ring-telegram/20"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Info className="h-3 w-3" />
            Not saved anywhere, for your privacy
          </p>
        </div>

        <Separator className="my-6" />

        {/* Recipients Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-telegram" />
              <Label className="text-lg font-semibold" htmlFor="chatIds">
                Recipients
              </Label>
            </div>
            {recipientCount > 0 && (
              <span className="text-sm font-medium text-telegram bg-telegram/10 px-2 py-1 rounded-full">
                {recipientCount} {recipientCount === 1 ? "chat" : "chats"}
              </span>
            )}
          </div>
          <Textarea
            name="chatIds"
            placeholder="123, 456, 789"
            className="bg-background min-h-[80px] transition-all focus:ring-2 focus:ring-telegram/20"
            value={chatIds}
            onChange={(e) => setChatIds(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Comma separated Telegram Chat IDs
          </p>
        </div>

        <Separator className="my-6" />

        {/* Message Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-telegram" />
              <Label className="text-lg font-semibold" htmlFor="message">
                Message
              </Label>
            </div>
            <span
              className={`text-sm ${characterCount > MAX_MESSAGE_LENGTH ? "text-destructive font-semibold" : "text-muted-foreground"}`}
            >
              {characterCount}/{MAX_MESSAGE_LENGTH}
            </span>
          </div>
          <Textarea
            name="message"
            placeholder="Hey check out my cool message! **Markdown** is supported."
            className="bg-background min-h-[120px] transition-all focus:ring-2 focus:ring-telegram/20"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Markdown supported (bold, italic, links, etc.)
          </p>
        </div>

        {/* File Upload Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Paperclip className="h-5 w-5 text-telegram" />
            <Label className="text-lg font-semibold" htmlFor="file">
              Attachment (Optional)
            </Label>
          </div>
          {!selectedFile ? (
            <div className="relative">
              <Input
                type="file"
                name="file"
                id="file"
                className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-telegram/10 file:text-telegram hover:file:bg-telegram/20 file:cursor-pointer transition-all"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-telegram/5 border border-telegram/20 rounded-lg">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Paperclip className="h-4 w-4 text-telegram shrink-0" />
                <span className="text-sm truncate">{selectedFile.name}</span>
                <span className="text-xs text-muted-foreground shrink-0">
                  ({(selectedFile.size / 1024).toFixed(1)} KB)
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={removeFile}
                className="shrink-0 h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <Separator className="my-6" />

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            variant="cta"
            disabled={pending || recipientCount === 0 || !apiKey}
            className="w-full text-base font-semibold h-11"
          >
            {pending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending to {recipientCount} {recipientCount === 1 ? "chat" : "chats"}...
              </>
            ) : (
              <>
                <MessageSquare className="h-5 w-5" />
                Send Message
              </>
            )}
          </Button>

          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" type="button" className="flex-1">
                  <Save className="h-4 w-4" />
                  Save List
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Save className="h-5 w-5 text-telegram" />
                    Name your Distribution List
                  </DialogTitle>
                </DialogHeader>
                <div className="py-2 flex flex-col space-y-2">
                  <Label htmlFor="listName">List Name</Label>
                  <Input
                    name="listName"
                    type="text"
                    placeholder="e.g., Team Updates, Newsletter Subscribers"
                    onChange={(e) => setListName(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Info className="h-3 w-3" />
                    Only saved to this device
                  </p>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={() => save()} disabled={!listName.trim()}>
                      <Save className="h-4 w-4" />
                      Save List
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" type="button" className="flex-1">
                  <FolderOpen className="h-4 w-4" />
                  Load List
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <FolderOpen className="h-5 w-5 text-telegram" />
                    Distribution Lists
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {Object.keys(lists).length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <FolderOpen className="h-12 w-12 text-muted-foreground/50 mb-3" />
                      <p className="text-sm text-muted-foreground">
                        No saved lists yet
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Save your first distribution list to get started
                      </p>
                    </div>
                  ) : (
                    Object.keys(lists).map((listName: string) => {
                      const listChatIds = lists[listName].chatIds
                        .split(",")
                        .map((id) => id.trim())
                        .filter((id) => id.length > 0);
                      const preview =
                        listChatIds.length > 3
                          ? listChatIds.slice(0, 3).join(", ") + "..."
                          : listChatIds.join(", ");

                      return (
                        <div
                          key={listName}
                          className="flex items-center gap-2 p-2 border rounded-lg hover:bg-accent/50 transition-colors"
                        >
                          <DialogClose asChild className="flex-1">
                            <button
                              onClick={() => load(listName)}
                              className="text-left flex flex-col gap-1 min-w-0"
                            >
                              <span className="font-medium text-sm">
                                {listName}
                              </span>
                              <span className="text-xs text-muted-foreground truncate">
                                {listChatIds.length}{" "}
                                {listChatIds.length === 1 ? "chat" : "chats"}:{" "}
                                {preview}
                              </span>
                            </button>
                          </DialogClose>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteList(listName);
                            }}
                            className="shrink-0 h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    })
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </form>

      {/* Success Message */}
      {state && (
        <div className="flex items-center justify-center gap-2 mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          <span className="text-green-700 dark:text-green-300 font-medium">
            {state}
          </span>
        </div>
      )}
    </>
  );
}
