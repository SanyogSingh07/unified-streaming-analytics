import type { VercelRequest, VercelResponse } from "@vercel/node";

const feedStore: Array<{
  title: string;
  description: string;
  imageUrl: string;
  timestamp: string;
}> = [
  {
    title: "The Night Crawler",
    description: "Dataset Update: 14k new user reviews processed",
    imageUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop&q=60",
    timestamp: "Just now",
  },
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { title, description, imageUrl } = req.body || {};
  if (!title || !description) {
    return res.status(400).json({ error: "Title and Description are required." });
  }

  const newFeedItem = {
    title: String(title),
    description: `User Verified: ${description}`,
    imageUrl:
      imageUrl ||
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop&q=60",
    timestamp: "Just now",
  };

  feedStore.unshift(newFeedItem);

  return res.status(200).json({ success: true, item: newFeedItem });
}
