import { BrowserRouter, Route } from "react-router-dom";
import WebcamWithPosenet from "Page/Learning";
import Home from "Page/Home";
import Analysis from "Page/Analysis";

const Router = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route path="/learning" component={WebcamWithPosenet} />
            <Route path="/analysis" component={Analysis} />
        </BrowserRouter>
    );
};

export default Router;
