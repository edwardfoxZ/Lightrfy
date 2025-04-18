import { Nav } from "./Nav";
import Songs from "./Songs";

export const Page = () => {
  return (
    <div className="w-full h-full bg-transparent overflow-hidden">
      <Nav/>
      <Songs />
      <div className="w-full h-16 bg-transparent fixed z-50">dfdfsf</div>
    </div>
  );
};
