import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "../services";

// get all categories
export function useGetCategories() {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getAll,
    select: (data) => data?.data,
  });

  return { data, isLoading };
}

// create new category
export function useAddCategory() {
  const queryClient = useQueryClient();

  const { mutate: addCategoryMutation, isPending } = useMutation({
    mutationFn: categoryService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { addCategoryMutation, isPending };
}

// edit category
export function useEditCategory() {
  const queryClient = useQueryClient();

  const { mutate: editCategoryMutation, isPending } = useMutation({
    mutationFn: categoryService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { editCategoryMutation, isPending };
}

// delete category
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { mutate: deleteCategoryMutation, isPending } = useMutation({
    mutationFn: categoryService.delete,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { deleteCategoryMutation, isPending };
}