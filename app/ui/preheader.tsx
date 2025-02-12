export default async function Preheader() {
  const data = await fetch(
    "https://ruks-a-la-mode.vercel.app/api/content/get-pretext"
  );
  const text = await data.json();

  return (
    <>
      {text ? (
        <div className="w-full py-1 bg-[#bb3a00] flex items-center justify-center">
          <div className="items-center flex flex-col justify-center">
            <p className="md:text-xs text-[10px] text-center font-semibold leading-loose tracking-wider">
              {text?.preText}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
