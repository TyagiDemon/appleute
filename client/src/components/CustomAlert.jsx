import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomAlert(props) {
	return (
		<Snackbar
			open={props.open}
			autoHideDuration={3000}
			onClose={props.onClose}
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
		>
			<Alert
				onClose={props.onClose}
				severity={props.severity}
				sx={{ width: "100%" }}
			>
				{props.text}
			</Alert>
		</Snackbar>
	);
}
