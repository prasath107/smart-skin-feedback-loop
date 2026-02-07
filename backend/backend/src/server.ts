import app from "./app";
import { loadProducts } from "./dataLoader";

const PORT = 5000;

loadProducts().then(() => {
  app.listen(PORT, () => {
    console.log("✅ Backend running at http://localhost:5000");
  });
});