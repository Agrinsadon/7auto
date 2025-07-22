 "use client";

import LandingPage from "./pages/landingpage/landingpage";
import ImageGrid from "./pages/imagepage/imagepage";
import ContactPage from "./pages/contactpage/contactpage";

export default function Home() {
  return (
    <div>
      <LandingPage />
      <ImageGrid />
      <ContactPage />
    </div>
  );
}
