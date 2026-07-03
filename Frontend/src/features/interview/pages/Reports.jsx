import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Reports.scss";

import { useInterview } from "../hooks/useInterview";

export default function Reports() {

    const navigate = useNavigate();

    const {
        reports,
        loading,
        getReports,
        deleteReport
    } = useInterview();

    useEffect(() => {
        getReports();
    }, []);

    if (loading) {
        return (
            <div className="loading">
                Loading reports...
            </div>
        );
    }

    return (

        <div className="reports-page">

            <div className="reports-header">

                <h1>All Interview Reports</h1>

                <p>
                    View every interview report you've generated.
                </p>

            </div>

            {reports.length === 0 ? (

                <div className="empty-state">

                    <h2>No Reports Found</h2>

                    <p>
                        Generate your first interview report.
                    </p>

                </div>

            ) : (

                <div className="reports-grid">

                    {reports.map((report) => (

                        <div
                            className="report-card"
                            key={report._id}
                        >

                            <div className="score">

                                {report.matchScore}%

                            </div>

                            <h2>
                                {report.jobTitle || "Interview Report"}
                            </h2>

                            <p>

                                Created on{" "}

                                {new Date(
                                    report.createdAt
                                ).toLocaleDateString()}

                            </p>

                            <div className="actions">

                            <button
                                onClick={() => navigate(`/interview/${report._id}`)}
                            >
                                View Report
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() => {
                                if (window.confirm("Delete this report?")) {
                                    deleteReport(report._id);
                                }
                                }}
                            >
                                Delete
                            </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}