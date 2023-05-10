import AOS from "aos";
import Router from "next/router";

const onPageLoad = (
  initAos: boolean,
  userRestricted: boolean,
  user?: string | null
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
