import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "rebass";

export const Navbar = ({ profile }) => {
  const {
    images: [displayPicture],
  } = profile;
  const router = useRouter();
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Button className="btn-logo" onClick={() => router.push("/")}>
            BANGERS
          </Button>
          <Link href={"/dmannguy"}>
            <Button sx={{ marginLeft: 20 }}>Check out duncs profile!!</Button>
          </Link>
        </li>
        {displayPicture && (
          <li>
            <img src={displayPicture.url} />
          </li>
        )}
      </ul>
    </nav>
  );
};
