import React from "react"

export default function Error() {

  return (
    <div class = "pt-10">
        <div role="alert" class="rounded-xl p-4 shadow-xl bg-[#292f3d] w-2/4 mr-auto ml-auto">
        <div class="flex items-start gap-4">
            <div class="pl-4 flex-1">
            <p class="block font-xl font-semibold text-gray-200"> Oops, we encountered a problem </p>
            <p class="text-sm text-gray-200">
                It looks like we don't have enough information to show you. Please listen to more music then come back.
            </p>
            <div class="mt-4 flex gap-2">
                <a
                href="/landing"
                class="duration-200 no-underline inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                >
                <span class="text-sm"> Go back </span>
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
        </div>
    </div>
  )
}


