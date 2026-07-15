import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, CircleAlert, X } from "lucide-react";
import { useState } from "react";
import { defaultIcon, iconsCategories } from "../../../helpers/iconsCategories";
import { useAddCategory } from "../../../hooks";
import { Button } from "../../ui/button";
import toast from "react-hot-toast";

function CreateCategoryForm({ setClose }) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [Icon, setIcon] = useState(defaultIcon || "");
  const [openCategorySelect, setOpenCategorySelect] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  // get the category delete hook
  const { addCategoryMutation,isPending } = useAddCategory();

    console.log(categoryDescription)

  const handleAddCategory = () => {
    setIsSubmit(true);
    if (categoryName.trim() === "" || categoryDescription.trim() === "") return;
    const category = {
      name: categoryName,
      description: categoryDescription,
      icon: Icon.name,
    };
    addCategoryMutation(category, {
      onSuccess: () => {
        toast.success("Category added");
        setClose();
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message);
      },
    });
  };

  return (
    <div className="bg-white w-screen max-w-170 rounded">
      <div className="p-6 bg-[#FCFCFC] border-b border-gray-400 flex items-center justify-between">
        <h3 className="text-lg tet">Create Category</h3>
        <X
          onClick={setClose}
          size={20}
          className="text-gray-400 cursor-pointer"
        />
      </div>

      <div className="p-6 space-y-6">
        <Field>
          <FieldLabel
            htmlFor="input-field-categorie_name"
            className="font-semibold text-lg"
          >
            Category Name
          </FieldLabel>
          <Input
            id="input-field-categorie_name"
            type="text"
            placeholder="e.g., Subscriptions, Groceries"
            className="py-5"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <p className="text-xs mt-1 text-red-500">
            {categoryName === "" && isSubmit ? "Name is required" : ""}
          </p>
        </Field>
        <Field>
          <FieldLabel
            htmlFor="input-field-categorie_description"
            className="font-semibold text-lg"
          >
            Category Description
          </FieldLabel>
          <Input
            id="input-field-categorie_description"
            type="text"
            placeholder="description of the category"
            className="py-5"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          />
          <p className="text-xs mt-1 text-red-500">
            {categoryDescription === "" && isSubmit
              ? "Description is required"
              : ""}
          </p>
        </Field>
        <div className="flex items-center gap-2">
          <span
            style={{ backgroundColor: Icon?.background ?? "#F3F4F6" }}
            className="rounded-md p-2 inline-block"
          >
            {<Icon.icon style={{ color: Icon?.color ?? "#6B7280" }} />}
          </span>
          <div className="relative select-none w-full text-sm ">
            <div
              onClick={() => setOpenCategorySelect(!openCategorySelect)}
              className="w-50 py-2 rounded-md pl-9 relative cursor-pointer ring ring-gray-300"
            >
              choose an icon
              {openCategorySelect ? (
                <ChevronUp className="absolute top-1.5 left-2 pointer-events-none" />
              ) : (
                <ChevronDown className="absolute top-1.5 left-2 pointer-events-none" />
              )}
            </div>
            {openCategorySelect && (
              <div className="absolute  top-[120%] z-999 text-gray-700 left-0 bg-white ring ring-gray-400 rounded-md">
                {iconsCategories?.map((icon) => (
                  <div key={icon?.label} className="p-3">
                    <p className="mb-3">{icon?.label}</p>
                    <div className="flex items-center gap-3">
                      {icon?.icons?.map((I, index) => {
                        const IconComponent = I.icon;
                        return (
                          <span
                            key={index}
                            onClick={() => {
                              (setIcon(I), setOpenCategorySelect(false));
                            }}
                            className="rounded-md ring cursor-pointer hover:text-gray-400 transition-colors ring-gray-400 p-2 inline-block"
                          >
                            {<IconComponent />}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="bg-[#FAFAFA] rounded ring ring-gray-300 p-4">
          <div className=" text-[#A8A8B1]/95">
            <p className="flex items-start gap-2">
              <CircleAlert /> Adding a new category will allow you to track
              transactions and set custom budget limits for better financial
              discipline.
            </p>
          </div>
        </div>

        <div className="text-end space-x-4">
          <Button onClick={setClose} variant="outline">
            cancel
          </Button>
          <Button disabled={isPending} onClick={handleAddCategory} className={"px-8"}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateCategoryForm;
