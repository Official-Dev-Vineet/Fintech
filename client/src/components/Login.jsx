import { Link } from "react-router-dom";
import "./styles/Login.css"; // Import CSS file
const Login = () => {
  return (
    <main className="login">
      <form>
        <div className="LoginForm">
          <h2 className="subTitle">Login</h2>
          <div className="inputField">
            <label htmlFor="mobile">Mobile No</label>
            <input type="text" placeholder="Enter Mobile No" id="mobile" />
          </div>
          <div className="inputField">
            <label htmlFor="Password">Password</label>
            <input type="password" placeholder="Enter Password" id="Password" />
          </div>
          <button type="submit">Login</button>
        </div>

        <div className="register">
          <p>
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </main>
  );
};

export default Login;
