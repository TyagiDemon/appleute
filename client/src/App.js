import Form from "./components/Form";
import Home from "./components/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function App() {
	const navigate = useNavigate();

	const saveCart = (cart) => {
		let localCart = {};

		cart.map((item) => {
			localCart[item.id] = item.quantity;
		});

		localStorage.setItem("cart", JSON.stringify(localCart));
	};

	useEffect(() => {
		if (!localStorage.getItem("token")) navigate("/auth");

		async function setCart() {
			await axios
				.post(
					"http://localhost:5000/user",
					{},
					{
						headers: { access_token: localStorage.getItem("token") },
					}
				)
				.then((res) => res.data)
				.then((data) => {
					console.log(data);
					saveCart(data.result.cart);
					// localStorage.setItem("cart", JSON.stringify(data.user.cart));
				});
		}

		setCart();
	}, []);
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
