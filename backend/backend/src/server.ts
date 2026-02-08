import app from "./app";
import { loadProducts } from "./dataLoader";

loadProducts().then(() => {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});