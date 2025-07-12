// src/context/RouterContext.jsx
import React, { useState, useContext } from 'react';

export const RouterContext = React.createContext();

export const Router = ({ children }) => {
    const [currentRoute, setCurrentRoute] = useState('/');
    const [routeParams, setRouteParams] = useState({});

    const navigate = (path, params = {}) => {
        setCurrentRoute(path);
        setRouteParams(params);
    };

    return (
        <RouterContext.Provider value={{ currentRoute, routeParams, navigate }}>
            {children}
        </RouterContext.Provider>
    );
};

export const useRouter = () => {
    const context = React.useContext(RouterContext);
    if (!context) {
        throw new Error('useRouter must be used within a Router');
    }
    return context;
};