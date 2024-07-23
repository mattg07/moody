export default function Hero() {
  return (
    <section className="relative h-[600px] bg-scarlet text-white py-20 w-full">
      <div className="container mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4 mt-0">
          Create and share your mood boards with ease
        </h1>
      </div>
      <div className="w-5/5 sm:w-4/5 m-auto rounded-3xl inset-0 flex items-center justify-center pointer-events-none mt-16 py-4">
        <div className="relative">
          <div
            className=" triangle w-0 h-0 
  border-l-[200px] border-l-transparent
  border-b-[345px] border-b-black
  border-r-[200px] border-r-transparent"
          ></div>

          <div className="absolute text-xl  -left-8 top-2/4 text-white z-20 -rotate-[5deg]">
            MOOD
          </div>
          <div className=":*mr-16 absolute text-xl top-1/4 right-1 transform -translate-x-full">
            <div className="absolute text-xl right-1 -top-8 sm:-top-6 -left-10 sm:left-36  text-white z-20 ml:18">
              STYLE
            </div>
            <div className="absolute text-xl right-1 -left-18  sm:left-20  text-white z-20 ">
              IDEAS
            </div>

            <div className="absolute text-xl right-1 -left-28 sm:left-1 mt-10 text-white z-20">
              PICTURES
            </div>

            <div className="absolute text-xl top-20 -left-32 sm:-left-12 -sm:right-2 text-white z-20">
              MUSIC
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
