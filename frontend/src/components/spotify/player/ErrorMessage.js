import React from "react"

export default function Error() {
  return (
    <div class = "pt-20">
        <div role="alert" class="rounded-xl p-4 shadow-xl bg-[#292f3d] lg:w-2/5 w-fit mr-auto ml-auto">
        <div class="flex items-start gap-4">
            <div class="pl-4 flex-1 pr-4">
            <p class="block lg:text-3xl text-xl font-semibold text-gray-200"> Oh ohh! </p>
            <p class="-mt-2 lg:text-xl text-xs text-gray-200">
                Music Player is only available for Spotify Premium users.
            </p>
            </div>
        </div>
        <div class="mt-1 flex gap-2">
                <a
                href="https://www.spotify.com/us/premium/?utm_source=us-en_brand_contextual-desktop_text&utm_medium=paidsearch&utm_campaign=alwayson_ucanz_us_premiumbusiness_premium_brand+contextual-desktop+text+exact+us-en+google&gclid=Cj0KCQjwk5ibBhDqARIsACzmgLTAjj05XwYXkgn7pzVQ0Z4zievszL9OeiBSYFFlE5Zerh4C_fvQlDwaAgr0EALw_wcB&gclsrc=aw.ds"
                class="duration-200 no-underline inline-flex items-center gap-2 rounded-lg bg-[#1DB954] px-3 py-2 text-white transition hover:bg-[#159743]"
                target="_blank" rel="noopener noreferrer"
                >
                <span class="lg:text-sm text-xs">Buy Spotify Premium</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-4 w-4">
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                </svg>
                </a>
            </div>
        </div>
    </div>
  )
}


