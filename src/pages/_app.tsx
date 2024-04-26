import "src/app/globals.css";
import MainLayout from "src/components/layouts/MainLayout";

export default function App({ Component, pageProps }: any) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}
