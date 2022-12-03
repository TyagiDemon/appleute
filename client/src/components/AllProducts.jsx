import axios from "axios";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import CustomAlert from "./CustomAlert";
import Product from "./Product";

export default function AllProducts() {
	const [allProducts, setAllProducts] = useState([]);
	const [errorAlert, setErrorAlert] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		async function getProducts() {
			await axios
				.get("http://localhost:5000/product/getAllProducts")
				.then((res) => {
					const data = res.data;
          setAllProducts(data.result);
          console.log(allProducts)
				})
				.catch((err) => {
					const data = err.response.data;

					console.log(data);
					setErrorMessage(data.message);
					setErrorAlert(true);
				});
		}

		getProducts();
		console.log(allProducts);
	}, []);

	const placeOrder = async () => {
		await axios
			.post(
				"http://localhost:5000/order/create",
				{},
				{ headers: { access_token: localStorage.getItem("token") } }
			)
			.catch((err) => {
				const data = err.response.data;

				console.log(data);
				setErrorMessage(data.message);
				setErrorAlert(true);
			});
	};
	return (
		<Wrapper>
			<CustomAlert
				open={errorAlert}
				onClose={() => setErrorAlert(false)}
				severity="error"
				text={errorMessage}
			/>
			<ProductContainer>
				{allProducts.map((item, key) => (
					<Product props={item} key={key} />
				))}
			</ProductContainer>
			<div
				onClick={() => {
					placeOrder();
				}}
			>
				Place order
			</div>
		</Wrapper>
	);
}

const Wrapper = tw.div`
  p-12
`;
const ProductContainer = tw.div`
  p-4 grid lg:grid-cols-4 md:grid-cols-2
`;
