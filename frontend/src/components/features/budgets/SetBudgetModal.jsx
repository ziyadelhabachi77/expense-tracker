import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const SetBudgetModal = ({
  open,
  onClose,
  categories = [],
  onSave,
  initialCategoryId = "",
}) => {
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");

  const isValid = categoryId && amount;

  useEffect(() => {
    if (!open) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCategoryId(initialCategoryId);
  }, [initialCategoryId, open]);

  const handleSave = () => {
    if (!isValid) return;
    const now = new Date();
    onSave({
      category_id: parseInt(categoryId),
      amount: parseFloat(amount),
      month: String(now.getMonth() + 1).padStart(2, "0"),
      year: now.getFullYear(),
    });
    setCategoryId("");
    setAmount("");
  };

  // console.log(categories)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Set Category Budget
          </DialogTitle>
          <DialogDescription className="sr-only">
            Set a monthly budget limit for a category
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Category */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-gray-700">
              Category
            </Label>
            <Select onValueChange={setCategoryId} value={categoryId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category..." />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-gray-700">
              Monthly Budget Amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                $
              </span>
              <Input
                type="number"
                min={0}
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="px-6">
            Save Budget
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SetBudgetModal;
