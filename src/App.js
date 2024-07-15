import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserMiddleware from "./Middleware/User";
import PageRouter from "./Pages";
import AdminRouter from "./Admin";
import './App.css';
import TCRouter from "./TrainingCenter";
import AuthRouter from "./App/Auth";
import HomeRouter from "./App/Home";
import PublicProfile from "./App/PublicProfile";
import Home from "./App/Home/Home";
import Video from "./App/Video";
import JobFair from "./App/JobFair";
import Upload from "./App/Upload";
import Inbox from "./App/Chat/Inbox";
import Login from "./App/Auth/Login";
import Register from "./App/Auth/Register";
import ForgetPassword from "./App/Auth/ForgetPassword";
import Otp from "./App/Auth/Otp";
import Explore from "./App/Explore";
import Vacancy from "./App/Vacancy";
import Connect from "./App/Connect";
import Gigs from "./App/Gigs";
import GigsDetail from "./App/Gigs/Detail";
import Profile from "./App/Profile";
import GigsAdd from "./App/Gigs/Add";
import GigsEdit from "./App/Gigs/Edit";
import VacancyAdd from "./App/JobFair/Add";

export default function App() {
	return (
		<BrowserRouter>
			<AdminRouter />
			<TCRouter />

			<PageRouter />

			<Routes>
				<Route path="/home" element={<UserMiddleware><Home /></UserMiddleware>} />
				<Route path="/inbox" element={<UserMiddleware><Inbox /></UserMiddleware>} />
				<Route path="/upload" element={<UserMiddleware><Upload /></UserMiddleware>} />
				<Route path="/job-fair" element={<UserMiddleware><JobFair /></UserMiddleware>} />
				<Route path="/explore" element={<UserMiddleware><Explore /></UserMiddleware>} />
				<Route path="/connect" element={<UserMiddleware><Connect /></UserMiddleware>} />
				<Route path="/gigs" element={<UserMiddleware><Gigs /></UserMiddleware>} />
				<Route path="/profile" element={<UserMiddleware><Profile /></UserMiddleware>} />

				<Route path="/video/:id" element={<Video />} />
				
				<Route path="/vacancy/:id" element={<Vacancy />} />
				<Route path="/vacancy/add" element={<VacancyAdd />} />
				
				<Route path="/gigs/add" element={<GigsAdd />} />
				<Route path="/gigs/:id" element={<GigsDetail />} />
				<Route path="/gigs/:id/edit" element={<GigsEdit />} />

				<Route path="/login" exact element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forget-password" element={<ForgetPassword />} />
				<Route path="/otp" element={<Otp />} />

				<Route path="/:username" element={<PublicProfile />} />
				<Route path="*" element={<>Not found</>} />
			</Routes>
		</BrowserRouter>
	)
}