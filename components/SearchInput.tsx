'use client';
import { useEffect, useState } from "react";
import { useDebounce } from "./hooks/use-debounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Input } from "./ui/input";

const SearchInput = () => {
const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 500);
 
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const categoryId = searchParams.get('categoryId')
  useEffect(()=>{
    const url = qs.stringifyUrl({
      url : pathname,
      query : {
        title : debouncedSearch,
        categoryId
      }
    }, {skipNull : true, skipEmptyString : true})
    router.push(url)
  })
return(
<div className="relative  h-9">
  <Search 

  className="w-4 h-4 top-3 left-3 absolute text-slate-600"
  />
  <Input
  className="w-full md-w-[300] rounded-full h-full pl-9 bg-slate-100 focus-visible:ring-slate-200"
  placeholder="easrch a course"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  />
</div>
)
}
export default SearchInput;