import { BrowserRouter, Route } from "react-router-dom";

import Home from "Page/Home";
import MyOwn from "Page/MyOwn";
import Analysis from "Page/Analysis";
import WebcamWithPosenet from "Page/Learning";

const Router = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route path="/learning" component={WebcamWithPosenet} />
            <Route path="/analysis" component={Analysis} />
            <Route path="/myown" component={MyOwn} />
        </BrowserRouter>
    );
};

export default Router;
