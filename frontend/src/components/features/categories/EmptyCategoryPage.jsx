import { CircleAlert, Plus, Shapes } from "lucide-react";
import { Button } from "../../ui/button";

function EmptyCategoryPage() {
  return (
    <div className="h-full flex flex-col justify-center gap-7">
      <div className="bg-white rounded flex w-full py-16 ring ring-gray-300 shadow flex-col gap-4 items-center justify-center text-center">
        <span className="inline-block p-4 rounded-md bg-[#EDEEEF] text-[#16332D]">
          <Shapes size={80} />
        </span>
        <h3 className="text-[#16332D] text-xl">No categories created yet </h3>
        <p className="text-sm text-[#414846]">
          Start by creating your first category to begin tracking your student
          finances with precision and clarity.
        </p>
        <Button className={"py-6 px-8"}>
          <Plus size={19} /> Create Category
        </Button>
      </div>
      <div className="p-4 bg-[#F3F4F5] space-y-3 rounded border max-w-[35%] ring-gray-300">
        <span className="flex items-center text-sm text-[#16332D] gap-2">
          <CircleAlert size={20} /> WHY CATEGORIES?
        </span>
        <p className="text-[#797F7D]">
          Organizing your expenses into categories helps PennyWise provide
          better insights into your spending habits as a student.
        </p>
      </div>
    </div>
  );
}

export default EmptyCategoryPage;
