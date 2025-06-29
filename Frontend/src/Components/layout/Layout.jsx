import Navigation from "./Navigation";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <div className="flex flex-1 min-h-screen">
        <Navigation />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6 overflow-y-auto">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
