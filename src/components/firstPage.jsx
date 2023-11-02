import { Link } from "react-router-dom";
function FirstPage() {
    return (
        <div>
            <h1>Hello Welcome. Please Register.</h1>
            <Link
          to="/register"
          className="btn btn-outline-primary border w-100 rounded-10 text-decoration-none"
        >
          Register
        </Link>
        </div>
    )
}

export default FirstPage;