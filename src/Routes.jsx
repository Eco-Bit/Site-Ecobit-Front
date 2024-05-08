import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Ecopontos from "./pages/Ecopontos/Ecopontos";
import Register from "./pages/Register/Register";
import Donation from "./pages/Donation/Donation";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home /> }></Route>
                <Route path="/Ecopontos" element={ <Ecopontos /> }></Route>
                <Route path="/Register" element={ <Register /> }></Route>
                <Route path="/Donation" element={ <Donation /> }></Route>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes;