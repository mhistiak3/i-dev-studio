import NavigationHeader from "@/components/NavigationHeader";

export default function Home() {
  return (
    <div className="min-h-screen bg-body/20">
      <div className="container">
        <NavigationHeader />
        <div className="text-center mt-20">
          <h1 className="text-3xl font-bold mt-8">Welcome to iDevStudio</h1>
          <p className="mt-4 text-lg text-light/80">
            Your online code editing platform.
          </p>
        </div>
      </div>
    </div>
  );
}
