import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const DatasetProductCard = ({ product }: any) => {
  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4 space-y-2">
        <h3 className="font-semibold text-lg">{product.product_name}</h3>
        <p className="text-sm text-gray-600">{product.brand_name}</p>

        <div className="flex justify-between text-sm">
          <span>⭐ {product.rating}</span>
          <span>${product.price_usd}</span>
        </div>

        <div className="text-xs text-gray-500">
          {product.primary_category} → {product.secondary_category}
        </div>
      </CardContent>
    </Card>
  );
};

export default DatasetProductCard;