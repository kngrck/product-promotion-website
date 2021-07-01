import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../models/Product";
import { isAuthenticated } from "../../../lib/auth";
import nextConnect from "next-connect";

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

//Update, Delete Product
apiRoute
  .put(async (req, res) => {
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
      const { name, description, imageUrl, count, price } = req.body;
      const existProduct: Product | undefined = await db.get(
        "select * from product where id=?",
        [id]
      );
      if (!existProduct) {
        res.status(401).json({ message: "Product not found" });
        return;
      }

      await db.run(
        "UPDATE Product SET name=?,description=?,imageUrl=?,count=?,price=? WHERE id=?",
        [name, description, imageUrl, parseInt(count), parseFloat(price), id],
        (err: any) => {
          throw err;
        }
      );
      res.status(200).json({ message: "Success" });
      return;
    } catch (err) {
      res.status(401).json({ message: err });
    }
    //DELETE PRODUCT
  })
  .patch(async (req, res) => {
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
      const { imageUrl } = req.body;
      const existProduct: Product | undefined = await db.get(
        "select * from product where id=?",
        [id]
      );
      if (!existProduct) {
        res.status(401).json({ message: "Product not found" });
        return;
      }

      await db.run(
        "UPDATE Product SET imageUrl=? WHERE id=?",
        [imageUrl, id],
        (err: any) => {
          throw err;
        }
      );
      res.status(200).json({ message: "Success" });
      return;
    } catch (err) {
      res.status(401).json({ message: err });
    }
  })
  .delete(async (req, res) => {
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
      const existProduct: Product | undefined = await db.get(
        "select * from product where id=?",
        [id]
      );
      if (!existProduct) {
        res.status(401).json({ message: "Product not found" });
        return;
      }
      await db.run("DELETE FROM Product WHERE id=?", [id], (err: any) => {
        throw err;
      });

      res.status(200).json({ message: "Success" });
    } catch (err) {
      res.status(400).json({ message: "Error" });
    }
  });

export default apiRoute;
