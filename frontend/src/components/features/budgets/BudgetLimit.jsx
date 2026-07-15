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
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { defaultIcon, iconIndex } from "../../../helpers/iconsCategories";
import { useDeleteBudget, useEditBudget } from "../../../hooks";
import NoBudgetSet from "../dashboard/NoBudgetSet";
import BudgetLimitSkeleton from "./BudgetLimitSkeleton";

function BudgetLimit({ budgets, isLoading }) {
  const [editableBudget, setEditableBudget] = useState(null);
  const [deletableBudget, setDeletableBudget] = useState(null);
  const [amount, setAmount] = useState("");
  const { editBudgetMutation, isPending: isEditing } = useEditBudget();
  const { deleteBudgetMutation, isPending: isDeleting } = useDeleteBudget();

  const progressSpendBar = (b) =>
    Math.min(
      (b?.attributes?.total_expenses / b?.attributes?.amount) * 100,
      100,
    );

  const closeEditModal = () => {
    setEditableBudget(null);
    setAmount("");
  };

  const closeDeleteModal = () => {
    setDeletableBudget(null);
  };

  const handleOpenEdit = (budget) => {
    setEditableBudget(budget);
    setAmount(budget?.attributes?.amount || "");
  };

  const handleEdit = () => {
    if (!editableBudget || !amount) return;
    const now = new Date();

    editBudgetMutation(
      {
        id: editableBudget?.id,
        data: {
          category_id: editableBudget?.relationships?.category?.id,
          amount: parseFloat(amount),
          month: String(now.getMonth() + 1).padStart(2, "0"),
          year: now.getFullYear(),
        },
      },
      {
        onSuccess: () => {
          toast.success("Budget updated successfully!");
          closeEditModal();
        },
        onError: (err) => {
          toast.error(
            err?.response?.data?.message || "Failed to update budget",
          );
        },
      },
    );
  };

  const handleDelete = () => {
    deleteBudgetMutation(deletableBudget?.id, {
      onSuccess: () => {
        toast.success("Budget deleted successfully!");
        closeDeleteModal();
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Failed to delete budget");
      },
    });
  };

  const availableBudgets = budgets?.map((b) => {
    if (b?.relationships?.category === null) return null;
    return b;
  }).filter(Boolean);


  if (isLoading) {
    return <BudgetLimitSkeleton />;
  }

  return (
    <div className="pt-5">
      <Dialog open={!!editableBudget} onOpenChange={closeEditModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Edit Category Budget
            </DialogTitle>
            <DialogDescription className="sr-only">
              Edit category budget amount
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Category
              </Label>
              <Input
                disabled
                value={editableBudget?.relationships?.category?.name || ""}
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Monthly Budget Amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  DH
                </span>
                <Input
                  type="number"
                  min={0}
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={closeEditModal}>
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={isEditing} className="px-6">
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deletableBudget} onOpenChange={closeDeleteModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Delete Category Budget
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the budget for{" "}
              <span className="font-medium text-gray-800">
                {deletableBudget?.relationships?.category?.name}
              </span>
              ?
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button
              variant="delete"
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-6"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {availableBudgets?.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {availableBudgets?.map((b) => {
            const Icon =
              iconIndex[b?.relationships?.category?.icon] || defaultIcon;

            return (
              <div
                key={b?.id}
                className="ring ring-gray-400/70 bg-white relative rounded-md p-6"
              >
                <div className="flex items-center justify-between">
                  <span
                    style={{ background: Icon?.background }}
                    className="p-3 inline-block rounded-md"
                  >
                    <Icon.icon style={{ color: Icon?.color }} />
                  </span>
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-500">Spent</span>
                      <span className="font-semibold text-lg">
                        {b?.attributes?.total_expenses} DH
                      </span>
                    </div>
                    <div className="flex gap-2 absolute top-2 right-2">
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={() => handleOpenEdit(b)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleOpenEdit(b);
                          }
                        }}
                        className="inline-flex cursor-pointer items-center text-gray-400 transition hover:text-[#16332D]"
                      >
                        <Pencil size={14} />
                        <span className="sr-only">Edit budget</span>
                      </span>
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={() => setDeletableBudget(b)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setDeletableBudget(b);
                          }
                        }}
                        className={`inline-flex items-center text-gray-400 transition hover:text-[#BA1A1A] ${
                          isDeleting
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }`}
                      >
                        <Trash2 size={14} />
                        <span className="sr-only">Delete budget</span>
                      </span>
                    </div>
                  </div>
                </div>
                {/* category name */}
                <h5 className="text-2xl my-3">
                  {b?.relationships?.category?.name}
                </h5>

                <div className="text-[#16332D] flex items-center justify-between">
                  <span
                    className={`${progressSpendBar(b) >= 100 ? "text-[#BA1A1A]" : progressSpendBar(b) >= 85 ? "text-orange-400" : ""}`}
                  >
                    Usage: {progressSpendBar(b).toFixed(0)}%
                  </span>
                  <span className="text-sm">
                    {b?.attributes?.total_expenses} DH / {b?.attributes?.amount}{" "}
                    DH
                  </span>
                </div>
                <div className="h-2 mt-2 bg-gray-300 rounded-2xl w-full overflow-hidden">
                  <div
                    style={{ width: `${progressSpendBar(b)}%` }}
                    className={`h-full ${progressSpendBar(b) >= 100 ? "bg-[#BA1A1A]" : progressSpendBar(b) >= 85 ? "bg-orange-400" : "bg-[#16332D]"}`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <NoBudgetSet title={"Category"}>
          Selected a budget category to view spending details
        </NoBudgetSet>
      )}
    </div>
  );
}

export default BudgetLimit;
