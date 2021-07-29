import { BrowserRouter, Route } from "react-router-dom";
import WebcamWithPosenet from "Page/Learning";

const Router = () => {
    return (
        <BrowserRouter>
            <Route path="/learning" component={WebcamWithPosenet} />
        </BrowserRouter>
    );
};

export default Router;
