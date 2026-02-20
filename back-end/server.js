import express from "express";
import os from "os";
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Load Balancer</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f5f7fa;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }

          .card {
            background: white;
            padding: 30px 40px;
            border-radius: 12px;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
            text-align: center;
            min-width: 320px;
          }

          h1 {
            margin: 0 0 15px 0;
            font-size: 24px;
            color: #222;
          }

          p {
            margin: 8px 0;
            font-size: 16px;
            color: #555;
          }

          strong {
            color: #000;
          }
        </style>
      </head>

      <body>
        <div class="card">
          <h1>Load Balancer</h1>
          <p><strong>Container:</strong> ${os.hostname()}</p>
          <p><strong>Port:</strong> ${port}</p>
        </div>
      </body>
    </html>
  `);
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", container:os.hostname() });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
