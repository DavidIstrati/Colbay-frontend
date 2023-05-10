import { Footer, Navbar } from "../";

export default function Layout({
  children,
  layout,
}: {
  children: JSX.Element | JSX.Element[];
  layout: string | undefined;
}) {
  if (layout) {
    return (
      <div className="w-screen min-h-screen flex flex-col font-spaceGrotesk">
        <Navbar active={layout} />
        <main className="w-screen min-h-screen flex justify-center items-center font-spaceGrotesk bg-slate-100">
          {children}
        </main>
        <Footer />
      </div>
    );
  } else {
    return <>{children}</>;
  }
}
