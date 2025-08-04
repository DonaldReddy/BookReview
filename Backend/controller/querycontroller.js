import prisma from "../database/dbConnect.js";

export const createQuery = async (req, res) => {
  try {
    const { username, email, query } = req.body;

    if (!username || !email || !query) {
      return res.status(400).json({ message: "All fields are required." });
    }

     const newQuery = await prisma.query.create({
      data: { username, email, query },
    });

    await newQuery.save();

    res.status(201).json({
      message: "Query successfully created",
      data: newQuery,
    });
  } catch (error) {
    console.error("Error creating query:", error);
    res.status(500).json({ message: "Server error" });
  }
};
