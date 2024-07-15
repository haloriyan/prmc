import { Route, Routes } from "react-router-dom";
import Inbox from "./Inbox";

const ChatRouter = () => {
    return (
        <Routes>
            <Route path="/inbox" element={<Inbox />} />
        </Routes>
    )
}

export default ChatRouter