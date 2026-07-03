import "./Sidebar.scss";
import {
  HiCodeBracket,
  HiChatBubbleLeftRight,
  HiMap,
} from "react-icons/hi2";

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    {
      id: "technical",
      title: "Technical Questions",
      icon: <HiCodeBracket />,
    },
    {
      id: "behavioral",
      title: "Behavioral Questions",
      icon: <HiChatBubbleLeftRight />,
    },
    {
      id: "roadmap",
      title: "Road Map",
      icon: <HiMap />,
    },
  ];

  return (
    <div className="sidebar">

      <div className="sidebar-header">
        <h4>SECTIONS</h4>
      </div>

      <div className="menu">

        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${
              activeTab === item.id ? "active" : ""
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="icon">{item.icon}</span>

            <span>{item.title}</span>
          </button>
        ))}

      </div>

    </div>
  );
}