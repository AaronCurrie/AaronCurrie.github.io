import { Fragment } from "react";
import Header from "@/components/header/header";

export const metadata = {
  title: "Aaron Currie | Portfolio",
  description: "A interactive experience showcasing my work and skills as a developer.",
};

export default function GameLayout({ children }) {
  return (
    <Fragment>
          <Header />
          {children}
    </Fragment>
  );
}
