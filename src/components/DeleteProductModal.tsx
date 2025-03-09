// "use client";

// import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Trash2 } from "lucide-react";

// interface DeleteProductModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
// }

// export default function DeleteProductModal({ isOpen, onClose, onConfirm }: DeleteProductModalProps) {
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2">
//             <Trash2 className="w-5 h-5 text-red-500" />
//             Confirm Deletion
//           </DialogTitle>
//         </DialogHeader>

//         <p className="text-sm text-gray-600">Are you sure you want to delete this product? This action cannot be undone.</p>

//         <DialogFooter className="flex justify-end gap-2">
//           <Button variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button variant="destructive" onClick={onConfirm}>
//             Delete
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}

export default function DeleteProductModal({
  isOpen,
  onClose,
  onConfirm,
  productName,
}: DeleteProductModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Confirm Delete</h2>
          <Button variant="ghost" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="mt-2 text-gray-600">
          Are you sure you want to delete <strong>{productName}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
