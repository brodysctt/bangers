import Router from "next/router";
import Cookies from "js-cookie";
import { Button } from "rebass";
import { spotify } from "@lib/spotify";

export const Navbar = ({ profile, topTunes }) => {
  const accessToken = Cookies.get("spotifyAccess");
  const {
    id,
    images: [displayPicture],
  } = profile;

  const { items: tracks } = topTunes;
  const trackURIs = tracks.map((track) => track.uri);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Button className="btn-logo" onClick={() => Router.push("/")}>
            BANGERS
          </Button>
          <Button
            onClick={async () =>
              await spotify.createPlaylist(accessToken, id, trackURIs)
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
