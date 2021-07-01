import { NextApiRequest, NextApiResponse } from "next";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

import nextConnect from "next-connect";

import { isAuthenticated } from "../../../lib/auth";

//API ROUTE
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

//GET ALL Messages API
apiRoute
  .get(async (req, res) => {
    if (!isAuthenticated(req)) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }
    try {
      const db = await open({
        filename: "./sitedb.sqlite",
        driver: sqlite3.Database,
      });

      const messages = await db.all("select * from messages");
      res.status(200).json(messages);
    } catch (err) {
      res.status(400).json({ message: "Server Error" });
    }
  })
  .post(async (req, res) => {
    try {
      const db = await open({
        filename: "./sitedb.sqlite",
        driver: sqlite3.Database,
      });

      const {
        senderFullName,
        senderEmail,
        senderPhone,
        senderAddress,
        senderMessage,
      } = req.body;

      if (
        senderFullName === "" ||
        senderEmail === "" ||
        senderPhone === "" ||
        senderAddress === "" ||
        senderMessage === ""
      ) {
        res.status(401).json({ message: "Invalid values" });
        return;
      }
      await db.run(
        "INSERT INTO Messages (senderFullName,senderEmail,senderPhone,senderAddress,senderMessage) VALUES(?,?,?,?,?)",
        [
          senderFullName,
          senderEmail,
          senderPhone,
          senderAddress,
          senderMessage,
        ],
        (err: any) => {
          throw err;
        }
      );

      res.status(200).json({ message: "Success" });
      return;
    } catch (error) {
      res.status(401).json({ message: error });
    }
  });

export default apiRoute;
