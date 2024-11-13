const SkeletonCard = () => (
    <article className="bg-white p-4 flex flex-col justify-center gap-1 items-start rounded-lg max-w-[700px] w-[700px] shadow-md animate-pulse">
      <div className="flex items-center gap-2">
        <div className="w-[25px] h-[25px] bg-gray-300 rounded" />
        <div className="w-32 h-6 bg-gray-300 rounded" />
      </div>
  
      <div className="w-full h-4 bg-gray-300 rounded my-2" />
      <div className="w-3/4 h-4 bg-gray-300 rounded my-1" />
  
      <div className="flex items-center w-full justify-end">
        <div className="w-20 h-8 bg-gray-300 rounded-md" />
      </div>
    </article>
  );
  
  export default SkeletonCard;