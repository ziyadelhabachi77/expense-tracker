import { defaultIcon, iconIndex } from "../../../helpers/iconsCategories";


const CategoryBudgetCard = ({ category, onSetBudget }) => {
  const totalBudget = Number(category?.total_budget || 0);
  const totalSpent = Number(category?.total_spent || 0);
  const hasBudget = totalBudget > 0;
  const usagePercentage = hasBudget ? (totalSpent / totalBudget) * 100 : 0;
  const progressWidth = Math.min(usagePercentage, 100);
  const progressColor =
    usagePercentage >= 100
      ? "bg-[#BA1A1A]"
      : usagePercentage >= 85
        ? "bg-orange-400"
        : "bg-[#16332D]";

  const Icon = iconIndex[category?.icon] || defaultIcon;

  return (
    <div className="flex flex-col py-2">
      {/* icon + name + amount */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-700">
          <Icon.icon size={16} />
          <span className="font-medium text-sm">{category.name}</span>
        </div>
        {hasBudget ? (
          <span className="font-medium text-gray-800">
            {totalSpent.toFixed(2)} DH
          </span>
        ) : (
          <span className="text-sm italic text-gray-400">Budget not set</span>
        )}
      </div>

      {/* progress bar or description + set budget */}
      {hasBudget ? (
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className={`h-2 rounded-full ${progressColor}`}
            style={{
              width: `${progressWidth}%`,
            }}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400 truncate max-w-45">
            {category.description}
          </span>
          <button
            onClick={() => onSetBudget?.(category)}
            className="text-sm font-semibold cursor-pointer text-green-600"
          >
            Set budget
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryBudgetCard;
