import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 5173;

  // Mock "Django" Data Provider
  const destinations = {
    agra: {
      id: "agra",
      name: "Agra",
      tagline: "Is the City of Love worth the hype?",
      verdict: "Highly Recommended for First-Timers",
      rating: 8.4,
      heroImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop",
      reach: [
        { type: "Flight", detail: "45m from Delhi", hub: "IGIA to AGR", cost: "₹2,500+" },
        { type: "Train", detail: "Gatimaan Express", time: "1h 40m from Delhi", hub: "Agra Cantt", cost: "₹700+" },
        { type: "Road", detail: "Yamuna Expressway", time: "3h 30m Drive", hub: "from Noida", cost: "Tolls ₹415" },
        { type: "Bus", detail: "Volvo AC Sleeper", time: "4h 30m", hub: "ISBT Anand Vihar", cost: "₹500-800" }
      ],
      budget: {
        backpacker: "$25/day",
        recommended: "$55/day",
        luxury: "$150+/day"
      },
      pros: ["Unique Architecture", "Easy Connectivity", "Rich History"],
      cons: ["Heavy Crowds", "Persistent Sellers", "Heat Intensity"],
      matrix: {
        money: 40, // 0-100
        time: 80,
        fatigue: 75,
        payoff: 95
      },
      tips: [
        "Avoid the sunrise entry queue by booking tickets online 2 days prior.",
        "Beware of fake guides outside Agra Fort; use official apps.",
        "Carry a reusable water bottle; single-use plastic is banned inside Taj."
      ],
      mustTry: [
        { name: "Panchi Petha", description: "Translucent soft candy made from ash gourd." },
        { name: "Bedai & Jalebi", description: "Spicy fried bread with sweet syrup loops." }
      ],
      itinerary: [
        {
          time: "06:00 AM",
          place: "Taj Mahal at Sunrise",
          duration: "3 Hours",
          description: "Avoid the heat and the 10:00 AM crowds. Best light for photography.",
          personalities: ["Extrovert", "History Lover", "Adventure Lover", "Young"]
        },
        {
          time: "11:00 AM",
          place: "Agra Fort",
          duration: "2 Hours",
          description: "Explore the red sandstone walls where Shah Jahan was imprisoned.",
          personalities: ["History Lover", "Introvert", "Old"]
        },
        {
          time: "01:30 PM",
          place: "Lunch at Mehtab Bagh side",
          duration: "1.5 Hours",
          description: "Views of the Taj from across the river without the crowd.",
          personalities: ["Introvert", "Spiritual"]
        },
        {
          time: "04:00 PM",
          place: "Itimad-ud-Daulah (Baby Taj)",
          duration: "1 Hour",
          description: "A quieter, more intricate tomb often called the draft of the Taj.",
          personalities: ["Introvert", "History Lover", "Spiritual"]
        }
      ]
    },

    varanasi: {
      id: "varanasi",
      name: "Varanasi",
      tagline: "Is the City of Shiva worth the hype?",
      verdict: "Highly Recommended for First-Timers",
      rating: 9.2,
      heroImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop",
      reach: [
        { type: "Flight", detail: "1h30mm from Delhi", hub: "IGIA to VNS", cost: "₹4,700+" },
        { type: "Train", detail: "Gatimaan Express", time: "1h 40m from Delhi", hub: "Agra Cantt", cost: "₹700+" },
        { type: "Road", detail: "Yamuna Expressway", time: "3h 30m Drive", hub: "from Noida", cost: "Tolls ₹415" },
        { type: "Bus", detail: "Volvo AC Sleeper", time: "4h 30m", hub: "ISBT Anand Vihar", cost: "₹500-800" }
      ],
      budget: {
        backpacker: "$25/day",
        recommended: "$55/day",
        luxury: "$150+/day"
      },
      pros: ["Spritual Treat", "Easy Connectivity", "Rich History"],
      cons: ["Heavy Crowds", "Persistent Sellers", "Heat Intensity"],
      matrix: {
        money: 40, // 0-100
        time: 80,
        fatigue: 75,
        payoff: 95
      },
      tips: [
        "Avoid the sunrise entry queue by booking tickets online 2 days prior.",
        "Beware of fake guides outside Agra Fort; use official apps.",
        "Carry a reusable water bottle; single-use plastic is banned inside Taj."
      ],
      mustTry: [
        { name: "Lassi-Paan", description: "Translucent soft candy made from ash gourd." },
        { name: "Bedai & Jalebi", description: "Spicy fried bread with sweet syrup loops." }
      ],
      itinerary: [
        {
          time: "06:00 AM",
          place: "Assi Ghat at Sunrise",
          duration: "3 Hours",
          description: "Avoid the heat and the 10:00 AM crowds. Best light for photography.",
          personalities: ["Extrovert", "History Lover", "Adventure Lover", "Young"]
        },
        {
          time: "11:00 AM",
          place: "Kashi Vishwanath",
          duration: "2 Hours",
          description: "Explore the red sandstone walls where Shah Jahan was imprisoned.",
          personalities: ["History Lover", "Introvert", "Old"]
        },
        {
          time: "01:30 PM",
          place: "Lunch at Desi Mandapam",
          duration: "1.5 Hours",
          description: "Views of the Ganga River from across the restaurant without the crowd.",
          personalities: ["Introvert", "Spiritual"]
        },
        {
          time: "04:00 PM",
          place: "Dasashwamedh Ghat (Ganga Arti)",
          duration: "1 Hour",
          description: "A quieter, more intricate tomb often called the draft of the Taj.",
          personalities: ["Introvert", "History Lover", "Spiritual"]
        }
      ]
    }
  };
    

  // API Routes
  app.get("/api/destinations/:id", (req, res) => {
    const destination = destinations[req.params.id];
    if (destination) {
      res.json(destination);
    } else {
      res.status(404).json({ error: "Destination not found" });
    }
  });

  // Future-Proofing: Placeholder for User Reviews POST
  app.post("/api/reviews", (req, res) => {
    // Logic for saving to database will go here
    res.status(501).json({ message: "Review submission logic coming in Phase 2" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
