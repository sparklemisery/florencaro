import React from "react";
import { Link, useLocation } from 'react-router-dom';

const ErrorPage = () => {
    const location = useLocation();
    const { type } = location.state || {};
    return (
        <div>
            {type === "cookie" ? <h1>cookie error</h1> : <h1>path doesn't exist</h1>}
            <Link to="/">back to chicago</Link>
        </div>
    )
}
export default ErrorPage;