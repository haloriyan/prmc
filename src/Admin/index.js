import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import AdminMiddleware from "../Middleware/Admin";
import Dashboard from "./Dashboard";
import User from "./Master/User";
import ContentReport from "./Content/Report";
import Campaign from "./Ad/Campaign";
import Tag from "./Master/Tag";
import CampaignDetail from "./Ad/Detail";
import CampaignViews from "./Ad/Views";
import CampaignClicks from "./Ad/Clicks";
import Announcement from "./Master/Announcement";
import LiveCode from "./Content/LiveCode";

const AdminRouter = () => {
    return (
        <Routes>
            <Route path="/admin/login" Component={Login} />
            <Route path="/admin/dashboard" element={<AdminMiddleware><Dashboard /></AdminMiddleware>} />

            <Route path="/admin/master/user" element={<AdminMiddleware><User /></AdminMiddleware>} />
            <Route path="/admin/master/announcement" element={<AdminMiddleware><Announcement /></AdminMiddleware>} />
            <Route path="/admin/master/hometag" element={<AdminMiddleware><Tag /></AdminMiddleware>} />

            <Route path="/admin/content/report" element={<AdminMiddleware><ContentReport /></AdminMiddleware>} />
            <Route path="/admin/content/live-code" element={<AdminMiddleware><LiveCode /></AdminMiddleware>} />

            <Route path="/admin/ad/campaign" element={<AdminMiddleware><Campaign /></AdminMiddleware>} />
            <Route path="/admin/ad/campaign/:id/detail" element={<AdminMiddleware><CampaignDetail /></AdminMiddleware>} />
            <Route path="/admin/ad/campaign/:id/views" element={<AdminMiddleware><CampaignViews /></AdminMiddleware>} />
            <Route path="/admin/ad/campaign/:id/clicks" element={<AdminMiddleware><CampaignClicks /></AdminMiddleware>} />
        </Routes>
    )
}

export default AdminRouter;