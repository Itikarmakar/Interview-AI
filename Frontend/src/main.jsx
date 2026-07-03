import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./app.routes.jsx";
import "./style.scss";
import { AuthProvider } from "./features/auth/context/auth.provider.jsx";
import { InterviewProvider } from './features/interview/context/interview.provider.jsx'

createRoot(document.getElementById("root")).render(
<StrictMode>
  <AuthProvider>
    <InterviewProvider>
      <RouterProvider router={router} />
    </InterviewProvider>
  </AuthProvider>
</StrictMode>
);