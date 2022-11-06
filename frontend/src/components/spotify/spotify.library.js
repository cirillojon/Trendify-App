import React from "react"
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from "axios";

const Library = () => {
  const { trackID,  } = useParams();
  var obj = {
    trackID: trackID,
  };
  console.log(obj);

  return (
    <div class = "ml-auto mr-auto lg:px-10 px-2">
        <div class="p-6 rounded-xl w-full">
            <h1 class="text-slate-50 text-5xl mt-20 text-center font-bold mb-1 flex justify-center items-center space-x-2">
                <span target="_blank" rel="noopener noreferrer" class="lg:text-5xl text-3xl font-bold no-underline hover:underline text-sky-50 hover:text-sky-300"
                    >THIS IS LIBRARY</span>
            </h1>
        </div>
    </div>
  )
};

export default Library;

