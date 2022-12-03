import axios from "axios";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import CustomAlert from "./CustomAlert";

export default function Product({props}) {
	const [count, setCount] = useState(0);
	const [errorAlert, setErrorAlert] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		const cart = JSON.parse(localStorage.getItem("cart"));

		if (cart[props._id]) {
			setCount(cart[props._id]);
		}
	}, []);

	const addToCart = async () => {
		await axios
			.patch(
				"http://localhost:5000/user/addToCart",
				{
					product_id: props._id,
					quantity: count,
				},
				{
					headers: {
						access_token: localStorage.getItem("token"),
					},
				}
			)
			.catch((err) => {
				const data = err.response.data;

				console.log(data);
				setErrorMessage(data.message);
				setErrorAlert(true);
			});
	};

	const addCount = () => {
		setCount(count + 1);
	};

	const decreaseCount = () => {
		if (count > 0) {
			setCount(count - 1);
		}
	};

	return (
		<Wrapper>
			<CustomAlert
				open={errorAlert}
				onClose={() => setErrorAlert(false)}
				severity="error"
				text={errorMessage}
			/>
			<div>{props.name}</div>
			<div>{props.category}</div>
			<div>{props.price}</div>
			<div className="flex gap-2">
				<div
					onClick={() => {
						addCount();
					}}
				>
					+
				</div>
				<div>{count}</div>
				<div
					onClick={() => {
						decreaseCount();
					}}
				>
					-
				</div>
			</div>
			<div
				onClick={() => {
					addToCart();
				}}
			>
				Add to cart
			</div>
		</Wrapper>
	);
}

const Wrapper = tw.div`
  m-4
`;
