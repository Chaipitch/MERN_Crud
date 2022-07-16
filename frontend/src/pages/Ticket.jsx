import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getTicket, closeTicket } from "../features/ticketSlice";
import { getNotes, createNote } from "../features/noteSlice";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Modal from "react-modal";
import NoteItem from "../components/NoteItem";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    botton: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  );
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
  }, [isError, message, ticketId, dispatch]);

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something went wrong</h3>;
  }

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Closed");
    navigate("/tickets");
  };

  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId }));
    closeModal();
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="ticket-page mx-4">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2 className="font-bold mt-6 mx-4">
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3 className="mx-4 font-bold">
          Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}
        </h3>
        <h3 className="mx-4 font-bold">Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3 className="font-bold">Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2 className="font-bold text-2xl">Notes</h2>
      </header>

      {ticket.state !== "closed" && (
        <button
          onClick={openModal}
          className="px-3 py-1 border-2 font-bold border-gray-300 rounded-md mb-2 hover:scale-95 duration-100"
        >
          Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2 className="relative font-bold">Add Note</h2>
        <button
          className="absolute right-1 font-bold top-0"
          onClick={closeModal}
        >
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div>
            <textarea
              name="noteText"
              id="noteText"
              placeholder="Note Text"
              value={noteText}
              className="w-full border-2 rounded-md p-2"
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button
              className="bg-green-700 px-4 py-1 rounded-md font-bold text-white hover:scale-95 duration-100"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {ticket.status !== "closed" && (
        <button
          onClick={onTicketClose}
          className=" font-bold bg-red-900 text-white px-4 py-2 rounded-md "
        >
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default Ticket;
