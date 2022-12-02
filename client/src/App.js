import Form from "./components/Form";
import Home from "./components/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem("token")) navigate("/auth");
	});
	return (
		<div className="App">
			<Routes>
				<Route path="/auth" element={<Form />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
