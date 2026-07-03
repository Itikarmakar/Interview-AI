import "./RightSidebar.scss";

export default function RightSidebar({ report }) {
  if (!report) return null;

  const { matchScore, skillGaps } = report;

  return (
    <div className="right-sidebar">

      {/* Match Score */}

      <div className="card">

        <h3>Match Score</h3>

        <div
          className="score-circle"
          style={{
            "--score": `${matchScore * 3.6}deg`,
          }}
        >
          <div className="inner-circle">
            <span>{matchScore}%</span>
          </div>
        </div>

        <p className="score-text">
          {matchScore >= 80
            ? "Excellent Match"
            : matchScore >= 60
            ? "Good Match"
            : "Needs Improvement"}
        </p>

      </div>

      {/* Skill Gaps */}

      <div className="card">

        <h3>Skill Gaps</h3>

        <div className="skills">

          {skillGaps.map((skill, index) => (
            <div
              className={`skill ${skill.severity}`}
              key={index}
            >
              <span>{skill.skill}</span>

              <small>{skill.severity}</small>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}