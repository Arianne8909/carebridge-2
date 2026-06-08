import BrowseNeeds from "@/components/needs/BrowseNeeds";
import Footer from "@/components/landing/Footer/Footer";
import SimpleNav from "@/components/ui/SimpleNav/SimpleNav";

export default function Page() {
  return (
    <>
      <SimpleNav />
      <BrowseNeeds />
      <Footer />
    </>
  );
}