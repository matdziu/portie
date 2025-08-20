"use client";

import UserInfoCardView from "../user-info-card/user-info-card-view";
import UserLinksView from "../user-links/user-links-view";

const PlaceholderContent: React.FC = () => {
  const items = Array.from({ length: 50 }, (_, i) => i + 1);
  return (
    <div className="p-4">
      {items.map((item) => (
        <p key={item} className="mb-2 text-gray-700">
          This is a scrollable item #{item}.
        </p>
      ))}
    </div>
  );
};

export default function UserPageView() {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-y-scroll md:overflow-hidden">
      <div className="w-full md:w-1/4 md:overflow-y-scroll p-2 no-scrollbar">
        <UserInfoCardView />
        <div className="mt-4 hidden md:flex items-start px-2">
          <UserLinksView />
        </div>
      </div>
      <div className="w-full md:w-3/4 md:overflow-y-scroll p-2">
        <PlaceholderContent />
        <div className="flex w-full my-8 items-center justify-center md:hidden">
          <UserLinksView />
        </div>
      </div>
    </div>
  );
}
