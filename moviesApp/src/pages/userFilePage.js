import {React,lazy} from "react"
import "bootstrap/dist/css/bootstrap.min.css"
// import Userfile from "../../src/components/userfile"
// import SiteHeader from "../components/siteHeader"
const Userfile = lazy(() => import("../../src/components/userfile"));
const SiteHeader = lazy(() => import("../components/siteHeader"));

const userFilePage = (props) => {
  return (
    <>
    <SiteHeader/>
      <Userfile/>
      </>
  );
};

export default userFilePage;