import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Excellence from "@/components/Excellence";
import Collection from "@/components/Collection";
import CustomCursor from "@/components/CustomCursor";
import LumeToggle from "@/components/LumeToggle";
import { LumeProvider } from "@/context/LumeContext";

function App() {
  return (
    <LumeProvider>
      <main className="bg-background min-h-screen text-foreground selection:bg-[#c5a059] selection:text-black">
        <CustomCursor />

        {/* 
          Hero Section: Sticky Scroll container.
          Height = 350vh means user scrolls 3.5 screens worth of distance.
        */}
        <div className="relative h-[350vh]">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <ScrollyCanvas />
            <Overlay />
            <LumeToggle />

            {/* Gradient fade at bottom to blend into next section */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
          </div>
        </div>

        {/* Content Sections */}
        <div className="relative z-30 bg-background transition-colors duration-500">
          <Excellence />
          <Collection />

          <footer className="py-12 border-t border-white/5 text-center">
            <p className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-light">
              Rolex Concept Microsite © 2026
            </p>
          </footer>
        </div>

      </main>
    </LumeProvider>
  );
}

export default App;
