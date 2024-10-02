const express = require("express");
const port = 3000;
const { dbConnect } = require("./utils/dbConnect.cjs");
const cors = require("cors");
const authRouter = require("./routes/authRoutes.cjs");
const dairyRouter = require("./routes/dairyRoutes.cjs");
const authMiddleware = require("./middleware/authMiddleware.cjs");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

dbConnect();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api/auth", authRouter);
app.use("/api/dairy", authMiddleware, dairyRouter);
