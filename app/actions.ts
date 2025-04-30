"use server";

export async function sendMessages(formData: FormData) {
  const apiKey = formData.get("apiKey") as string;
  const chatIds = formData.get("chatIds") as string;
  const message = formData.get("message") as string;

  console.log({ apiKey, chatIds, message });
}
