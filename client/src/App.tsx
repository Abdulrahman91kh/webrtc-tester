import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CamerasPage from "./pages/Cameras/Cameras.page";
import TestersPage from "./pages/Testers/Tester.page";
import NotFound404 from "./pages/NotFound404/NotFound404.page";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/cameras"
					element={<CamerasPage />}
				/>
				<Route
					path="/"
					element={<TestersPage />}
				/>
				<Route path="*" element={<NotFound404 />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
