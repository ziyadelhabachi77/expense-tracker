import { useNavigate } from "react-router-dom";
import {
  CategoryBudgetCard,
  DashboardSkeleton,
  NoBudgetSet,
  RecentExpenses,
} from "../components";
import WeeklyActivityChart from "../components/features/dashboard/WeeklyActivityChart";
import { useDashboard } from "../hooks";

function Dashboard() {
  const { data, isLoading } = useDashboard();

  const navigate = useNavigate();

  const handleSetCategoryBudget = (category) => {
    navigate("/budgets", {
      state: {
        categoryId: category?.id,
        openBudgetModal: true,
      },
    });
  };

  const calcTotalSpentInPourcentage = () => {
    const totalBudget = Number(data?.total_budget || 0);
    const totalSpent = Number(data?.total_spent || 0);

    if (totalBudget === 0) return 0;

    return (totalSpent / totalBudget) * 100;
  };

  const totalSpent = calcTotalSpentInPourcentage();
  const totalSpentDisplay = totalSpent.toFixed(0);
  const progressWidth = Math.min(totalSpent, 100);
  const budgetHealth =
    totalSpent >= 100
      ? {
          message: "Over Budget",
          textColor: "text-[#BA1A1A]",
          barColor: "bg-[#BA1A1A]",
          badgeColor: "bg-red-100 text-[#BA1A1A]",
        }
      : totalSpent > 85
        ? {
            message: "Close to Limit",
            textColor: "text-orange-500",
            barColor: "bg-orange-400",
            badgeColor: "bg-orange-100 text-orange-600",
          }
        : {
            message: "Good Standing",
            textColor: "text-[#16332D]",
            barColor: "bg-[#16332D]",
            badgeColor: "bg-[#D6E2DD] text-[#5B6763]",
          };

  if (isLoading) return <DashboardSkeleton />;
  return (
    <div>
      {/* status && top categories */}
      <div className="flex items-start flex-col lg:flex-row gap-7 mb-7">
        {/* status */}
        {data?.total_budget === 0 ? (
          <NoBudgetSet title={"Month"} monthlyBudget={true}>
            Take control of your finances by setting a monthly limit. We'll help you track  every expense.
          </NoBudgetSet>
        ) : (
          <div className="rounded-md bg-accent ring w-90 md:w-150 space-y-7 ring-gray-400/70 shadow p-5 flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold">
                  Monthly Budget Summary
                </h1>
                <p className="text-sm text-gray-500">
                  Your Status for Mars 2026
                </p>
              </div>
              <span
                className={`text-[10px] p-1 rounded-full ${budgetHealth.badgeColor}`}
              >
                {totalSpentDisplay}% USED
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-gray-600/70 font-semibold">
                  TOTAL BUDGET
                </span>
                <span className="text-black font-bold">
                  {data?.total_budget} DH
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-600/70 font-semibold">
                  TOTAL SPENT
                </span>
                <span className="text-black font-bold">
                  {data?.total_spent} DH
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-600/70 font-semibold">
                  REMAINING
                </span>
                <span className={`font-bold ${data?.remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {data?.remaining} DH
                </span>
              </div>
            </div>
            {/* total spent in percentage */}
            <div>
              <div className="flex text-sm items-center justify-between">
                <span className="font-semibold text-black">Budget Health</span>
                <span className={`font-semibold ${budgetHealth.textColor}`}>
                  {budgetHealth.message}
                </span>
              </div>
              <div className="rounded-lg overflow-hidden h-4 mt-4 bg-gray-200">
                <div
                  style={{ width: `${progressWidth}%` }}
                  className={`rounded-xl h-full ${budgetHealth.barColor}`}
                ></div>
              </div>
            </div>
          </div>
        )}
        {/* ==== status ==== */}
        {/* top categories */}
        <div className="rounded-md bg-white max-lg:w-full ring ring-gray-400/70 lg:w-85 shadow p-5">
          <h1 className="text-xl font-semibold">Top Categories</h1>
          {data?.top_categories?.length ? (
          <div className="space-y-1">
            {/* category */}
            {data?.top_categories?.map((c) => (
              <CategoryBudgetCard
                category={c}
                key={c.id}
                onSetBudget={handleSetCategoryBudget}
              />
            ))}
            {/* category */}
          </div>

          ) : (
            <div className="h-20 flex items-center justify-center">
                <span className="text-sm text-gray-400">No Categories yet</span>
            </div>
          )}
        </div>
        {/* === top categories === */}
      </div>
      {/* ==== status && top categories === */}

      <div className="flex items-start flex-wrap lg:flex-nowrap justify-between gap-7">
        <WeeklyActivityChart />
        <RecentExpenses
          expenses={data?.recent_expenses}
          onViewAll={() => navigate("/expenses")}
        />
      </div>
    </div>
  );
}

export default Dashboard;
