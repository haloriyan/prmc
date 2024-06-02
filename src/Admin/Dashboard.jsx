import React from "react";
import HeaderAdmin from "../Partials/HeaderAdmin";
import MenuAdmin from "../Partials/MenuAdmin";

const Dashboard = () => {
    return (
        <>
            <HeaderAdmin />
            <MenuAdmin active={'dashboard'} />
            <div className="content user">
                sdsd
            </div>
        </>
    )
}

export default Dashboard;