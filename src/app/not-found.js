import Image from "next/image";
import notFound from "../assets/img/not-found.png";

export default function NotFound() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Image src={notFound} alt="notFound" className="w-3/5" priority />
    </div>
  );
}
