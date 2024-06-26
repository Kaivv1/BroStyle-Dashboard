import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Order from "./pages/Order";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Users from "./pages/Users";
import ErrorFallback from "./pages/ErrorFallback";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Settings from "./pages/Settings";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import ProtectedRoute from "./features/authentication/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:orderId" element={<Order />} />
              <Route path="/account" element={<Account />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<ErrorFallback />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          toastOptions={{
            success: {
              duration: 4000,
            },
            error: {
              duration: 6000,
            },
            className:
              "dark:bg-gray-700 dark:text-gray-100 bg-white text-gray-900 text-base px-5 py-3 max-w-34",
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
