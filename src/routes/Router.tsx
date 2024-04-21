import React, {FC, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import ScrollToTop from "../components/ScrollToTop";
import DomainsPage from "../pages/DomainsPage/DomainsPage";
import PageUrlsPage from "../pages/PageUrlsPage/PageUrlsPage";
import HistogramPage from "../pages/HistogramPage/HistogramPage";
import HeatMapPage from "../pages/HeatMapPage/HeatMapPage";

const Router: FC = () => {

    useEffect(() => {
    }, []);

    return (
        <>
            <ScrollToTop/>
            <Routes>
                <Route path={''} element={<DomainsPage/>}/>
                <Route path={'domain/:domainId/pages'} element={<PageUrlsPage/>}/>
                <Route path={'domain/:domainId/histogram'} element={<HistogramPage/>}/>
                <Route path={'page/:pageId/heatMap'} element={<HeatMapPage/>}/>
            </Routes>
        </>
    );
};

export default Router;
