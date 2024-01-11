import React from "react";

export default function Main({ children }) {
  return (
    <main className="main">
      <div className="row">
        <div className="col-12 offset-sm-1 col-sm-10 offset-md-3 col-md-6 offset-xl-4 col-xl-4">
          {children}
        </div>
      </div>
    </main>
  );
}
