import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../reducers/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const backHomeHandler = () => {
    navigate("/");
  };

  return (
    <header className="  border-b-2">
      <div className="mx-4 flex h-[10vh] justify-between items-center">
        <div className="font-bold  text-2xl">
          <Link onClick={backHomeHandler} to="/">
            iSupport
          </Link>
        </div>
        <ul className="flex align-center space-x-4">
          {user ? (
            <button
              className="bg-black text-white font-bold px-6 py-2 rounded-md hover:bg-gray-600 duration-100"
              onClick={onLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <li className="hover:text-gray-400">
                <Link className="flex items-center gap-2" to="/login">
                  <FaSignInAlt />
                  Login
                </Link>
              </li>
              <li className="hover:text-gray-400">
                <Link className="flex items-center gap-2" to="/register">
                  <FaUser />
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
