import { Dashboard } from './components/Dashboard';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__brand">
          <div className="logo">FW</div>
          <div>
            <h1>FactWise</h1>
            <p>Employee Directory</p>
          </div>
        </div>
        <span className="app-header__date">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </header>

      <main className="app-main">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
