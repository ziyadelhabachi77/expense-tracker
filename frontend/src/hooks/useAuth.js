import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services";

// get the current user
export function useGetUser() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => authService.getUser(),
    select: (data) => data?.data?.data
  });

  return { data, isLoading };
}

// register a new user
export function useRegister() {
  const { mutate: registerMutation, isPending, } = useMutation({
    mutationFn: (data) => authService.register(data),
    onSuccess: (data) => {
      localStorage.setItem("auth_token", data?.data?.data?.token)
    },
    onError: (error) => {
        console.log(error)
    }
  });
  return { registerMutation, isPending };
}

// login 
export function useLogin() {
  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: ({ email, password }) => authService.login(email, password),
    onSuccess: (data) => {
      localStorage.setItem("auth_token", data?.data?.data?.token);
    },
  });

  return { loginMutation, isPending };
}


// logout
export function useLogout() {
  const queryClient = useQueryClient();
  const { mutate: logoutMutation } = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      localStorage.removeItem("auth_token");
      queryClient.clear();
    },
  });

  return { logoutMutation };
}


// check if the user is authenticated
export function useIsAuthenticated() {
  const {data:user, isLoading} = useGetUser();

  return {
    isAuthenticated: !!user,
    isLoading,
    user
  }
}