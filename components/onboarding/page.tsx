import { useSpring, animated, easings } from "react-spring";
import { useForm } from "react-hook-form";
import { useState } from "react";
import NextButton from "./button";
import { OnboardingTextInput } from "../input";
import { AiOutlineArrowLeft, AiOutlineEnter } from "react-icons/ai";

export const ANIMATION_DURATION: number = 550;
export const INITIAL_PAGE_DELAY: number = 200;
export const DELAY_BETWEEN_PAGES: number = 100;

const getProps = (
  active: boolean,
  animationDuration: number,
  delay: number
) => {
  let props = useSpring({
    to: {
      opacity: active ? 0 : 1,
      transform: active ? `translate(0px, -100px)` : `translate(0px, 0px)`,
    },
    from: {
      opacity: active ? 1 : 0,
      transform: active ? `translate(0px, 0px)` : `translate(0px, 100px)`,
    },
    delay: active ? 0 : delay,
    config: { duration: animationDuration, easing: easings.easeInOutBack },
  });
  props = {
    ...props,
    display: props.opacity.to((displ) => (displ === 0 ? "none" : "initial")),
  };

  return props;
};

interface AnimatedContainer {
  active: boolean;
  animationDuration: number;
  delay: number;
  children: React.ReactNode;
}

interface AnimatedContainerIllustration extends AnimatedContainer {
  coordsStart: [number, number];
  coordsEnd: [number, number];
}

const AnimatedContainerIllustration = ({
  active,
  animationDuration,
  delay,
  children,
  coordsStart,
  coordsEnd,
}: AnimatedContainerIllustration) => {
  return (
    <animated.div
      style={useSpring({
        to: {
          opacity: active ? 0 : 1,
          transform: active
            ? `translate(${coordsStart[0]}px, ${coordsStart[1]}px)`
            : `translate(${coordsEnd[0]}px, ${coordsEnd[1]}px)`,
        },
        from: {
          opacity: active ? 1 : 0,
          transform: active
            ? `translate(${coordsEnd[0]}px, ${coordsEnd[1]}px)`
            : `translate(${coordsStart[0]}px, ${coordsStart[1]}px)`,
        },
        delay: active ? 0 : delay,
        config: {
          duration: animationDuration,
          easing: easings.easeInOutElastic,
        },
      })}
      className="w-full h-full"
    >
      {children}
    </animated.div>
  );
};

interface AnimatedProgressBar {
  animationDuration: number;
  widthStart: number;
  widthEnd: number;
}

export const AnimatedProgressBar = ({
  animationDuration,
  widthStart,
  widthEnd,
}: AnimatedProgressBar) => {
  return (
    <animated.div
      style={useSpring({
        to: {
          width: `${widthEnd}%`,
        },
        from: {
          width: `${widthStart}%`,
        },
        config: {
          duration: animationDuration,
          easing: easings.easeInOutBack,
        },
      })}
      className="h-full bg-gradient"
    ></animated.div>
  );
};

const AnimatedContainer = ({
  active,
  animationDuration,
  delay,
  children,
}: AnimatedContainer) => {
  return (
    <animated.div
      style={getProps(active, animationDuration, delay)}
      className="w-full h-full"
    >
      {children}
    </animated.div>
  );
};

interface RootPageProps {
  clicked: boolean;
  delay: number;
  children: React.ReactNode;
}

const Page = ({ clicked, delay, children }: RootPageProps) => {
  return (
    <AnimatedContainer
      active={clicked}
      animationDuration={ANIMATION_DURATION}
      delay={delay}
    >
      <div className="w-full h-full flex flex-col justify-center items-center absolute">
        {children}
      </div>
    </AnimatedContainer>
  );
};

interface PageProps {
  onClick: (data?: any) => void;
  title: JSX.Element | JSX.Element[];
  content?: JSX.Element | JSX.Element[];
}

export const LandingPage = ({ onClick, title, content }: PageProps) => {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <>
      {/* <div className="absolute left-0 right-0">
        <AnimatedContainerIllustration
          coordsStart={[0, 100]}
          coordsEnd={[0, 0]}
          active={false}
          animationDuration={ANIMATION_DURATION*3}
          delay={INITIAL_PAGE_DELAY}
        >
          <img src="illustrations/3dcube.png" />
        </AnimatedContainerIllustration>
      </div> */}
      <Page clicked={clicked} delay={INITIAL_PAGE_DELAY}>
        <div className="w-1/2 2xl: h-full flex flex-col justify-center items-start">
          <div className="flex flex-col">{title}</div>
          <div className="flex flex-col mt-5">{content}</div>
          <div className="mt-10">
            <NextButton
              onClick={() => {
                setClicked(true);
                onClick();
              }}
            />
          </div>
        </div>
      </Page>
    </>
  );
};

interface InputPageProps extends PageProps {
  placeholder: string;
  label: string;
  title: JSX.Element | JSX.Element[];
  pageBack: () => void;
  setValueFromRoot: (value: string) => void;
  initialValue: string;
  reactHookFormBI: any;
  type?: string;
}

export const InputPage = ({
  onClick,
  pageBack,
  setValueFromRoot,
  initialValue,
  placeholder,
  label,
  title,
  reactHookFormBI,
  type = "text",
}: InputPageProps) => {
  const [clicked, setClicked] = useState<boolean>(false);
  interface FormInputs {
    value: string;
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    criteriaMode: "all",
  });

  const onSubmit = (data: FormInputs) => {
    setValueFromRoot(data.value);
    setClicked(true);
    onClick();
    console.log(data);
  };

  return (
    <Page clicked={clicked} delay={DELAY_BETWEEN_PAGES}>
      <div className="w-1/2 2xl:w-1/3 h-full flex flex-col justify-center items-start">
        <div className="flex flex-col">{title}</div>
        <div className="mt-10">
          <OnboardingTextInput
            reactFormProps={register("value", reactHookFormBI)}
            initialValue={initialValue}
            errors={errors?.value?.message}
            placeholder={placeholder}
            setValueFromRoot={(value) => setValueFromRoot(value)}
            label={label}
            onEnter={(value) => {
              setValue("value", value, { shouldValidate: false });
              handleSubmit((data) => onSubmit(data))();
            }}
            type={type}
          ></OnboardingTextInput>
        </div>
        <div className="flex flex-row mt-10 items-stretch">
          <span
            className="mr-5 px-10 py-2 select-none bg-black text-white text-xl rounded-lg flex justify-center items-center transtition duration-500 ease-in-out hover:shadow-lg cursor-pointer"
            onClick={() => {
              pageBack();
              setClicked(true);
            }}
          >
            <AiOutlineArrowLeft />
            <span>Back</span>
          </span>
          <NextButton onClick={handleSubmit((data) => onSubmit(data))} />
          <span className="ml-5 select-none	 text-sm font-medium text-slate-400 flex flex-row justify-center items-center">
            <span>
              press <span className="font-bold">Enter</span>
            </span>{" "}
            <AiOutlineEnter />
          </span>
        </div>
      </div>
    </Page>
  );
};
