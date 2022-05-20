import GridLayout from "react-grid-layout";
import { SizeMe } from "react-sizeme";
import { LoadingCard } from "..";
import { cardsLayout } from "../../helpers";

type layoutItem = {
  i: string;
  w: number;
  h: number;
  x: number;
  y: number;
  static: boolean;
};

interface CustomGridLayout {
  layout: layoutItem[];
  width: number | null;
  children?: JSX.Element[] | JSX.Element | undefined;
}

export const CustomGridLayout = ({
  layout,
  width,
  children,
}: CustomGridLayout) => {
  const xMargin = width ? (width - 1144) / 3 : 40;
  return width ? (
    <GridLayout
      className="layout"
      useCSSTransforms={true}
      layout={layout}
      cols={12}
      rowHeight={50}
      width={width}
      containerPadding={[0, 0]}
      margin={[xMargin, 40]}
    >
      {children}
    </GridLayout>
  ) : (
    <></>
  );
};

interface IntegrationGridLayout {
  layout: layoutItem[];
  isLoading: boolean;
  isError?: boolean;
  children?: JSX.Element[] | JSX.Element | undefined;
}

export const IntegrationGridLayout = ({
  layout,
  isLoading,
  isError,
  children,
}: IntegrationGridLayout) => {
  return (
    <div className="w-full inline-flex flex-row lg:px-10 xl:px-20 2xl:px-60">
      <SizeMe>
        {({ size }) => (
          <>
            {isLoading && (
              <CustomGridLayout layout={cardsLayout} width={size.width}>
                {cardsLayout.map(({ i }, index: number) => (
                  <div key={i} className="w-full h-full">
                    <LoadingCard index={index} />
                  </div>
                ))}
              </CustomGridLayout>
            )}
            {isError && (
              <div className="w-full h-full flex flex-col justify-center items-center">
                <img src="ThinkingFace.png" className="w-80 h-80" />
                <span className="text-xl text-slate-400 mt-5">
                  Hmm... There's nothing here
                </span>
              </div>
            )}
            {!isLoading && !isError && (
              <CustomGridLayout layout={layout} width={size.width}>
                {children}
              </CustomGridLayout>
            )}
          </>
        )}
      </SizeMe>
    </div>
  );
};
