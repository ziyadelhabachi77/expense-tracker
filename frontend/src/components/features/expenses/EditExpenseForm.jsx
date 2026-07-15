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
import { DollarSign, Info, X } from "lucide-react";
import { Button } from "../../ui/button";
import { useState } from "react";
import { useEditExpense, useGetCategories } from "../../../hooks";
import toast from "react-hot-toast";
import { formatDateForInput } from "../../../helpers/formatDateForInput";


function EditExpenseForm({ setCloseModal, currentEditableExpense }) {

  // get the edit expense hook
  const { editExpenseMutation } = useEditExpense();

  // category hook
  const { data: categories } = useGetCategories()


  const [formData, setFormData] = useState({
    date: formatDateForInput(currentEditableExpense?.attributes?.date) || "",
    description: currentEditableExpense?.attributes?.description || "",
    amount: currentEditableExpense?.attributes?.amount || "",
    category_id: currentEditableExpense?.relationships?.category?.id || ""
  });
  const [isSubmit, setIsSubmit] = useState(false);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // handle edit expense
  const handleEditExpense = () => {
    setIsSubmit(true)
    const requiredFields = ["date", "description", "amount"];

    for (const field of requiredFields) {
      if (!formData[field]) return;
    }
    const { category_id, ...rest } = formData;
    const cleanData = { ...rest, category_id: category_id === "" ? null : category_id };
    const data = { id: currentEditableExpense?.id, data: cleanData }

    console.log("sending:", cleanData);

    editExpenseMutation(data, {
      onSuccess: () => {
        toast.success("Edit Expense with success");
        setCloseModal();
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message);
      },
    });
  }


  return (
    <div className="w-screen max-w-130">
      <div className="p-4 flex items-center justify-between border-b border-gray-500/90">
        <h2 className="text-xl font-semibold">Edit Expense</h2>
        <X onClick={setCloseModal} size={20} className="text-gray-500 cursor-pointer" />
      </div>

      <div className="p-4">
        <FieldGroup>
          <Field className="relative">
            <FieldLabel htmlFor="date">Date</FieldLabel>
            <Input type="datetime-local" id="date" name="date" value={formData.date} onChange={handleChange} />
            <p className="text-xs mt-1 text-red-500">
              {formData.date === "" && isSubmit
                ? "Date is required"
                : ""}
            </p>
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Input id="description" name="description" type="text" value={formData.description} onChange={handleChange} />
            <p className="text-xs mt-1 text-red-500">
              {formData.description === "" && isSubmit
                ? "Description is required"
                : ""}
            </p>
          </Field>

          <FieldGroup className="grid max-w-sm grid-cols-2">
            <Field>
              <FieldLabel>Category</FieldLabel>
              <Select
                value={formData.category_id || "none"}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value === "none" ? "" : value }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-9999">
                  <SelectGroup>
                    <SelectItem value="none">None</SelectItem>
                    {categories?.data?.map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field className="relative">
              <FieldLabel htmlFor="amount">Amount</FieldLabel>
              <Input type="number" id="amount" name="amount" className="pl-5" value={formData.amount} onChange={handleChange} />
              <p className="text-xs mt-1 text-red-500">
                {formData.amount === "" && isSubmit
                  ? "Amount is required"
                  : ""}
              </p>
              <DollarSign size={16} className={`text-gray-400 absolute pointer-events-none ${formData.amount === "" && isSubmit
                ? "top-[41%]"
                : "top-[50%]"
                }  left-[-44%]`} />
            </Field>
          </FieldGroup>
        </FieldGroup>

        <div className="rounded p-3 flex items-start gap-2 bg-[#F3F4F5] mt-5">
          <Info className="text-[#626D69]" />
          <p className="text-[#626D69] text-sm">
            Adjusting this transaction will update your <span>'Food & Dining'</span> budget for October automatically.
          </p>
        </div>
      </div>

      <div className="p-4 border-t space-x-3 border-gray-400 bg-[#FDFDFD] text-right">
        <Button onClick={setCloseModal} variant="outline">Cancel</Button>
        <Button onClick={handleEditExpense} className={"px-14"}>Save</Button>
      </div>
    </div>
  );
}

export default EditExpenseForm;