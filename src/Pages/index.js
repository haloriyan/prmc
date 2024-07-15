import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Privacy from "./Privacy";
import Faq from "./FAQ";
import DeleteAccount from "./DeleteAccount";
import Share from "./Share";
import Contact from "./Contact";
import PublicProfile from "../App/PublicProfile";

const PageRouter = () => {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<Home />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="faq" element={<Faq />} />
                <Route path="contact" element={<Contact />} />
                <Route path="delete-account" element={<DeleteAccount />} />
                <Route path="share/:id" element={<Share />} />
            </Route>

            {/* <Route path="/:username" element={<PublicProfile />} />
            <Route path="*" element={<>not found</>} /> */}
            {/* <Route path="/:username([a-zA-Z0-9@._-]+)" element={<PublicProfile />} /> */}
            {/* <Route path="/@:username" element={<PublicProfile />} /> */}
            {/* <Route path="/"> 
                <Route path="" element={<Navigate to="/@" />} /> 
                <Route path=":username" element={<PublicProfile />} />
            </Route> */}
        </Routes>
    )
}

export default PageRouter;