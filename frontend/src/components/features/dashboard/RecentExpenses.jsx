import { defaultIcon } from "../../../helpers/iconsCategories";
import { iconIndex } from "../../../helpers/iconsCategories";


const RecentExpenseItem = ({ expense }) => {
  const iconData = iconIndex[expense?.category?.icon] ?? defaultIcon;

  const Icon = iconData.icon;

  const formattedDate = new Date(expense?.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const formattedTime = new Date(expense?.date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-none">
      {/* Icon + Info */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: iconData.background }}
        >
          <Icon size={20} style={{ color: iconData.color }} />
        </div>
        <div>
          <p className="font-medium text-gray-800 truncate max-w-45">
            {expense.description}
          </p>
          <p className="text-xs text-gray-400">
            {formattedDate}, {formattedTime}
          </p>
        </div>
      </div>

      {/* Amount */}
      <span className="font-semibold text-sm text-red-500">
        -${parseFloat(expense?.amount).toFixed(2)}
      </span>
    </div>
  );
};

const RecentExpenses = ({ expenses, onViewAll }) => {
  return (
    <div className="bg-white rounded-2xl max-lg:w-full w-85 p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800">Recent Expenses</h2>
        <button
          onClick={onViewAll}
          className="text-sm font-semibold cursor-pointer text-green-600"
        >
          View All
        </button>
      </div>

      {/* List */}
      {expenses?.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-6">No expenses yet</p>
      ) : (
        expenses.map((expense) => (
          <RecentExpenseItem
            key={expense.id}
            expense={expense}
          />
        ))
      )}
    </div>
  );
};

export default RecentExpenses;