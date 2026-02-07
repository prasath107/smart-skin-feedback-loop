import fs from "fs";
import csv from "csv-parser";

export const products: any[] = [];

export function loadProducts(): Promise<void> {
  return new Promise((resolve) => {
    fs.createReadStream("product_info.csv")
      .pipe(csv())
      .on("data", (row) => {
        if (row.primary_category?.toLowerCase().includes("skin")) {
          products.push(row);
        }
      })
      .on("end", () => {
        console.log("✅ Skincare products loaded:", products.length);
        resolve();
      });
  });
}