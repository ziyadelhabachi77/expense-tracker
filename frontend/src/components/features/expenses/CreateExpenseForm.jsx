import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAddExpense, useGetCategories } from "../../../hooks";
import { Button } from "../../ui/button";
import { Spinner } from "../../ui/spinner";

function CreateExpenseForm({ setCloseModal }) {
  // get expense hook
  const { addExpenseMutation, isPending } = useAddExpense();

  // category hook
  const { data: categories } = useGetCategories();

  const [expenseFromData, setExpenseFormData] = useState({
    amount: "",
    description: "",
    category_id: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);

  // save expenses
  const handleSaveExpense = () => {
    setIsSubmit(true);
    for (const [key, value] of Object.entries(expenseFromData)) {
      if ((value === "" || value == null) && key !== "category_id") return;
    }
    addExpenseMutation(expenseFromData, {
      onSuccess: () => {
        toast.success("Expense added");
        setCloseModal();
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message);
      },
    });
  };

  return (
    <>
      <div className="flex w-screen border-b border-gray-300 max-w-100 items-center justify-between p-5">
        <h4 className="font-semibold">Add Expenses</h4>
        <X size={18} className="cursor-pointer" onClick={setCloseModal} />
      </div>
      <div>
        <div className="p-5">
          <FieldGroup>
            <Field className="relative">
              <FieldLabel htmlFor="fieldgroup-amount">Amount</FieldLabel>
              <Input
                type="number"
                id="fieldgroup-amount"
                className="pl-5"
                placeholder="0.00"
                value={expenseFromData.amount}
                onChange={(e) =>
                  setExpenseFormData({
                    ...expenseFromData,
                    amount: e.target.value
                      ? e.target.valueAsNumber
                      : e.target.value,
                  })
                }
              />
              <p className="text-xs mt-1 text-red-500">
                {expenseFromData.amount === "" && isSubmit
                  ? "Amount is required"
                  : ""}
              </p>
              <DollarSign
                size={16}
                className={`text-gray-400 absolute pointer-events-none ${
                  expenseFromData.amount === "" && isSubmit
                    ? "top-[41%]"
                    : "top-[50%]"
                }  left-[-47%]`}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="fieldgroup-description">
                Description
              </FieldLabel>
              <Input
                id="fieldgroup-Description"
                type="text"
                placeholder="What is this for?"
                value={expenseFromData.description}
                onChange={(e) =>
                  setExpenseFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
              <p className="text-xs mt-1 text-red-500">
                {expenseFromData.description === "" && isSubmit
                  ? "Description is required"
                  : ""}
              </p>
            </Field>
            <Field>
              <FieldLabel>Category</FieldLabel>
              <Select
                value={expenseFromData.category_id}
                onValueChange={(value) =>
                  setExpenseFormData((prev) => ({
                    ...prev,
                    category_id: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="z-9999">
                  <SelectGroup>
                    {categories?.data?.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
        </div>
        <div className="mt-4 py-5 border-t text-right px-4 space-x-2 border-gray-300">
          <Button
            onClick={setCloseModal}
            variant="outline"
            className={"py-5 min-h-7.5"}
          >
            Cancel
          </Button>
          <Button onClick={handleSaveExpense} className={"py-5 w-30 min-h-7.5"}>
            {isPending ? (
              <span className="inline-flex w-full items-center justify-center gap-1.5">
                <Spinner className="size-3.5" /> Saving...
              </span>
            ) : (
              "Save Expense"
            )}
          </Button>
        </div>
      </div>
    </>
  );
}

export default CreateExpenseForm;
