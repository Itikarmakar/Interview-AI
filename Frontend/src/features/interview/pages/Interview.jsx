import "./Interview.scss";

import { useInterview } from "../hooks/useInterview";

import Sidebar from "../components/Sidebar/Sidebar";
import MainContent from "../components/MainContent/MainContent";
import RightSidebar from "../components/RightSidebar/RightSidebar";

import { useState } from "react";

export default function Interview() {

    const { report, loading } = useInterview();

    const [activeTab, setActiveTab] =
        useState("technical");

    if (loading) {

        return (

            <div className="loading-page">

                Loading Interview Report...

            </div>

        );

    }

    if (!report) {

        return (

            <div className="loading-page">

                No Interview Report Found

            </div>

        );

    }

    return (

        <div className="interview-page">

            <aside className="left-panel">

                <Sidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

            </aside>

            <main className="center-panel">

                <MainContent
                    activeTab={activeTab}
                    report={report}
                />

            </main>

            <aside className="right-panel">

                <RightSidebar
                    report={report}
                />

            </aside>

        </div>

    );

}