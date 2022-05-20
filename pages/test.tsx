import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Router from "next/router";
import { useAuth } from "../helpers";
import { animated, easings, useSpring } from "react-spring";
import { SizeMe } from "react-sizeme";

const Test: NextPage = () => {
  return (
    <div>
        
    </div>
    // <>
    //   <div className="w-screen h-screen absolute flex flex-row items-center justify-center bg-slate-100">
    //     <span className="text-7xl font-bold">HELLLLOOOO</span>
    //   </div>
    //   <div className="absolute w-screen h-screen top-0 left-0">
    //     <SizeMe>
    //       {({ size }) =>
    //         Array.from(Array(20).keys()).map((i) => (
    //           <AnimatedCurtain delay={i} width={size.width / 15} />
    //         ))
    //       }
    //     </SizeMe>
    //   </div>
    // </>
  );
};

const AnimatedCurtain = ({
  delay,
  width,
}: {
  delay: number;
  width: number;
}) => {
  return (
    <animated.div
      style={useSpring({
        to: {
          width: width,
          left: delay * width,
        },
        from: {
          width: 0,
          left: delay * width,
        },
        delay: 100 * delay,
        config: {
          duration: 1000,
          easing: easings.easeInOutCirc,
        },
      })}
      className={`absolute h-full bg-white`}
    ></animated.div>
  );
};

export default Test;
