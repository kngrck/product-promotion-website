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

//GET ALL PRODUCTS API
apiRoute
  .get(async (req, res) => {
    try {
      const db = await open({
        filename: "./sitedb.sqlite",
        driver: sqlite3.Database,
      });

      const products = await db.all("select * from product");
      res.status(200).json(products);
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
      const { name, description, imageName, imageUrl, count, price } = req.body;

      if (
        name === "" ||
        !name ||
        description === "" ||
        imageName === "" ||
        imageUrl === "" ||
        count === "" ||
        price === ""
      ) {
        res.status(401).json({ message: "Invalid values" });
        return;
      }
      const result = await db.run(
        "INSERT INTO Product (name,description,imageName,imageUrl,count,price) VALUES(?,?,?,?,?,?)",
        [
          name,
          description,
          imageName,
          imageUrl,
          parseInt(count),
          parseFloat(price),
        ],
        (err: any) => {
          throw err;
        }
      );

      res.status(200).json({ message: "Success", id: result.lastID });
      return;
    } catch (error) {
      res.status(401).json({ message: error });
    }
  });

export default apiRoute;
