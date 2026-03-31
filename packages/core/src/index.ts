import APEi from "./apei.js";

const PORT = 6969;
const app = APEi();

app.get("/hello-world", (_, res) => {
  return res.status(201).json({
    route: "/hello-world",
    method: "GET",
  });
});

app.post("/hello-world", (_, res) => {
  return res.status(201).json({
    route: "/hello-world",
    method: "POST",
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
  console.log("ROUTES:");

  for (const [key, route] of app.router.entries()) {
    console.log(key, route);
  }
});
