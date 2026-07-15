import { Plus, Wallet } from "lucide-react";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";

function NoBudgetSet({children,monthlyBudget,title}) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center bg-white flex-col justify-center py-9 rounded-md ring space-y-2 text-center ring-gray-400/70 shadow p-5 flex-1">
      <span className="p-4 inline-block bg-gray-300/50 rounded-md">
        <Wallet size={35} className="text-gray-700"/>
      </span>
      <h2 className="text-2xl font-semibold">No {title} budget set yet</h2>
      <p className="max-w-100">{children}.</p>
      {monthlyBudget && <Button onClick={() => navigate("/budgets")} className={"px-7 py-5"}><Plus /> Set monthly budget</Button>}
    </div>
  );
}

export default NoBudgetSet;
