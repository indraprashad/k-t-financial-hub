import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { isAdminLoggedIn, adminLogout } from "@/lib/contentStore";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}
