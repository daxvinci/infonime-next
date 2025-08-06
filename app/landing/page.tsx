import Link from "next/link";
// import Button from "../components/Button";


const LandingPage = () => {

    return (
      <>
        <main className="landing-page min-h-screen relative">
          <div className="bg-wallpaper absolute inset-0 z-10" />
          <div className="bg-overlay bg-black/40 z-20 absolute inset-0 " />
          <div className="content-wrapper relative z-30 flex flex-col p-4 sm:items-baseline items-center justify-center min-h-screen">
            <div className="content flex flex-col gap-2 mt-0 sm:mt-20 ml-0 sm:ml-26 justify-center">
              <h1 className="text-4xl text-white font-bold">
                Welcome to Infonime!
              </h1>
              <p className="text-lg text-white mt-4">
                A continuously updated anime list.
              </p>
              <div className="mt-8 flex justify-between gap-2">
                <Link href="/login" className="btn btn-primary">
                sign in
                  {/* <Button text="Sign In" color="#48C78E" /> */}
                </Link>
                <Link href="/home" className="btn btn-primary">
                guest
                  {/* <Button text="Guest" color="#2E6AE1" /> */}
                </Link>
              </div>
            </div>
          </div>
        </main>
      </>
    );
}
 
export default LandingPage;