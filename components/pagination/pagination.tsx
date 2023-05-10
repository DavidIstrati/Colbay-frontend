const FirstPagePagination = ({isFinalPage}: {isFinalPage: boolean}) => {
  return (
    <>
      <div className="w-15 h-10 flex justify-center items-center rounded-md mr-4">
        <span className="text-slate-400 cursor-not-allowed">{"< Prev"}</span>
      </div>
      <div className="w-10 h-10 bg-slate-200 flex justify-center items-center rounded-md mr-1 cursor-not-allowed">
        <span className="text-slate-900 font-bold">1</span>
      </div>
      {!isFinalPage && <div className="w-10 h-10 flex justify-center items-center rounded-md mr-1 cursor-pointer">
        <span className="text-slate-600">2</span>
      </div>}
      <div className="w-15 h-10 flex justify-center items-center rounded-md mr-1 cursor-pointer">
        <span className="text-slate-900">{"Next >"}</span>
      </div>
    </>
  );
};

const GeneralPagePagination = ({page}: {page: number}) => {
        return (
          <>
            <div className="w-15 h-10 flex justify-center items-center rounded-md mr-4">
              <span className="text-slate-900 cursor-pointer">{"< Prev"}</span>
            </div>
            <div className="w-10 h-10 flex justify-center items-center rounded-md mr-1 cursor-pointer">
              <span className="text-slate-600">{page-1}</span>
            </div>
            <div className="w-10 h-10 bg-slate-200 flex justify-center items-center rounded-md mr-1 cursor-not-allowed">
              <span className="text-slate-900 font-bold">{page}</span>
            </div>
            <div className="w-10 h-10 flex justify-center items-center rounded-md mr-1 cursor-pointer">
              <span className="text-slate-600">{page+1}</span>
            </div>
            <div className="w-15 h-10 flex justify-center items-center rounded-md mr-1 cursor-pointer">
              <span className="text-slate-900">{"Next >"}</span>
            </div>
          </>
        );
}

const LastPagePagination = ({page}: {page: number}) => {
    return (
      <>
        <div className="w-15 h-10 flex justify-center items-center rounded-md mr-4">
          <span className="text-slate-900 cursor-pointer">{"< Prev"}</span>
        </div>
        <div className="w-10 h-10 flex justify-center items-center rounded-md mr-1 cursor-pointer">
          <span className="text-slate-600">{page-2}</span>
        </div>
        <div className="w-10 h-10 flex justify-center items-center rounded-md mr-1 cursor-pointer">
          <span className="text-slate-600">{page-1}</span>
        </div>
        <div className="w-10 h-10 bg-slate-200 flex justify-center items-center rounded-md mr-4 cursor-not-allowed">
          <span className="text-slate-900 font-bold">{page}</span>
        </div>
        <div className="w-15 h-10 flex justify-center items-center rounded-md mr-1 cursor-pointer">
          <span className="text-slate-400 cursor-not-allowed">{"Next >"}</span>
        </div>
      </>
    );
}

export { FirstPagePagination, GeneralPagePagination, LastPagePagination };
