const SkeletonComment = () => (
    <article className="bg-white p-4 flex flex-col justify-center gap-2 items-start rounded-lg w-[700px] max-w-[700px] shadow-md animate-pulse">
      <div className="flex items-center gap-1">
        <div className="w-[20px] h-[20px] bg-gray-300 rounded-full" />
        <div className="w-24 h-4 bg-gray-300 rounded" />
      </div>
      <div className="w-full h-4 bg-gray-300 rounded my-2" />
      <div className="w-3/4 h-4 bg-gray-300 rounded my-1" />
    </article>
  );
  
  export default SkeletonComment;
  