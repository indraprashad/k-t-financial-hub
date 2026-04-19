import React, { useContext } from "react";
import { StateContext } from "../store/index";

const RenderAuthorized = ({ authorized = [], ...props }) => {
    const { user } = useContext(StateContext);
    const userRole = user?.session?.data?.attributes?.role;
    const isAuthorized = userRole ? authorized.includes(userRole) : false;
    return isAuthorized ? <>{props.children}</> : null;
};

export default RenderAuthorized;
