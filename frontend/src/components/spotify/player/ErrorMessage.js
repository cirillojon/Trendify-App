import React from "react"

export default function Error({accessTokenError, spotifyPremiumError}) {
    var errorMessage = "";
    var link = "";
    var target = "";
    var rel = "";
    var buttonMsg = "";
    var styling = "";
    var boxStyling = "";
    if (accessTokenError){
        errorMessage = "Your access token has expired, please refresh the home page then login to Spotify again."
        link = "/landing"
        buttonMsg = "Go back"
        styling = "duration-200 no-underline inline-flex items-center gap-2 rounded-lg px-3 py-2 text-white transition bg-[#a247db] hover:bg-[#8239af]"
        boxStyling = "rounded-xl p-4 shadow-2xl hover:shadow-[#713299]/50 bg-[#292f3d] lg:w-2/5 w-fit mr-auto ml-auto duration-300"
    }
    else if (spotifyPremiumError){
        errorMessage = "Music Player is only available for Spotify Premium users."
        link = "https://www.spotify.com/us/premium/?utm_source=us-en_brand_contextual-desktop_text&utm_medium=paidsearch&utm_campaign=alwayson_ucanz_us_premiumbusiness_premium_brand+contextual-desktop+text+exact+us-en+google&gclid=Cj0KCQjwk5ibBhDqARIsACzmgLTAjj05XwYXkgn7pzVQ0Z4zievszL9OeiBSYFFlE5Zerh4C_fvQlDwaAgr0EALw_wcB&gclsrc=aw.ds"
        target = "_blank"
        rel = "noopener noreferrer"
        buttonMsg = "Buy Spotify Premium"
        styling = "duration-200 no-underline inline-flex items-center gap-2 rounded-lg bg-[#1DB954] px-3 py-2 text-white transition hover:bg-[#159743]";
        boxStyling = "rounded-xl p-4 shadow-2xl hover:shadow-[#459464]/50 bg-[#292f3d] lg:w-2/5 w-fit mr-auto ml-auto duration-300"
    }
    
  return (
    <div class = "pt-20">
        <div role="alert" class={boxStyling}>
        <div class="flex items-start gap-4">
            <div class="pl-4 flex-1 pr-4">
            <p class="block lg:text-xl text-md font-semibold text-gray-200"> Oh ohh! </p>
            <p class="-mt-2 lg:text-sm text-xs text-gray-200">
               {errorMessage} 
            </p>
            </div>
        </div>
        <div class="mt-1 flex gap-2">
                <a
                href={link}
                class={styling}
                target={target} rel={rel}
                >
                <span class="lg:text-sm text-xs">{buttonMsg}</span>
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


