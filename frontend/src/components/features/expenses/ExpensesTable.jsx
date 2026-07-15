import { Pencil, Trash } from "lucide-react";
import { formatDate } from "../../../helpers/formatDate"
function ExpensesTable({ setOpenDeleteModal, setOpenEditModal, expenses, getEditExpenseObj, setExpense }) {
  return (
    <table className="w-full h-full relative">
      <thead className="bg-[#F3F4F5] text-left">
        <tr>
          <th className="text-gray-400 text-xs uppercase pl-5 py-2">Date</th>
          <th className="text-gray-400 text-xs uppercase pl-5 py-2">Description</th>
          <th className="text-gray-400 text-xs uppercase pl-5 py-2">Category</th>
          <th className="text-gray-400 text-xs uppercase pl-5 py-2">Amount</th>
          <th className="text-gray-400 text-xs uppercase pl-5 py-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {expenses?.map(expense => (
          <tr key={expense?.id} className="border-b border-gray-300/50">
            <td className="pl-5 py-3 font-semibold text-black/50">{formatDate(expense?.attributes?.date)}</td>
            <td className="pl-5 py-3 font-semibold text-black/70">{expense?.attributes?.description}</td>
            <td className="pl-5 py-3 font-semibold text-black/70">{expense?.relationships?.category?.name}</td>
            <td className="pl-5 py-3 font-semibold text-black/70">{expense?.attributes?.amount} DH</td>
            <td className="pl-5 flex items-center gap-3 py-3 font-semibold">
              <span onClick={() => getEditExpenseObj(expense)} className="cursor-pointer text-gray-500 hover:text-black transition-colors">
                <Pencil onClick={setOpenEditModal} size={17} />
              </span>
              <span className="cursor-pointer text-gray-500 hover:text-black transition-colors">
                <Trash onClick={() => { setOpenDeleteModal(), setExpense({ id: expense?.id, description: expense?.attributes?.description, amount: expense?.attributes?.amount }) }} size={17} />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExpensesTable;
