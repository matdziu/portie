import { Link } from "lucide-react";
import ExternalLinkView from "../external-link/external-link-view";
import GithubLogoSvg from "../svg/github-logo-svg";
import InstagramLogoSvg from "../svg/instagram-logo-svg";
import LinkedInLogoSvg from "../svg/linked-in-logo-svg";
import MediumLogoSvg from "../svg/medium-logo-svg";
import XLogoSvg from "../svg/x-logo-svg";
import YouTubeLogoSvg from "../svg/youtube-logo-svg";
import { UserLinksViewProps } from "./models/user-links-view-props";

export default function UserLinksView({
  personalWebsiteLink,
  githubLink,
  linkedInLink,
  mediumLink,
  twitterLink,
  youtubeLink,
  instagramLink,
}: UserLinksViewProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {personalWebsiteLink && (
        <ExternalLinkView link={personalWebsiteLink}>
          <Link className="h-5 w-5" />
        </ExternalLinkView>
      )}

      {githubLink && (
        <ExternalLinkView link={githubLink}>
          <GithubLogoSvg fill="currentColor" className="h-5 w-5" />
        </ExternalLinkView>
      )}

      {linkedInLink && (
        <ExternalLinkView link={linkedInLink}>
          <LinkedInLogoSvg fill="currentColor" className="h-5 w-5" />
        </ExternalLinkView>
      )}

      {mediumLink && (
        <ExternalLinkView link={mediumLink}>
          <MediumLogoSvg fill="currentColor" className="h-5 w-5" />
        </ExternalLinkView>
      )}

      {twitterLink && (
        <ExternalLinkView link={twitterLink}>
          <XLogoSvg fill="currentColor" className="h-5 w-5" />
        </ExternalLinkView>
      )}

      {youtubeLink && (
        <ExternalLinkView link={youtubeLink}>
          <YouTubeLogoSvg fill="currentColor" className="h-5 w-5" />
        </ExternalLinkView>
      )}

      {instagramLink && (
        <ExternalLinkView link={instagramLink}>
          <InstagramLogoSvg fill="currentColor" className="h-5 w-5" />
        </ExternalLinkView>
      )}
    </div>
  );
}
