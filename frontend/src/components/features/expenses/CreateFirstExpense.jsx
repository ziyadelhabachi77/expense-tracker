import { Plus, Wallet } from "lucide-react";
import { Button } from "../../ui/button";

function CreateFirstExpense() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col gap-5 text-center w-60">
        <span className="ring max-w-fit mx-auto ring-gray-300 p-1 rounded-md">
          <span className="bg-[#EDEEEF] p-3 flex items-center rounded-md justify-center">
            <Wallet size={50} className="color-text-main" />
          </span>
        </span>
        <div>
          <h3 className="text-xl font-semibold">No expenses yet</h3>
          <p className="text-xs text-gray-500/70">
            Start tracking your spending to see your dashboard.
          </p>
        </div>

        <Button className={"w-fit mx-auto "}><Plus /> ADD FIRST EXPENSES</Button>
      </div>
    </div>
  );
}

export default CreateFirstExpense;
