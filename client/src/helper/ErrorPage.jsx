import { Link, useRouteError } from "react-router-dom";
import "./styles/ErrorPage.css";
const ErrorPage = () => {
  const error = useRouteError();
  return (
    <section className="errorPage">
      <div className="errorPage_wrapper">
        <h1>Oops !</h1>
        <p>
          <i>
            {error.statusText || error.message} || {error.data}
          </i>
        </p>
        <Link to="/">Back to Home</Link>
      </div>
    </section>
  );
};

export default ErrorPage;
