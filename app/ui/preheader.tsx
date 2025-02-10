// "use client";

// import { getPretext } from "@/helpers/api-controller";
// import { useQuery } from "@tanstack/react-query";

export default function Preheader() {
  // const { data, isLoading, isError, refetch } = useQuery({
  //   queryKey: ["preheader"],
  //   queryFn: () => getPretext(),
  // });

  // const text = data?.preText;
  // if (isLoading) {
  //   return <div />;
  // }
  return (
    <>
      {/* {text ? ( */}
      <div className="w-full py-1 bg-[#bb3a00] flex items-center justify-center">
        <div className="items-center flex flex-col justify-center">
          <p className="md:text-xs text-[10px] text-center font-semibold leading-loose tracking-wider">
            🎁 FREE SHIPPING IN NIGERIA 🚛
          </p>
        </div>
      </div>
      {/* ) : null} */}
    </>
  );
}
