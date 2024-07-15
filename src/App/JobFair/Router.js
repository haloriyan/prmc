import { Route, Routes } from "react-router-dom";
import JobFair from ".";

const JobFairRouter = () => {
    return (
        <Routes>
            <Route path="/job-fair">
                <Route index element={<JobFair />} />
            </Route>
        </Routes>
    )
}

export default JobFairRouter