import { Nav } from "./Nav";
import Songs from "./Songs";

export const Page = () => {
  return (
    <div className="w-full h-full bg-transparent overflow-hidden">
      <Nav />
      <Songs />
    </div>
  );
};
