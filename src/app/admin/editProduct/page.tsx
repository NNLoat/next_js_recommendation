"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Edit, Save, X, ChevronLeft, ChevronRight, Plus  } from "lucide-react";
import DeleteProductModal from "@/components/DeleteProductModal";
import { Product } from "@/types/product";


export default function AdminProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<{ [key: string]: string }>({
    product_id: "",
    product_name: "",
    price: "",
    unit: "",
    product_type: "",
    image_thumb: "",
    product_description_thai: ""
  });

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [updatedProduct, setUpdatedProduct] = useState<Partial<Product>>({});
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1); //start at page 1
  const [pageSize, setPageSize] = useState(15); // Default: 15 products per page

   // Add Product Modal State
   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
   const [newProduct, setNewProduct] = useState<Partial<Product>>({
     product_id: "",
     product_name: "",
     price: 0,
     unit: "",
     image_thumb: ""
   });



  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Open Edit Modal
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setUpdatedProduct({ ...product }); // Pre-fill the form with existing product details
  };

  // Update search query and reset page to 1
  const handleSearchChange = (key: string, value: string) => {
    setSearchQuery((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  // add product
  const handleAddProduct = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      console.log(newProduct)

      if (!res.ok) throw new Error("Failed to add product");

      await fetchProducts();
      setIsAddModalOpen(false);
      setNewProduct({ product_id: "", product_name: "", price: 0, unit: "", image_thumb: "", product_type:"", product_description_thai:"" });
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  // Save Updated Product
  const handleSave = async () => {
    if (!editingProduct) return;
    try {
      const res = await fetch("/api/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updatedProduct, _id: editingProduct._id }),
      });

      if (!res.ok) throw new Error("Failed to update product");

      await fetchProducts(); // Refresh product list
      setEditingProduct(null); // Close modal
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  // delete product
  const handleDelete = async () => {
    if (!deletingProduct) return;

    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: deletingProduct._id }),
      });

      if (!res.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((p) => p._id !== deletingProduct._id)); // Remove from UI
      setDeletingProduct(null); // Close delete modal
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Filter products based on search input
  const filteredProducts = products.filter((product) =>
    Object.keys(searchQuery).every((key) =>
      product[key as keyof Product]
        ?.toString()
        .toLowerCase()
        .includes(searchQuery[key].toLowerCase())
    )
  );

   // Image Upload Handler
   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload image");

      const data = await res.json();
      setUpdatedProduct((prev) => ({ ...prev, image_thumb: data.imagePath }));
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  // Function to handle image upload for Add Product Modal
const handleAddImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files || e.target.files.length === 0) return;

  const file = e.target.files[0];
  if (file.size > 10 * 1024 * 1024) {
    alert("File size must be less than 10MB");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Failed to upload image");

    const data = await res.json();
    setNewProduct((prev) => ({ ...prev, image_thumb: data.imagePath })); // Set image path
  } catch (err) {
    console.error("Error uploading image:", err);
  }
};

  // Paginate products
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const startIdx = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(startIdx, startIdx + pageSize);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">จัดการสินค้า</h1>
      <Button onClick={() => setIsAddModalOpen(true)} className="flex gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </Button>

      <div className="overflow-x-auto">
      <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Actions</TableHead>
              <TableHead>Product ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Product type</TableHead>
              <TableHead>Image thumb path</TableHead>
              <TableHead>Prodcut Description</TableHead>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              {["product_id", "product_name", "price", "unit", "product_type","image_thumb", "product_description_thai"].map((col) => (
                <TableCell key={col}>
                  <Input
                    placeholder={`Search ${col}`}
                    value={searchQuery[col]}
                    onChange={(e) =>{
                      setSearchQuery({ ...searchQuery, [col]: e.target.value })
                      handleSearchChange(col, e.target.value)
                    }
                    }
                    className="text-sm"
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <TableRow key={product._id} className="group">
                  <TableCell>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(product)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeletingProduct(product)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{product.product_id}</TableCell>
                  <TableCell>{product.product_name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.unit}</TableCell>
                  <TableCell>{product.product_type}</TableCell>
                  {/* <TableCell>{product.image_thumb}</TableCell> */}
                  <TableCell>
                    {product.image_thumb ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={product.image_thumb}
                          alt="Product Thumbnail"
                          className="w-16 h-16 object-cover rounded"
                        />
                        <span className="text-xs mt-1">
                          {product.image_thumb.split("/").pop()} {/* Extract filename */}
                        </span>
                      </div>
                    ) : (
                      "No Image"
                    )}
                  </TableCell>

                  <TableCell>{product.product_description_thai}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </Button>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
            <h2 className="text-lg font-bold mb-4">Edit Product</h2>
            <div className="flex flex-row w-full gap-4">
              <div className="mb-2 grow">
                <label className="block text-sm font-medium">รหัสสินค้า</label>
                <Input
                  value={updatedProduct.product_id || ""}
                  onChange={(e) =>
                    setUpdatedProduct({ ...updatedProduct, product_id: e.target.value })
                  }
                />
              </div>
              <div className="mb-2 grow">
                <label className="block text-sm font-medium">ชนิดสินค้า</label>
                <Input
                  value={updatedProduct.product_type || ""}
                  onChange={(e) =>
                    setUpdatedProduct({ ...updatedProduct, product_type: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">ชื่อสินค้า</label>
              <Input
                value={updatedProduct.product_name || ""}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, product_name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-row w-full gap-4">
              <div className="mb-2 grow">
                <label className="block text-sm font-medium">ราคา</label>
                <Input
                  type="number"
                  value={updatedProduct.price || ""}
                  onChange={(e) =>
                    setUpdatedProduct({ ...updatedProduct, price: Number(e.target.value) })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">หน่วย</label>
                <Input
                  value={updatedProduct.unit || ""}
                  onChange={(e) =>
                    setUpdatedProduct({ ...updatedProduct, unit: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">รูปภาพสินค้า</label>
              {/* Display Image & Upload New Image */}
              <div className="mb-4 flex flex-col items-center">
                {updatedProduct.image_thumb && (
                  <img src={updatedProduct.image_thumb} alt="Product" className="w-24 h-24 object-cover rounded" />
                )}
                <span className="text-xs mt-1">
                  {updatedProduct.image_thumb ? updatedProduct.image_thumb.split("/").pop() : "No Image"}
                </span>
                <input type="file" accept="image/*" className="mt-2" onChange={handleImageUpload} />
              </div>
            </div>
            <div className="mb-2 grow-7">
              <label className="block text-sm font-medium">รายละเอียดสินค้า</label>
              <Textarea
                value={updatedProduct.product_description_thai || ""}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, product_description_thai: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setEditingProduct(null)}>
                <X className="w-4 h-4" />
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingProduct && (
        <DeleteProductModal
          isOpen={!!deletingProduct}
          onClose={() => setDeletingProduct(null)}
          onConfirm={handleDelete}
          productName={deletingProduct.product_name}
        />
      )}
      
      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
            <h2 className="text-lg font-bold mb-4">เพิ่มสินค้า</h2>

            {/* Row 1: รหัสสินค้า & ชนิดสินค้า */}
            <div className="flex flex-row w-full gap-4">
              <div className="mb-2 grow">
                <label className="block text-sm font-medium">รหัสสินค้า</label>
                <Input
                  value={newProduct.product_id || ""}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, product_id: e.target.value })
                  }
                />
              </div>
              <div className="mb-2 grow">
                <label className="block text-sm font-medium">ชนิดสินค้า</label>
                <Input
                  value={newProduct.product_type || ""}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, product_type: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Row 2: ชื่อสินค้า */}
            <div className="mb-2">
              <label className="block text-sm font-medium">ชื่อสินค้า</label>
              <Input
                value={newProduct.product_name || ""}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, product_name: e.target.value })
                }
              />
            </div>

            {/* Row 3: ราคา & หน่วย */}
            <div className="flex flex-row w-full gap-4">
              <div className="mb-2 grow">
                <label className="block text-sm font-medium">ราคา</label>
                <Input
                  type="number"
                  value={newProduct.price || ""}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: Number(e.target.value) })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">หน่วย</label>
                <Input
                  value={newProduct.unit || ""}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, unit: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Row 4: Image thumbnail path */}
            {/* <div className="mb-4">
              <label className="block text-sm font-medium">Image thumbnail path</label>
              <Input
                value={newProduct.image_thumb || ""}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image_thumb: e.target.value })
                }
              />
            </div> */}
            <div className="mb-4">
              <label className="block text-sm font-medium">รูปภาพสินค้า</label>
              <div className="mb-4 flex flex-col items-center">
                {newProduct.image_thumb && (
                  <img
                    src={newProduct.image_thumb}
                    alt="Product"
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                <span className="text-xs mt-1">
                  {newProduct.image_thumb ? newProduct.image_thumb.split("/").pop() : "No Image"}
                </span>
                <input type="file" accept="image/*" className="mt-2" onChange={handleAddImageUpload} />
              </div>
            </div>

            
            

            {/* Row 5: รายละเอียดสินค้า */}
            <div className="mb-2">
              <label className="block text-sm font-medium">รายละเอียดสินค้า</label>
              <Textarea
                value={newProduct.product_description_thai || ""}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, product_description_thai: e.target.value })
                }
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
              <Button onClick={handleAddProduct}>
                <Save className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

       {/* Add Product Modal */}
       {/* {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">เพิ่มสินค้า</h2>
            {["รหัสสินค้า", "ชนิดสินค้า", "ชื่อสินค้า", "ราคา", "หน่วย", "image_thumb", "รายละเอียดสินค้า"].map((field) => (
              <div key={field} className="mb-2">
                <label className="block text-sm font-medium">{field}</label>
                <Input 
                  placeholder={field}
                  value={newProduct[field as keyof Product] || ""}
                  onChange={(e) => setNewProduct({ ...newProduct, [field]: e.target.value })}
                />
              </div>
            ))}
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
              <Button onClick={handleAddProduct}>
                <Save className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
