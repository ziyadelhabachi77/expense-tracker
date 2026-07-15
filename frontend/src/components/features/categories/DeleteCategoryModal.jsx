import { TriangleAlert, Trash2 } from "lucide-react"
import { Button } from "../../ui/button"
import { defaultIcon, iconIndex } from "../../../helpers/iconsCategories"
import { useDeleteCategory } from "../../../hooks";
import toast from "react-hot-toast";

function DeleteCategoryModal({ setClose, category }) {
    const Icon = iconIndex[category.icon] || defaultIcon;
    const { deleteCategoryMutation } = useDeleteCategory();

    // handle delete category 
    const handleDeleteCategory = () => {
        deleteCategoryMutation(category.id, {
            onSuccess: () => {
                toast.success("Category deleted successfully");
                setClose();
            },
            onError: (err) => {
                toast.error(err?.response?.data?.message);
            },
        })
    }

    return (
        <div className="bg-white rounded w-screen max-w-140">
            <div className="p-7 space-y-4">
                <div className="flex items-center gap-3">
                    <span className="p-2 rounded-md inline-block bg-[#FFDAD6]"><TriangleAlert size={18} className="text-red-600" /></span>
                    <h2 className="text-lg text-black/90">Delete Category</h2>
                </div>
                <p className="text-black/80 text-sm">Are you sur you want to delete this category? this action cannot be undone.</p>

                <div className="ring ring-gray-300 p-4 bg-[#EDEEEF]/30 rounded mb-4">
                    <div className="flex items-start gap-3">
                        <span style={{ backgroundColor: Icon?.background }} className="p-4 rounded"><Icon.icon style={{ color: Icon?.color }} /></span>
                        <div className="flex flex-col ">
                            <span className="text-gray-400 text-sm">SELECTED CATEGORY</span>
                            <span className="font-semibold ">{category?.name}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[#FFF4F3] border-l-5 border-red-500 p-5">
                    <p className="text-[#A0222A]">Deleting this will also remove associated transaction history from this budget bucket.</p>
                </div>
            </div>
            <div className="py-3 border-t border-gray-300 text-end space-x-4 pr-4 bg-[#F3F4F5]">
                <Button onClick={setClose} variant="outline">Cancel</Button>
                <Button onClick={handleDeleteCategory} variant="delete" className={"px-7"}><Trash2 /> Delete</Button>
            </div>
        </div>
    )
}

export default DeleteCategoryModal