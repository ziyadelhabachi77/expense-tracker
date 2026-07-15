import {Spinner} from "../ui/spinner"

function Loading() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-4">

     <Spinner className={"size-10"}/>

      {/* optional text */}
      <p className="text-sm text-[#16332D] animate-pulse">Loading...</p>
    </div>
  );
}

export default Loading;
