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

export const CustomGridLayout = ({ layout, width, children }: CustomGridLayout) => {
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
  children?: JSX.Element[] | JSX.Element | undefined;
}

export const IntegrationGridLayout = ({
  layout,
  isLoading,
  children,
}: IntegrationGridLayout) => {
  return (
    <SizeMe>
      {({ size }) => (
        <>
          {isLoading ? (
            <CustomGridLayout layout={cardsLayout} width={size.width}>
              {cardsLayout.map(({ i }) => (
                <div key={i} className="w-full h-full">
                  <LoadingCard />
                </div>
              ))}
            </CustomGridLayout>
          ) : (
            <CustomGridLayout layout={layout} width={size.width}>
              {children}
            </CustomGridLayout>
          )}
        </>
      )}
    </SizeMe>
  );
};
