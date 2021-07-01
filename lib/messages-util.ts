import { Message } from "../models/Message";

export async function getAllMessages(): Promise<Message[]> {
  const response = await fetch("http://localhost:3000/api/message");
  const resData = await response.json();

  if (!resData) {
    throw new Error("Something went wrong!.");
  }

  let messageList: Message[] = [];

  resData.map((m: Message) => {
    const newMessage: Message = {
      id: m.id,
      senderFullName: m.senderFullName,
      senderEmail: m.senderEmail,
      senderPhone: m.senderPhone,
      senderAddress: m.senderAddress,
      senderMessage: m.senderMessage,
    };

    messageList.push(newMessage);
  });

  messageList = await JSON.parse(JSON.stringify(messageList));

  return messageList;
}

export async function addMessage(message: Message) {
  try {
    const response = await fetch(`http://localhost:3000/api/message`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(message),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteMessage(messageId: number) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/message/${messageId}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    throw error;
  }
}
