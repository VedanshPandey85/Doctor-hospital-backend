const express = require("express");
const app = express();

const PORT = 3000;

const users = [
  {
    name: "John",
    kidney: [
      {
        healthy: true,
      },
    ],
  },
  {
    name: "Chris",
    kidney: [
      {
        healthy: false,
      },
    ],
  },
  {
    name: "Paaji",
    kidney: [
      {
        healthy: true,
      },
    ],
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  const username = req.query.name;
  const foundData = users.find((u) => u.name == username);

  if (foundData) {
    //total kidney using length
    const totalKidneys = foundData.kidney.length;

    //Healthy kidneys
    const result = foundData.kidney.filter((u) => u.healthy);
    const healthyKidneys = result.length;

    //non healthy kidney
    const nonHealthy = totalKidneys - healthyKidneys;

    res.status(200).json({
      totalKidneys,
      healthyKidneys,
      nonHealthy,
    });
  } else {
    res.status(404).json({ message: "User not found in memory..." });
  }
});

app.post("/", (req, res) => {
  const userName = req.body.name;
  const isHealthy = req.body.isHealthy;

  let userData = users.find((u) => u.name == userName);

  if (userData) {
    userData.kidney.push({
      healthy: isHealthy,
    });
    res.json({
      msg: "Done!",
      userData,
    });
  } else {
    res.status(404).json("User Not Not found!!");
  }
});

app.put("/", (req, res) => {});

app.listen(3000, () => {
  console.log(`The ports is running over port number ${PORT}`);
});
