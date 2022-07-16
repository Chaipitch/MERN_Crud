import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

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

    if (password !== password2) {
      toast.error("Passwords arent match!");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1 className="flex justify-center gap-2 items-center mt-8 text-3xl text-center font-bold">
          <FaUser /> Register
        </h1>
        <p className="text-center font-bold text-gray-600 mt-6">
          Please create an Account
        </p>
      </section>
      <section>
        <form onSubmit={onSubmit}>
          <div className="mx-[20%] md:mx-[30%]">
            <input
              type="text"
              className=" border-2 h-10 p-6 my-4 w-full rounded-2xl"
              placeholder="name"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
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
          <div className="mx-[20%] md:mx-[30%]">
            <input
              type="password"
              className=" border-2 h-10 p-6 my-4 w-full rounded-2xl"
              placeholder="confirm password"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              required
            />
          </div>
          <div className="mx-[20%] md:mx-[30%] text-white text-center">
            <button
              type="submit"
              className="bg-black w-full h-10 rounded-xl hover:bg-gray-600"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
