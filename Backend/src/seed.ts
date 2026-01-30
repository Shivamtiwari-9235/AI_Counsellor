/**
 * Database seed script - insert sample universities
 * Run with: ts-node src/seed.ts
 */

import { pool } from "./config/db";

const seedUniversities = async () => {
  try {
    console.log("Seeding universities...");

    const universities = [
      {
        name: "MIT",
        country: "USA",
        base_cost_level: "High",
        description: "Massachusetts Institute of Technology",
      },
      {
        name: "Stanford University",
        country: "USA",
        base_cost_level: "High",
        description: "Silicon Valley tech hub",
      },
      {
        name: "University of Toronto",
        country: "Canada",
        base_cost_level: "Medium",
        description: "Canada's top-ranked university",
      },
      {
        name: "University of British Columbia",
        country: "Canada",
        base_cost_level: "Medium",
        description: "West coast Canadian excellence",
      },
      {
        name: "Technical University of Munich",
        country: "Germany",
        base_cost_level: "Low",
        description: "Germany's premier tech university",
      },
      {
        name: "ETH Zurich",
        country: "Switzerland",
        base_cost_level: "High",
        description: "World-class STEM institution",
      },
      {
        name: "University of Melbourne",
        country: "Australia",
        base_cost_level: "Medium",
        description: "Australia's leading research university",
      },
      {
        name: "NUS Singapore",
        country: "Singapore",
        base_cost_level: "High",
        description: "Asia's top university",
      },
    ];

    for (const uni of universities) {
      await pool.query(
        `INSERT INTO universities (name, country, base_cost_level)
         VALUES ($1, $2, $3)`,
        [uni.name, uni.country, uni.base_cost_level]
      );
    }

    console.log("Universities seeded successfully!");
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    await pool.end();
  }
};

seedUniversities();
