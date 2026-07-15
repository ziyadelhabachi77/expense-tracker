import { TriangleAlert } from "lucide-react";
import { Button } from "../../ui/button";
import { useDeleteExpense } from "../../../hooks";
import toast from "react-hot-toast";

function DeleteExpenseForm({ setCloseModal, expense }) {
  const { deleteExpenseMutation } = useDeleteExpense();
 
  // handle delete expense
  const handleDeleteExpense = () => {
    deleteExpenseMutation(expense?.id, {
      onSuccess: () => {
        toast.success("Expense deleted successfully!");
        setCloseModal();
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message);
      },
    });
  };
  return (
    <div className="p-6 max-w-190">
      <div className="flex items-start gap-3 mb-6">
        <span className="p-2 inline-block bg-[#FFDAD6] rounded">
          <TriangleAlert className="text-[#BA1A1A]" />
        </span>
        <div>
          <h4 className="text-xl font-semibold">Delete Expense</h4>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this expense? This action cannot be
            undone.
          </p>
        </div>
      </div>
      <div className="p-4 flex rounded mb-5 bg-[#F3F4F5] ring ring-gray-500/60 shadow items-center justify-between">
        <div className="flex flex-col max-w-[55%]">
          <span className=" font-semibold text-[#5E6A66]">
            SELECTED EXPENSE
          </span>
          <span className="text-xl font-semibold wrap-break-word">
           {expense?.description}
          </span>
        </div>
        <span className="text-xl font-semibold">{expense?.amount} DH</span>
      </div>

      <div className="text-right space-x-3">
        <Button variant="outline" onClick={setCloseModal}>
          Cancel
        </Button>
        <Button
          onClick={handleDeleteExpense}
          variant="delete"
          className={"px-5"}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default DeleteExpenseForm;
