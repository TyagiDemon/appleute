import axios from "axios";
import tw from "tailwind-styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	TextField,
	IconButton,
	Input,
	InputLabel,
	InputAdornment,
	FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CustomAlert from "./CustomAlert";

export default function Form() {
	const navigate = useNavigate();
	const [message, setMessage] = useState("New user? Register");
	const [showLogin, setShowLogin] = useState(true);
	const [errorAlert, setErrorAlert] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleClickMessage = () => {
		if (!showLogin) {
			setMessage("New user? Register");
		} else {
			setMessage("Back to login");
		}

		setShowLogin(!showLogin);
	};

	const [loginQuery, setLoginQuery] = useState({
		email: "",
		password: "",
		showPassword: false,
	});

	const [registerQuery, setRegisterQuery] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		showPassword: false,
		showConfirmPassword: false,
	});

	const handleLoginChange = (prop) => (event) => {
		setLoginQuery({ ...loginQuery, [prop]: event.target.value });
	};

	const handleRegisterChange = (prop) => (event) => {
		setRegisterQuery({ ...registerQuery, [prop]: event.target.value });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const saveCart = (cart) => {
		let localCart = {};

		cart.map((item) => {
			localCart[item.id] = item.quantity;
		});

		localStorage.setItem("cart", JSON.stringify(localCart));
	};

	const handleSubmit = async () => {
		if (showLogin) {
			if (loginQuery.email === "" || loginQuery.password === "") {
				setErrorMessage("Please fill all the fields properly");
				setErrorAlert(true);
				return;
			}

			await axios
				.post("http://localhost:5000/user/login", loginQuery)
				.then((res) => res.data)
				.then((data) => {
					console.log(data);
					localStorage.setItem("token", data.result);
					saveCart(data.user.cart);
					// localStorage.setItem("cart", JSON.stringify(data.user.cart));
					navigate("/");
				})
				.catch((err) => {
					const data = err.response.data;

					console.log(data);
					setErrorMessage(data.message);
					setErrorAlert(true);
				});
		} else {
			if (registerQuery.email === "" || registerQuery.password === "") {
				setErrorMessage("Please fill all the fields properly");
				setErrorAlert(true);
				return;
			}

			if (registerQuery.password !== registerQuery.confirmPassword) {
				setErrorMessage("Passwords do not match");
				setErrorAlert(true);
				return;
			}

			await axios
				.post("http://localhost:5000/user/register", registerQuery)
				.then((res) => res.data)
				.then((data) => {
					console.log(data);
					localStorage.setItem("token", data.result);
					saveCart(data.user.cart);
					// localStorage.setItem("cart", JSON.stringify(data.user.cart));
					navigate("/");
				})
				.catch((err) => {
					const data = err.response.data;

					console.log(data);
					setErrorMessage(data.message);
					setErrorAlert(true);
				});
		}
	};
	return (
		<Wrapper>
			<FormBox
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						handleSubmit();
					}
				}}
			>
				{showLogin && (
					<>
						<TextField
							label="Email"
							variant="standard"
							value={loginQuery.email}
							onChange={handleLoginChange("email")}
						/>

						<FormControl style={{ width: "100%" }} variant="standard">
							<InputLabel htmlFor="login-password">Password</InputLabel>
							<Input
								id="login-password"
								type={loginQuery.showPassword ? "text" : "password"}
								value={loginQuery.password}
								onChange={handleLoginChange("password")}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="login-password-visibility"
											onClick={() => {
												setLoginQuery({
													...loginQuery,
													showPassword: !loginQuery.showPassword,
												});
											}}
											onMouseDown={handleMouseDownPassword}
										>
											{loginQuery.showPassword ? (
												<VisibilityOff />
											) : (
												<Visibility />
											)}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
					</>
				)}
				{!showLogin && (
					<>
						<TextField
							label="Name"
							variant="standard"
							value={registerQuery.name}
							onChange={handleRegisterChange("name")}
						/>
						<TextField
							label="Email"
							variant="standard"
							value={registerQuery.email}
							onChange={handleRegisterChange("email")}
						/>
						<FormControl style={{ width: "100%" }} variant="standard">
							<InputLabel htmlFor="register-password">Password</InputLabel>
							<Input
								id="register-password"
								type={registerQuery.showPassword ? "text" : "password"}
								value={registerQuery.password}
								onChange={handleRegisterChange("password")}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="register-password-visibility"
											onClick={() => {
												setRegisterQuery({
													...registerQuery,
													showPassword: !registerQuery.showPassword,
												});
											}}
											onMouseDown={handleMouseDownPassword}
										>
											{registerQuery.showPassword ? (
												<VisibilityOff />
											) : (
												<Visibility />
											)}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
						<FormControl style={{ width: "100%" }} variant="standard">
							<InputLabel htmlFor="confirm-password-register">
								Confirm Password
							</InputLabel>
							<Input
								id="confirm-password-register"
								type={registerQuery.showConfirmPassword ? "text" : "password"}
								value={registerQuery.confirmPassword}
								onChange={handleRegisterChange("confirmPassword")}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="confirm-password-visibility"
											onClick={() => {
												setRegisterQuery({
													...registerQuery,
													showConfirmPassword:
														!registerQuery.showConfirmPassword,
												});
											}}
											onMouseDown={handleMouseDownPassword}
										>
											{registerQuery.showConfirmPassword ? (
												<VisibilityOff />
											) : (
												<Visibility />
											)}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
					</>
				)}
			</FormBox>
			<Message onClick={() => handleClickMessage()}>
				<span className="cursor-pointer">{message}</span>
			</Message>
			<Button type="submit" onClick={() => handleSubmit()}>
				{showLogin ? "Login" : "Register"}
			</Button>
			<CustomAlert
				open={errorAlert}
				onClose={() => setErrorAlert(false)}
				severity="error"
				text={errorMessage}
			/>
		</Wrapper>
	);
}
// bg-[#3A5BA0]
const Wrapper = tw.div`flex flex-col bg-[#3A5BA0] mx-auto p-8 rounded-lg w-[90%] md:w-96 text-md shadow-md shadow-gray-400 my-16`;
// const Heading = tw.div`text-gray-50 font-bold text-center pb-3`;
const FormBox = tw.div`flex flex-col gap-4 bg-gray-50 p-4 rounded-lg`;
const Message = tw.div`text-gray-50 text-sm mt-1 underline`;
const Button = tw.button`bg-[#FFA500] text-lg font-bold mt-4 rounded-lg shadow-md hover:opacity-[.90] transition py-2`;
