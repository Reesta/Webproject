import { sendContactEmail } from "../utils/emailService.js";

export const contactController = {
  sendContactMessage: async (req, res) => {
    try {
      const { fullName, phoneNumber, message } = req.body;

      if (!fullName || !phoneNumber || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Send email to site admin or configured recipient
      await sendContactEmail(fullName, phoneNumber, message);

      res.status(200).json({ message: "Contact message sent successfully" });
    } catch (error) {
      console.error("Error sending contact message:", error);
      res.status(500).json({ error: "Failed to send contact message" });
    }
  },
};
