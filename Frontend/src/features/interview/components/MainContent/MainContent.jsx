import "./MainContent.scss";

import QuestionCard from "../QuestionCard/QuestionCard";
import Roadmap from "../Roadmap/Roadmap";

export default function MainContent({ activeTab, report }) {
  if (!report) {
    return (
      <div className="main-content">
        <h2>No interview report found.</h2>
      </div>
    );
  }

  const technicalQuestions = report.technicalQuestions || [];
  const behavioralQuestions = report.behavioralQuestions || [];
  const preparationPlan = report.preparationPlan || [];

  return (
    <div className="main-content">

      {/* TECHNICAL QUESTIONS */}

      {activeTab === "technical" && (
        <>
          <div className="page-header">

            <div className="title">

              <h2>Technical Questions</h2>

              <span>{technicalQuestions.length} Questions</span>

            </div>

          </div>

          <div className="questions">

            {technicalQuestions.map((question, index) => (
              <QuestionCard
                key={index}
                question={question}
                index={index}
              />
            ))}

          </div>
        </>
      )}

      {/* BEHAVIORAL QUESTIONS */}

      {activeTab === "behavioral" && (
        <>
          <div className="page-header">

            <div className="title">

              <h2>Behavioral Questions</h2>

              <span>{behavioralQuestions.length} Questions</span>

            </div>

          </div>

          <div className="questions">

            {behavioralQuestions.map((question, index) => (
              <QuestionCard
                key={index}
                question={question}
                index={index}
              />
            ))}

          </div>
        </>
      )}

      {/* ROADMAP */}

      {activeTab === "roadmap" && (
        <>
          <div className="page-header">

            <div className="title">

              <h2>Preparation Roadmap</h2>

              <span>{preparationPlan.length} Days</span>

            </div>

          </div>

          <Roadmap roadmap={preparationPlan} />

        </>
      )}

    </div>
  );
}