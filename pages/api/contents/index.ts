import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { isAuthenticated } from "../../../lib/auth";

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

apiRoute
  .get(async (req, res) => {
    try {
      const db = await open({
        filename: "./sitedb.sqlite",
        driver: sqlite3.Database,
      });

      const contents = await db.all("select * from content");
      res.status(200).json(contents);
    } catch (err) {
      res.status(400).json({ message: "Server Error" });
    }
  })
  .post(async (req, res) => {
    try {
      if (!isAuthenticated(req)) {
        res.status(401).json({ message: "Not authenticated" });
        return;
      }
      const db = await open({
        filename: "./sitedb.sqlite",
        driver: sqlite3.Database,
      });

      const {
        homeHeader,
        homeContent,
        about,
        aboutMission,
        aboutVision,
        contactPhone,
        contactPhoneSecond,
        contactAddress,
        contactMail,
        contactMailSecond,
        contactFax,
      } = req.body;
      if (
        homeHeader === "" ||
        homeContent === "" ||
        about === "" ||
        aboutMission === "" ||
        aboutVision === "" ||
        contactPhone === "" ||
        contactAddress === "" ||
        contactMail === ""
      ) {
        res.status(401).json({ message: "Invalid values" });
        return;
      }

      await db.run(
        "UPDATE Content SET homeHeader=?,homeContent=?,about=?,aboutMission=?,aboutVision=?,contactPhone=?,contactPhoneSecond=?,contactAddress=?,contactMail=?,contactMailSecond=?,contactFax=? WHERE id=?",
        [
          homeHeader,
          homeContent,
          about,
          aboutMission,
          aboutVision,
          contactPhone,
          contactPhoneSecond,
          contactAddress,
          contactMail,
          contactMailSecond,
          contactFax,
          1,
        ],
        (err: any) => {
          throw err;
        }
      );
      res.status(200).json({ message: "Success" });
    } catch (err) {
      res.status(400).json({ message: "Server Error", err });
    }
  });

export default apiRoute;
