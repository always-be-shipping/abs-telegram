"use server";

export async function sendMessages(_: string, formData: FormData) {
  const apiKey = formData.get("apiKey") as string;
  const chatIds = formData.get("chatIds") as string;
  const message = formData.get("message") as string;
  const API_BASE = `https://api.telegram.org/bot${apiKey}`;

  await Promise.all(
    chatIds
      .split(",")
      .map((x) => x.trim())
      .map(async (chatId) => {
        const res = await fetch(`${API_BASE}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            message,
            parse_mode: "Markdown",
          }),
        });
        if (!res.ok) {
          console.error(
            `❌ sendMessage to ${chatId} failed:`,
            await res.text(),
          );
        }
      }),
  );

  return "Messages sent";
}
