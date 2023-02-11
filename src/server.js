import express from "express";
import "express-async-errors";
import morgan from "morgan";
import cors from "cors";

import "dotenv/config";
import { SankhyaServiceVehicle } from "./services/sankhya/sankhya.vehicle.js";
import { syncTypes } from "./shared/syncTypes.js";
import { SankhyaServiceOwner } from "./services/sankhya/owners/sankhya.owner.js";
import { SankhyaServiceDriver } from "./services/sankhya/drivers/index.js";
import { SankhyaServiceTravel } from "./services/sankhya/sankhya.travel.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const connectSankhya = async (syncOptions) => {
  console.log("Process started");
  if (syncOptions.driver) {
    console.log(" ");
    console.log("Sync dirvers started");
    await SankhyaServiceDriver(syncTypes.created);
    console.log("Sync dirvers created");
    await SankhyaServiceDriver(syncTypes.updated);
    console.log("Sync dirvers updated");
  }

  if (syncOptions.owner) {
    console.log(" ");
    console.log("Sync owners started");
    await SankhyaServiceOwner(syncTypes.created);
    console.log("Sync owners created");
    await SankhyaServiceOwner(syncTypes.updated);
    console.log("Sync owners updated");
  }

  if (syncOptions.veichile) {
    console.log(" ");
    console.log("Sync veichiles started");
    await SankhyaServiceVehicle(syncTypes.created);
    console.log("Sync veichiles created");
    await SankhyaServiceVehicle(syncTypes.updated);
    console.log("Sync veichicles updated");
  }

  if (syncOptions.travel) {
    console.log(" ");
    console.log("Sync travels started");
    await SankhyaServiceTravel(syncTypes.created);
    console.log("Sync travels created");
    await SankhyaServiceTravel(syncTypes.updated);
    console.log("Sync traves updated");
  }
  console.log(" ");
  console.log("Process finished");
};

// const checkTime = (time, sleep) => {
//   setTimeout(async () => {
//     await connectSankhya({ driver: true, owner: true, veichile: true, travel: true });

//     checkTime(120, 60000);
//   }, time * sleep);
// };

app.listen(process.env.PORT, async () => {
  console.log(`App started on ${process.env.PORT} 👍 `);

  // const teste = new Date();
  // console.log(teste.toISOString().split("."));

  connectSankhya({
    driver: true,
    owner: false,
    veichile: false,
    travel: false,
  });
  // checkTime(1, 1);
});
