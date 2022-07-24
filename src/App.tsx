import { Header } from "./components/Header";
import { TaskList } from "./components/TaskList";
import "./global.css";

function App() {
  return (
    <div className="App">
      <Header />
      <TaskList />
    </div>
  );
}

export default App;
