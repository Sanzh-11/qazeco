import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <>
      <Link href="/">
        <Image src="/logo1.svg" alt="Logo" width={50} height={40} />
      </Link>
    </>
  );
};
