import { Suspense } from "react";
import { Audiowide, Paytone_One,Share_Tech_Mono } from "next/font/google";
import Link from "next/link";
import { Button } from "../button";
import { Icons, iconVariants } from "../ui/icons";
import { Loader } from "../ui/loader";
import { ThemeToggle } from "../theme-toggle";
import { UserProfile } from "../auth/user-profile";

const paytoneOne = Paytone_One({
  subsets: ["latin"],
  weight: "400"  // Remove the array brackets
});
export const shareTechMono = Share_Tech_Mono({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-share-tech-mono',
});
export const audiowide = Audiowide({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-audiowide',
});
export const Header = () => {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between p-4">
       <Link href="/" className={`${audiowide.className} text-2xl`}>
        Cipher Link
      </Link>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground transition-colors hover:text-foreground"
          asChild
        >
          <Link href="https://github.com/saiteja-in" target="_blank">
            <Icons.github className={iconVariants({ size: "lg" })} />
            <span className="sr-only">github repository</span>
          </Link>
        </Button>
        <ThemeToggle />
        <Suspense fallback={<Loader size="xl" />}>
          <UserProfile />
        </Suspense>
      </div>
    </header>
  );
};
