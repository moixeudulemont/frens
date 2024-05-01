import { db } from "@/lib/db";
import Pubs from "@/lib/models/pubs";
import Pub from "@/components/Pub";
import Pagination from "@/components/Pagination";
import Extras from "@/components/Extras";
import Filters from "@/components/Filters";

export const metadata = {
  title: "frens - home",
};

export const dynamic = "force-dynamic";

const docsPerPage = 20;
async function getData(page, search, author) {
  const skip = (page - 1) * docsPerPage;
  await db();
  if (search) {
    const pubs = await Pubs.find({ title: { $regex: search, $options: "i" } })
      .sort({ date: -1 })
      .skip(skip)
      .limit(docsPerPage);
    const count = await Pubs.find({
      title: { $regex: search, $options: "i" },
    }).count();
    return { pubs, count };
  }
  if(author !== "all" && !search) {
    const pubs = await Pubs.find({ author: author })
      .sort({ date: -1 })
      .skip(skip)
      .limit(docsPerPage);
    const count = await Pubs.find({author: author}).count();
    return { pubs, count };
  }
  const pubs = await Pubs.find({})
    .sort({ date: -1 })
    .skip(skip)
    .limit(docsPerPage);
  const count = await Pubs.find({}).count();
  return { pubs, count };
}
//GET EXTRAS
async function extrasPublications() {
  return await Pubs.aggregate([{ $sample: { size: 10 } }]);
}

//INIT
export default async function Home({ searchParams }) {
  //RENDER EXTRAS TO PUB LIST
  function renderPubs() {
    let count = 0;
    return async function ext(elem, key) {
      count++;
      if (count % 4 !== 0) {
        return <Pub data={JSON.stringify(elem)} key={key} />;
      } else {
        const extrasPubs = await extrasPublications();
        return (
          <>
            <Pub data={JSON.stringify(elem)} key={key} />
            <Extras extras={JSON.stringify(extrasPubs)} />
          </>
        );
      }
    };
  }
  //FILTER PARAMS
  function filtroPage() {
    if (
      !searchParams.page ||
      isNaN(parseInt(searchParams.page)) ||
      /^\W*$/.test(searchParams.page)
    )
      return 1;
    return searchParams.page;
  }
  function filtroSearch() {
    if (!searchParams.search || /^\W*$/.test(searchParams.search)) return "";
    return searchParams.search;
  }
  function filtroAuthor() {
    if (!searchParams.author || /^\W*$/.test(searchParams.author)) return "all";
    return searchParams.author;
  }
  //INITIALIZE
  const page = filtroPage();
  const search = filtroSearch();
  const authorPage = filtroAuthor();
  const { pubs, count } = await getData(page, search, authorPage);
  const x = renderPubs();

  return (
    <main>
      {authorPage !== 'all' ? (
        <h1 className="text-center text-2xl font-bold my-5 bg-amber-500 py-2 shadow-md">{authorPage}</h1>
      ) : ''}
      <section className="flex gap-5 mb-5">
        <div id="filters" className="md:w-3/12 md:block hidden">
          <Filters url={searchParams.author}/>
        </div>
        <div className="flex flex-col gap-5 md:w-6/12 w-full" id="pubs">
          {search && (
            <h1 className="text-center text-xl lg:text-2xl font-bold">
              {count} resultados encontrados para{" "}
              <span className="text-2xl lg:text-3xl font-bold text-yellow-300">
                {search}
              </span>
            </h1>
          )}
          {pubs.map((elem, key) => x(elem, key))}
        </div>
      </section>
      <Pagination total={count} docs={docsPerPage} />
    </main>
  );
}
