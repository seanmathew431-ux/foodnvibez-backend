// Import dependencies
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import QRCode from "qrcode";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 10000;

// In-memory database (temporary for now)
let tickets = [];

// Endpoint to handle ticket creation
app.post("/api/buy-ticket", async (req, res) => {
  try {
    const { name, phone, amount } = req.body;

    // Basic validation
    if (!name || !phone || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a unique ticket ID
    const ticketId = "TCK-" + Math.random().toString(36).substring(2, 9).toUpperCase();

    // Generate QR code containing the ticket info
    const ticketData = `Name: ${name}\nPhone: ${phone}\nTicket ID: ${ticketId}`;
    const qrCodeDataURL = await QRCode.toDataURL(ticketData);

    // Store the ticket
    const newTicket = { name, phone, amount, ticketId, qrCodeDataURL };
    tickets.push(newTicket);

    // Return the ticket info (and QR code)
    res.json({
      message: "Ticket generated successfully!",
      ticket: newTicket,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating ticket" });
  }
});

// Endpoint to list all tickets (for testing/admin)
app.get("/api/tickets", (req, res) => {
  res.json(tickets);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
