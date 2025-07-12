// src/components/RouteRenderer.jsx
import React from 'react';
import { useRouter } from '../context/RouterContext';
import HomePage from './HomePage';
import DiaryDetailPage from './DiaryDetailPage';
import DiaryEditorPage from './DiaryEditorPage';
import ItineraryDetailPage from './ItineraryDetailPage';
import GenericPage from './GenericPage';

const RouteRenderer = ({ theme }) => {
    const { currentRoute } = useRouter();

    switch (currentRoute) {
        case '/':
            return <HomePage theme={theme} />;
        case '/diary':
            return <DiaryDetailPage theme={theme} />;
        case '/itinerary':
            return <ItineraryDetailPage theme={theme} />;
        case '/logs':
            return <GenericPage title="All Logs" theme={theme} />;
        case '/tags':
            return <GenericPage title="Tags" theme={theme} />;
        case '/archived':
            return <GenericPage title="Archived" theme={theme} />;
        case '/favorites':
            return <GenericPage title="Favorites" theme={theme} />;
        case '/settings':
            return <GenericPage title="Settings" theme={theme} />;
        case '/write':
            return <DiaryEditorPage theme={theme} />;
        case '/about':
            return <GenericPage title="About & Help" theme={theme} />;
    }
};

export default RouteRenderer;