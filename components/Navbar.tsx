import Router from "next/router";
import Cookies from "js-cookie";
import { Button } from "rebass";
import { spotify } from "@lib/spotify";

export const Navbar = ({ profile }) => {
  const accessToken = Cookies.get("spotifyAccess");
  const {
    id: spotifyUserId,
    images: [displayPicture],
  } = profile;
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Button className="btn-logo" onClick={() => Router.push("/")}>
            BANGERS
          </Button>
          <Button
            onClick={
              async () => {
                console.log(`spotify token: ${accessToken}`);
                console.log(`spotify user id: ${spotifyUserId}`);
                console.log("gonna click");
                await spotify.createPlaylist(accessToken, spotifyUserId);
              }
              // TODO: refacor this into one function that both creates and updates the playlist
            }
            sx={{ marginLeft: 20 }}
          >
            Turn these tracks into a bangin' playlist
          </Button>
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
