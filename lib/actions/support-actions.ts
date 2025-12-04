"use server";

import { revalidatePath } from "next/cache";

export async function submitSupportTicket(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    if (!data?.name || !data?.email || !data?.subject || !data?.message) {
      return { success: false, error: "Missing required fields" };
    }
    console.log("[support] Ticket submitted:", {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });
    revalidatePath("/support");
    return { success: true };
  } catch (e) {
    return { success: false, error: "Failed to submit support ticket" };
  }
}
