import { Container } from "@mui/material";
import NavBar from "src/components/ui/NavBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <section>
      <NavBar />

      <Container>{children}</Container>
    </section>
  );
}
