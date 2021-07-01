import { Content } from "../models/Content";

export async function getContents(): Promise<Content> {
  const response = await fetch("http://localhost:3000/api/contents");
  const resData: Content[] = await response.json();

  if (!resData) {
    throw new Error("Something went wrong!.");
  }
  const contents = resData[0];
  return contents;
}

export async function updateContent(content: Content) {
  try {
    const response = await fetch(`http://localhost:3000/api/contents`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(content),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.err);
    }
  } catch (error) {
    throw error;
  }
}
