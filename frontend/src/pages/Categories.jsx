import { CircleAlert, Plus, Trash,FolderOpen } from "lucide-react";
import { useState } from "react";
import {
  BaseModal,
  CategoriesSkeleton,
  CreateCategoryForm,
} from "../components";
import DeleteCategoryModal from "../components/features/categories/DeleteCategoryModal";
import { Button } from "../components/ui/button";
import { defaultIcon, iconIndex } from "../helpers/iconsCategories";
import { useGetCategories } from "../hooks";

function Categories() {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDeleteCategoryOpen, setIsDeleteCategoryOpen] = useState(false);
  const [category, setCategory] = useState(null);

  // =============== fetch categories ===============
  const { data, isLoading } = useGetCategories();

  return (
    <div>
      {isCategoryModalOpen && (
        <BaseModal>
          <CreateCategoryForm setClose={() => setIsCategoryModalOpen(false)} />
        </BaseModal>
      )}

      {isDeleteCategoryOpen && (
        <BaseModal>
          <DeleteCategoryModal
            category={category}
            setClose={() => {
              (setIsDeleteCategoryOpen(false), setCategory(null));
            }}
          />
        </BaseModal>
      )}
      {/* header */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-3xl font-semibold">Categories</h1>
          <p className="text-sm text-gray-500">
            Organize your spending with custom lables.
          </p>
        </div>
        <Button onClick={() => setIsCategoryModalOpen(true)}>
          <Plus /> Create Category
        </Button>
      </div>
      {/* === header === */}
      {/* categries content */}
      {isLoading ? (
        <CategoriesSkeleton />
      ) : !data?.data?.length ? (
        <div className="flex flex-col items-center justify-center py-16 ">
          <div className="rounded w-full p-10 flex flex-col items-center gap-3">
            <FolderOpen className="w-10 h-10 text-gray-300" />
            <p className="text-gray-400 text-sm">No categories found</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 py-9 border-b border-gray-300/50 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {data?.data?.map((category) => {
            const Icon = iconIndex[category?.icon] || defaultIcon;

            return (
              <div
                key={category?.id}
                className="ring group transition relative ring-gray-300 rounded p-5 bg-white flex gap-3 items-start"
              >
                <span
                  style={{ backgroundColor: Icon.background }}
                  className={`p-3 rounded inline-block`}
                >
                  <Icon.icon style={{ color: Icon.color }} />
                </span>
                <div className="flex flex-col">
                  <span className="text-[#16332D] font-semibold">
                    {category?.name}
                  </span>
                  <span className="text-[#16332D]/80 ">
                    {category?.description}
                  </span>
                </div>
                <span className="hover:bg-red-200 transition-colors absolute rounded p-1 top-2 right-2">
                  <Trash
                    size={15}
                    onClick={() => {
                      (setIsDeleteCategoryOpen(true), setCategory(category));
                    }}
                    className="group-hover:block hidden cursor-pointer text-red-500 "
                  />
                </span>
              </div>
            );
          })}
        </div>
      )}
      {/*=== categries content ===*/}
      <div className="mt-9 text-[#16332D]/60">
        <p className="flex items-center gap-2">
          <CircleAlert /> Catgories help the Budget Planner track your monthly
          spending limits more accurately.
        </p>
      </div>
    </div>
  );
}

export default Categories;
