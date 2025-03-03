import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Footer() {
  const [animeList, setAnimeList] = useState([]);

  const fetchAnime = async () => {
    try {
      const res = await fetch("/api/getTrackedAnime");
      const data = await res.json();
      console.log("Fetched Anime:", data);
      setAnimeList(data);
    } catch (error) {
      console.error("Failed to fetch anime:", error);
    }
  };

  const sendEmail = async () => {
    try {
      const response = await fetch("/api/sendMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "nwabuikenoble@gmail.com",
          subject: "Test Email",
          text: "Hello, this is a test email!",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Email sent successfully!");
      } else {
        alert("Failed to send email: " + data.error);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <footer className="border-t bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12 relative">
        {/* Floating Icons */}
        <div className="floating-icon" style={{ top: "-60px", left: "10%", animationDelay: "0s" }}>
          <Image src="/Images/AOT.jpeg" alt="Anime icon" width={40} height={40} className="rounded-lg" />
        </div>
        <div className="floating-icon" style={{ top: "-40px", left: "30%", animationDelay: "1s" }}>
          <Image src="/Images/Naruto.jpeg" alt="Anime icon" width={40} height={40} className="rounded-lg" />
        </div>
        <div className="floating-icon" style={{ top: "-80px", left: "50%", animationDelay: "2s" }}>
          <Image src="/Images/DragonBall.jpeg" alt="Anime icon" width={40} height={40} className="rounded-lg" />
        </div>
        <div className="floating-icon" style={{ top: "-30px", left: "70%", animationDelay: "3s" }}>
          <Image src="/Images/OnePiece.jpeg" alt="Anime icon" width={40} height={40} className="rounded-lg" />
        </div>
        <div className="floating-icon" style={{ top: "-50px", left: "90%", animationDelay: "4s" }}>
          <Image src="/Images/Bleach.jpeg" alt="Anime icon" width={40} height={40} className="rounded-lg" />
        </div>

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
