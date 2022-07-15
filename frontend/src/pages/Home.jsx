import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

function Home() {
  return (
    <>
      <section>
        <h1 className="text-center text-3xl font-bold mt-16">
          What do you need help with?
        </h1>
        <p className="text-xl text-gray-600 font-bold text-center mt-6">
          Please choose options below!
        </p>
      </section>
      <div className="flex flex-col space-y-4 pt-16 items-center mx-[20%] md:mx-[30%]">
        <div className="border-2 border-black w-full rounded-md">
          <Link
            className="flex justify-center items-center gap-2 font-bold py-2"
            to="/new-ticket"
          >
            <FaQuestionCircle />
            Create New Ticket
          </Link>
        </div>
        <div className="bg-black text-white w-full rounded-md">
          <Link
            className="flex justify-center items-center gap-2 font-bold py-2"
            to="/tickets"
          >
            <FaTicketAlt />
            View My Tickets
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
