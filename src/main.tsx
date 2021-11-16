// Library import
import React, { PureComponent } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// External components import
import Helmet from "react-helmet";
// Internal components import
import PageWrapper from "./shared/page-wrapper";
import CmsRouter from "./cms-root-folder/cms-router";
// Stylesheets import
import "normalize.css";
import "./main.scss";
// Other imports
import NotFoundHandler from "./shared/page-wrapper/default-handlers/not-found-handler";

namespace Main
{
    export interface Properties
    {

    }

    export interface State
    {

    }
}

class Main extends PureComponent<Main.Properties, Main.State>
{
    state: Main.State = {};

    render (): React.ReactNode
    {
        return <React.Fragment>
            <Helmet>
                <meta name="description"
                      content="Официальная информационная площадка Министерства сельского хозяйства и природных ресурсов ПМР"
                />

                <link rel="apple-touch-icon" href="/public/mineco-logo-448x252.png" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="Министерство СХ и ПР" />
                <meta property="og:description"
                      content="Официальная информационная площадка Министерства сельского хозяйства и природных ресурсов ПМР" />

                <meta property="og:image:width" content="448" />
                <meta property="og:image:height" content="256" />
                <meta property="og:image"
                      content="/public/mineco-logo-448x252.png" />

                <title>Министерство СХ и ПР</title>
            </Helmet>

            <PageWrapper className="root-wrapper">
                <Router>
                    <Routes>
                        <Route path="/" element={ <span>Website entry point</span> } />
                        <Route path="/content-management-system/*" element={ <CmsRouter /> } />
                        <Route path="*" element={ <NotFoundHandler /> } />
                    </Routes>
                </Router>
            </PageWrapper>
        </React.Fragment>;
    }
}

render(<Main />, document.querySelector("div#app-root"));