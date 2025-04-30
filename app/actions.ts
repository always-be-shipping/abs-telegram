"use server";

export async function sendMessages(_: string, formData: FormData) {
  const apiKey = formData.get("apiKey") as string;
  const chatIds = formData.get("chatIds") as string;
  const message = formData.get("message") as string;
  const file = formData.get("file") as File;
  const API_BASE = `https://api.telegram.org/bot${apiKey}`;

  console.log({ file });
  await Promise.all(
    chatIds
      .split(",")
      .map((x) => x.trim())
      .map(async (chatId) => {
        if (!chatId) return;
        if (file.size > 0) {
          await sendDocument(chatId, file, API_BASE);
        }
        await sendMessage(chatId, message, API_BASE);
      }),
  );

  return "Messages sent";
}

async function sendMessage(
  chatId: string,
  message: string,
  endpoint: string,
): Promise<void> {
  const res = await fetch(`${endpoint}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      message,
      parse_mode: "Markdown",
    }),
  });
  if (!res.ok) {
    console.error(`❌ sendMessage to ${chatId} failed:`, await res.text());
  }
}

async function sendDocument(
  chatId: string,
  file: File,
  endpoint: string,
): Promise<void> {
  const form = new FormData();
  form.append("chat_id", chatId);
  form.append("document", file);

  const res = await fetch(`${endpoint}/sendDocument`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    console.error(`❌ sendDocument to ${chatId} failed:`, await res.text());
  }
}
