import { Link } from "lucide-react";
import ExternalLinkView from "../external-link/external-link-view";
import GithubLogoSvg from "../svg/github-logo-svg";
import InstagramLogoSvg from "../svg/instagram-logo-svg";
import LinkedInLogoSvg from "../svg/linked-in-logo-svg";
import MediumLogoSvg from "../svg/medium-logo-svg";
import XLogoSvg from "../svg/x-logo-svg";
import YouTubeLogoSvg from "../svg/youtube-logo-svg";

export default function UserLinksView() {
  return (
    <div className="flex flex-wrap gap-1">
      <ExternalLinkView link={"https://x.com/"}>
        <Link className="h-5 w-5" />
      </ExternalLinkView>

      <ExternalLinkView link={"https://github.com/"}>
        <GithubLogoSvg fill="currentColor" className="h-5 w-5" />
      </ExternalLinkView>

      <ExternalLinkView link={"https://linkedin.com/"}>
        <LinkedInLogoSvg fill="currentColor" className="h-5 w-5" />
      </ExternalLinkView>

      <ExternalLinkView link={"https://x.com/"}>
        <MediumLogoSvg fill="currentColor" className="h-5 w-5" />
      </ExternalLinkView>

      <ExternalLinkView link={"https://x.com/"}>
        <XLogoSvg fill="currentColor" className="h-5 w-5" />
      </ExternalLinkView>

      <ExternalLinkView link={"https://x.com/"}>
        <YouTubeLogoSvg fill="currentColor" className="h-5 w-5" />
      </ExternalLinkView>

      <ExternalLinkView link={"https://x.com/"}>
        <InstagramLogoSvg fill="currentColor" className="h-5 w-5" />
      </ExternalLinkView>
    </div>
  );
}
