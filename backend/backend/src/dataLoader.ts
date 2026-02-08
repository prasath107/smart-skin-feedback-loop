import fs from "fs";
import csv from "csv-parser";

export const products: any[] = [];

export function loadProducts(): Promise<void> {
  return new Promise((resolve) => {
    const filePath = "product_info.csv";

    // ✅ check file exists first
    if (!fs.existsSync(filePath)) {
      console.log("⚠️ product_info.csv not found — skipping load");
      resolve();
      return;
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row: any) => {
        if (row.primary_category?.toLowerCase().includes("skin")) {
          products.push(row);
        }
      })
      .on("end", () => {
        console.log("✅ Skincare products loaded:", products.length);
        resolve();
      })
      .on("error", (err) => {
        console.log("CSV read error — continuing without dataset:", err);
        resolve();
      });
  });
}