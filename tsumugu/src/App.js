import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <body>
      <div className="App">
        <div class="navigation">
            <ul>
              <li class="button">
                <p><a href="#">Home</a></p>
              </li>
              <li class="button">
                <p><a href='#'>about</a></p>
              </li>
              <li class="button">
                <p><a href="#">Writing</a></p>
              </li>
              <li class="button">
                <p><a href="#">User</a></p>
              </li>
            </ul>
          </div>
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      </div>
    </body>
  );
}

export default App;
