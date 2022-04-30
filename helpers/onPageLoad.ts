import AOS from "aos";
import Router from "next/router";
import { userProps } from "./storage/context";

const onPageLoad = (
  initAos: boolean,
  userRestricted: boolean,
  user?: userProps
) => {
  if (initAos) {
    AOS.init();
  }
  if (userRestricted) {
    if (!user) {
      Router.push("/signup");
    }
  }
};

export default onPageLoad;
