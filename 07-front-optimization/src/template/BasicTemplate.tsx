import React, { type ReactNode } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

interface BasicTemplatesProps {
  children: ReactNode;
}

export default function BasicTemplates(props: BasicTemplatesProps) {
  return (
    <div className="BasicTemplates">
      <section className={"HeaderSection"}>
        <Header />
      </section>
      <section className={"Body"}>{props.children}</section>
      <section className={"FooterSection"}>
        <Footer />
      </section>
    </div>
  );
}
