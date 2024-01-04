import "./App.css";
import Users from "./Components/Users";
import { ErrorBoundary } from "./ErrorHandling/ErrorBoundary";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Users />
      </ErrorBoundary>
    </div>
  );
}

export default App;
