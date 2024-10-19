import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const ListPage = lazy(() => import("./pages/ListPage"));
const ViewPage = lazy(() => import("./pages/ViewPage"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>로딩 중...</div>}>
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/view/:id" element={<ViewPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
