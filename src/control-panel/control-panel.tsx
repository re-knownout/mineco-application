/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/mineco-application
 */

import React from "react";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import AuthForm from "./components/auth-form";
import RootForm from "./components/root-form";
import NotFoundPage from "../application/renderers/not-found";

/**
 * Control panel root component
 * @inner
 */
export default React.memo(() => <React.Fragment>
    <Helmet>
        <meta name="description"
              content="Панель управления Министерства СХ и ПР"
        />

        <link rel="apple-touch-icon" href="/public/mineco-logo-448x252.png" />
        <title>Панель управления МСХ и ПР</title>
        <link rel="icon" href="/public/cms-favicon.ico" />
    </Helmet>

    <React.StrictMode>
        <Routes>
            <Route path="/*" element={ <RootForm /> } />
            <Route path="/auth" element={ <AuthForm /> } />
            <Route path="*" element={ <NotFoundPage /> } />
        </Routes>
    </React.StrictMode>
</React.Fragment>);
