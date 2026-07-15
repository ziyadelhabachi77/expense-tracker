import { AlertTriangle, Lightbulb, TrendingUp, Wallet } from "lucide-react";
import { defaultIcon, iconIndex } from "../../../helpers/iconsCategories";
import NoBudgetSet from "../dashboard/NoBudgetSet";
import BudgetLimitSkeleton from "./BudgetLimitSkeleton";

const currency = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function BudgetSpendingAnalisis({ budgets, isLoading }) {
  if (isLoading) {
    return <BudgetLimitSkeleton />;
  }

  const availableBudgets = (budgets || [])
    .filter((budget) => budget?.relationships?.category)
    .map((budget) => {
      const amount = Number(budget?.attributes?.amount || 0);
      const spent = Number(budget?.attributes?.total_expenses || 0);
      const usage = amount > 0 ? (spent / amount) * 100 : 0;

      return {
        id: budget?.id,
        amount,
        spent,
        usage,
        remaining: amount - spent,
        category: budget?.relationships?.category,
      };
    });

  if (availableBudgets.length === 0) {
    return (
      <div className="pt-5">
        <NoBudgetSet title="Spending analysis">
          Create category budgets to view spending analysis
        </NoBudgetSet>
      </div>
    );
  }

  const totalBudget = availableBudgets.reduce(
    (total, budget) => total + budget.amount,
    0,
  );
  const totalSpent = availableBudgets.reduce(
    (total, budget) => total + budget.spent,
    0,
  );
  const utilization = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  const remaining = totalBudget - totalSpent;
  const overBudgetCategories = availableBudgets.filter(
    (budget) => budget.spent > budget.amount,
  );
  const topCategories = [...availableBudgets]
    .sort((a, b) => b.spent - a.spent)
    .slice(0, 5);
  const mostUsedBudget = [...availableBudgets].sort(
    (a, b) => b.usage - a.usage,
  )[0];
  const maxChartValue = Math.max(
    ...availableBudgets.flatMap((budget) => [budget.amount, budget.spent]),
    1,
  );

  const insightText =
    mostUsedBudget.usage >= 100
      ? `${mostUsedBudget.category?.name} is over budget by ${currency.format(Math.abs(mostUsedBudget.remaining))} DH. Try reducing this category first.`
      : mostUsedBudget.usage >= 85
        ? `${mostUsedBudget.category?.name} has used ${mostUsedBudget.usage.toFixed(0)}% of its budget. Keep an eye on it before adding more expenses.`
        : `Your highest used budget is ${mostUsedBudget.category?.name} at ${mostUsedBudget.usage.toFixed(0)}%. Spending is still under control.`;

  return (
    <div className="space-y-6 pt-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-md bg-white p-5 shadow ring ring-gray-300">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Total Spent
            </span>
            <Wallet size={18} className="text-[#16332D]" />
          </div>
          <p className="mt-3 text-3xl font-semibold text-gray-900">
            {currency.format(totalSpent)} DH
          </p>
          <p className="mt-1 text-sm text-gray-500">
            From {currency.format(totalBudget)} DH planned
          </p>
        </div>

        <div className="rounded-md bg-white p-5 shadow ring ring-gray-300">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Utilization
            </span>
            <TrendingUp size={18} className="text-[#16332D]" />
          </div>
          <p className="mt-3 text-3xl font-semibold text-gray-900">
            {utilization.toFixed(0)}%
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className={`h-full rounded-full ${
                utilization >= 100
                  ? "bg-[#BA1A1A]"
                  : utilization >= 85
                    ? "bg-orange-400"
                    : "bg-[#16332D]"
              }`}
              style={{ width: `${Math.min(utilization, 100)}%` }}
            />
          </div>
        </div>

        <div className="rounded-md bg-white p-5 shadow ring ring-gray-300">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Budget Status
            </span>
            <AlertTriangle
              size={18}
              className={
                overBudgetCategories.length > 0
                  ? "text-[#BA1A1A]"
                  : "text-[#197857]"
              }
            />
          </div>
          <p
            className={`mt-3 text-3xl font-semibold ${
              remaining < 0 ? "text-[#BA1A1A]" : "text-gray-900"
            }`}
          >
            {currency.format(Math.abs(remaining))} DH
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {remaining < 0 ? "Over total category budgets" : "Still available"}
          </p>
        </div>
      </div>

      <div className="rounded-md bg-white shadow ring ring-gray-300">
        <div className="border-b border-gray-200 p-5">
          <h3 className="text-xl font-semibold text-gray-900">
            Spending vs Budget
          </h3>
          <p className="text-sm text-gray-500">
            Real comparison from your category budgets and current expenses.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 p-5 lg:grid-cols-2">
          {availableBudgets.map((budget) => {
            const Icon = iconIndex[budget.category?.icon] || defaultIcon;
            const spentWidth = (budget.spent / maxChartValue) * 100;
            const budgetWidth = (budget.amount / maxChartValue) * 100;

            return (
              <div key={budget.id} className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      style={{ background: Icon.background }}
                      className="inline-flex size-9 shrink-0 items-center justify-center rounded-md"
                    >
                      <Icon.icon size={17} style={{ color: Icon.color }} />
                    </span>
                    <span className="truncate font-medium text-gray-800">
                      {budget.category?.name}
                    </span>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      budget.usage >= 100
                        ? "text-[#BA1A1A]"
                        : budget.usage >= 85
                          ? "text-orange-500"
                          : "text-[#16332D]"
                    }`}
                  >
                    {budget.usage.toFixed(0)}%
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-[70px_1fr_90px] items-center gap-2 text-xs text-gray-500">
                    <span>Spent</span>
                    <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-[#16332D]"
                        style={{ width: `${spentWidth}%` }}
                      />
                    </div>
                    <span className="text-right">
                      {currency.format(budget.spent)} DH
                    </span>
                  </div>
                  <div className="grid grid-cols-[70px_1fr_90px] items-center gap-2 text-xs text-gray-500">
                    <span>Budget</span>
                    <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-gray-300"
                        style={{ width: `${budgetWidth}%` }}
                      />
                    </div>
                    <span className="text-right">
                      {currency.format(budget.amount)} DH
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_0.75fr]">
        <div className="rounded-md bg-white shadow ring ring-gray-300">
          <div className="border-b border-gray-200 p-5">
            <h3 className="text-xl font-semibold text-gray-900">
              Highest Spending Categories
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-170 text-left">
              <thead className="text-xs uppercase tracking-wide text-gray-500">
                <tr className="border-b border-gray-200">
                  <th className="px-5 py-3 font-semibold">Category</th>
                  <th className="px-5 py-3 font-semibold">Total Spent</th>
                  <th className="px-5 py-3 font-semibold">Budget</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {topCategories.map((budget) => {
                  const Icon = iconIndex[budget.category?.icon] || defaultIcon;
                  const isOverBudget = budget.spent > budget.amount;

                  return (
                    <tr key={budget.id} className="border-b border-gray-100">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span
                            style={{ background: Icon.background }}
                            className="inline-flex size-9 items-center justify-center rounded-md"
                          >
                            <Icon.icon
                              size={17}
                              style={{ color: Icon.color }}
                            />
                          </span>
                          <span className="font-medium text-gray-800">
                            {budget.category?.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        {currency.format(budget.spent)} DH
                      </td>
                      <td className="px-5 py-4">
                        {currency.format(budget.amount)} DH
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${
                            isOverBudget
                              ? "bg-red-100 text-[#BA1A1A]"
                              : budget.usage >= 85
                                ? "bg-orange-100 text-orange-700"
                                : "bg-emerald-50 text-[#0F6B4F]"
                          }`}
                        >
                          {isOverBudget
                            ? "Over budget"
                            : budget.usage >= 85
                              ? "Near limit"
                              : "On track"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-md bg-[#2F574A] p-6 text-white shadow">
            <div className="flex gap-4">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                <Lightbulb size={20} />
              </span>
              <div>
                <h3 className="text-xl font-semibold">Budget Insight</h3>
                <p className="mt-2 leading-7 text-white/75">{insightText}</p>
              </div>
            </div>
          </div>

          <div className="rounded-md bg-white p-6 shadow ring ring-gray-300">
            <div className="flex items-center justify-between gap-5">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Total Budget Utilization
                </h3>
                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {utilization.toFixed(0)}%
                </p>
              </div>
              <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-[#16332D]"
                  style={{ width: `${Math.min(utilization, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetSpendingAnalisis;
