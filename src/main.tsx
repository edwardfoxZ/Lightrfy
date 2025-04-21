import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import { Main } from "./pages/Main.tsx";
import { Join } from "./pages/Join.tsx";
import { Page } from "./pages/Page.tsx";
import Upload from "./server/upload.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Main />} />
      <Route path="/join-waitlist" element={<Join />} />
      <Route path="/lightr-songs-user" element={<Page />} />
      <Route path="/upload-songs/user" element={<Upload />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
