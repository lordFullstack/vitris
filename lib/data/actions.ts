"use server";

import { revalidatePath } from "next/cache";
import { conversationRepo } from "./index";

/**
 * ChatThread (cliente) no puede importar conversationRepo directo: Next.js
 * empaqueta lib/data/mock/* dos veces (bundle de cliente y de servidor) y
 * son instancias de módulo separadas — una mutación desde el navegador
 * nunca llega a la que lee el Server Component en la siguiente navegación.
 * Una Server Action sí corre en el proceso del servidor, donde vive el
 * estado real del mock.
 */
export async function sendChatMessage(conversationId: string, text: string) {
  const message = await conversationRepo.sendMessage(conversationId, text);
  revalidatePath("/chat");
  return message;
}
