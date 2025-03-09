"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditProductModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedProduct: any) => void;
}

export default function EditProductModal({ product, isOpen, onClose, onUpdate }: EditProductModalProps) {
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (res.ok) {
        const data = await res.json();
        onUpdate(data.product);
        onClose();
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            value={updatedProduct.product_name}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, product_name: e.target.value })}
            placeholder="Product Name"
          />
          <Input
            value={updatedProduct.price}
            type="number"
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: Number(e.target.value) })}
            placeholder="Price"
          />
          <Input
            value={updatedProduct.unit}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, unit: e.target.value })}
            placeholder="Unit"
          />
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Update Product"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
