import ExternalLinkViewProps from "./models/external-link-view-props";

export default function ExternalLinkView({
  link,
  children,
}: ExternalLinkViewProps) {
  return (
    <div className="flex">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="h-10 w-10 flex rounded-sm items-center justify-center transition-all hover:bg-gray-700 hover:scale-110"
      >
        {children}
      </a>
    </div>
  );
}
