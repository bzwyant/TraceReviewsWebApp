import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import InstructorReviewsComponent from "./instructorReviews";

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/*" element={<InstructorReviewsComponent/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
