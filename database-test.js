const { hash } = require("bcrypt");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

(async () => {
  // open the database
  const db = await sqlite.open({
    filename: "./sitedb.sqlite",
    driver: sqlite3.Database,
  });

  await db.migrate({ force: true, migrationsPath: "./migrations" });

  hash("123456", 10, async (err, hash) => {
    if (err) {
      throw err;
    }
    await db.run(
      "INSERT INTO User (name,email,password) VALUES(?,?,?)",
      ["admin", "test@test.com", hash],
      (err) => {
        throw err;
      }
    );
  });

  await db.run(
    "INSERT INTO Content (homeHeader,homeContent,about,aboutMission,aboutVision,contactPhone,contactPhoneSecond,contactAddress,contactMail,contactMailSecond,contactFax) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
    [
      "Header",
      "ContentContent",
      "ABOUT ABOUT ABOUT",
      "About Mission",
      "About vission",
      "contact phone",
      "contact phone 2",
      "contact address",
      "contact mail",
      "contact mail second",
      "contact fax",
    ],
    (err) => {
      throw err;
    }
  );
  const users = await db.all("select * from user");
  const products = await db.all("select * from product");
  const contents = await db.all("select * from content");
  const messages = await db.all("select * from messages");

  console.log(JSON.stringify(users, null, 2));
  console.log(JSON.stringify(products, null, 2));
  console.log(JSON.stringify(contents, null, 2));
  console.log(JSON.stringify(messages, null, 2));
})().catch((e) => {
  console.log(e);
});
