import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getDataFromFile = async () => {
  try {
    const filePath = join(__dirname, "../db/data.txt");
    const data = await fs.readFile(filePath, "utf8");
    const lines = data.trim().split(/\r?\n/);
    if (lines.length === 0) {
      throw new Error("File is empty");
    }
    const headers = lines[0]?.split(",");
    return lines.slice(1).map((line) => {
      const values = line.split(",");
      let record = {};
      headers.forEach((header, index) => {
        if (
          header === "Unit Price" ||
          header === "Quantity" ||
          header === "Total Price"
        ) {
          record[header] = parseFloat(values[index].trim());
        } else {
          record[header] = values[index].trim();
        }
      });
      return record;
    });
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
};

export { getDataFromFile };
