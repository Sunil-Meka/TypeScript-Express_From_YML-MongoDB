import express from "express";
import http from "http";
import cors from "cors";
import YAML from "yamljs";
import mongodb from "mongodb";
// import {MongoClient} from 'mongodb';
const MongoClient = require('mongodb').MongoClient;
import { connectToDatabase } from "./admin/types";

// var MongoClient = require('mongodb').MongoClient
//swagger
import swaggerUi from "swagger-ui-express";
const swaggerDocument = YAML.load("openapi.yml");

// body parser

import bodyParser from "body-parser";
import serviceApi from "../dist/index";
import { serviceImpl } from "./impl/types";
const app = express();
const impl = new serviceImpl();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true }));
var options = {
  swaggerOptions: {
    url: "/api-docs/swagger.json",
  },
};
app.get("/api-docs/swagger.json", (req, res) => res.json(swaggerDocument));
app.use(
  "/api-docs",
  swaggerUi.serveFiles(undefined, options),
  swaggerUi.setup(undefined, options)
);

connectToDatabase()
    .then(() => {
		serviceApi(app, impl);
        app.listen(80, () => {
            console.log(`Server started at http://localhost:80`);
        });
    }).catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });

