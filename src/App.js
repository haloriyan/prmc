import React from "react";
import { BrowserRouter } from "react-router-dom";
import PageRouter from "./Pages";
import AdminRouter from "./Admin";
import './App.css';
import TCRouter from "./TrainingCenter";

export default function App() {
	return (
		<BrowserRouter>
			<PageRouter />
			<AdminRouter />
			<TCRouter />
		</BrowserRouter>
	)
}