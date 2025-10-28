// server.js
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

// When someone clicks "Pay" on your site
app.post("/pay", (req, res) => {
  const { name, phone, packageType } = req.body;

  // --- Simulation of M-Pesa STK Push ---
  console.log(`Payment requested by ${name} (${phone}) for ${packageType} package`);

  // In your real code, you'd call Safaricom's API here using your keys
  // For safety, we only simulate success:
  setTimeout(() => {
    res.json({
      success: true,
      message: `Payment confirmed for ${name}. Ticket issued.`
    });
  }, 3000);
});

// Home route
app.get("/", (req, res) => {
  res.send("Food N Vibez Backend is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
