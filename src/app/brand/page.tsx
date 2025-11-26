import Link from "next/link";

export default function Home() {
  return (
    <div className="container-custom py-16">
      <div className="mx-auto">
        <h1 className="text-display-sm mb-8">Raid Guild Brand Guidelines</h1>
        <h2 className="text-display-lg mb-8">Brand</h2>

        <p className="text-body-lg text-moloch-800">
          What is here, how to use it
        </p>

        <div className="flex flex-col w-full gap-10 mt-10">
          <div className="p-4">
            <h2 className="text-heading-lg text-moloch-500 mb-8">Resources</h2>

            <div className="space-y-4 text-body-lg">
              <Link
                href="/assets/RaidGuild_brand_guidelines.pdf"
                className="block hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="text-heading-sm">Brand Guidelines (PDF)</h3>
              </Link>

              <Link
                href="https://www.figma.com/proto/i12YX9sbqeBXFJvExzA5PM/Raid-Guild-%7C-WORKING-%7C-Brand-Refresh-%7C-Q4-2025--Copy-?page-id=1859%3A175&node-id=1859-203&p=f&viewport=118%2C555%2C0.13&t=bKqLvajN7L8w4z03-1&scaling=contain&content-scaling=fixed"
                className="block hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="text-heading-sm">Brand Guidelines (Figma)</h3>
              </Link>

              <Link
                href="https://github.com/raid-guild/brand"
                className="block hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="text-heading-sm">GitHub Repository</h3>
              </Link>
            </div>
          </div>

          <div className="p-4">
            <div className="space-y-6">
              <h2 className="text-heading-lg text-moloch-500 mb-8">Brand</h2>

              <div className="space-y-4">
                <Link
                  href="/brand/logos"
                  className="block hover:text-accent transition-colors"
                >
                  <h3 className="text-heading-sm">Logos</h3>
                </Link>

                <Link
                  href="/brand/colors"
                  className="block hover:text-accent transition-colors"
                >
                  <h3 className="text-heading-sm">Colors</h3>
                </Link>

                <Link
                  href="/brand/typography"
                  className="block hover:text-accent transition-colors"
                >
                  <h3 className="text-heading-sm">Typography</h3>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
