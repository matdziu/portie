import { Button } from "@/components/ui/button";
import UpgradeCardView from "@/components/upgrade-card/upgrade-card-view";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

export default function UpgradePage() {
  return (
    <div className="flex flex-col md:flex-row w-full gap-20 justify-center items-center p-8 min-h-screen">
      <div className="flex flex-col items-center justify-center gap-5">
        <UpgradeCardView
          crossedOverPrice={"$20"}
          priceTitle="1-Year Pass"
          price={"$10"}
          currency={"USD"}
          priceInfo={"One-time payment. No subscription!"}
          upgradeButtonProps={{
            upgradeText: "Buy now",
            alreadyUpgradedText: "Your 1-Year Pass is active!",
            alreadyUpgradedUrl: "/dashboard/manage-content",
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <a
              href="https://www.portie.me/p/matt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Button>
                <ExternalLink />
                <p className="text-">Check out a sample portfolio</p>
              </Button>
            </a>
            <ul className="flex flex-col gap-2 text-start list-disc pl-4 mt-4">
              <li>
                <span className="font-extrabold">
                  Your stunning developer portfolio
                </span>{" "}
                - a professional, one-page site that&apos;s easy for anyone to
                understand.
              </li>
              <li>
                <span className="font-extrabold">
                  One-time payment, no subscriptions
                </span>{" "}
                - get a full year of access with a single, simple payment
              </li>
              <li>
                <span className="font-extrabold">
                  Showcase your top projects
                </span>{" "}
                - visually highlight your best work and technical skills to
                impress recruiters and clients.
              </li>
            </ul>
          </div>
        </UpgradeCardView>
      </div>

      <Image
        width={3201}
        height={4000}
        className="w-3/4 md:w-1/4 flex-shrink-0 object-contain"
        src="/sample-portfolio-mobile.png"
        priority={true}
        alt=""
      />
    </div>
  );
}
