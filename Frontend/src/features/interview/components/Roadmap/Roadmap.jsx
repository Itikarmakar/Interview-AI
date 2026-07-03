import "./Roadmap.scss";
import {
  HiOutlineCalendarDays,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

export default function Roadmap({ roadmap }) {
  return (
    <div className="roadmap">

      {roadmap.map((dayPlan) => (
        <div className="roadmap-card" key={dayPlan.day}>

          <div className="roadmap-header">

            <div className="day-badge">
              Day {dayPlan.day}
            </div>

            <div className="focus">

              <HiOutlineCalendarDays />

              <h3>{dayPlan.focus}</h3>

            </div>

          </div>

          <div className="tasks">

            {dayPlan.tasks.map((task, index) => (
              <div className="task" key={index}>

                <HiOutlineCheckCircle />

                <span>{task}</span>

              </div>
            ))}

          </div>

        </div>
      ))}

    </div>
  );
}