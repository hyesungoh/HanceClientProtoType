import { BrowserRouter, Route } from "react-router-dom";
import WebcamWithPosenet from "Page/Learning";
import Home from "Page/Home";

const Router = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route path="/learning" component={WebcamWithPosenet} />
        </BrowserRouter>
    );
};

export default Router;
