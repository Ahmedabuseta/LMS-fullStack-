import { db } from "@/lib/db";
import { Categories } from "./_cmponents/catogeries";
import SearchInput from "@/components/SearchInput";

interface iProps {}

const SearchPage = async ({}: iProps) => {
  const categories = await db.categoery.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <div className=" ">
      <div className="block md:hidden py-4 px-2">
        <SearchInput />
      </div>
      
      <Categories items={categories} />
    </div>
  );
};
export default SearchPage;
