 "use client";

import LandingPage from "./pages/landingpage/landingpage";
import ImageGrid from "./pages/imagepage/imagepage";
import ContactPage from "./pages/contactpage/contactpage";
import Carwash from "./pages/services/carwash/carwash";
import Carfix from "./pages/services/carfix/carfix";

export default function Home() {
  return (
    <div>
      <LandingPage />
      <ImageGrid />
      <Carwash />
      <Carfix />
      <ContactPage />
    </div>
  );
}
