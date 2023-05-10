import { CardProps } from "../../components";

export interface LayoutEntity {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  static: boolean;
}

export function updateLayout(data: CardProps[]): LayoutEntity[] {
    const cardsPerRow = 4
    const width = 3 
    const height = 4
  return data.map(
    ({ listingId }: { listingId: string }, index: number) => ({
      i: listingId,
      x: width * (index % cardsPerRow),
      y: height * ~~(index / cardsPerRow),
      w: width,
      h: height,
      static: true,
    })
  );
}

export function checkFinalPage(data: CardProps[]): boolean {
  return data.length > 20 ? false : true;
}
