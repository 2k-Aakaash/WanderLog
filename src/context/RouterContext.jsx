import React, { useState, useContext, useEffect } from 'react';

export const RouterContext = React.createContext();

export const Router = ({ children }) => {
    const [currentRoute, setCurrentRoute] = useState(window.location.pathname || '/');
    const [routeParams, setRouteParams] = useState({});

    const navigate = (path, params = {}) => {
        window.history.pushState({}, '', path);      // update browser URL
        setCurrentRoute(path);
        setRouteParams(params);
    };

    useEffect(() => {
        const handlePopState = () => {
            // when user clicks back/forward button
            setCurrentRoute(window.location.pathname);
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    return (
        <RouterContext.Provider value={{ currentRoute, routeParams, navigate }}>
            {children}
        </RouterContext.Provider>
    );
};

export const useRouter = () => {
    const context = useContext(RouterContext);
    if (!context) {
        throw new Error('useRouter must be used within a Router');
    }
    return context;
};
