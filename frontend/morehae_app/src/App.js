import RoadmapPage from "./pages/RoadmapPage.jsx";
import "./index.css"
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";

export default function App() {
  return (
    <div>
      <div className="flex justify-center">
        <div className="w-1/2">
          <SignUp />
        </div>
      </div>
    </div>
    
    
    // <SignIn />
    // <RoadmapPage />
  );
}