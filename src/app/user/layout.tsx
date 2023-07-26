import NavigationBar from "@/components/NavigationBar";
import React from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <NavigationBar />
      {children}
    </section>
  );
}
