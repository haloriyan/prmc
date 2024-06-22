import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Privacy from "./Privacy";
import Faq from "./FAQ";
import DeleteAccount from "./DeleteAccount";
import Share from "./Share";
import Contact from "./Contact";

const PageRouter = () => {
    return (
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/privacy" Component={Privacy} />
            <Route path="/faq" Component={Faq} />
            <Route path="/contact" Component={Contact} />
            <Route path="/delete-account" Component={DeleteAccount} />
            <Route path="/share/:id" Component={Share} />
        </Routes>
    )
}

export default PageRouter;