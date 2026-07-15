import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CircleAlert,
  DollarSign,
  Radar,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAddBudget } from "../../../hooks";
import { Button } from "../../ui/button";
import { useQueryClient } from "@tanstack/react-query";

function WelcomBudgetPage() {
  const [monthBudgetIsOpen, setMonthBudgetIsOpen] = useState(false);
  const [budget, setBudget] = useState("");
  const queryClient = useQueryClient()

  // =============== get budget hoo ==============
  const { addBudgetMutation } = useAddBudget();

  // save total budget
  const handleSaveBudget = () => {
    const now = new Date();
    addBudgetMutation(
      {
        amount: budget,
        category_id: null,
        month: String(now.getMonth() + 1).padStart(2, "0"),
        year: now.getFullYear(),
      },
      {
        onSuccess: () => {
          toast.success("Total budget set successfully!");
          queryClient.invalidateQueries({queryKey: ['dashboard']})
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message);
        },
      },
    );
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="ring w-screen max-w-130 rounded-lg ring-gray-300 bg-white py-4 px-9">
        <div className="space-x-3 text-center">
          <span
            className={`h-1 w-20 inline-block rounded ${!monthBudgetIsOpen ? "bg-[#16332D]" : "bg-gray-300"} `}
          ></span>
          <span
            className={`h-1 w-20 inline-block rounded ${monthBudgetIsOpen ? "bg-[#16332D]" : "bg-gray-300"}`}
          ></span>
        </div>
        {!monthBudgetIsOpen ? (
          <div className="text-center mt-5 pb-5">
            <span className="p-4 bg-[#C9E9E0] rounded-xl inline-block">
              <Wallet size={30} className="text-[#203E37]" />
            </span>
            <h1 className="text-3xl text-[#203E37] font-semibold mt-2">
              Welcome to Mizania
            </h1>
            <p className="text-gray-500 mt-2">
              Setting a monthly budget is the first step toward disciplined
              financial growth. We'll help you organize your spending by
              categories to give you ultimate clarity.
            </p>
            <Button
              onClick={() => setMonthBudgetIsOpen(true)}
              className={"w-full py-5 max-w-[80%] mt-3 cursor-pointer"}
            >
              Set Monthly Budget <ArrowRight />
            </Button>
            <p className="mt-2 text-gray-400 text-sm mb-10">
              it only takes 5 seconds to get started
            </p>
            <div className="pt-9 border-t border-gray-300 flex items-center justify-between text-gray-700">
              <div className="flex items-center flex-col space-y-2">
                <Radar size={17} />
                <span className="text-xs">Real-time Tracking</span>
              </div>
              <div className="flex items-center flex-col space-y-2">
                <Brain size={17} />
                <span className="text-xs">Smart Insights</span>
              </div>
              <div className="flex items-center flex-col space-y-2">
                <ShieldCheck size={17} />
                <span className="text-xs">Private & Secure</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-5">
            <div
              onClick={() => setMonthBudgetIsOpen(false)}
              className="py-5 flex items-center w-fit cursor-pointer gap-2"
            >
              <ArrowLeft size={19} /> Back
            </div>
            <h2 className="text-[#16332D] font-semibold text-2xl">
              Monthly Budget
            </h2>
            <p>What is your total budget for Octover?</p>
            <div className="relative">
              <Input
                type="number"
                value={budget}
                onChange={(e) =>
                  setBudget(
                    e.target.value.trim() === ""
                      ? e.target.value
                      : e.target.valueAsNumber,
                  )
                }
                placeholder="0.00"
                className="mt-3 py-6 pl-7"
              />
              <DollarSign
                className="absolute left-1 top-7 text-gray-500"
                size={18}
              />
            </div>
            <div className="bg-[#FAFAFA] rounded ring ring-gray-400/90 p-4 mt-5">
              <div className=" text-gray-500">
                <p className="flex items-start gap-2">
                  <CircleAlert size={40} className="text-[#16332D]" /> Adding a
                  new category will allow you to track transactions and set
                  custom budget limits for better financial discipline.
                </p>
              </div>
            </div>
            <div className="flex flex-col mt-5 gap-2">
              <Button onClick={handleSaveBudget} className={"py-5"}>Save and Continue</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WelcomBudgetPage;
