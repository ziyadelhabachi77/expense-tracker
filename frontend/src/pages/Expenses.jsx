import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search,ReceiptText } from "lucide-react";
import { useMemo, useState } from "react";
import {
  BaseModal,
  CreateExpenseForm,
  DeleteExpenseForm,
  EditExpenseForm,
  ExpensesSkeleton,
  ExpensesTable,
} from "../components";
import { Button } from "../components/ui/button";
import { useGetCategories, useGetExpenses } from "../hooks";

function Expenses() {
  const [page, setPage] = useState(1);
  const limit = 8;

  // =============== local state ================
  const [isCreateExpenseModalOpen, setIsCreateExpenseModalOpen] =
    useState(false);
  const [isDeleteExpenseModalOpen, setIsDeleteExpenseModalOpen] =
    useState(false);
  const [isEditExpenseModalOpen, setIsEditExpenseModalOpen] = useState(false);
  const [categoryState, setCategoryState] = useState("all");
  const [search, setSearch] = useState("");

  // =============== fetch expenses & categories =============
  const { data, isLoading } = useGetExpenses({ limit, page });
  const { data: categories } = useGetCategories();

  const hasNextPage = data?.meta?.current_page < data?.meta?.last_page;
  const hasPrevPage = data?.meta?.current_page > 1;
  const [currentEditableExpense, setCurrentEditableExpense] = useState(null);
  const [expense, setExpense] = useState(null);

  // handle next page
  const handleNextPage = () => {
    if (hasNextPage) {
      setPage((p) => p + 1);
    }
  };
  // handle next page
  const handlePreviousPage = () => {
    if (hasPrevPage) {
      setPage((p) => p - 1);
    }
  };

  // filter
  const filterExpense = useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter((expense) => {
      const matchesSearch =
        search.trim() === "" ||
        expense.attributes.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        categoryState.trim() === "all" ||
        expense.relationships.category?.id === String(categoryState);

      return matchesSearch && matchesCategory;
    });
  }, [search, categoryState, data]);

  return (
    <div>
      {isCreateExpenseModalOpen && (
        <BaseModal>
          <CreateExpenseForm
            setCloseModal={() => setIsCreateExpenseModalOpen(false)}
          />
        </BaseModal>
      )}
      {isDeleteExpenseModalOpen && (
        <BaseModal>
          <DeleteExpenseForm
            expense={expense}
            setCloseModal={() => {
              (setIsDeleteExpenseModalOpen(false), setExpense(null));
            }}
          />
        </BaseModal>
      )}
      {isEditExpenseModalOpen && (
        <BaseModal>
          <EditExpenseForm
            currentEditableExpense={currentEditableExpense}
            setCloseModal={() => {
              (setIsEditExpenseModalOpen(false),
                setCurrentEditableExpense(null));
            }}
          />
        </BaseModal>
      )}

      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-3xl font-semibold">Expenses</h1>
          <p className="text-sm text-gray-500">
            Manage and track your expenses.
          </p>
        </div>
        <Button onClick={() => setIsCreateExpenseModalOpen(true)}>
          <Plus /> Add Expenses
        </Button>
      </div>

      {/* search bar & filter */}
      <div className="flex min-h-10 flex-col gap-4 mb-7 rounded bg-white p-3 shadow-sm sm:flex-row sm:items-end">
        <div className="flex-1">
          <Field>
            <FieldLabel htmlFor="input-button-group">Search</FieldLabel>
            <ButtonGroup className="w-full">
              <Input
                id="input-button-group"
                placeholder="Type to search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                variant="outline"
                className={"py-3"}
                aria-label="Search expenses"
              >
                <Search />
              </Button>
            </ButtonGroup>
          </Field>
        </div>
        <div className="w-full sm:w-44">
          <Field className="min-h-full">
            <FieldLabel>Category</FieldLabel>
            <Select
              value={categoryState}
              onValueChange={(value) => setCategoryState(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  {categories?.data?.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </div>
      {/* === search bar & filter */}

      {/* table content */}
      {isLoading ? (
        <ExpensesSkeleton />
      ) : !filterExpense?.length ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className=" p-10 flex flex-col items-center gap-3">
            <ReceiptText className="w-10 h-10 text-gray-300" />
            <p className="text-gray-400 text-sm">No expenses found</p>
          </div>
        </div>
      ) : (
        <div className="w-fit overflow-x-auto sm:w-full flex flex-col justify-between min-w-0 shadow rounded bg-white min-h-120">
          <ExpensesTable
            setExpense={(data) => setExpense(data)}
            getEditExpenseObj={(data) => setCurrentEditableExpense(data)}
            expenses={filterExpense || []}
            setOpenEditModal={() => setIsEditExpenseModalOpen(true)}
            setOpenDeleteModal={() => setIsDeleteExpenseModalOpen(true)}
          />
          {/* pagination */}
          <div className="flex items-center justify-between bg-white p-2">
            <p className="text-xs font-bold text-stone-600">
              Showing <span>{data?.meta?.from}</span> to{" "}
              <span>{data?.meta?.to}</span> of <span>{data?.meta?.total}</span>{" "}
              entries
            </p>
            <div className="space-x-3">
              <Button
                disabled={!hasPrevPage}
                onClick={handlePreviousPage}
                variant="outline"
                className={"py-4"}
              >
                Previous
              </Button>
              <Button
                disabled={!hasNextPage}
                onClick={handleNextPage}
                variant="outline"
                className={"py-4"}
              >
                Next
              </Button>
            </div>
          </div>
          {/* === pagination === */}
        </div>
      )}
      {/* === table content === */}
    </div>
  );
}

export default Expenses;
