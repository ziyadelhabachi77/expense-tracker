import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { expenseService } from "../services";

// get all expenses
export function useGetExpenses({ page = 1, month = null, year = null, limit=5 } = {}) {
  const { data, isLoading } = useQuery({
    queryKey: ["expenses", page, month, year,limit],
    queryFn: () => expenseService.getAll({page,month,year,limit}),
    select: (data) => data?.data
  });

  return { data, isLoading };
}

// create new expense
export function useAddExpense() {
  const queryClient = useQueryClient();
  const { mutate: addExpenseMutation, isPending } = useMutation({
    mutationFn: expenseService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
  return { addExpenseMutation, isPending };
}

// edit expense
export function useEditExpense() {
  const queryClient = useQueryClient();
  const { mutate: editExpenseMutation, isPending } = useMutation({
    mutationFn: expenseService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  return { editExpenseMutation, isPending };
}

// delete expense
export function useDeleteExpense() {
  const queryClient = useQueryClient();
  const { mutate: deleteExpenseMutation, isPending } = useMutation({
    mutationFn: expenseService.delete,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  return {deleteExpenseMutation, isPending}
}
