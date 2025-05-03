import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { login } from "../action/user";

export default function LoginPage(props) {
  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user);
  const location = useLocation();

  const from = location.state?.from.pathname || "/";

  if (user.isLogin) {
    return <Navigate to={from} replace={true} />;
  }

  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    dispatch(login({ username }));
  };

  return (
    <div>
      <h3>LoginPage</h3>

      <form onSubmit={submit}>
        <input type="text" name="username" />
        <button type="submit">{user.loading ? "loading..." : "login"}</button>
      </form>

      <p className="red">{user.err.msg}</p>
    </div>
  );
}
