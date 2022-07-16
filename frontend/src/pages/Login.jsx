import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1 className="flex justify-center gap-2 items-center mt-8 text-3xl text-center font-bold">
          <FaSignInAlt /> Login
        </h1>
        <p className="text-center font-bold text-gray-600 mt-6">
          Please fill in your credentials
        </p>
      </section>
      <section>
        <form onSubmit={onSubmit}>
          <div className="mx-[20%] md:mx-[30%]">
            <input
              type="email"
              className=" border-2 h-10 p-6 my-4 w-full rounded-2xl"
              placeholder="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="mx-[20%] md:mx-[30%]">
            <input
              type="password"
              className=" border-2 h-10 p-6 my-4 w-full rounded-2xl"
              placeholder="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>

          <div className="mx-[20%] md:mx-[30%] text-white text-center">
            <button className="bg-black w-full h-10 rounded-xl hover:bg-gray-600">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
