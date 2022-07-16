import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket, reset } from "../features/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState("iPhone");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate("/tickets");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({ product, description }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <section className="heading py-4">
        <h1 className="text-center  mt-6 text-3xl font-bold">
          Create New Ticket
        </h1>
        <p className="text-center font-bold text-xl text-gray-600">
          Please fill out the form below
        </p>
      </section>

      <section className="form mx-[25%]">
        <div className="flex flex-col space-y-2 mx-auto py-2 ">
          <label className="font-bold" htmlFor="name">
            Customer Name
          </label>
          <input
            className="rounded-md p-2 border-2 border-gray-400 bg-gray-300"
            type="text"
            value={name}
            disabled
          />
        </div>
        <div className="flex flex-col space-y-2 mx-auto py-2 ">
          <label className="font-bold" htmlFor="name">
            Customer Email
          </label>
          <input
            className="rounded-md p-2 border-2 border-gray-400 bg-gray-300"
            type="text"
            value={email}
            disabled
          />
        </div>

        <form onSubmit={onSubmit}>
          <div className="flex flex-col space-y-2 mx-auto py-2 ">
            <label className="font-bold mr-2" htmlFor="product">
              Product
            </label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="border-2 border-gray-400 rounded-md bg-gray-100"
            >
              <option value="iPhone">iPhone</option>
              <option value="iMac">iMac</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iPad">iPad</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2 mx-auto py-2 ">
            <label className="font-bold" htmlFor="description">
              Description of the issue
            </label>
            <textarea
              className="border-2 border-gray-400 rounded-md p-2"
              name="description"
              id="description"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button className="flex font-semibold justify-center rounded-md py-2 mt-4 bg-black text-white w-full hover:bg-gray-800 duration-200">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
