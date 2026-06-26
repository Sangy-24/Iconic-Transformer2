import { Outlet } from "react-router-dom";
import MarketingNav from "./MarketingNav";
import MarketingFooter from "./MarketingFooter";

const MarketingLayout = () => (
  <div className="flex min-h-screen flex-col font-body">
    <MarketingNav />
    <main className="flex-grow bg-surface">
      <Outlet />
    </main>
    <MarketingFooter />
  </div>
);

export default MarketingLayout;
