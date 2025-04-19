import { Nav } from "../components/Nav";
import Songs from "../pages/Songs";

export const Page = () => {
  return (
    <div className="w-full h-full bg-transparent overflow-hidden">
      <Nav />
      <Songs />
    </div>
  );
};
