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

//user can implant new kidney
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

//if a kidney is unHealthy replace it with healty one
app.put("/", (req, res) => {
  let userName = req.query.name;
  let userData = users.find((u) => u.name == userName);
  if (userData) {
    userData.kidney.map((u) => (u.healthy = true));
    res.status(200).json({
      msg: "Done",
      userData,
    });
  } else {
    res.status(404).json({
      msg: "User not found!!",
    });
  }
});

//delete  unhealthy kidney which are not functioning
app.delete("/", (req, res) => {
  let userName = req.query.name;
  let userData = users.find((u) => u.name == userName);
  if (userData) {
    // this will return all the healthy kidney
    let newkidney = userData.kidney.filter((u) => u.healthy);

    // userData ---> kidney <---> newKidney
    userData.kidney = newkidney;
    res.status(200).json({
      msg: "deleted unHealty successfully....",
      userData,
    });
  } else {
    res.status(404).json({
      msg: "User not found!!",
    });
  }
});

app.listen(3000, () => {
  console.log(`The ports is running over port number ${PORT}`);
});
