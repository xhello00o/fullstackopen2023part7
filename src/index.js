import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { NotificationContextProvider } from "./NotificationContext";
import { UserContextProvider } from "./UserContext";
import { CreateBlogContextProvider } from "./CreateBlogContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <NotificationContextProvider>
          <CreateBlogContextProvider>
          <App />
          </CreateBlogContextProvider>
        </NotificationContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </Router>
);
