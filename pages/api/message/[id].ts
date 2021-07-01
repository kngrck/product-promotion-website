import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { NextApiRequest, NextApiResponse } from "next";
import { isAuthenticated } from "../../../lib/auth";
import nextConnect from "next-connect";
import { Message } from "../../../models/Message";

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.delete(async (req, res) => {
  try {
    if (!isAuthenticated(req)) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }
    const db = await open({
      filename: "./sitedb.sqlite",
      driver: sqlite3.Database,
    });
    const { id } = req.query;
    const existMessage: Message | undefined = await db.get(
      "select * from messages where id=?",
      [id]
    );
    if (!existMessage) {
      res.status(401).json({ message: "Mesaj bulunamadı." });
      return;
    }
    await db.run("DELETE FROM Messages WHERE id=?", [id], (err: any) => {
      throw err;
    });

    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(400).json({ message: "Error" });
  }
});

export default apiRoute;
