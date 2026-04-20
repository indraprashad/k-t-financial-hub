import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import useCombinedReducers from "use-combined-reducers";
import { Toaster as Sonner } from "@/common/ui/sonner";
import { Toaster } from "@/common/ui/toaster";
import { TooltipProvider } from "@/common/ui/tooltip";
import NotFound from "./common/NotFound";
import { routes } from "./routes/routes";
import {
  commonReducer,
  initialUser,
  loaderReducer,
  loaderStateReducer,
  loaderValue,
  snackbarReducer,
  snackbarValue,
  userReducer,
} from "./reducers";
import { DispatchContext, StateContext } from "./store/app-context";
import { useReducer } from "react";
import { ApiUtils } from "./utils/ApiUtils";
import { protectedRoutes } from "./routes/protected-route";
import ProtectedMain from "./admin/main/ProtectedMain";
import { LandingPage } from "./view/landing/landing-page";
import Login from "./auth/login";

const queryClient = new QueryClient();

const App = () => {
  const [state, dispatch] = useCombinedReducers({
    user: useReducer(userReducer, initialUser),
    notifyMessage: useReducer(snackbarReducer, snackbarValue),
    loader: useReducer(loaderReducer, loaderValue),
    loaderState: useReducer(loaderStateReducer, false),
    commonUpdate: useReducer(commonReducer, { change: false }),
  });

  ApiUtils.dispatch = dispatch;
  ApiUtils.state = state;
  ApiUtils.navigate = (path: string) => {
    console.log('Navigating to:', path);
  };

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state as any}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                {routes.length > 0 &&
                  routes.map((route, index) => (
                    <Route
                      key={index}
                      element={<route.component />}
                      path={route.path}
                    />
                  ))}

                <Route
                  path="/admin"
                  element={
                    (state as any)?.user?.authenticated ? (
                      <ProtectedMain />
                    ) : (
                      <Navigate to={"/"} replace />
                    )
                  }
                >
                  {protectedRoutes.map((route, index) => (
                    <Route
                      key={index}
                      element={<route.component />}
                      path={route.path}
                    />
                  ))}
                </Route>
                <Route path="*" element={<NotFound />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </HashRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default App;
