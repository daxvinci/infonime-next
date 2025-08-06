import Link from "next/link";
import Button from "../components/Button";
// import Button from "../components/Button";


const LandingPage = () => {

    return (
      <>
        <main className="landing-page min-h-screen relative">
          <div className="bg-wallpaper absolute inset-0 z-10" />
          <div className="bg-overlay bg-black/50 z-20 absolute inset-0 " />
          <div className="content-wrapper relative z-30 flex flex-col p-4 sm:items-baseline items-center justify-center min-h-screen">
            <div className="content max-w-[90%] sm:max-w-[40%] flex flex-col gap-2 mt-0 sm:mt-30 ml-0 sm:ml-26 justify-center">
              <h1 className="sm:text-5xl text-2xl text-gray-200 font-bold">
                Welcome to Infonime!
              </h1>
              <p className="sm:text-xl text-md text-gray-300 mt-4">
                From the latest releases to timeless favorites, we bring you a
                constantly updated anime list that keeps your watchlist fresh.
                Whether you're new or a longtime fan, there's always something
                worth checking out.
              </p>
              <div className="mt-8 flex sm:gap-16 gap-8">
                <Link href="/login" className="btn btn-primary">
                  <Button text="Sign In" color="#48C78E" />
                </Link>
                <Link href="/home" className="btn btn-primary">
                  <Button text="Guest" color="#2E6AE1" />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </>
    );
}
 
export default LandingPage;