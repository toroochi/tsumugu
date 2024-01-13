import logo from './logo.svg';
import './App.css';
import './components/style.css';

function App() {
  return (
    <body>
        <h1>
          <p>　みんなと、小説を紡ぐ</p>
          <span>Re:Tale</span> 
        </h1>
        <div className="right">
        <div class="content">
          <div class="text">Login Form</div>
          <form action="#">
            <div class="field">
              <span class="fas fa-user"></span>
              <input type="text" required></input>
              <label>Email</label>
            </div>
            <div class="field">
              <span class="fas fa-lock"></span>
              <input type="password"></input>
              <label>Password</label>
            </div>
            <div class="forgot-pass"><a href="#">Forgot Password?</a></div>
            <button><p>Sign in</p></button>
            <div class="signup">Not a member?
              <a href="#">signup now</a>
            </div>
          </form>
          </div>
        </div>
    </body>
  );
}

export default App;
