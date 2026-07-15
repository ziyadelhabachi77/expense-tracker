import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { budgetService } from "../services";

// get all budgets
export function useGetBudgets() {
  const { data, isLoading } = useQuery({
    queryKey: ["budgets"],
    queryFn: budgetService.getAll,
    select: (data) => data?.data?.data,
  });

  return { data, isLoading };
}

// create new budget
export function useAddBudget() {
  const queryClient = useQueryClient();

  const { mutate: addBudgetMutation, isPending } = useMutation({
    mutationFn: budgetService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  return { addBudgetMutation, isPending };
}

// edit budget
export function useEditBudget() {
  const queryClient = useQueryClient();

  const { mutate: editBudgetMutation, isPending } = useMutation({
    mutationFn: ({ id, data }) => {budgetService.update(id, data), console.log(id,data)},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  return { editBudgetMutation, isPending };
}

// delete budget
export function useDeleteBudget() {
  const queryClient = useQueryClient();

  const { mutate: deleteBudgetMutation, isPending } = useMutation({
    mutationFn: budgetService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  return { deleteBudgetMutation, isPending };
}
