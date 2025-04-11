
// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Payment from './page/Payment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pay/:paymentId" element={<Payment />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <div className="container text-center  mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Payment Portal</h1>
      <p className="mb-4">Navigate to <code>/pay/123ssfre</code> to access the payment page.</p>
    </div>
  );
}

export default App;