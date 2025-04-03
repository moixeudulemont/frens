import { db } from "@/lib/db";
import Pubs from "@/lib/models/pubs";
import Users from "@/lib/models/users.js";
import Pub from "@/components/Pub";
import Pagination from "@/components/Pagination";
import Extras from "@/components/Extras";
// import Filters from "@/components/Filters";
import Portada from "@/components/Portada";
import Portrait from "@/components/Portrait";

export const metadata = {
  title: "frens - home",
};

export const dynamic = "force-dynamic";

await db();
const users = await Users.find({});

const docsPerPage = 21;
async function getData(page, search, author) {
  const skip = (page - 1) * docsPerPage;
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

//GET USER
function getUser(author) {
  const x = users.filter(x => x.name === author);
  if(!x || x.length == 0) return;
  return x[0];
}
//EXTRAS
async function extras() {
  const extrasPubs = await extrasPublications();
  return <Extras extras={JSON.stringify(extrasPubs)} />
}
//INIT
export default async function Home({ searchParams }) {
  //RENDER EXTRAS TO PUB LIST
  function renderPubs(elem, key) {
    return <Pub data={JSON.stringify(elem)} key={key} />
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

  return (
    <main className="px-2">
      {authorPage !== 'all' ? (
        <>
        <h1 className="text-center text-2xl font-bold my-5 bg-amber-500 py-2 shadow-md">{authorPage}</h1>
        <Portrait portrait={getUser(authorPage)?.portrait} avatar={getUser(authorPage)?.image} author={authorPage}/>
        </>
      ) : ''}
      <section className="flex flex-col md:gap-5 mb-5">
        {/* <div id="filters" className="md:w-3/12 w-12/12">
          <Filters url={searchParams.author} users={JSON.stringify(users)}/>
        </div> */}
        <div className="lg:grid lg:grid-cols-3 flex flex-col gap-5 w-full md:w-auto" id="pubs">
          {search && (
            <h1 className="text-center text-xl lg:text-2xl font-bold">
              {count} resultados encontrados para{" "}
              <span className="text-2xl lg:text-3xl font-bold text-yellow-300">
                {search}
              </span>
            </h1>
          )}
          <div className="firstColumn gap-5 flex flex-col">
            {pubs.map((elem, key) => {
              if(key % 2 !== 0) {
                return renderPubs(elem, key)
              }
            })}
          </div>
          <div className="secondColumn gap-5 flex flex-col">
            {pubs.map((elem, key) => {
              if(key % 2 == 0) {
                return renderPubs(elem, key);
              }
            })}
          </div>
          <div className="thirdColumn">
            <Portada />
          </div>
        </div>
        <div className="extras w-full">
          {extras()}
        </div>
      </section>
      <Pagination total={count} docs={docsPerPage} />
    </main>
  );
}
