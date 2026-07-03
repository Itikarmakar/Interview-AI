import { useState } from "react";
import "./QuestionCard.scss";
import {
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi2";

export default function QuestionCard({
  question,
  index,
}) {

  const [open, setOpen] = useState(index === 0);

  return (
    <div className={`question-card ${open ? "open" : ""}`}>

      {/* Header */}

      <div
        className="question-header"
        onClick={() => setOpen(!open)}
      >

        <div className="left">

          <span className="question-number">
            Q{index + 1}
          </span>

          <h3>{question.question}</h3>

        </div>

        <button>

          {open ? (
            <HiChevronUp />
          ) : (
            <HiChevronDown />
          )}

        </button>

      </div>

      {/* Body */}

      {open && (

        <div className="question-body">

          <div className="section">

            <span className="badge intention">
              Intention
            </span>

            <p>{question.intention}</p>

          </div>

          <div className="section">

            <span className="badge answer">
              Model Answer
            </span>

            <p>{question.answer}</p>

          </div>

        </div>

      )}

    </div>
  );
}