import Navbar from "../components/Navbar/Navbar";
import FormCard from "../components/FormCard/FormCard";
import "./Home.scss";

export default function Home() {
  return (
    <div className="home">

      <div className="background-grid"></div>

      <div className="pink-glow"></div>
      <div className="blue-glow"></div>

      <Navbar />

      <main className="hero">

        <div className="badge">
          ✨ AI Powered Resume Analysis
        </div>

        <h1>
          Match Your Resume with
          <br />
          the <span>Perfect Job</span>
        </h1>

        <p>
          Upload your resume, provide a quick self description and paste the job
          description. Our AI analyzes your profile and generates a detailed
          compatibility report.
        </p>

        <FormCard />

      </main>

    </div>
  );
}