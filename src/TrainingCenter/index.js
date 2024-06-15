import { Route, Routes } from "react-router-dom";
import TCRegister from "./Register";

const TCRouter = () => {
    return (
        <Routes>
            <Route path="/training-center/register" Component={TCRegister} />
        </Routes>
    )
}

export default TCRouter