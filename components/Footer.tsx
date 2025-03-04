import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const animeIcons = [
  { name: "Attack on Titan", path: "/Images/AOT.jpeg" },
  { name: "Naruto", path: "/Images/Naruto.jpeg" },
  { name: "Dragon Ball", path: "/Images/DragonBall.jpeg" },
  { name: "One Piece", path: "/Images/OnePiece.jpeg" },
  { name: "Bleach", path: "/Images/Bleach.jpeg" }
];

export default function Footer() {
  return (
    <footer className="border-t bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12 relative">
        {/* Floating Icons */}
        <div className="relative w-full h-40 overflow-hidden flex justify-center">
          {animeIcons.map((icon, index) => (
            <div 
              key={icon.name}
              className="absolute animate-float rounded-lg shadow-lg transform hover:scale-110 transition-transform duration-300 flex items-center justify-center"
              style={{
                top: `20px`,
                left: `calc(50% + ${(index - (animeIcons.length - 1) / 2) * 20}%)`,
                animationDelay: `${index * 0.8}s`,
                width: "70px",
                height: "70px",
                padding: "5px"
              }}
            >
              <Image 
                src={icon.path} 
                alt={`${icon.name} icon`} 
                width={55} 
                height={55} 
                className="rounded-lg object-contain"
              />
            </div>
          ))}
        </div>
        
        <style jsx>{`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          @media (max-width: 640px) {
            .relative {
              height: 80px;
            }
            
            img {
              width: 45px;
              height: 45px;
            }
          }
        `}</style>

        {/* Footer Content */}
        <div className="grid md:grid-cols-2 gap-8 pt-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-900">Discover</h3>
            <Link href="#" className="block text-gray-600 hover:text-primary">
              About Us
            </Link>
            <Link href="#" className="block text-gray-600 hover:text-primary">
              Contact
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t">
          <p className="text-sm text-gray-500">© 2025. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
