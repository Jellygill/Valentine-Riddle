import { Switch, Route, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import Reasons from "@/pages/Reasons";
import SecretSequence from "@/pages/SecretSequence";
import NotFound from "@/pages/not-found";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/reasons" component={Reasons} />
      <Route path="/secret" component={SecretSequence} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppRouter() {
  return (
    <WouterRouter hook={useHashLocation}>
      <Routes />
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <AppRouter />
    </QueryClientProvider>
  );
}

export default App;
